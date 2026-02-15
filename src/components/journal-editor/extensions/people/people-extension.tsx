"use client";

import Mention from "@tiptap/extension-mention";
import type { Editor, Range } from "@tiptap/core";
import { createSuggestionConfig } from "../suggestions/suggestion-config";
import type { SuggestionItem, TrpcResponse, MentionNodeAttributes } from "../../core/types";

export const PeopleMention = Mention.extend({
  name: "mention-person",
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
        tag: 'span[data-type="mention-person"]',
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
        class: "mention-person-custom editor-person",
        "data-type": "mention-person",
        "data-id": (node.attrs as MentionNodeAttributes).id,
        "data-label": (node.attrs as MentionNodeAttributes).label,
      },
      `@${(node.attrs as MentionNodeAttributes).label}`,
    ];
  },
  renderText({ node }) {
    return `@${(node.attrs as MentionNodeAttributes).label}`;
  },
}).configure({
  HTMLAttributes: {
    class: "editor-person",
  },
  suggestion: {
    char: "@",
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
              "/api/trpc/person.create?batch=1",
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  "0": { json: { name: props.label } },
                }),
              },
            );
            const createData =
              (await createResponse.json()) as TrpcResponse<{
                id: string;
                name: string;
              }>[];
            const newPerson = createData[0]?.result?.data?.json;

            if (newPerson) {
              props.id = newPerson.id;
              props.label = newPerson.name;
            }
          } catch (error) {
            console.error("Failed to create person:", error);
          }
        }

        editor
          .chain()
          .focus()
          .deleteRange(range)
          .insertContent({
            type: "mention-person",
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
        `/api/trpc/person.search?batch=1&input=${encodeURIComponent(JSON.stringify({ "0": { json: { query } } }))}`,
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
