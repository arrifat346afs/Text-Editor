import { open } from "@tauri-apps/plugin-dialog";
import { readTextFile } from "@tauri-apps/plugin-fs";

export interface OpenedFile {
  filePath: string;
  content: string;
}

export const openFile = async (): Promise<OpenedFile | null> => {
  const selected = await open({ multiple: false });
  if (!selected || Array.isArray(selected)) return null;

  try {
    const content = await readTextFile(selected);
    return { filePath: selected, content };
  } catch (error) {
    console.error("Failed to read file as text:", error);
    alert("This file couldn't be opened as text. It may be a binary or unsupported file.");
    return null;
  }
};

// saveFile, saveFileAs, etc. will live here too, once we build them