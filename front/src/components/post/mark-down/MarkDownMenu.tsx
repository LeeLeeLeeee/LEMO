import React from 'react';

import { SaveIcon } from '@/icons';
import IconButton from '@/components/common/button/IconButton';
import ContainerFlex from '@/components/common/ContainerFlex';
import Toggle from '@/components/common/Toggle';
import { usePostingDispatch, usePostingState } from '@/stores/posting/hook';

function MarkDownMenu(): JSX.Element {
    const {
        setting: { preview },
    } = usePostingState();
    const { changePreview } = usePostingDispatch();
    const changePreviewState = () => {
        changePreview(!preview);
    };
    return (
        <ContainerFlex
            $padding={1}
            $justify="between"
            $items="center"
            $isStretch
            className="w-full"
        >
            <IconButton color="light" iconNode={<SaveIcon />} />
            <Toggle isOn={preview} onToggleClick={changePreviewState} />
        </ContainerFlex>
    );
}

export default React.memo(MarkDownMenu);
