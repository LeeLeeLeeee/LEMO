import { useSettingsDispatch, useSettingsState } from "@/stores/setting/hook";
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
    const { mode } = useSettingsState();
    const { setThemeMode } = useSettingsDispatch();
    const handleLightClick = () => {
        setThemeMode('dark');
    }
    const handleMoonClick = () => {
        setThemeMode('light');
    }
    console.log(mode);
    return (
        <Header>
            <div>YHLEE</div>
            <div>
                {mode === 'light' ? <EvaIconButton onClick={handleLightClick} iconType='sun' color='#ffffff' /> : <EvaIconButton onClick={handleMoonClick} iconType='moon' color='#ffffff' />}
            </div>
        </Header>
    )
}

export default React.memo(HeaderComponent);
