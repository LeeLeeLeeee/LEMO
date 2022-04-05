import React from 'react';

import styled from '@emotion/styled';
import tw from 'twin.macro';

const ToggleWrapper = tw.div`
    flex
    p-1
    w-[55px]
    bg-white
    rounded-[50px]
    shadow-sm
    ring-2
    ring-primary
    cursor-pointer
`;

const StatusBall = styled.div(() => [
    tw`rounded-xl w-[20px] h-[20px] transition-transform ease-in-out`,
]);

interface Props {
    isOn: boolean;
    onToggleClick: () => void;
}

function Toggle(props: Props): JSX.Element {
    const { isOn, onToggleClick } = props;

    return (
        <ToggleWrapper onClick={onToggleClick}>
            <StatusBall
                className={
                    !isOn ? 'bg-secondary/25' : 'bg-primary translate-x-[27px]'
                }
            />
        </ToggleWrapper>
    );
}

export default React.memo(Toggle);
