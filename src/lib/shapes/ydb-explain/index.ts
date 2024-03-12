import get from 'lodash/get';

import {ParanoidEmmiter} from '../../event-emmiter';
import {Coordinates, ParanoidOpts} from '../../models';
import {TreeNode} from '../../tree';

import {ConnectionNodeShape} from './connection-node';
import {MaterializeNodeShape} from './materialize-node';
import {QueryNodeShape} from './query-node';
import {ResultNodeShape} from './result-node';
import {StageNodeShape} from './stage-node';

function isConnectionNode(node: TreeNode) {
    const data = get(node, ['data', 'data']);

    return data?.type === 'connection';
}

function isResultNode(node: TreeNode) {
    const data = get(node, ['data', 'data']);

    return data?.type === 'result';
}

function isQueryNode(node: TreeNode) {
    const data = get(node, ['data', 'data']);

    return data?.type === 'query';
}

function isMaterializeNode(node: TreeNode) {
    const data = get(node, ['data', 'data']);

    return data?.type === 'materialize';
}

export function getYdbPlanNodeShape(
    canvas: fabric.Canvas,
    coords: Coordinates,
    node: TreeNode,
    opts: ParanoidOpts,
    em: ParanoidEmmiter,
) {
    if (isConnectionNode(node)) {
        return new ConnectionNodeShape(canvas, coords, node, opts, em);
    } else if (isResultNode(node)) {
        return new ResultNodeShape(canvas, coords, node, opts, em);
    } else if (isQueryNode(node)) {
        return new QueryNodeShape(canvas, coords, node, opts, em);
    } else if (isMaterializeNode(node)) {
        return new MaterializeNodeShape(canvas, coords, node, opts, em);
    } else {
        return new StageNodeShape(canvas, coords, node, opts, em);
    }
}
