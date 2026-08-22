import { Button } from "@/components/ui/button";
import { getCurrentWindow } from "@tauri-apps/api/window";
import { useEffect, useState } from "react";
import { VscChromeClose, VscChromeMaximize, VscChromeMinimize, VscChromeRestore } from "react-icons/vsc";
import MenuBar from "./MenuBar";


const NaviGation = () => {
    const appwindow = getCurrentWindow();
    const [isMaximized, setIsMaximized] = useState(false);

    useEffect(() => {
        // Check initial maximized state
        const chackMaximized = async () => {
            const maximizied = await appwindow.isMaximized();
            setIsMaximized(maximizied);
        };
        chackMaximized();
        // Listen for window resize events to update maximized state
        const unlisten = appwindow.onResized(async () => {
            const maximized = await appwindow.isMaximized();
            setIsMaximized(maximized);
        });

        return () => {
            unlisten.then((fn) => fn());
        };
    }, [appwindow]);
    return (
        <div className="flex justify-between  p-1 border-b border-border w-full">

            <div>
                <MenuBar />
            </div>
            <div>
                <Button variant={"ghost"} onClick={() => appwindow.minimize()}><VscChromeMinimize /></Button>
                <Button variant={"ghost"} onClick={() => appwindow.maximize()}>{isMaximized ? <VscChromeRestore /> : <VscChromeMaximize />}</Button>
                <Button variant={"ghost"} onClick={() => appwindow.close()}><VscChromeClose /></Button></div>
        </div>
    )
}

export default NaviGation