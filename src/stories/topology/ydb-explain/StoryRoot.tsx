import React from 'react';

import {TopologyWrapper, getYdbPlanNodeShape} from '../../../lib';
import type {Data} from '../../../lib';
import {useKey} from '../../utils';

const opts = {initialTop: 50, initialLeft: 50, initialZoomFitsCanvas: true};

interface StoryRootProps {
    data: Data;
}

export function StoryRoot(props: StoryRootProps) {
    const key = useKey();

    return <Story {...props} key={key} />;
}

class Story extends React.Component<{data: Data}> {
    render() {
        return (
            <TopologyWrapper
                data={this.props.data}
                opts={opts}
                shapes={{node: getYdbPlanNodeShape}}
                styles={{height: 'calc(100vh - 60px)'}}
            />
        );
    }
}
