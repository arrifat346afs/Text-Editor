import { useShallow } from "zustand/shallow";
import { closeSearchPanel } from "@codemirror/search";
import {
    goToNext,
    goToPrevious,
    replaceEverything,
    replaceOne,
    setReplaceTerm,
    setSearchTerm,
    toggleCaseSensitive,
    toggleRegex,
    useSearchStore,
} from "../store/useSearchStore";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

const FindReplace = () => {
    const { isOpen, searchTerm, replaceTerm, caseSensitive, useRegex, view } =
        useSearchStore(
            useShallow((s) => ({
                isOpen: s.isOpen,
                searchTerm: s.searchTerm,
                replaceTerm: s.replaceTerm,
                caseSensitive: s.caseSensitive,
                useRegex: s.useRegex,
                view: s.view,
            })),
        );

    if (!isOpen) return null;

    const handleClose = () => {
        if (view) closeSearchPanel(view);
    };

    return (
        <div className="flex flex-wrap items-center gap-2 p-2 bg-muted border-b border-border text-sm">
            <div className="flex">
                <Input
                    autoFocus
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Find"
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            e.preventDefault();
                            e.shiftKey ? goToPrevious() : goToNext();
                        }
                    }}
                />
                <Button variant={"ghost"} onClick={goToPrevious} className=" hover:">
                    ↑
                </Button>
                <Button variant={"ghost"} onClick={goToNext} className="">
                    ↓
                </Button>

                <Input
                    value={replaceTerm}
                    onChange={(e) => setReplaceTerm(e.target.value)}
                    placeholder="Replace"
                />
            </div>
            <div className="flex gap-2">
                <Button
                    variant={"outline"}
                    onClick={replaceOne}
                    className="px-2 py-1 rounded hover:bg-accent"
                >
                    Replace
                </Button>
                <Button
                    variant={"outline"}
                    onClick={replaceEverything}
                    className="px-2 py-1 rounded hover:bg-accent"
                >
                    Replace All
                </Button></div>

            <div className="flex gap-2">
                <label className="flex items-center gap-1 text-xs">
                    <Checkbox
                        checked={caseSensitive}
                        onCheckedChange={toggleCaseSensitive}
                    />
                    Match case
                </label>
                <label className="flex items-center gap-1 text-xs">
                    <Checkbox checked={useRegex} onCheckedChange={toggleRegex} />
                    Regex
                </label>
            </div>
            <Button
                variant={"ghost"}
                onClick={handleClose}
                className="ml-auto px-2 text-muted-foreground hover:text-foreground"
            >
                ×
            </Button>
        </div>
    );
};

export default FindReplace;
