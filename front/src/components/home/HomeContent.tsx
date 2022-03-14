import React from 'react';
import FlexContainer from '../common/ContainerFlex';

function HomeContent(): JSX.Element {

    return (
        <FlexContainer $direction='column' $isStretch >
            <div>aaa</div>
        </FlexContainer>
    );
}

export default React.memo(HomeContent);
