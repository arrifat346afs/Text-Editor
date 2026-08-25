import React, { useEffect, useState } from "react";

const TextArea = () => {
  const [charCount, setCharCount] = useState(0);
  const [content, setContent] = useState("");
  const editorRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.textContent = content;
    }
  }, []);

  const handleInput = (event: React.SyntheticEvent<HTMLDivElement>) => {
    const text = event.currentTarget.textContent ?? "";
    setCharCount(text.length);
    setContent(text);
  };

  useEffect(() => {
    console.log(content);
  }, [content]);
  return (
    <div className="flex h-full flex-col justify-between overflow-hidden">
      <div
        ref={editorRef}
        dir="ltr"
        style={{ direction: "ltr", unicodeBidi: "plaintext" }}
        contentEditable
        onInput={handleInput}
        className="min-h-0 flex-1 w-full overflow-auto outline-none"
      />

      <span className="shrink-0">{charCount}</span>
    </div>
  );
};

export default TextArea;
