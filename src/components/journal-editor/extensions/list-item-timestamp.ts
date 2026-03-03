import ListItem from "@tiptap/extension-list-item";
import { format } from "date-fns";

export const ListItemWithTimestamp = ListItem.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      timestamp: {
        default: null,
        parseHTML: (element: HTMLElement) => element.getAttribute("data-timestamp"),
        renderHTML: (attributes) => {
          if (!attributes.timestamp) {
            return {};
          }
          return {
            "data-timestamp": attributes.timestamp,
            "data-timestamp-display": format(new Date(attributes.timestamp), "h:mm a"),
          };
        },
      },
    };
  },

  addKeyboardShortcuts() {
    return {
      ...this.parent?.(),
      Enter: () => {
        const { state } = this.editor;
        const { selection } = state;
        const { $from } = selection;

        // Check if we are in a list item and it's not empty
        if ($from.parent.type.name === "listItem" && $from.parent.content.size > 0) {
          const timestamp = new Date().toISOString();
          
          return this.editor
            .chain()
            .splitListItem("listItem")
            .updateAttributes("listItem", { timestamp })
            .focus()
            .run();
        }

        return false;
      },
    };
  },
});
