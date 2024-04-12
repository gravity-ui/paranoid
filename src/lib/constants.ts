export const defaultColors = {
    success: 'rgba(59, 201, 53, 0.75)',
    error: '#ff0400',
    warning: '#ff7700',
    errorBackground: 'rgba(235,50,38,0.08)',
    warningBackground: 'rgba(255,219,77,0.3)',
    mute: 'rgba(0,0,0,0.15)',
    stroke: 'rgba(0,0,0,0.3)',
    fill: 'rgb(38, 34, 38)',
    nodeFill: '#ffffff',
    nodeShadow: 'rgba(0,0,0,0.15)',
    titleColor: '#000000',
    textColor: 'rgba(0,0,0,0.7)',
    buttonBorderColor: 'rgba(0,0,0,0.07)',
    groupBorderColor: 'rgba(2, 123, 243, 0.14)',
    groupFill: 'rgba(2, 123, 243, 0.08)',
    titleHoverColor: '#004080',
    nodeHover: '#f3f3f3',
    specialHover: 'rgba(2,123,243,1)',
};

export const GroupControls = {
    hasControls: false,
    hasRotatingPoint: false,
    lockMovementX: true,
    lockMovementY: true,
    selectable: false,
    hoverCursor: 'default',
    subTargetCheck: true,
};

const ANCHOR_RADIUS = 3;
const ANCHOR_OFFSET = 10;
const NODE_WIDTH = 239;
const NODE_HEIGHT = 58;
const NODE_BORDER_RADIUS = 4;
const NODE_PADDING = 8;
export const NODE_MARGIN = 15;
export const NODE_FONT_FAMILY = 'Arial, sans-serif';

const TITLE_FONT_SIZE = 13;
const TITLE_LINE_HEIGHT = 1.38; // 18px
const TEXT_FONT_SIZE = 12;
const TEXT_LINE_HEIGHT = 1.16; // 14px

export const NodeSizes = {
    width: NODE_WIDTH,
    height: NODE_HEIGHT,
    widthWithAnchor: NODE_WIDTH + ANCHOR_OFFSET,
    borderRadius: NODE_BORDER_RADIUS,
    paddingTop: NODE_PADDING,
    paddingBottom: NODE_PADDING,
    paddingLeft: NODE_PADDING,
    paddingRight: NODE_PADDING,
    titleFontSize: TITLE_FONT_SIZE,
    titleLineHeight: TITLE_LINE_HEIGHT,
    textFontSize: TEXT_FONT_SIZE,
    textLineHeight: TEXT_LINE_HEIGHT,
    titleMaxWidth: 205,
    metaMaxWidth: 205,
    metaMarginTop: 10,
    anchorOffset: ANCHOR_OFFSET,
};

export const AnchorSizes = {
    radius: ANCHOR_RADIUS,
    paddingRight: NODE_PADDING,
};

const GROUP_PADDING = 16;

export const GroupSizes = {
    paddingTop: GROUP_PADDING,
    paddingLeft: GROUP_PADDING,
    paddingRight: GROUP_PADDING,
    paddingBottom: 14,
};

export const CLIPBOARD_WIDTH = 8;

export enum NodeType {
    Group = 'GROUP',
}
