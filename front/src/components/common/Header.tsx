import React from 'react';

import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import styled from '@emotion/styled';
import tw from 'twin.macro';

import { useSettingsDispatch } from '@/stores/setting/hook';
import { LightningIcon, MoonIcon, SunIcon } from '@/icons';
import { CombinedState } from '@/stores/interface';

import IconButton from './button/IconButton';

interface HeaderProps {
    visible: boolean;
}

const Header = styled.div((props: HeaderProps) => [
    tw`
        fixed
        w-full
        p-2
        lg:pl-96
        lg:pr-96
        md:pl-10
        md:pr-10
        xs:pl-2
        xs:pr-2
        flex
        justify-between
        items-center
        shadow-sm
        z-10
        bg-white
        dark:bg-black
        ease-out
    `,
    {
        transition: 'top .3s',
        top: props.visible ? '0px' : '-60px',
    },
]);

function HeaderComponent() {
    const { mode, headerVisible } = useSelector((state: CombinedState) => ({
        mode: state.setting.mode,
        headerVisible: state.setting.headerVisible,
    }));

    const router = useRouter();
    const { setThemeMode } = useSettingsDispatch();
    const handleLightClick = () => {
        setThemeMode('dark');
    };
    const handleMoonClick = () => {
        setThemeMode('light');
    };

    return (
        <Header visible={headerVisible}>
            <span
                style={{ cursor: 'pointer' }}
                onClick={() => router.push('/')}
            >
                <LightningIcon />
            </span>
            <div>
                {mode === 'light' ? (
                    <IconButton
                        color="light"
                        onClick={handleLightClick}
                        iconNode={<SunIcon />}
                    />
                ) : (
                    <IconButton
                        color="light"
                        onClick={handleMoonClick}
                        iconNode={<MoonIcon />}
                    />
                )}
            </div>
        </Header>
    );
}

export default React.memo(HeaderComponent);
