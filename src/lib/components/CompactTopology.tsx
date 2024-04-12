import React from 'react';

import isEqual from 'lodash/isEqual';

import type {CompactTopology} from '../compact-topology';
import {getCompactTopology} from '../main';
import type {Data, Options} from '../models';

const paranoidRoot = 'paranoidRoot';
export interface CompactTopologyProps {
    data: Data;
    opts?: Options;
    styles?: React.CSSProperties;
}

export class CompactTopologyWrapper extends React.Component<CompactTopologyProps> {
    private paranoid?: CompactTopology;

    componentDidMount() {
        this.paranoid = getCompactTopology(paranoidRoot, this.props.data, this.props.opts);
        this.paranoid.renderCompactTopology();
    }

    componentDidUpdate({data, opts}: CompactTopologyProps) {
        if (this.paranoid && (!isEqual(data, this.props.data) || !isEqual(opts, this.props.opts))) {
            this.paranoid?.destroy();
            this.paranoid = getCompactTopology(paranoidRoot, this.props.data, this.props.opts);
            this.paranoid.renderCompactTopology();
        }
    }

    componentWillUnmount() {
        if (this.paranoid) {
            this.paranoid.destroy();
        }
    }

    render() {
        const {styles} = this.props;
        return <div id={paranoidRoot} style={styles ? styles : {height: '100%'}} />;
    }
}
