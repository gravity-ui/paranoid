import React from 'react';

import {Data, TopologyWrapper, getPostgresqlPlanNodeShape} from '../../../lib';

const opts = {initialTop: 50, initialLeft: 50, initialZoomFitsCanvas: true};

export class Story extends React.Component<{data: Data}> {
    render() {
        return (
            <TopologyWrapper
                data={this.props.data}
                opts={opts}
                shapes={{
                    node: getPostgresqlPlanNodeShape,
                }}
                styles={{height: 'calc(100vh - 60px)'}}
            />
        );
    }
}
