import { create } from "zustand";
import { EditorView } from "@codemirror/view";
import { SearchQuery, setSearchQuery, findNext, findPrevious, replaceNext, replaceAll } from "@codemirror/search";

interface SearchState {
    isOpen: boolean;
    searchTerm: string;
    replaceTerm: string;
    caseSensitive: boolean;
    useRegex: boolean;
    view: EditorView | null;
}

export const useSearchStore = create<SearchState>(() => ({
    isOpen: false,
    searchTerm: "",
    replaceTerm: "",
    caseSensitive: false,
    useRegex: false,
    view: null,
}));

// TextArea calls this every time it creates/destroys its CodeMirror instance
export function setSearchView(view: EditorView | null) {
    useSearchStore.setState({ view });
}

export function openSearch() {
    useSearchStore.setState({ isOpen: true });
}
export function closeSearch() {
    useSearchStore.setState({ isOpen: false });
}

// Pushes current search options into CodeMirror — this is what makes matches highlight
function pushQuery() {
    const { view, searchTerm, replaceTerm, caseSensitive, useRegex } = useSearchStore.getState();
    if (!view) return;
    const query = new SearchQuery({ search: searchTerm, replace: replaceTerm, caseSensitive, regexp: useRegex });
    view.dispatch({ effects: setSearchQuery.of(query) });
}

export function setSearchTerm(value: string) {
    useSearchStore.setState({ searchTerm: value });
    pushQuery();
}
export function setReplaceTerm(value: string) {
    useSearchStore.setState({ replaceTerm: value });
    pushQuery();
}
export function toggleCaseSensitive() {
    useSearchStore.setState((s) => ({ caseSensitive: !s.caseSensitive }));
    pushQuery();
}
export function toggleRegex() {
    useSearchStore.setState((s) => ({ useRegex: !s.useRegex }));
    pushQuery();
}

export function goToNext() {
    const { view } = useSearchStore.getState();
    if (view) findNext(view);
}
export function goToPrevious() {
    const { view } = useSearchStore.getState();
    if (view) findPrevious(view);
}
export function replaceOne() {
    const { view } = useSearchStore.getState();
    if (view) replaceNext(view);
}
export function replaceEverything() {
    const { view } = useSearchStore.getState();
    if (view) replaceAll(view);
}