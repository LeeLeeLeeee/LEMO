import styled from '@emotion/styled';
import React from 'react';
import tw from 'twin.macro';
import FlexContainer from '../common/ContainerFlex';

console.log(FlexContainer);
const NavigationWrapper = styled(FlexContainer)`
    background-color: black;
`;
console.log(NavigationWrapper);

function NavigationBar(): JSX.Element {

    return (
        <NavigationWrapper $direction='column' >
            <div>aaa</div>
        </NavigationWrapper>
    );
}

export default React.memo(NavigationBar);
