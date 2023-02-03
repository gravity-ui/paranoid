import {NODE_FONT_FAMILY} from '../../../constants';
import {EnhancedColors, fabric} from '../../../models';

import {NodeSize} from './constants';

export function getTitle(lines: string[], isExpandable: boolean, colors: EnhancedColors) {
    return new fabric.Text(lines.join('\n'), {
        fontSize: NodeSize.textFontSize,
        lineHeight: NodeSize.textLineHeight,
        fontFamily: NODE_FONT_FAMILY,
        fill: colors.getCommonColor('text-primary'),
        hoverCursor: isExpandable ? 'pointer' : 'default',
    });
}
