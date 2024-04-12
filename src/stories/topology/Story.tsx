import React from 'react';

import {getTopology} from '../../lib';
import type {Data, Topology} from '../../lib';

import {shapes} from './shapes';

export class Story extends React.Component<{data: Data}> {
    private topology?: Topology;
    componentDidMount() {
        this.topology = getTopology('storyRoot', this.props.data, undefined, shapes);

        this.topology.render();
    }
    render() {
        return <div id="storyRoot" />;
    }
}
