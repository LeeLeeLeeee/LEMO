import React from 'react';

import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import styled from '@emotion/styled';
import tw from 'twin.macro';

import { useSettingsDispatch } from '@/stores/setting/hook';
import { LightningIcon, LogInIcon, MoonIcon, SunIcon } from '@/icons';
import { CombinedState } from '@/stores/interface';
import useAuthDispatch from '@/stores/auth/hook';

import IconButton from './button/IconButton';
import Modal from './modal/Modal';
import EmailVerificationModal from '../home/EmailVerificationModal';
import { rootContext } from '../rootContext';
import CircleImage from './CircleImage';
import LoginModal from '../home/LoginModal';
import Tooltip from './Tooltip';
import Popover from './Popover';
import Menu from './Menu';

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
        z-50
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

function ProfileMenu() {
    const { signOutAsync } = useAuthDispatch();
    const router = useRouter();
    const { message } = rootContext.useAlert();
    const menuItemHandler = {
        editProfile() {
            router.push('/profile');
        },
        logout() {
            signOutAsync();
            message.info('성공적으로 로그아웃 되었습니다.');
        },
    };

    return (
        <Menu width={120} menuItemHandler={menuItemHandler}>
            <Menu.MenuItem menuKey="editProfile">프로필 수정</Menu.MenuItem>
            <Menu.MenuItem menuKey="logout">로그아웃</Menu.MenuItem>
        </Menu>
    );
}

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
        setModalOpen('login-modal');
    };

    const handleLogInClose = () => {
        setModalClose('login-modal');
    };

    const handleSignUpClose = () => {
        setModalClose('email-verification-modal');
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
                    <Popover
                        trigger="hover"
                        placement="bottom"
                        overlay={<ProfileMenu />}
                        gap={10}
                    >
                        <CircleImage
                            width={40}
                            height={40}
                            imagePath={user.profileImage}
                        />
                    </Popover>
                ) : (
                    <Tooltip title="로그인" placement="bottom">
                        <IconButton
                            onClick={handleLogInOpen}
                            color="light"
                            iconNode={<LogInIcon />}
                        />
                    </Tooltip>
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
                dialogID="email-verification-modal"
                size="small"
                title="이메일 인증"
                handleClose={handleSignUpClose}
            >
                <EmailVerificationModal />
            </Modal>
            <Modal
                dialogID="login-modal"
                size="small"
                title="로그인"
                handleClose={handleLogInClose}
            >
                <LoginModal />
            </Modal>
        </Header>
    );
}

export default React.memo(HeaderComponent);
