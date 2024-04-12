import React from 'react';

import type {Meta, StoryObj} from '@storybook/react';

import StoryRoot from './StoryRoot';
import * as data from './data';
import {prepareDataprocHosts} from './utils';

type Story = StoryObj<typeof StoryRoot>;

export default {
    title: 'DataProc',
    component: StoryRoot,
} as Meta;

export const Dataproc: Story = {
    render: () => <StoryRoot data={prepareDataprocHosts(data.DATAPROC)} linkType="line" />,
};
