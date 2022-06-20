import React, { useState } from 'react';

import tw from 'twin.macro';
import styled from '@emotion/styled';

import { ArrowDownIcon } from '@/icons';

import ContainerFlex from './ContainerFlex';

interface MenuItemProps {
    menuKey: string;
    icon?: React.ReactNode;
    children?: React.ReactNode;
}

const ItemWrapper = tw.div`
    hover:bg-gray-200 transition-colors duration-75 cursor-pointer p-1 w-full font-sans-kr font-bold
`;

function MenuItem(props: MenuItemProps) {
    const { icon, menuKey, children = '' } = props;
    return (
        <ItemWrapper data-key={menuKey}>
            {icon && icon}
            {children}
        </ItemWrapper>
    );
}

interface SubMenuProps {
    title: string;
    collapse?: boolean;
    children?:
        | React.ReactElement<MenuItemProps>
        | Array<React.ReactElement<MenuItemProps>>;
}

const SubMenuWrapper = styled.div(() => [
    tw`w-full
    overflow-hidden
    pl-3
    border-l-2
    `,
    {
        maxHeight: '0',
        '&.open': {
            maxHeight: '100%',
        },
    },
]);

const SubMenuTitle = styled.div`
    ${tw`
        p-1
        w-full
        font-sans-kr
        font-bold
        text-blue-500
        border-l-2
        flex
        justify-between
        items-center
        cursor-pointer
    `}
    & > svg {
        ${tw`
            transition-transform
            duration-75
            ease-in-out
            scale-75
            rotate-0
        `}
    }
    &.open > svg {
        transform: rotate(180deg) scale(0.75);
    }
`;

function SubMenu(props: SubMenuProps) {
    const { children, title = '', collapse = false } = props;
    const [isOpen, setIsOpen] = useState(false);
    const handleCollapseClick = () => {
        if (!collapse) return;
        setIsOpen((_open) => !_open);
    };
    return (
        <>
            <SubMenuTitle
                className={isOpen ? 'open' : 'close'}
                onClick={handleCollapseClick}
            >
                {title} {collapse && <ArrowDownIcon />}
            </SubMenuTitle>
            <SubMenuWrapper className={isOpen ? 'open' : 'close'}>
                {children}
            </SubMenuWrapper>
        </>
    );
}

interface MenuProps {
    children: React.ReactNode | React.ReactNode[];
    selectedMode?: boolean;
    defaultKey?: string;
    menuItemHandler?: { [key in string]: () => void };
    width?: number;
}

function Menu(props: MenuProps): JSX.Element {
    const { children, width = 30, menuItemHandler = {} } = props;

    const handleClick = (e: React.MouseEvent) => {
        const menuKey = (e.target as HTMLDivElement).getAttribute('data-key');
        if (menuKey === null) return;
        const handler = menuItemHandler[menuKey];
        if (handler === undefined) return;
        handler();
    };
    return (
        <ContainerFlex
            style={{ minWidth: `${width}px` }}
            onClickCapture={handleClick}
            $direction="column"
            $padding={2}
            $paddingDirecion={{ t: true, b: true }}
        >
            {children}
        </ContainerFlex>
    );
}

Menu.MenuItem = MenuItem;
Menu.SubMenu = SubMenu;

export default Menu;
