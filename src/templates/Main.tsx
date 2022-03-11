import FlexContainer from '@/components/ContainerFlex';
import { ReactNode } from 'react';


type IMainProps = {
    meta: ReactNode;
    children: ReactNode;
};

const Main = (props: IMainProps) => (
    <>
        {props.meta}
        <FlexContainer>
            aaaa
        </FlexContainer>
    </>
);

export { Main };
