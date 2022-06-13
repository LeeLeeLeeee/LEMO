import { useEffect } from 'react';

import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import useAuthDispatch from '@/stores/auth/hook';
import { CombinedState } from '@/stores/interface';
import { rootContext } from '@/components/rootContext';
import ContainerFlex from '@/components/common/ContainerFlex';
import MainLayout from '@/layout/Layout';
import HookFormInput from '@/components/common/forms/HookFormInput';
import Button from '@/components/common/button/Button';
import { HTTP_STATUS } from '@/const/variable';

const RegisterWrapper = styled(ContainerFlex)`
    height: 500px;
    width: 400px;
    background-color: white;
`;

const writeSchema = yup.object().shape({
    username: yup
        .string()
        .required('유저 명을 입력해주세요.')
        .matches(/^[aA-zZ0-9_]+$/, '영어와 숫자와 "_" 입력하실 수 있습니다.')
        .min(8, '8자 이상 입력해주세요'),
    description: yup.string().max(50, '50자 이하로 입력해주세요'),
    password: yup
        .string()
        .required('비밀번호를 입력해주세요.')
        .min(8, '8자 이상 입력해주세요'),
    passwordConfirm: yup
        .string()
        .oneOf([yup.ref('password'), null], '패스워드가 일치하지 않습니다'),
});

function VerificationPage() {
    const router = useRouter();
    const { control, handleSubmit, setValue } = useForm({
        resolver: yupResolver(writeSchema),
    });

    const { registerAsync } = useAuthDispatch();
    const { message } = rootContext.useAlert();
    const {
        email: verifiedEmail,
        status: {
            emailConfirmed: isConfirmed,
            emailConfirmedError: isError,
            registered,
            registeredError,
        },
    } = useSelector((state: CombinedState) => ({
        status: state.auth.status,
        email: state.auth.email,
    }));
    const { emailConfirmAsync } = useAuthDispatch();
    const { token } = router.query;

    useEffect(() => {
        if (token) emailConfirmAsync(token as string);
    }, [token]);

    useEffect(() => {
        if (isConfirmed) {
            message.success('이메일 인증에 성공했습니다.');
            return;
        }
        if (isError) {
            message.error('인증에 실패하였습니다, 이메일을 다시 인증해주세요.');
            router.push('/');
        }
    }, [isConfirmed, isError]);

    useEffect(() => {
        if (registeredError.code === HTTP_STATUS.BAD_REQUEST) {
            message.error('이메일이 중복되었습니다.');
        } else if (registeredError.code === HTTP_STATUS.SERVER_ERROR) {
            message.error('회원 가입에 실패하였습니다');
        }
    }, [registeredError.code]);

    useEffect(() => {
        if (registered) {
            message.success('성공적으로 회원가입되었습니다.');
            router.push('/');
        }
    }, [registered]);

    useEffect(() => {
        setValue('email', verifiedEmail);
    }, [verifiedEmail]);

    const handleSubmitClick = handleSubmit((data) => {
        const { email, password, username, description } = data;
        registerAsync(username, email, password, description);
    });
    if (!token) {
        return <></>;
    }

    return (
        <MainLayout>
            <RegisterWrapper $padding={5} $direction="column">
                <h2 className="mb-2 w-full text-[25px] font-bold border-b-2">
                    회원 가입
                </h2>
                <HookFormInput
                    style={{ width: '100%' }}
                    control={control}
                    name="username"
                    label="유저 닉네임"
                    type="text"
                />
                <HookFormInput
                    style={{ width: '100%' }}
                    control={control}
                    readonly
                    name="email"
                    defaultValue={verifiedEmail}
                    label="이메일"
                    type="text"
                />
                <HookFormInput
                    style={{ width: '100%' }}
                    control={control}
                    name="description"
                    label="한줄 소개"
                    type="text"
                />
                <HookFormInput
                    style={{ width: '100%' }}
                    control={control}
                    name="password"
                    label="비밀번호"
                    type="password"
                />
                <HookFormInput
                    style={{ width: '100%' }}
                    control={control}
                    type="password"
                    name="passwordConfirm"
                    label="비밀번호 확인"
                />
                <Button
                    onClick={handleSubmitClick}
                    style={{ width: '100%', marginTop: 'auto' }}
                >
                    회원 등록
                </Button>
            </RegisterWrapper>
        </MainLayout>
    );
}

export default VerificationPage;
