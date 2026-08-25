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
    <div className="flex flex-col flex-wrap justify-between items-end">
      <div
        ref={editorRef}
        dir="ltr"
        style={{ direction: "ltr", unicodeBidi: "plaintext" }}
        contentEditable
        onInput={handleInput}
      />

      <span>{charCount}</span>
    </div>
  );
};

export default TextArea;
