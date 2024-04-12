import React from 'react';

import {Button} from '@gravity-ui/uikit';

import type {Data} from '../../lib';
import {CompactTopologyWrapper} from '../../lib/components/CompactTopology';
import {useKey} from '../utils';

const opts = {initialTop: 50, initialLeft: 50, initialZoomFitsCanvas: true};
export interface StoryCarouselProps {
    datas: Data[];
}

export function StoryCarousel({datas}: StoryCarouselProps) {
    const [dataIndex, setDataIndex] = React.useState(0);

    const key = useKey();

    const handleClick = () => {
        setDataIndex((prev) => {
            let newIndex = prev + 1;
            if (newIndex > datas.length - 1) {
                newIndex = 0;
            }
            return newIndex;
        });
    };

    return (
        <React.Fragment>
            <Button onClick={handleClick} view="action">
                Switch plan
            </Button>
            <CompactTopologyWrapper
                key={key}
                data={datas[dataIndex]}
                opts={opts}
                styles={{height: 'calc(100vh - 60px)'}}
            />
        </React.Fragment>
    );
}
