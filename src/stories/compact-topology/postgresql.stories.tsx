import React from 'react';

import type {Meta, StoryObj} from '@storybook/react';

import {StoryCarousel} from './StoryCarousel';
import StoryRoot from './StoryRoot';
import * as data from './data';
import {prepareHosts} from './utils';

type Story = StoryObj<typeof StoryRoot>;

export default {
    title: 'PostgreSQL',
    component: StoryRoot,
} as Meta;

export const PostgreSQLReplicas: Story = {
    render: () => <StoryRoot data={prepareHosts(data.POSTGRES_REPLICAS)} />,
};
PostgreSQLReplicas.storyName = 'PostgreSQL Replicas';

export const PostgreSQLReplicationMaster: Story = {
    render: () => <StoryRoot data={prepareHosts(data.POSTGRES_MASTER_REPLICATION_SOURCE)} />,
};
PostgreSQLReplicas.storyName = 'PostgreSQL Replication Source from master';

export const PostgreSQLReplicasUnknown: Story = {
    render: () => <StoryRoot data={prepareHosts(data.POSTGRES_REPLICAS_UNKNOWN_STATUS)} />,
};
PostgreSQLReplicas.storyName = 'PostgreSQL Replicas Unknown';

export const PostgreSQLReplicasUnknownWithSources: Story = {
    render: () => (
        <StoryRoot
            data={prepareHosts(data.POSTGRES_REPLICAS_UNKNOWN_STATUS_WITH_REPLICATION_SOURCE)}
        />
    ),
};
PostgreSQLReplicas.storyName = 'PostgreSQL Replicas Unknown with replica sources';

export const PostgreSQLCarousel: Story = {
    render: () => (
        <StoryCarousel
            datas={[
                prepareHosts(data.POSTGRES_REPLICAS),
                prepareHosts(data.POSTGRES_MASTER_REPLICATION_SOURCE),
                prepareHosts(data.POSTGRES_REPLICAS_UNKNOWN_STATUS),
                prepareHosts(data.POSTGRES_REPLICAS_UNKNOWN_STATUS_WITH_REPLICATION_SOURCE),
            ]}
        />
    ),
};
PostgreSQLCarousel.storyName = 'PostgreSQL carousel';
