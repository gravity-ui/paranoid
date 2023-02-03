import _ from 'lodash';

import {GroupControls} from '../../../constants';
import {ParanoidEmmiter} from '../../../event-emmiter';
import {Coordinates, ExplainPlanNodeData, ParanoidOpts, Shape, fabric} from '../../../models';
import {TreeNode} from '../../../tree';
import {getStats} from '../../postgresql-explain/node/stats';
import {ID_PADDING, createId} from '../common';

import {NodeSize} from './constants';
import {getCTE} from './cte';
import {getTables} from './tables';
import {getTitle} from './title';

export class StageNodeShape implements Shape {
    private readonly canvas: fabric.Canvas;
    private readonly coords: Coordinates;
    private readonly treeNode: TreeNode;
    private readonly opts: ParanoidOpts;
    private readonly em: ParanoidEmmiter;
    private data: ExplainPlanNodeData;
    private objects: fabric.Object[];
    private body: fabric.Object;
    private group: fabric.Group;
    private stats?: fabric.Group;
    private expanded = false;
    private shadow: fabric.Shadow;
    private hoverShadow: fabric.Shadow;
    private expandedNodeHeight = 0;
    private nodeHeight = 0;

    constructor(
        canvas: fabric.Canvas,
        coords: Coordinates,
        treeNode: TreeNode,
        opts: ParanoidOpts,
        em: ParanoidEmmiter,
    ) {
        this.canvas = canvas;
        this.coords = coords;
        this.treeNode = treeNode;
        this.opts = opts;
        this.em = em;
        this.data = _.get(treeNode, ['data', 'data']);

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
        this.initListeners();
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

    toggleHighlight(highlight: boolean) {
        if (this.isExpandable() && !this.expanded) {
            this.body.set({
                fill: highlight ? this.getHoverFillColor() : this.getFillColor(),
                shadow: highlight ? this.getHoverShadow() : this.getShadow(),
            });
        }
        this.canvas.requestRenderAll();
    }

    private prepareNodeBody() {
        const colors = this.opts.colors;
        const lastObject = this.objects[this.objects.length - 1];

        this.nodeHeight = (lastObject.top || 0) + lastObject.getScaledHeight() + NodeSize.padding;

        return new fabric.Rect({
            width: NodeSize.width,
            height: this.nodeHeight,
            fill: this.getFillColor(),
            stroke: colors?.nodeShadow,
            rx: NodeSize.borderRadius,
            ry: NodeSize.borderRadius,
            shadow: this.getShadow(),
            hoverCursor: this.isExpandable() ? 'pointer' : 'default',
        });
    }

    private prepareShapeObjects() {
        const id = createId(this.data.id, this.isExpandable(), this.opts.colors);
        const title = getTitle(
            this.data.operators || [this.data.name || ''],
            this.isExpandable(),
            this.opts.colors,
        );
        const tables = getTables(this.data.tables || [], this.opts.colors);
        const cte = getCTE(this.data.cte || '', this.opts.colors);

        return [id, title, tables, cte];
    }

    private setShapeObjectsCoords() {
        const [id, title, tables, cte] = this.objects;
        let top = NodeSize.padding;
        const left = NodeSize.padding;

        id.set({
            left: 0,
            top: ID_PADDING,
            width: (this.expanded ? NodeSize.expandedWidth : NodeSize.width) - ID_PADDING,
        });
        title.set({left, top});
        top = top + title.getScaledHeight();
        tables.set({
            left,
            top: top + ((tables as fabric.Group).size() === 0 ? 0 : NodeSize.textOffset),
        });
        top = top + tables.getScaledHeight();
        cte.set({
            left,
            top: top + ((cte as fabric.Group).size() === 0 ? 0 : NodeSize.textOffset),
        });
    }

    private createGroup() {
        const {top, left} = this.coords;
        return new fabric.Group([this.body, ...this.objects], {
            top,
            left,
            ...GroupControls,
        });
    }

    private initListeners() {
        this.initHover();

        if (this.isExpandable()) {
            this.initExpand();
        }
    }

    private initHover() {
        this.group.on('mouseover', () => {
            this.em.dispatch('node:mouseover', this.treeNode);
            this.toggleHighlight(true);
        });

        this.group.on('mouseout', () => {
            this.em.dispatch('node:mouseout', this.treeNode);
            this.toggleHighlight(false);
        });
    }

    private initExpand() {
        this.group.on('mousedown', (event) => {
            if (this.stats && event.subTargets?.includes(this.stats)) {
                return;
            }

            this.updateDimensions();
            this.expanded = !this.expanded;
            this.em.dispatch('node:resize', this.treeNode);
        });
    }

    private updateDimensions() {
        const colors = this.opts.colors;

        if (this.expanded) {
            const width = NodeSize.width;
            const height = this.nodeHeight;

            this.body
                .set({
                    width,
                    height,
                    fill: this.getFillColor(),
                    shadow: this.getShadow(),
                })
                .setCoords();
            this.objects[0].set({width: width - ID_PADDING}).setCoords();
            this.group.removeWithUpdate(this.stats as fabric.Group);
            this.stats = undefined;
        } else {
            this.stats = getStats(
                this.canvas,
                this.data.stats!,
                (this.group.top || 0) + this.body.getScaledHeight() + NodeSize.padding,
                (this.group.left || 0) + NodeSize.padding,
                colors,
            );
            this.expandedNodeHeight =
                this.nodeHeight + this.stats.getScaledHeight() + NodeSize.padding * 2;

            const width = NodeSize.expandedWidth;
            const height = this.expandedNodeHeight;
            this.body
                .set({
                    width,
                    height,
                    fill: this.getFillColor(),
                    shadow: this.getShadow(),
                })
                .setCoords();

            this.objects[0].set({width: width - ID_PADDING}).setCoords();
            this.group.addWithUpdate(this.stats);
        }
    }

    private isExpandable() {
        return Boolean(this.data.stats && this.data.stats.length > 0);
    }
}
