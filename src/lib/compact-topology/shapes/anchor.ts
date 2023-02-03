import {fabric} from 'fabric';

import {Colors} from '../../models';

import {AnchorSizes} from './constants';

export default function renderAnchor(top: number, left: number, colors: Colors) {
    return new fabric.Circle({
        top,
        left,
        radius: AnchorSizes.radius,
        fill: colors.nodeFill,
        stroke: colors.stroke,
    });
}
