import { EditorState } from "@codemirror/state";
import { lineNumbers } from "@codemirror/view";
import { useEffect, useRef, useState } from "react";

const TextArea = () => {
  const editorContainerRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);
  const [charCount, setCharCount] = useState(0);

  useEffect(()=>{
    if(!editorContainerRef.current) return;
    const state = EditorState.create({
      doc: "",
      extensions: [
        lineNumbers(),
        history(),
      ]
    })
  })


  return (
    <div className="flex h-full flex-col justify-between overflow-hidden">
      <div
        ref={editorContainerRef}
        dir="ltr"
        style={{ direction: "ltr", unicodeBidi: "plaintext" }}
        contentEditable
        onInput={handleInput}
        className="min-h-0 flex-1 w-full overflow-auto outline-none"
      />

      <span className="shrink-0 p-1 pl-2 bg-accent/35">{charCount}</span>
    </div>
  );
};

export default TextArea;
