import React from 'react';

import { SaveIcon } from '@/icons';
import IconButton from '@/components/common/button/IconButton';
import ContainerFlex from '@/components/common/ContainerFlex';
import Toggle from '@/components/common/Toggle';

function MarkDownMenu(): JSX.Element {
    return (
        <ContainerFlex
            $padding={1}
            $justify="between"
            $items="center"
            $isStretch
            className="w-full"
        >
            <IconButton color="light" iconNode={<SaveIcon />} />
            <Toggle />
        </ContainerFlex>
    );
}

export default React.memo(MarkDownMenu);
