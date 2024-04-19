import get from 'lodash/get';

import {GroupControls} from '../../../constants';
import type {ParanoidEmmiter} from '../../../event-emmiter';
import type {Coordinates, ExplainPlanNodeData, ParanoidOpts, Shape} from '../../../models';
import {fabric} from '../../../models';
import type {TreeNode} from '../../../tree';

import {NodeSize} from './constants';
import {getTitle} from './title';

export class ResultNodeShape implements Shape {
    // private readonly canvas: fabric.Canvas;
    private readonly coords: Coordinates;
    // private readonly treeNode: TreeNode;
    private readonly opts: ParanoidOpts;
    // private readonly em: ParanoidEmmiter;
    private data: ExplainPlanNodeData;
    private objects: fabric.Object[];
    private body: fabric.Object;
    private group: fabric.Group;
    private shadow: fabric.Shadow;
    private hoverShadow: fabric.Shadow;
    private nodeHeight = 0;

    constructor(
        _canvas: fabric.Canvas,
        coords: Coordinates,
        treeNode: TreeNode,
        opts: ParanoidOpts,
        _em: ParanoidEmmiter,
    ) {
        // this.canvas = canvas;
        this.coords = coords;
        // this.treeNode = treeNode;
        this.opts = opts;
        // this.em = em;
        this.data = get(treeNode, ['data', 'data']);

        this.shadow = new fabric.Shadow({
            color: opts.colors.nodeShadow,
            offsetY: 1,
            blur: 5,
        });
        this.hoverShadow = new fabric.Shadow({
            color: opts.colors.nodeShadow,
            offsetY: 3,
            blur: 8,
        });

        this.objects = this.prepareShapeObjects();
        this.setShapeObjectsCoords();
        this.body = this.prepareNodeBody();
        this.group = this.createGroup();
    }

    getShape() {
        return this.group;
    }

    getFillColor() {
        return this.opts.colors.nodeFill;
    }

    getHoverFillColor() {
        return this.opts.colors.nodeHover;
    }

    getShadow() {
        return this.shadow;
    }

    getHoverShadow() {
        return this.hoverShadow;
    }

    toggleHighlight() {}

    private prepareNodeBody() {
        const colors = this.opts.colors;
        const lastObject = this.objects[this.objects.length - 1];

        this.nodeHeight = (lastObject.top || 0) + lastObject.getScaledHeight() + NodeSize.padding;

        return new fabric.Rect({
            width: NodeSize.width,
            height: this.nodeHeight,
            fill: this.getFillColor(),
            stroke: colors?.nodeShadow,
            shadow: this.getShadow(),
            hoverCursor: 'default',
        });
    }

    private prepareShapeObjects() {
        const title = getTitle([this.data.name || ''], this.opts.colors);

        return [title];
    }

    private setShapeObjectsCoords() {
        const [title] = this.objects;
        const top = NodeSize.padding;
        const titleWidth = title.getScaledWidth();

        title.set({left: NodeSize.width / 2 - titleWidth / 2, top});
    }

    private createGroup() {
        const {top, left} = this.coords;
        return new fabric.Group([this.body, ...this.objects], {
            top,
            left,
            ...GroupControls,
        });
    }
}
