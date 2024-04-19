import React from 'react';

import type {Meta, StoryObj} from '@storybook/react';

import {StoryRoot} from './ydb-explain/StoryRoot';
import {parseExplain} from './ydb-explain/utils';

import explain1 from './ydb-explain/explain-1.json';
import explain2 from './ydb-explain/explain-2.json';
import explain3 from './ydb-explain/explain-3.json';
import explain4 from './ydb-explain/explain-4.json';
import explain5 from './ydb-explain/explain-5.json';
import explainCTE from './ydb-explain/explain-cte.json';

type Story = StoryObj<typeof StoryRoot>;

export default {
    title: 'YDB explain',
    component: StoryRoot,
} as Meta;

export const Explain1: Story = {
    render: () => <StoryRoot data={parseExplain(explain1)} />,
};
export const Explain2: Story = {
    render: () => <StoryRoot data={parseExplain(explain2)} />,
};
export const Explain3: Story = {
    render: () => <StoryRoot data={parseExplain(explain3)} />,
};
export const Explain4: Story = {
    render: () => <StoryRoot data={parseExplain(explain4)} />,
};
export const Explain5: Story = {
    render: () => <StoryRoot data={parseExplain(explain5)} />,
};
export const ExplainCTE: Story = {
    render: () => <StoryRoot data={parseExplain(explainCTE)} />,
};
