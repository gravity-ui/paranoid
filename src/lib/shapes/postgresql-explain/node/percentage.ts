import {NODE_FONT_FAMILY} from '../../../constants';
import {fabric} from '../../../models';
import type {Colors} from '../../../models';

import {NodeSize} from './constants';

export function getPercentage(timePercentage: string, colors: Colors) {
    const value = isNaN(Number(timePercentage)) ? '0' : timePercentage;
    return new fabric.Text(`${value}%`, {
        fontSize: NodeSize.textFontSize,
        lineHeight: NodeSize.textLineHeight,
        left: 0,
        top: 0,
        fontFamily: NODE_FONT_FAMILY,
        fill: colors?.titleColor,
    });
}
