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
import {
    FileIcon,
    FolderIcon,
    HelpCircleIcon,
    SaveIcon,
    SettingsIcon,
    TrashIcon,
} from "lucide-react";
import { useTabs } from "../context/TabsContext";

const MenuBar = () => {
    const { addTab, openFileTab } = useTabs();

    return (
        <Menubar className="w-72 border-0">
            <MenubarMenu>
                <MenubarTrigger>File</MenubarTrigger>
                <MenubarContent>
                    <MenubarItem onClick={addTab}>
                        <FileIcon />
                        New File <MenubarShortcut>⌘N</MenubarShortcut>
                    </MenubarItem>
                    <MenubarItem onClick={() => openFileTab()}>
                        <FolderIcon />
                        Open Folder
                    </MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem>
                        <SaveIcon />
                        Save <MenubarShortcut>⌘S</MenubarShortcut>
                    </MenubarItem>
                </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
                <MenubarTrigger>More</MenubarTrigger>
                <MenubarContent>
                    <MenubarGroup>
                        <MenubarItem>
                            <SettingsIcon />
                            Settings
                        </MenubarItem>
                        <MenubarItem>
                            <HelpCircleIcon />
                            Help
                        </MenubarItem>
                        <MenubarSeparator />
                        <MenubarItem variant="destructive">
                            <TrashIcon />
                            Delete
                        </MenubarItem>
                    </MenubarGroup>
                </MenubarContent>
            </MenubarMenu>
        </Menubar>
    );
};

export default MenuBar;
