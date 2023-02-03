import React from 'react';

import {storiesOf} from '@storybook/react';

import {Carousel} from './postgre-explain/Carousel';
import {Story} from './postgre-explain/Story';
import {explain as fullExplain} from './postgre-explain/format-json-analyze-buffers-timing-verbose';
import {QueryType} from './postgre-explain/query';
import {recursivePlan} from './postgre-explain/recursive-plan';
import {smallPlan} from './postgre-explain/small-plan';
import {smallPlanAnalyze} from './postgre-explain/small-plan-analyze';
import {parseExplain} from './postgre-explain/utils';

const explainStories = storiesOf('PostgreSQL explain', module).addParameters({
    options: {
        showPanel: true,
    },
});

function getReadme(queryType: QueryType) {
    return {
        readme: {
            sidebar: '\n```sql\n' + queryType + '\n```',
        },
    };
}

explainStories.add(
    'Analyze, buffers, timing, verbose',
    () => {
        return <Story data={parseExplain(fullExplain)} />;
    },
    getReadme(QueryType.Full),
);

explainStories.add('Recursive plan analyze', () => {
    return <Story data={parseExplain(recursivePlan)} />;
});

explainStories.add('Small plan analyze', () => {
    return <Story data={parseExplain(smallPlanAnalyze)} />;
});

explainStories.add('Small plan', () => {
    return <Story data={parseExplain(smallPlan)} />;
});

explainStories.add('Plans carousel', () => {
    return <Carousel />;
});
