import FlexContainer from '@/components/ContainerFlex';
import { ReactNode } from 'react';


type IMainProps = {
    meta: ReactNode;
    children: ReactNode;
};

const Main = (props: IMainProps) => (
    <>
        {props.meta}
        <FlexContainer $justify='end'>
            <div>aa</div>
            <div>c</div>
        </FlexContainer>
    </>
);

export { Main };
