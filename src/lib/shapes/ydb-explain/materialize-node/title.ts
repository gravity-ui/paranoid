import { EnhancedColors, fabric } from "../../../models";
import { NODE_FONT_FAMILY } from "../../../constants";
import { NodeSize } from "./constants";

export function getTitle(lines: string[], colors: EnhancedColors) {
  return new fabric.Text(lines.join("\n"), {
    fontSize: NodeSize.titleFontSize,
    lineHeight: NodeSize.titleLineHeight,
    left: 0,
    top: 26,
    fontFamily: NODE_FONT_FAMILY,
    fontStyle: "italic",
    fill: colors.getCommonColor("text-primary"),
  });
}
