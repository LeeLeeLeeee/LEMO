import React from 'react';

import tw from 'twin.macro';

import { useSettingsDispatch, useSettingsState } from '@/stores/setting/hook';
import { MoonIcon, SunIcon } from '@/icons';

import IconButton from './button/IconButton';

const Header = tw.div`
    fixed
    w-full
    p-4
    flex
    justify-between
    pl-96
    pr-96
    bg-white
    dark:bg-black
`;

function HeaderComponent() {
    const { mode } = useSettingsState();
    const { setThemeMode } = useSettingsDispatch();
    const handleLightClick = () => {
        setThemeMode('dark');
    };
    const handleMoonClick = () => {
        setThemeMode('light');
    };

    return (
        <Header>
            <div>YHLEE</div>
            <div>
                {mode === 'light' ? (
                    <IconButton
                        onClick={handleLightClick}
                        iconNode={<SunIcon />}
                    />
                ) : (
                    <IconButton
                        onClick={handleMoonClick}
                        iconNode={<MoonIcon />}
                    />
                )}
            </div>
        </Header>
    );
}

export default React.memo(HeaderComponent);
