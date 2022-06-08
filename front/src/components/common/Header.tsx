import React from 'react';

import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import styled from '@emotion/styled';
import tw from 'twin.macro';

import { useSettingsDispatch } from '@/stores/setting/hook';
import { LightningIcon, LogInIcon, MoonIcon, SunIcon } from '@/icons';
import { CombinedState } from '@/stores/interface';

import IconButton from './button/IconButton';
import Modal from './modal/Modal';
import EmailVerificationModal from '../home/EmailVerificationModal';
import { rootContext } from '../rootContext';
import CircleImage from './CircleImage';

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
        '& > .right-menu': {
            display: 'flex',
            gap: '10px',
        },
    },
]);

function HeaderComponent() {
    const { mode, headerVisible, user } = useSelector(
        (state: CombinedState) => ({
            mode: state.setting.mode,
            headerVisible: state.setting.headerVisible,
            user: state.auth.user,
        })
    );
    const { setModalOpen, setModalClose } = rootContext.useModal();

    const router = useRouter();
    const { setThemeMode } = useSettingsDispatch();
    const handleLightClick = () => {
        setThemeMode('dark');
    };

    const handleMoonClick = () => {
        setThemeMode('light');
    };

    const handleLogInOpen = () => {
        setModalOpen('email-verification');
    };

    const handleLogInClose = () => {
        setModalClose('email-verification');
    };

    return (
        <Header visible={headerVisible}>
            <span
                style={{ cursor: 'pointer' }}
                onClick={() => router.push('/')}
            >
                <LightningIcon />
            </span>
            <div className="right-menu">
                {user ? (
                    <CircleImage
                        width={40}
                        height={40}
                        imagePath={user.profileImage}
                    />
                ) : (
                    <IconButton
                        onClick={handleLogInOpen}
                        color="light"
                        iconNode={<LogInIcon />}
                    />
                )}
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
            <Modal
                dialogID="email-verification"
                size="small"
                title="이메일 인증"
                handleClose={handleLogInClose}
            >
                <EmailVerificationModal />
            </Modal>
        </Header>
    );
}

export default React.memo(HeaderComponent);
