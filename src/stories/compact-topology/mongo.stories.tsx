import React from 'react';

import type {Meta, StoryObj} from '@storybook/react';

import {StoryCarousel} from './StoryCarousel';
import StoryRoot from './StoryRoot';
import * as data from './data';
import hugeMongodbData from './dataHugeMongo';
import {prepareMongodbHosts} from './utils';

type Story = StoryObj<typeof StoryRoot>;

export default {
    title: 'MongoDB',
    component: StoryRoot,
} as Meta;

export const MongoDBHost: Story = {
    render: () => <StoryRoot data={prepareMongodbHosts(data.MONGODB_HOST, false)} />,
};
MongoDBHost.storyName = 'MongoDB host';

export const MongoDBHosts: Story = {
    render: () => <StoryRoot data={prepareMongodbHosts(data.MONGODB_HOSTS, false)} />,
};
MongoDBHosts.storyName = 'MongoDB hosts';

export const MongoDBShards: Story = {
    render: () => <StoryRoot data={prepareMongodbHosts(data.MONGODB_SHARDS, true)} />,
};
MongoDBShards.storyName = 'MongoDB shards';

export const MongoDBHugeCluster: Story = {
    render: () => <StoryRoot data={prepareMongodbHosts(hugeMongodbData, true)} />,
};
MongoDBHugeCluster.storyName = 'MongoDB huge cluster';

export const MongoDBCarousel: Story = {
    render: () => (
        <StoryCarousel
            datas={[
                prepareMongodbHosts(data.MONGODB_HOST, false),
                prepareMongodbHosts(data.MONGODB_HOSTS, false),
                prepareMongodbHosts(data.MONGODB_SHARDS, true),
                prepareMongodbHosts(hugeMongodbData, true),
            ]}
        />
    ),
};
MongoDBCarousel.storyName = 'MongoDB carousel';
