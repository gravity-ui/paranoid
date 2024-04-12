import type {ParanoidEmmiter} from '../../event-emmiter';
import type {Coordinates, ParanoidOpts} from '../../models';
import type {TreeNode} from '../../tree';

import {TopolgyNodeShape} from './node';

export function getPostgresqlPlanNodeShape(
    canvas: fabric.Canvas,
    coords: Coordinates,
    node: TreeNode,
    opts: ParanoidOpts,
    em: ParanoidEmmiter,
) {
    return new TopolgyNodeShape(canvas, coords, node, opts, em);
}
