import React from 'react';

import type {Meta, StoryObj} from '@storybook/react';

import {Carousel} from './postgre-explain/Carousel';
import {StoryRoot} from './postgre-explain/StoryRoot';
import {explain as fullExplain} from './postgre-explain/format-json-analyze-buffers-timing-verbose';
import {recursivePlan} from './postgre-explain/recursive-plan';
import {smallPlan} from './postgre-explain/small-plan';
import {smallPlanAnalyze} from './postgre-explain/small-plan-analyze';
import {parseExplain} from './postgre-explain/utils';

type Story = StoryObj<typeof StoryRoot>;

export default {
    title: 'PostgreSQL explain',
    component: StoryRoot,
} as Meta;

export const AnalyzeBuffers: Story = {
    render: () => <StoryRoot data={parseExplain(fullExplain)} />,
};
AnalyzeBuffers.storyName = 'Analyze, buffers, timing, verbose';

export const RecursivePlan: Story = {
    render: () => <StoryRoot data={parseExplain(recursivePlan)} />,
};
RecursivePlan.storyName = 'Recursive plan analyze';

export const SmallPlanAnalyze: Story = {
    render: () => <StoryRoot data={parseExplain(smallPlanAnalyze)} />,
};
SmallPlanAnalyze.storyName = 'Small plan analyze';

export const SmallPlan: Story = {
    render: () => <StoryRoot data={parseExplain(smallPlan)} />,
};
SmallPlan.storyName = 'Small plan';

export const PlansCarousel: Story = {
    render: () => <Carousel />,
};
PlansCarousel.storyName = 'Plans carousel';
