import styled from '@emotion/styled';

import ContainerFlex from '@/components/common/ContainerFlex';
import MainLayout from '@/layout/Layout';

const Container404 = styled(ContainerFlex)`
    margin-top: auto;
    margin-bottom: auto;
`;

export default function Custom404() {
    return (
        <MainLayout>
            <Container404 $isStretch $justify="center" $items="center">
                <p>Error 404 | 페이지를 찾을 수 없습니다</p>
            </Container404>
        </MainLayout>
    );
}
