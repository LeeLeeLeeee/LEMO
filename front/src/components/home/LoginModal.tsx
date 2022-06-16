import React, { useEffect } from 'react';

import tw from 'twin.macro';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import styled from '@emotion/styled';
import { useSelector } from 'react-redux';

import useAuthDispatch from '@/stores/auth/hook';
import { CombinedState } from '@/stores/interface';

import HookFormInput from '../common/forms/HookFormInput';
import Button from '../common/button/Button';
import ContainerFlex from '../common/ContainerFlex';
import { rootContext } from '../rootContext';

const ModalContent = styled.div`
    ${tw`flex flex-col self-stretch mt-2 mb-5 h-full`}
    & > a {
        ${tw`text-primary`}
        &:hover {
            border: 0px;
        }
    }
`;

const writeSchema = yup.object().shape({
    email: yup
        .string()
        .required('email을 입력해주세요.')
        .email('email 형식으로 입력해주세요'),
    password: yup.string().required('password를 입력해주세요'),
});

function LoginModal(): JSX.Element {
    const { control, handleSubmit } = useForm({
        resolver: yupResolver(writeSchema),
    });
    const { setModalClose, setModalOpen } = rootContext.useModal();
    const { message } = rootContext.useAlert();
    const { signInAsync, resetStatus } = useAuthDispatch();
    const { isSuccess, isError } = useSelector((state: CombinedState) => ({
        isSuccess: state.auth.user,
        isError: !!state.auth.status.signInError,
    }));

    const onSubmit = (values: any) => {
        const { email, password } = values;
        signInAsync(email, password);
    };

    const handleSignUpClick = (e: any) => {
        e.preventDefault();
        setModalClose('login-modal');
        setModalOpen('email-verification-modal');
    };

    useEffect(() => {
        if (isSuccess) {
            message.success('로그인에 성공하였습니다.');
            setModalClose('login-modal');
            resetStatus();
        }

        if (isError) {
            message.error(
                '로그인에 실패하였습니다. 로그인 정보를 확인해주세요.'
            );
            resetStatus();
        }
    }, [isSuccess, isError]);

    return (
        <ModalContent>
            <ContainerFlex $isStretch $direction="column" $justify="between">
                <HookFormInput
                    control={control}
                    name="email"
                    label="이메일"
                    type="text"
                    style={{ width: '100%' }}
                />
                <HookFormInput
                    control={control}
                    name="password"
                    label="패스워드"
                    type="password"
                    style={{ width: '100%' }}
                />
                <Button
                    style={{ width: '100%' }}
                    buttonType="info"
                    type="button"
                    onClick={handleSubmit(onSubmit)}
                >
                    로그인
                </Button>
            </ContainerFlex>
            <a href="#" onClick={handleSignUpClick}>
                계정 생성하기
            </a>
        </ModalContent>
    );
}

export default React.memo(LoginModal);
