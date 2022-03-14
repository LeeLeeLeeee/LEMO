import React from "react";
import tw from "twin.macro";

const Header = tw.div`
    fixed
    w-full
    p-4
    flex
    pl-48
    pr-48
    bg-gray-500
`;

function HeaderComponent() {
    return (
        <Header>
            aaaa
        </Header>
    )
}

export default React.memo(HeaderComponent);