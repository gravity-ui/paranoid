import React from 'react';

import {getCompactTopology} from '../../lib/';
import type {Colors, CompactTopology, Data, GraphNode, LinkType, TextOverflow} from '../../lib/';
import {useKey} from '../utils';

import {onTitleClick, prepareCopyText, renderTitle} from './utils';

export interface ParanoidRootProps {
    linkType?: LinkType;
    renderNodeTitle?: (node: GraphNode) => string;
    colors?: Colors;
    textOverflow?: TextOverflow;
    data: Data;
}

export interface StoryRootProps extends ParanoidRootProps {}

export default function StoryRoot(props: StoryRootProps) {
    const key = useKey();

    return <ParanoidRoot {...props} key={key} />;
}

export class ParanoidRoot extends React.Component<ParanoidRootProps> {
    private paranoid?: CompactTopology;
    componentDidMount() {
        const {data, colors, linkType, textOverflow, renderNodeTitle} = this.props;
        this.paranoid = getCompactTopology('storyRoot', data, {
            colors,
            linkType,
            renderNodeTitle: renderNodeTitle || renderTitle,
            onTitleClick,
            prepareCopyText,
            textOverflow,
        });

        this.paranoid.renderCompactTopology();
    }

    componentDidUpdate(prevProps: ParanoidRootProps) {
        if (JSON.stringify(prevProps.colors) !== JSON.stringify(this.props.colors)) {
            const storyRoot = document.getElementById('storyRoot');

            if (!storyRoot) {
                throw new Error("Can't find element with id #storyRoot");
            }

            storyRoot.innerHTML = '';

            const {data, colors, linkType, textOverflow, renderNodeTitle} = this.props;
            this.paranoid = getCompactTopology('storyRoot', data, {
                colors,
                linkType,
                renderNodeTitle: renderNodeTitle || renderTitle,
                onTitleClick,
                prepareCopyText,
                textOverflow,
            });
            this.paranoid.renderCompactTopology();
        } else if (this.props.data !== prevProps.data && this.paranoid) {
            this.paranoid.updateData(this.props.data);
        }
    }
    render() {
        return <div id="storyRoot" style={{height: 'calc(100vh - 60px)'}} />;
    }
}
