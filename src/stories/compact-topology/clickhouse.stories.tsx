import React from 'react';

import type {Meta, StoryObj} from '@storybook/react';

import StoryRoot from './StoryRoot';
import * as data from './data';
import hugeCHData from './dataHugeCH';
import {prepareClickhouseHosts} from './utils';

type Story = StoryObj<typeof StoryRoot>;

export default {
    title: 'ClickHouse',
    component: StoryRoot,
} as Meta;

export const ClickhouseDeadHost: Story = {
    render: () => <StoryRoot data={prepareClickhouseHosts(data.CLICKHOUSE_DEAD_HOST)} />,
};
ClickhouseDeadHost.storyName = 'ClickHouse DEAD host';

export const ClickhouseShards: Story = {
    render: () => <StoryRoot data={prepareClickhouseHosts(data.CLICKHOUSE_SHARDS)} />,
};
ClickhouseShards.storyName = 'ClickHouse Shards';

export const ClickhouseHAConfiguration: Story = {
    render: () => <StoryRoot data={prepareClickhouseHosts(data.CLICKHOUSE_HA_CONFIGURATION)} />,
};
ClickhouseHAConfiguration.storyName = 'ClickHouse HA configuration';

export const ClickhouseShardsZK: Story = {
    render: () => <StoryRoot data={prepareClickhouseHosts(data.CLICKHOUSE_SHARDS_WITH_ZK)} />,
};
ClickhouseShardsZK.storyName = 'ClickHouse Shards and ZooKeeper';

export const ClickhouseHugeData: Story = {
    render: () => <StoryRoot data={prepareClickhouseHosts(hugeCHData)} />,
};
ClickhouseHugeData.storyName = 'ClickHouse Huge cluster';
