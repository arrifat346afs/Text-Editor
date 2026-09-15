import { EditorState } from "@codemirror/state";
import { EditorView, keymap, lineNumbers, drawSelection } from "@codemirror/view";
import { useEffect, useRef } from "react";
import { defaultKeymap, history, historyKeymap } from "@codemirror/commands";
import { updateActiveContent, useAppContext } from "./store/useAppContext";
import { useShallow } from "zustand/shallow";
import FileTab from "./navigation/FileTabs";
import { search, searchKeymap } from "@codemirror/search";
import { closeSearch, openSearch, setSearchView } from "./store/useSearchStore";
import FindReplace from "./_components/FindReplace";




const TextArea = () => {
  const { activeTabId, tabs } = useAppContext(
    useShallow((state) => ({
      activeTabId: state.activeTabId,
      tabs: state.tabs,
    }))
  );

  const content = activeTabId ? (tabs.find((t) => t.id === activeTabId)?.content ?? "") : "";

  const editorContainerRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);

  const onChangeRef = useRef(updateActiveContent);
  onChangeRef.current = updateActiveContent;



  useEffect(() => {
    if (!editorContainerRef.current) return;
    const state = EditorState.create({
      doc: content,
      extensions: [
        lineNumbers(),
        history(),
        // draws EVERY selection range ourselves — the browser's native
        // selection can only ever show ONE range, which is why "select all
        // matches" appeared to only highlight the first match.
        drawSelection(),
        // is the actual visible UI the user interacts with.
        search({
          createPanel: () => {
            const dom = document.createElement("div");
            dom.style.display = "none";
            return {
              dom,
              mount: () => openSearch(),
              destroy: () => closeSearch(),
            };
          },
        }),
        keymap.of([...defaultKeymap, ...historyKeymap, ...searchKeymap]),
        EditorView.lineWrapping,
        EditorView.updateListener.of((update) => {
          if (update.docChanged) {
            onChangeRef.current(update.state.doc.toString());
          }
        }),
        EditorView.theme({
          "&": {
            height: "100%",
            color: "var(--foreground)",
            backgroundColor: "var(--background)",
          },
          ".cm-content": {
            caretColor: "var(--foreground)",
          },
          ".cm-cursor, .cm-dropCursor": {
            borderLeftColor: "var(--foreground)",
            borderLeftWidth: "2px",
            marginLeft: "-1px",
          },
          ".cm-gutters": {
            backgroundColor: "var(--background)",
            color: "var(--foreground)",
            border: "none",
          },
          ".cm-activeLine": {
            backgroundColor: "var(--accent, transparent)",
          },
          ".cm-activeLineGutter": {
            backgroundColor: "var(--accent, transparent)",
          },
          ".cm-scroller": {
            overflow: "auto",
            fontFamily: "var(--font-mono, monospace)",
          },
          ".cm-panels": {
            backgroundColor: "var(--muted)",
            color: "var(--foreground)",
          },
          ".cm-panel input": {
            backgroundColor: "var(--background)",
            color: "var(--foreground)",
            border: "1px solid var(--border, transparent)",
          },
          ".cm-panel button": {
            backgroundColor: "var(--accent)",
            color: "var(--accent-foreground)",
          },
          ".cm-selectionBackground": {
            // drawn by drawSelection() for every selected range (all find matches)
            backgroundColor: "rgba(255, 193, 7, 0.30)",
          },
          ".cm-focused .cm-selectionBackground": {
            backgroundColor: "rgba(255, 193, 7, 0.45)",
          },
          ".cm-searchMatch": {
            // highlight color for every match found (not the current one) —
            // translucent yellow so it stays visible on dark AND light themes
            backgroundColor: "rgba(255, 213, 0, 0.30)",
          },
          ".cm-searchMatch-selected": {
            // highlight color for the CURRENT match you're on
            backgroundColor: "rgba(255, 160, 0, 0.55)",
          },
        }),
      ],
    });

    const view = new EditorView({
      state,
      parent: editorContainerRef.current,
    });
    viewRef.current = view;
    setSearchView(view);
    view.focus();

    return () => { view.destroy(), setSearchView(null) }; // cleanup on unmount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const focusEditor = () => {
    viewRef.current?.focus();
  };

  return (
    <div className="flex h-full flex-col justify-between overflow-hidden">
      <FileTab />
      <FindReplace />
      <div
        ref={editorContainerRef}
        className="min-h-0 flex-1 w-full overflow-auto outline-none"
        onClick={focusEditor}
      />
      <span className="shrink-0 p-1 pl-2 bg-accent/35">{content.length}</span>
    </div>
  );
};

export default TextArea;
