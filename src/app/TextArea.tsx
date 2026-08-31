import { EditorState } from "@codemirror/state";
import { EditorView, keymap, lineNumbers } from "@codemirror/view";
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
            backgroundColor: "var(--muted)",
          },
          ".cm-content": {
            caretColor: "var(--accent-foreground)",
          },
          ".cm-gutters": {
            backgroundColor: "var(--muted)",
            color: "var(--muted-foreground)",
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
          ".cm-searchMatch": {
            // highlight color for every match found (not the current one)
            backgroundColor: "var(--accent, rgba(255,255,0,0.3))",
          },
          ".cm-searchMatch-selected": {
            // highlight color for the CURRENT match you're on
            backgroundColor: "var(--primary, rgba(255,165,0,0.5))",
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

    return () => { view.destroy(), setSearchView(null) }; // cleanup on unmount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex h-full flex-col justify-between overflow-hidden">
      <FileTab />
      <FindReplace />
      <div
        ref={editorContainerRef}
        className="min-h-0 flex-1 w-full overflow-auto outline-none"
      />
      <span className="shrink-0 p-1 pl-2 bg-accent/35">{content.length}</span>
    </div>
  );
};

export default TextArea;
