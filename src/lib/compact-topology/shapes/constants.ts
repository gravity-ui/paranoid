export function getCommonColors() {
    const colorsMap: Record<string, string> = {
        success: '--g-color-text-positive',
        error: '--g-color-text-danger',
        warning: '--g-color-text-warning',
        mute: '--g-color-base-generic-accent',
        stroke: '--g-color-text-hint',
        fill: '--g-color-base-generic-ultralight',
        nodeFill: '--g-color-base-float',
        nodeShadow: '--g-color-sfx-shadow',
        titleColor: '--g-color-text-primary',
        textColor: '--g-color-text-complementary',
        buttonBorderColor: '--g-color-line-generic',
        groupBorderColor: '--g-color-base-info-light-hover',
        groupFill: '--g-color-base-info-light',
        titleHoverColor: '--g-color-text-link-hover',
    };

    const style = getComputedStyle(document.body);
    const colors = Object.keys(colorsMap).reduce(
        (acc, key) => {
            const color = style.getPropertyValue(colorsMap[key]).replace(/ /g, '');
            if (color) {
                acc[key] = color;
            }
            return acc;
        },
        {} as Record<string, string>,
    );
    return colors;
}

export const defaultColors = {
    success: 'rgba(59, 201, 53, 0.75)',
    error: '#ff0400',
    warning: '#ff7700',
    mute: 'rgba(0,0,0,0.15)',
    stroke: 'rgba(0,0,0,0.3)',
    fill: '#fafafa',
    nodeFill: '#ffffff',
    nodeShadow: 'rgba(0,0,0,0.15)',
    titleColor: '#000000',
    textColor: 'rgba(0,0,0,0.7)',
    buttonBorderColor: 'rgba(0,0,0,0.07)',
    groupBorderColor: 'rgba(2, 123, 243, 0.14)',
    groupFill: 'rgba(2, 123, 243, 0.08)',
    titleHoverColor: '#004080',
};

const ANCHOR_RADIUS = 3;
const ANCHOR_OFFSET = 10;
const NODE_WIDTH = 239;
const NODE_HEIGHT = 58;
const NODE_BORDER_RADIUS = 4;
const NODE_PADDING = 8;
export const NODE_MARGIN_BOTTOM = 15;

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
    metricsMarginTop: 10,
    metricsPadding: 5,
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
