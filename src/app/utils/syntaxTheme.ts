import { HighlightStyle } from "@codemirror/language";
import { tags } from "@lezer/highlight";

// Theme-aware syntax colors. Token colors reference the --syntax-* CSS
// variables (defined with light/dark defaults on :root/.dark in App.css,
// optionally overridden per [data-theme]), so they resolve live against
// the active theme — switching theme or mode recolors tokens with no
// editor reconfiguration needed.
export const themeAwareHighlightStyle = HighlightStyle.define([
  { tag: tags.keyword, color: "var(--syntax-keyword)" },
  { tag: tags.controlKeyword, color: "var(--syntax-keyword)" },
  { tag: tags.operatorKeyword, color: "var(--syntax-keyword)" },
  {
    tag: [tags.string, tags.docString, tags.character, tags.attributeValue],
    color: "var(--syntax-string)",
  },
  {
    tag: [tags.comment, tags.lineComment, tags.blockComment, tags.docComment],
    color: "var(--syntax-comment)",
    fontStyle: "italic",
  },
  {
    tag: [tags.number, tags.integer, tags.float, tags.bool, tags.null],
    color: "var(--syntax-number)",
  },
  {
    tag: [tags.function(tags.variableName), tags.macroName],
    color: "var(--syntax-function)",
  },
  {
    tag: [
      tags.variableName,
      tags.propertyName,
      tags.attributeName,
      tags.labelName,
      tags.namespace,
      tags.self,
    ],
    color: "var(--syntax-variable)",
  },
  {
    tag: [tags.typeName, tags.className, tags.annotation, tags.modifier],
    color: "var(--syntax-type)",
  },
  {
    tag: [
      tags.operator,
      tags.arithmeticOperator,
      tags.logicOperator,
      tags.bitwiseOperator,
      tags.compareOperator,
      tags.updateOperator,
      tags.definitionOperator,
      tags.typeOperator,
      tags.controlOperator,
      tags.punctuation,
      tags.separator,
      tags.bracket,
    ],
    color: "var(--syntax-operator)",
  },
  {
    tag: [tags.tagName, tags.angleBracket],
    color: "var(--syntax-tag)",
  },
  {
    tag: [tags.regexp, tags.url, tags.escape, tags.color, tags.unit],
    color: "var(--syntax-string)",
  },
  { tag: tags.link, textDecoration: "underline" },
  { tag: tags.heading, fontWeight: "bold" },
  { tag: tags.emphasis, fontStyle: "italic" },
  { tag: tags.strong, fontWeight: "bold" },
  {
    tag: tags.invalid,
    color: "var(--syntax-invalid)",
    textDecoration: "underline wavy var(--syntax-invalid)",
  },
]);
