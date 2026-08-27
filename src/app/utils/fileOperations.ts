
import { open, save } from "@tauri-apps/plugin-dialog";
import { readTextFile, writeTextFile } from "@tauri-apps/plugin-fs";

export interface File {
  filePath: string;
  content: string;
}



export const openFile = async (): Promise<File | null> => {
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
export const saveFile = async (filePath: string, content: string): Promise<boolean> => {
  try {
    await writeTextFile(filePath, content)
    return true
  } catch (error) {
    console.error("Failed to save file:", error);
    alert("This file couldn't be saved. Check that you still have permission to write to it.");
    return false;
  }
}


export const saveFileAs = async (content: string): Promise<File | null> => {
  const selected = await save()
  if (!selected) return null
  try {
    await writeTextFile(selected, content)
    return { filePath: selected, content }
  } catch (error) {
    console.error("Failed to save file:", error);
    alert("This file couldn't be saved. Check that you still have permission to write there.");
    return null;
  }
}


