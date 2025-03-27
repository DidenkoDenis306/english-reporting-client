import { create } from 'zustand';
import { TipTapEditorRef } from 'features/editor/ui/EditLessonEditor';

interface ViewLessonsPageState {
  filter: string | null;
  editorsRefs: { [key: string]: TipTapEditorRef };
  setFilter: (filter: string | null) => void;
  registerEditorRef: (key: string, el: TipTapEditorRef | null) => void;
  exportAllLessons: () => void;
}

export const useViewLessonsPage = create<ViewLessonsPageState>()(
  (set, get) => ({
    filter: null,
    editorsRefs: {},

    setFilter: (filter) => set({ filter }),

    registerEditorRef: (key, el) => {
      if (el) {
        set((state) => ({
          editorsRefs: {
            ...state.editorsRefs,
            [key]: el,
          },
        }));
      }
    },

    exportAllLessons: () => {
      const editorsRefs = get().editorsRefs;
      Object.values(editorsRefs).forEach((ref) => ref.clickButton());
    },
  }),
);
