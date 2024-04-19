import React from 'react';

import type {Meta, StoryObj} from '@storybook/react';

import StoryRoot from './StoryRoot';
import * as data from './data';
import {getPropsForExplainStories, prepareExplainData} from './utils';

type Story = StoryObj<typeof StoryRoot>;

export default {
    title: 'Query explain',
    component: StoryRoot,
} as Meta;

export const Example1: Story = {
    render: () => (
        <StoryRoot data={prepareExplainData(data.EXPLAIN_1)} {...getPropsForExplainStories()} />
    ),
};
export const Example2: Story = {
    render: () => (
        <StoryRoot data={prepareExplainData(data.EXPLAIN_2)} {...getPropsForExplainStories()} />
    ),
};
