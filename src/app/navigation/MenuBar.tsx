import {
    Menubar,
    MenubarContent,
    MenubarGroup,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarShortcut,
    MenubarTrigger,
} from "@/components/ui/menubar";

// import { useTabs } from "../context/TabsContext";
import { useAppContext } from "../context/useAppContext";

const MenuBar = () => {
    const { addTab, openFileTab } = useAppContext();

    return (
        <Menubar className="w-72 border-0">
            <MenubarMenu>
                <MenubarTrigger>File</MenubarTrigger>
                <MenubarContent>
                    <MenubarItem onClick={addTab}>
                        New File <MenubarShortcut>⌘N</MenubarShortcut>
                    </MenubarItem>
                    <MenubarItem onClick={() => openFileTab()}>Open File</MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem>
                        Save <MenubarShortcut>⌘S</MenubarShortcut>
                    </MenubarItem>
                </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
                <MenubarTrigger>More</MenubarTrigger>
                <MenubarContent>
                    <MenubarGroup>
                        <MenubarItem>Settings</MenubarItem>
                        <MenubarItem>Help</MenubarItem>
                        <MenubarSeparator />
                        <MenubarItem variant="destructive">Delete</MenubarItem>
                    </MenubarGroup>
                </MenubarContent>
            </MenubarMenu>
        </Menubar>
    );
};

export default MenuBar;
