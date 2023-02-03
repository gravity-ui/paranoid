import React from 'react';

import _ from 'lodash';
import ResizeObserver from 'resize-observer-polyfill';

import {getTopology} from '../main';
import {Data, Options, Shapes} from '../models';
import {Topology} from '../topology';

const paranoidRoot = 'paranoidRoot';
export interface TopologyProps {
    data: Data;
    shapes: Shapes;
    opts?: Options;
    initListeners?: (paranoid: Topology) => void;
    styles?: React.CSSProperties;
}

export class TopologyWrapper extends React.Component<TopologyProps> {
    private paranoid?: Topology;
    private container: React.RefObject<HTMLDivElement>;
    private resizeObserver: ResizeObserver;

    private handleResize = _.debounce((entries: ResizeObserverEntry[]) => {
        const {contentRect} = entries[0];

        this.paranoid?.getCanvas().setWidth(contentRect.width);
        this.paranoid?.getCanvas().setHeight(contentRect.height);
        this.paranoid?.getCanvas().renderAll();
    }, 300);

    constructor(props: TopologyProps) {
        super(props);

        this.container = React.createRef();
        this.resizeObserver = new ResizeObserver(this.handleResize);
    }

    componentDidMount() {
        // TODO: Fix incorrect calculation of canvas on fullscreen activation
        this.paranoid = getTopology(
            paranoidRoot,
            this.props.data,
            this.props.opts,
            this.props.shapes,
        );
        this.paranoid.render();
        this.resizeObserver.observe(this.container.current as Element);
        if (this.props.initListeners) {
            this.props.initListeners(this.paranoid);
        }
    }

    componentDidUpdate({data, opts}: TopologyProps) {
        if (
            this.paranoid &&
            (!_.isEqual(data, this.props.data) || !_.isEqual(opts, this.props.opts))
        ) {
            this.paranoid?.destroy();
            this.paranoid = getTopology(
                paranoidRoot,
                this.props.data,
                this.props.opts,
                this.props.shapes,
            );
            this.paranoid.render();
            if (this.props.initListeners) {
                this.props.initListeners(this.paranoid);
            }
        }
    }

    componentWillUnmount() {
        if (this.paranoid) {
            this.paranoid.destroy();
            this.paranoid = undefined;
        }

        this.resizeObserver.disconnect();
    }

    render() {
        const {styles} = this.props;

        return (
            <div
                ref={this.container}
                id={paranoidRoot}
                style={styles ? styles : {height: '100%'}}
            />
        );
    }
}
