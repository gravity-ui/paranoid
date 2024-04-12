import {CompactTopology} from './compact-topology';
import {defaultColors} from './constants';
import type {Data, Options, ParanoidOpts, Shapes, TopologyNodeData} from './models';
import {Topology} from './topology';

export function getCommonColors() {
    const colorsMap: Record<string, string> = {
        success: '--g-color-text-positive',
        error: '--g-color-text-danger',
        warning: '--g-color-text-warning',
        errorBackground: '--g-color-base-danger-light',
        warningBackground: '--g-color-base-warning-light',
        mute: '--g-color-line-generic',
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
        nodeHover: '--g-color-base-float-hover',
        specialHover: '--g-color-line-brand',
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

    const getCommonColor = (name: string) => {
        return style.getPropertyValue(`--g-color-${name}`).replace(/ /g, '');
    };

    return {...defaultColors, ...colors, getCommonColor};
}

const defaultOpts: Options = {
    linkType: 'arrow',
};

function prepareOptions(opts = defaultOpts) {
    const colors = opts.colors || {};
    return {
        initialTop: 10,
        initialLeft: 10,
        ...opts,
        colors: {...defaultColors, ...getCommonColors(), ...colors},
    } as ParanoidOpts;
}

export function getCompactTopology(domNodeId: string, data: Data, opts?: Options) {
    const options = prepareOptions(opts);
    return new CompactTopology(domNodeId, options, data);
}

export function getTopology<T = TopologyNodeData>(
    domNodeId: string,
    data: Data<T>,
    opts?: Options,
    shapes?: Shapes,
) {
    const options = prepareOptions(opts);
    return new Topology(domNodeId, options, data, shapes);
}
