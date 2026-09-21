import { useState } from "react";
import {
    Dialog,
    DialogContent,

    DialogHeader,

} from "@/components/ui/dialog"
import { ThemePicker } from "@/components/theme-picker";
import { cn } from "@/lib/utils";
import { Code, Palette } from "lucide-react";
import { EditorSettings } from "./EditorSettings";


interface SettingsProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

const sections = [
    {
        id: "appearance",
        label: "Appearance",
        icon: Palette,
        description: "Color theme and display mode.",
    },
    {
        id: "editor",
        label: "Editor",
        icon: Code,
        description: "Line numbers and active line highlight.",
    },
] as const;

type SectionId = (typeof sections)[number]["id"];

const Settings = ({ open, onOpenChange }: SettingsProps) => {
    const [activeSection, setActiveSection] = useState<SectionId>("appearance");
    // const active = sections.find((s) => s.id === activeSection) ?? sections[0];

    return (
        <div>
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent className="flex h-[520px] gap-0 overflow-hidden p-0 sm:max-w-3xl">
                    {/* Sidebar */}
                    <aside className="flex w-52 shrink-0 flex-col gap-1 border-r bg-muted/40 p-3">
                        <p className="px-2 py-1.5 text-sm font-semibold">Settings</p>
                        {sections.map((section) => (
                            <button
                                key={section.id}
                                onClick={() => setActiveSection(section.id)}
                                className={cn(
                                    "flex items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm transition-colors",
                                    activeSection === section.id
                                        ? "bg-accent text-accent-foreground"
                                        : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                                )}
                            >
                                <section.icon className="h-4 w-4" />
                                {section.label}
                            </button>
                        ))}
                    </aside>

                    {/* Panel */}
                    <div className="flex min-w-0 flex-1 flex-col">
                        <DialogHeader className="px-6 pt-5">
                        </DialogHeader>
                        <div className="flex-1 overflow-y-auto px-6 pb-6">
                            {activeSection === "appearance" && <ThemePicker />}
                            {activeSection === "editor" && <EditorSettings />}
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default Settings