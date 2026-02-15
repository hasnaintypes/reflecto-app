"use client";

import { ReactRenderer } from "@tiptap/react";
import tippy, { type Instance, type GetReferenceClientRect } from "tippy.js";
import {
  SuggestionList,
  type SuggestionListProps,
  type SuggestionListRef,
} from "./suggestion-list";

export interface SuggestionConfigProps extends SuggestionListProps {
  clientRect?: (() => DOMRect | null) | null;
  event?: KeyboardEvent;
}

export const createSuggestionConfig = () => ({
  render: () => {
    let component: ReactRenderer<SuggestionListRef, SuggestionListProps>;
    let popup: Instance[];

    return {
      onStart: (props: SuggestionConfigProps) => {
        component = new ReactRenderer(SuggestionList, {
          props,
          editor: props.editor,
        });

        if (!props.clientRect) {
          return;
        }

        popup = tippy("body", {
          getReferenceClientRect: props.clientRect as GetReferenceClientRect,
          appendTo: () => document.body,
          content: component.element,
          showOnCreate: true,
          interactive: true,
          trigger: "manual",
          placement: "bottom-start",
        });
      },

      onUpdate(props: SuggestionConfigProps) {
        component?.updateProps(props);

        if (!props.clientRect) {
          return;
        }

        popup?.[0]?.setProps({
          getReferenceClientRect: props.clientRect as GetReferenceClientRect,
        });
      },

      onKeyDown(props: { event: KeyboardEvent }) {
        if (props.event.key === "Escape") {
          popup?.[0]?.hide();
          return true;
        }

        // Auto-complete on Space key
        if (props.event.key === " ") {
          const component_ref = component?.ref;
          if (component_ref?.selectItem) {
            component_ref.selectItem(0); // Select first item
            return true;
          }
        }

        const component_ref = component?.ref;
        return component_ref?.onKeyDown(props) ?? false;
      },

      onExit() {
        if (popup?.[0]) {
          popup[0].destroy();
        }
        if (component) {
          component.destroy();
        }
      },
    };
  },
});
