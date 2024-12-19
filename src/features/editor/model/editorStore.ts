import { create } from 'zustand';

interface EditorState {
  editorContent: string;
  setEditorContent: (content: string) => void;
}

export const useEditorStore = create<EditorState>((set) => ({
  editorContent: '',
  setEditorContent: (content: string) => set({ editorContent: content }),
}));
