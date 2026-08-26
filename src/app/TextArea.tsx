import { EditorState } from "@codemirror/state";
import { EditorView, keymap, lineNumbers } from "@codemirror/view";
import { useEffect, useRef} from "react";
import { defaultKeymap, history, historyKeymap } from "@codemirror/commands";

interface TextAreaProps {
  content: string;
  onChange: (newContent: string) => void;
}





const TextArea = ({ content, onChange }: TextAreaProps) => {

  const editorContainerRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);

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
            onChange(update.state.doc.toString());
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
          ".cm-gutters": {
            backgroundColor: "var(--background)",
            color: "var(--muted-foreground, var(--foreground))",
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
  }, []);

  //   // displayed content to match the new `content` prop
  // useEffect(() => {
  //   const view = viewRef.current;
  //   if (!view) return;

  //   const currentDoc = view.state.doc.toString();
  //   if (currentDoc !== content) {
  //     view.dispatch({
  //       changes: { from: 0, to: currentDoc.length, insert: content },
  //     });
  //   }
  // }, [content]);



  return (
    <div className="flex h-full flex-col justify-between overflow-hidden">
      <div
        ref={editorContainerRef}
        className="min-h-0 flex-1 w-full overflow-auto outline-none"
      />
      <span className="shrink-0 p-1 pl-2 bg-accent/35">{content.length}</span>
    </div>
  );
};

export default TextArea;
