import React from 'react';
import tw, { theme } from 'twin.macro';
import ContainerFlex from '../common/ContainerFlex';

const NavigationWrapper = tw(ContainerFlex)`
    bg-gray-500
    w-52
    h-full
`;

function NavigationBar(): JSX.Element {

    return (
        <NavigationWrapper $paddingDirecion={{b: true}}>
            <div>aaa</div>
        </NavigationWrapper>
    );
}

export default React.memo(NavigationBar);
