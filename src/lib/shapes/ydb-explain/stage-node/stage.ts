import {NODE_FONT_FAMILY} from '../../../constants';
import {fabric} from '../../../models';
import type {EnhancedColors} from '../../../models';

import {NodeSize} from './constants';

export function getStage(name: string, colors: EnhancedColors) {
    return new fabric.Text(name, {
        fontSize: NodeSize.textFontSize,
        lineHeight: NodeSize.textLineHeight,
        left: 0,
        top: 0,
        fontFamily: NODE_FONT_FAMILY,
        fill: colors.getCommonColor('text-secondary'),
        hoverCursor: 'pointer',
    });
}
