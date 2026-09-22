import type { Extension } from "@codemirror/state";
import { syntaxHighlighting } from "@codemirror/language";
import { themeAwareHighlightStyle } from "./syntaxTheme";
import { javascript } from "@codemirror/lang-javascript";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { json } from "@codemirror/lang-json";
import { markdown } from "@codemirror/lang-markdown";
import { python } from "@codemirror/lang-python";
import { cpp } from "@codemirror/lang-cpp";
import { java } from "@codemirror/lang-java";
import { rust } from "@codemirror/lang-rust";
import { go } from "@codemirror/lang-go";
import { php } from "@codemirror/lang-php";
import { sql } from "@codemirror/lang-sql";
import { xml } from "@codemirror/lang-xml";
import { yaml } from "@codemirror/lang-yaml";

// Maps a filename to its CodeMirror language extension.
// Returns null when the extension is unknown (plain text).
export function getLanguageExtension(filename: string): Extension | null {
  const ext = filename.split(".").pop()?.toLowerCase() ?? "";
  switch (ext) {
    case "js":
    case "mjs":
    case "cjs":
    case "jsx":
      return javascript({ jsx: true });
    case "ts":
    case "mts":
    case "cts":
      return javascript({ typescript: true });
    case "tsx":
      return javascript({ jsx: true, typescript: true });
    case "json":
      return json();
    case "html":
    case "htm":
      return html();
    case "css":
      return css();
    case "md":
    case "markdown":
      return markdown();
    case "py":
      return python();
    case "c":
    case "h":
    case "cpp":
    case "hpp":
    case "cc":
      return cpp();
    case "java":
      return java();
    case "rs":
      return rust();
    case "go":
      return go();
    case "php":
      return php();
    case "sql":
      return sql();
    case "xml":
    case "svg":
      return xml();
    case "yaml":
    case "yml":
      return yaml();
    default:
      return null;
  }
}

// Builds the full language config for the editor: the detected language
// plus the theme-aware highlight style. Returns [] when highlighting is
// disabled or the file type is unknown.
export function getLanguageConfig(
  filename: string,
  enabled: boolean
): Extension[] {
  if (!enabled) return [];
  const lang = getLanguageExtension(filename);
  if (!lang) return [];
  return [lang, syntaxHighlighting(themeAwareHighlightStyle)];
}
