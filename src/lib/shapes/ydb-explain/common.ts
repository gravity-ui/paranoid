import { EnhancedColors, fabric } from "../../models";
import { NODE_FONT_FAMILY } from "../../constants";

export const ID_PADDING = 4;

export function createId(
  id: number | undefined,
  isExpandable: boolean,
  colors: EnhancedColors
) {
  return new fabric.Textbox(id ? `#${id}` : "", {
    fontSize: 12,
    lineHeight: 14,
    textAlign: "right",
    fontFamily: NODE_FONT_FAMILY,
    fill: colors.getCommonColor("text-secondary"),
    hoverCursor: isExpandable ? "pointer" : "default",
  });
}
