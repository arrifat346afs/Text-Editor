import {
  setHighlightActiveLine,
  setShowLineNumbers,
  setSyntaxHighlighting,
  useEditorSettingsStore,
} from "@/app/store/useEditorSettingsStore";
import { Switch } from "@/components/ui/switch";
import { useShallow } from "zustand/shallow";

export function EditorSettings() {
  const { showLineNumbers, highlightActiveLine, syntaxHighlighting } =
    useEditorSettingsStore(
      useShallow((s) => ({
        showLineNumbers: s.showLineNumbers,
        highlightActiveLine: s.highlightActiveLine,
        syntaxHighlighting: s.syntaxHighlighting,
      }))
    );

  return (
    <div className="space-y-6">
      <div>
        <h3 className="mb-1 text-lg font-semibold">Editor</h3>
        <p className="text-sm text-muted-foreground">
          Control line numbers, the active line highlight, and syntax
          highlighting.
        </p>
      </div>

      <div className="flex items-center justify-between gap-4 rounded-lg border p-4">
        <div className="space-y-0.5">
          <p className="text-sm font-medium">Line numbers</p>
          <p className="text-sm text-muted-foreground">
            Show line numbers in the gutter.
          </p>
        </div>
        <Switch
          checked={showLineNumbers}
          onCheckedChange={setShowLineNumbers}
          aria-label="Toggle line numbers"
        />
      </div>

      <div className="flex items-center justify-between gap-4 rounded-lg border p-4">
        <div className="space-y-0.5">
          <p className="text-sm font-medium">Highlight active line</p>
          <p className="text-sm text-muted-foreground">
            Highlight the line under the cursor.
          </p>
        </div>
        <Switch
          checked={highlightActiveLine}
          onCheckedChange={setHighlightActiveLine}
          aria-label="Toggle active line highlight"
        />
      </div>

      <div className="flex items-center justify-between gap-4 rounded-lg border p-4">
        <div className="space-y-0.5">
          <p className="text-sm font-medium">Syntax highlighting</p>
          <p className="text-sm text-muted-foreground">
            Color code based on the file type.
          </p>
        </div>
        <Switch
          checked={syntaxHighlighting}
          onCheckedChange={setSyntaxHighlighting}
          aria-label="Toggle syntax highlighting"
        />
      </div>
    </div>
  );
}
