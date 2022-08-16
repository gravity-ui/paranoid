import { EnhancedColors, fabric } from "../../models";

export const ID_PADDING = 4;

export function createId(
  id: number | undefined,
  isExpandable: boolean,
  colors: EnhancedColors
) {
  return new fabric.Textbox(`${id ?? ""}`, {
    fontSize: 10,
    lineHeight: 1.2,
    textAlign: "right",
    fontFamily: "YS Text",
    fill: colors.getCommonColor("text-secondary"),
    hoverCursor: isExpandable ? "pointer" : "default",
  });
}
