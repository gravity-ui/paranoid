import React from 'react';

import type {Meta, StoryObj} from '@storybook/react';

import {StoryCarousel} from './StoryCarousel';
import StoryRoot from './StoryRoot';
import * as data from './data';
import {prepareHosts} from './utils';

type Story = StoryObj<typeof StoryRoot>;

export default {
    title: 'MySQL',
    component: StoryRoot,
} as Meta;

export const MySQLReplicas: Story = {
    render: () => <StoryRoot data={prepareHosts(data.MYSQL_HOSTS)} />,
};
MySQLReplicas.storyName = 'Mysql Replicas';

export const MySQLReplicasUnknown: Story = {
    render: () => <StoryRoot data={prepareHosts(data.MYSQL_HOSTS_UNKNOWN)} />,
};
MySQLReplicasUnknown.storyName = 'Mysql Replicas Unknown';

export const MysqlCarousel: Story = {
    render: () => (
        <StoryCarousel
            datas={[prepareHosts(data.MYSQL_HOSTS), prepareHosts(data.MYSQL_HOSTS_UNKNOWN)]}
        />
    ),
};
MysqlCarousel.storyName = 'Mysql carousel';
