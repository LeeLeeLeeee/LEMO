import React from 'react';
import tw, { theme } from 'twin.macro';
import ContainerFlex from '../common/ContainerFlex';

const NavigationWrapper = tw(ContainerFlex)`
    w-52
    h-full
`;

function NavigationBar(): JSX.Element {

    return (
        <NavigationWrapper >
            <div>aaa</div>
        </NavigationWrapper>
    );
}

export default React.memo(NavigationBar);
