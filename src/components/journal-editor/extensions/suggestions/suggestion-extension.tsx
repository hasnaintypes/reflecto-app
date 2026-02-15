"use client";

import Mention from "@tiptap/extension-mention";
import type { Editor, Range } from "@tiptap/core";
import { createSuggestionConfig } from "./suggestion-config";
import type { SuggestionItem, TrpcResponse, MentionNodeAttributes } from "../../core/types";

export const TagMention = Mention.extend({
  name: "mention-tag",
  inline: true,
  group: "inline",
  atom: true,
  addAttributes() {
    return {
      id: {
        default: null,
        parseHTML: (element) => element.getAttribute("data-id"),
        renderHTML: (attributes: Record<string, string>) => {
          if (!attributes.id) return {};
          return { "data-id": attributes.id };
        },
      },
      label: {
        default: null,
        parseHTML: (element) => element.getAttribute("data-label"),
        renderHTML: (attributes: Record<string, string>) => {
          if (!attributes.label) return {};
          return { "data-label": attributes.label };
        },
      },
    };
  },
  parseHTML() {
    return [
      {
        tag: 'span[data-type="mention-tag"]',
        getAttrs: (dom) => {
          const element = dom as HTMLElement;
          return {
            id: element.getAttribute("data-id"),
            label: element.getAttribute("data-label"),
          };
        },
      },
    ];
  },
  renderHTML({ node, HTMLAttributes }) {
    return [
      "span",
      {
        ...HTMLAttributes,
        class: "mention-tag-custom editor-tag",
        "data-type": "mention-tag",
        "data-id": (node.attrs as MentionNodeAttributes).id,
        "data-label": (node.attrs as MentionNodeAttributes).label,
      },
      `#${(node.attrs as MentionNodeAttributes).label}`,
    ];
  },
}).configure({
  HTMLAttributes: {
    class: "editor-tag",
  },
  renderText({ node }) {
    return `#${(node.attrs as MentionNodeAttributes).label}`;
  },
  suggestion: {
    char: "#",
    ...createSuggestionConfig(),
    command: ({
      editor,
      range,
      props,
    }: {
      editor: Editor;
      range: Range;
      props: any;
    }) => {
      const executeCommand = async () => {
        if (props.isNew) {
          try {
            const createResponse = await fetch(
              "/api/trpc/tag.create?batch=1",
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  "0": { json: { name: props.label, color: "#60A5FA" } },
                }),
              },
            );
            const createData =
              (await createResponse.json()) as TrpcResponse<{
                id: string;
                name: string;
              }>[];
            const newTag = createData[0]?.result?.data?.json;

            if (newTag) {
              props.id = newTag.id;
              props.label = newTag.name;
            }
          } catch (error) {
            console.error("Failed to create tag:", error);
          }
        }

        editor
          .chain()
          .focus()
          .deleteRange(range)
          .insertContent({
            type: "mention-tag",
            attrs: props,
          })
          .run();
      };

      void executeCommand();
    },
    items: async ({
      query,
    }: {
      query: string;
    }): Promise<SuggestionItem[]> => {
      const response = await fetch(
        `/api/trpc/tag.search?batch=1&input=${encodeURIComponent(JSON.stringify({ "0": { json: { query } } }))}`,
      );
      const data = (await response.json()) as TrpcResponse<
        SuggestionItem[]
      >[];
      const results: SuggestionItem[] = data[0]?.result?.data?.json ?? [];

      if (
        query.trim() &&
        !results.some(
          (r) => r.label?.toLowerCase() === query.toLowerCase(),
        )
      ) {
        return [{ id: "new", label: query, isNew: true }, ...results];
      }

      return results;
    },
  },
});
