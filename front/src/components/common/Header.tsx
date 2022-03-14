import React from "react";
import tw from "twin.macro";

const Header = tw.div`
    fixed
    w-full
    p-4
    flex
    pl-48
    pr-48
    bg-white
`;

function HeaderComponent() {
    return (
        <Header>
            <div>YHLEE</div>
        </Header>
    )
}

export default React.memo(HeaderComponent);