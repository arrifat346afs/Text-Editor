import React, { useEffect } from "react";

const TextArea = () => {
  const [content, setContent] = React.useState("")
  const editorRef = React.useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.textContent = content
    }
  }, [])

  const handleInput = (event: React.SyntheticEvent<HTMLDivElement>) => {
    const text = event.currentTarget.textContent ?? "";
    setContent(text)
  }

  useEffect(() => {
    console.log(content)
  }, [content])
  return (
    <div
      ref={editorRef}
      dir="ltr"
      style={{ direction: "ltr", unicodeBidi: "plaintext" }}
      contentEditable
      onInput={handleInput}
    />
  )
}

export default TextArea
