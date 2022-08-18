import _ from "lodash";
import {
  ParanoidOpts,
  Coordinates,
  fabric,
  ExplainPlanNodeData,
  Shape,
} from "../../../models";
import { GroupControls } from "../../../constants";
import { TreeNode } from "../../../tree";
import { ParanoidEmmiter } from "../../../event-emmiter";
import { createId, ID_PADDING } from "../common";
import { NodeSize } from "./constants";
import { getTitle } from "./title";
import { getStats } from "../../postgresql-explain/node/stats";
import { initRegroup } from "../utils";

export class ConnectionNodeShape implements Shape {
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
  private expandedNodeHeight = 0;
  private nodeHeight = 0;

  constructor(
    canvas: fabric.Canvas,
    coords: Coordinates,
    treeNode: TreeNode,
    opts: ParanoidOpts,
    em: ParanoidEmmiter
  ) {
    this.canvas = canvas;
    this.coords = coords;
    this.treeNode = treeNode;
    this.opts = opts;
    this.em = em;
    this.data = _.get(treeNode, ["data", "data"]);

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
    return this.opts.colors.getCommonColor("base-misc");
  }

  getHoverFillColor() {
    return this.opts.colors.getCommonColor("base-misc-hover");
  }

  getShadow() {
    return undefined;
  }

  getHoverShadow() {
    return undefined;
  }

  toggleHighlight(highlight: boolean) {
    if (this.isExpandable() && !this.expanded) {
      this.body.set({
        fill: highlight ? this.getHoverFillColor() : this.getFillColor(),
      });
    }
    this.canvas.requestRenderAll();
  }

  private prepareNodeBody() {
    const colors = this.opts.colors;
    const lastObject = this.objects[this.objects.length - 1];

    this.nodeHeight =
      (lastObject.top || 0) + lastObject.getScaledHeight() + NodeSize.padding;

    return new fabric.Rect({
      width: NodeSize.width,
      height: this.nodeHeight,
      fill: this.getFillColor(),
      shadow: this.getShadow(),
      stroke: colors.getCommonColor("line-misc"),
      rx: NodeSize.borderRadius,
      ry: NodeSize.borderRadius,
      hoverCursor: this.isExpandable() ? "pointer" : "default",
    });
  }

  private prepareShapeObjects() {
    const id = createId(this.data.id, this.isExpandable(), this.opts.colors);
    const title = getTitle(
      this.data.name || "",
      this.isExpandable(),
      this.opts.colors
    );

    return [id, title];
  }

  private setShapeObjectsCoords() {
    const [id, title] = this.objects;
    const top = NodeSize.padding;
    // const left = NodeSize.padding;

    const nodeWidth = this.expanded ? NodeSize.expandedWidth : NodeSize.width;
    const titleWidth = title.getScaledWidth();

    id.set({
      left: 0,
      top: ID_PADDING,
      width: nodeWidth - ID_PADDING,
    });
    title.set({ left: nodeWidth / 2 - titleWidth / 2, top });
  }

  private createGroup() {
    const { top, left } = this.coords;
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
    this.group.on("mouseover", () => {
      this.em.dispatch("node:mouseover", this.treeNode);
      this.toggleHighlight(true);
    });

    this.group.on("mouseout", () => {
      this.em.dispatch("node:mouseout", this.treeNode);
      this.toggleHighlight(false);
    });
  }

  private initExpand() {
    this.group.on("mousedown", (event) => {
      if (this.stats && event.subTargets?.includes(this.stats)) {
        return;
      }

      this.expanded = !this.expanded;
      this.updateDimensions();
      this.em.dispatch("node:resize", this.treeNode);
    });
  }

  private updateDimensions() {
    const colors = this.opts.colors;
    const [id, title] = this.objects;
    const titleWidth = title.getScaledWidth();
    let width, height;

    if (this.expanded) {
      this.stats = getStats(
        this.canvas,
        this.data.stats!,
        (this.group.top || 0) + this.body.getScaledHeight() + NodeSize.padding,
        (this.group.left || 0) + NodeSize.padding,
        colors
      );
      this.expandedNodeHeight =
        this.nodeHeight + this.stats.getScaledHeight() + NodeSize.padding * 2;

      width = NodeSize.expandedWidth;
      height = this.expandedNodeHeight;

      this.group.addWithUpdate(this.stats);
    } else {
      width = NodeSize.width;
      height = this.nodeHeight;

      this.group.removeWithUpdate(this.stats as fabric.Group);
      this.stats = undefined;
    }

    const completeRegroup = initRegroup(this.canvas, this.group);
    this.body.set({
      width,
      height,
      fill: this.getFillColor(),
      shadow: this.getShadow(),
    });
    id.set({ width: width - ID_PADDING });
    title.set({
      left: (this.body.left || 0) + (this.body.width || 0) / 2 - titleWidth / 2,
    });
    completeRegroup();
  }

  private isExpandable() {
    return Boolean(this.data.stats && this.data.stats.length > 0);
  }
}
