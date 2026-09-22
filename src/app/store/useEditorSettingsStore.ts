import { create } from "zustand";

interface EditorSettingsState {
    showLineNumbers: boolean;
    highlightActiveLine: boolean;
    syntaxHighlighting: boolean;
}

export const useEditorSettingsStore = create<EditorSettingsState>(() => ({
    showLineNumbers: true,
    highlightActiveLine: true,
    syntaxHighlighting: true,
}));

export function toggleLineNumbers() {
    useEditorSettingsStore.setState((s) => ({
        showLineNumbers: !s.showLineNumbers,
    }));
}

export function toggleHighlightActiveLine() {
    useEditorSettingsStore.setState((s) => ({
        highlightActiveLine: !s.highlightActiveLine,
    }));
}

export function setShowLineNumbers(value: boolean) {
    useEditorSettingsStore.setState({ showLineNumbers: value });
}

export function setHighlightActiveLine(value: boolean) {
    useEditorSettingsStore.setState({ highlightActiveLine: value });
}

export function toggleSyntaxHighlighting() {
    useEditorSettingsStore.setState((s) => ({
        syntaxHighlighting: !s.syntaxHighlighting,
    }));
}

export function setSyntaxHighlighting(value: boolean) {
    useEditorSettingsStore.setState({ syntaxHighlighting: value });
}
