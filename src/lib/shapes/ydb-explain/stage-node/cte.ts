import {GroupControls, NODE_FONT_FAMILY} from '../../../constants';
import {fabric} from '../../../models';
import type {EnhancedColors} from '../../../models';

import {NodeSize} from './constants';

export function getCTE(cte: string, colors: EnhancedColors) {
    if (!cte) {
        return new fabric.Group([], {
            top: 0,
            left: 0,
            ...GroupControls,
        });
    }

    const key = new fabric.Text('CTE:', {
        fontSize: NodeSize.textFontSize,
        lineHeight: NodeSize.textLineHeight,
        fontFamily: NODE_FONT_FAMILY,
        fill: colors.getCommonColor('text-secondary'),
        hoverCursor: 'pointer',
    });
    const keyWidth = key.getScaledWidth();
    const valueLeft = keyWidth + 2;
    const valueWidth = NodeSize.width - NodeSize.padding * 2 - valueLeft;

    const value = new fabric.Textbox(cte, {
        left: valueLeft,
        width: valueWidth,
        fontSize: NodeSize.textFontSize,
        lineHeight: NodeSize.textLineHeight,
        fontFamily: NODE_FONT_FAMILY,
        fill: colors.getCommonColor('text-primary'),
        splitByGrapheme: true,
        hoverCursor: 'pointer',
    });

    return new fabric.Group([key, value], {
        top: 0,
        left: 0,
        ...GroupControls,
    });
}
