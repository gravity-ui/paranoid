import React from 'react';

import type {Meta, StoryObj} from '@storybook/react';

import StoryRoot from './StoryRoot';
import * as data from './data';
import {prepareRedisHosts} from './utils';

type Story = StoryObj<typeof StoryRoot>;

export default {
    title: 'Redis',
    component: StoryRoot,
} as Meta;

export const RedisHost: Story = {
    render: () => <StoryRoot data={prepareRedisHosts(data.REDIS_HOST, false)} />,
};
RedisHost.storyName = 'Redis host';

export const RedisHosts: Story = {
    render: () => <StoryRoot data={prepareRedisHosts(data.REDIS_HOSTS, false)} />,
};
RedisHosts.storyName = 'Redis hosts';

export const RedisShards: Story = {
    render: () => <StoryRoot data={prepareRedisHosts(data.REDIS_SHARDS, true)} />,
};
RedisShards.storyName = 'Redis shards';
