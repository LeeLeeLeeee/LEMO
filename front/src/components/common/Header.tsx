import React from "react";
import tw from "twin.macro";
import EvaIconButton from "./EvaIconButton";

const Header = tw.div`
    fixed
    w-full
    p-4
    flex
    justify-between
    pl-96
    pr-96
    bg-white
    dark:bg-black
`;

function HeaderComponent() {
    return (
        <Header>
            <div>YHLEE</div>
            <div>
                <EvaIconButton iconType='sun' color='#ffffff' />
                {/* <i data-eva='moon' data-eva-height='20' data-eva-width='20' /> */}
            </div>
        </Header>
    )
}

export default React.memo(HeaderComponent);
