import {NODE_FONT_FAMILY} from '../../../constants';
import {fabric} from '../../../models';
import type {Colors} from '../../../models';

import {NodeSize} from './constants';

export function getTime(time: number, colors: Colors) {
    let value = time.toFixed(1);
    if (isNaN(time)) {
        value = '0';
    } else if (time < 1) {
        value = '<1';
    }
    return new fabric.Text(`${value}ms`, {
        fontSize: NodeSize.textFontSize,
        lineHeight: NodeSize.textLineHeight,
        left: 0,
        top: 0,
        fontFamily: NODE_FONT_FAMILY,
        fill: colors?.textColor,
    });
}
