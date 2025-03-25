import React from 'react';

import debounce from 'lodash/debounce';
import isEqual from 'lodash/isEqual';
import ResizeObserver from 'resize-observer-polyfill';

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
    private container: React.RefObject<HTMLDivElement>;
    private resizeObserver: ResizeObserver;

    private handleResize = debounce((entries: ResizeObserverEntry[]) => {
        const {contentRect} = entries[0];

        this.paranoid?.getCanvas().setWidth(contentRect.width);
        this.paranoid?.getCanvas().setHeight(contentRect.height);
        this.paranoid?.getCanvas().renderAll();
    }, 300);

    constructor(props: CompactTopologyProps) {
        super(props);

        this.container = React.createRef();
        this.resizeObserver = new ResizeObserver(this.handleResize);
    }

    componentDidMount() {
        this.paranoid = getCompactTopology(paranoidRoot, this.props.data, this.props.opts);
        this.paranoid.renderCompactTopology();
        this.resizeObserver.observe(this.container.current as Element);
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

        this.resizeObserver.disconnect();
    }

    render() {
        const {styles} = this.props;
        return (
            <div
                id={paranoidRoot}
                style={styles ? styles : {height: '100%'}}
                ref={this.container}
            />
        );
    }
}
