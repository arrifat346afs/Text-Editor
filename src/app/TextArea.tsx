import { EditorState } from "@codemirror/state";
import { EditorView, keymap, lineNumbers } from "@codemirror/view";
import { useEffect, useRef } from "react";
import { defaultKeymap, history, historyKeymap } from "@codemirror/commands";
import { updateActiveContent, useAppContext } from "./context/useAppContext";
import { useShallow } from "zustand/shallow";
import FileTab from "./navigation/FileTabs";




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
        keymap.of([...defaultKeymap, ...historyKeymap]),
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
        }),
      ],
    });

    const view = new EditorView({
      state,
      parent: editorContainerRef.current,
    });
    viewRef.current = view;

    return () => view.destroy(); // cleanup on unmount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex h-full flex-col justify-between overflow-hidden">
      <FileTab />
      <div
        ref={editorContainerRef}
        className="min-h-0 flex-1 w-full overflow-auto outline-none"
      />
      <span className="shrink-0 p-1 pl-2 bg-accent/35">{content.length}</span>
    </div>
  );
};

export default TextArea;
