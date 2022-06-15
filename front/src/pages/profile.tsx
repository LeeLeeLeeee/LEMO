import { useEffect } from 'react';

import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import ContainerFlex from '@/components/common/ContainerFlex';
import MainLayout from '@/layout/Layout';
import Button from '@/components/common/button/Button';
import ProfileImageEditor from '@/components/profile/ProfileImageEditor';
import HookFormInput from '@/components/common/forms/HookFormInput';
import { CombinedState } from '@/stores/interface';

// height: 500px;
//     width: 400px;
const Profilewrapper = styled(ContainerFlex)`
    gap: 10px;
    background-color: white;
    width: 400px;
    font-weight: bold;
    & > hr {
        border: 1px solid #efefef;
        width: 100%;
    }

    & > label {
        width: 100%;
    }
`;

function Profile() {
    const { control } = useForm();
    const user = useSelector((state: CombinedState) => state.auth.user);
    const router = useRouter();

    useEffect(() => {
        if (user === undefined) {
            router.push('/');
        }
    }, [user]);

    if (user === undefined) {
        return <></>;
    }

    return (
        <MainLayout>
            <Profilewrapper
                $padding={5}
                $direction="column"
                $items="center"
                $isShadow
                $isRadius
            >
                <ProfileImageEditor />
                <hr />
                <HookFormInput
                    control={control}
                    label="이름"
                    name="username"
                    defaultValue={'이영현'}
                />
                <HookFormInput
                    control={control}
                    label="설명란"
                    name="description"
                    defaultValue={'무슨무슨 개발자'}
                />
                <hr />
                <HookFormInput
                    control={control}
                    label="github 주소"
                    defaultValue="https://github.com/LeeLeeLeeee"
                />
                <hr />
                <Button
                    style={{ width: '100%' }}
                    buttonType="success"
                    variant="contained"
                >
                    회원 정보 수정
                </Button>
                <Button
                    style={{ width: '100%' }}
                    buttonType="error"
                    variant="outlined"
                >
                    회원 탈퇴
                </Button>
            </Profilewrapper>
        </MainLayout>
    );
}

export default Profile;
