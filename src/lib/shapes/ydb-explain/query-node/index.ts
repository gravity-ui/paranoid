import {GroupControls} from '../../../constants';
import {ParanoidEmmiter} from '../../../event-emmiter';
import {Coordinates, ParanoidOpts, Shape, fabric} from '../../../models';
import {TreeNode} from '../../../tree';

import {NodeSize} from './constants';

export class QueryNodeShape implements Shape {
    // private readonly canvas: fabric.Canvas;
    private readonly coords: Coordinates;
    // private readonly treeNode: TreeNode;
    private readonly opts: ParanoidOpts;
    // private readonly em: ParanoidEmmiter;
    private body: fabric.Object;
    private group: fabric.Group;
    private shadow: fabric.Shadow;
    private hoverShadow: fabric.Shadow;

    constructor(
        _canvas: fabric.Canvas,
        coords: Coordinates,
        _treeNode: TreeNode,
        opts: ParanoidOpts,
        _em: ParanoidEmmiter,
    ) {
        // this.canvas = canvas;
        this.coords = coords;
        // this.treeNode = treeNode;
        this.opts = opts;
        // this.em = em;

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
        return new fabric.Rect({
            width: NodeSize.width,
            height: NodeSize.height,
            fill: this.getFillColor(),
            stroke: colors?.nodeShadow,
            rx: NodeSize.borderRadius,
            ry: NodeSize.borderRadius,
            shadow: this.getShadow(),
            hoverCursor: 'default',
        });
    }

    private createGroup() {
        const {top, left} = this.coords;
        return new fabric.Group([this.body], {
            top,
            left,
            ...GroupControls,
        });
    }
}
