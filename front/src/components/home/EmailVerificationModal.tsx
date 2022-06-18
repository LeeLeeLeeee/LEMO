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
`;

const writeSchema = yup.object().shape({
    email: yup
        .string()
        .required('email을 입력해주세요.')
        .email('email 형식으로 입력해주세요'),
});

function EmailVerificationModal(): JSX.Element {
    const { control, handleSubmit } = useForm({
        resolver: yupResolver(writeSchema),
    });
    const { setModalClose } = rootContext.useModal();
    const { message } = rootContext.useAlert();
    const { sendEmailAsync, resetStatus } = useAuthDispatch();
    const { isSuccess, isError } = useSelector((state: CombinedState) => ({
        isSuccess: state.auth.status.emailSended,
        isError: !!state.auth.status.emailSendedError,
    }));

    const onSubmit = (values: any) => {
        const { email } = values;
        sendEmailAsync(email);
    };

    useEffect(() => {
        if (isSuccess) {
            message.success('이메일이 전송되었습니다.');
            setModalClose('email-verification-modal');
            resetStatus();
        }

        if (isError) {
            message.error('이메일 전송에 실패하였습니다.');
            setModalClose('email-verification-modal');
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
                <Button
                    style={{ width: '100%' }}
                    buttonType="info"
                    type="button"
                    onClick={handleSubmit(onSubmit)}
                >
                    링크 전송
                </Button>
            </ContainerFlex>
        </ModalContent>
    );
}

export default React.memo(EmailVerificationModal);
