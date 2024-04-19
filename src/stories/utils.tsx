import React from 'react';

import {useTheme} from '@gravity-ui/uikit';

export function useKey() {
    const [key, setKey] = React.useState('light');
    const theme = useTheme();

    React.useEffect(() => {
        if (theme !== key) {
            setKey(theme);
        }
    }, [theme, key]);

    return key;
}
