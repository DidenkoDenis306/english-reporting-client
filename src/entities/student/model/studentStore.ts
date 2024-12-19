import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { IStudent } from 'entities/student/model';

interface StudentsState {
  students: IStudent[];
  setStudents: (students: IStudent[]) => void;
  addStudent: (newStudent: IStudent) => void;
  removeStudent: (id: number) => void;
}

export const useStudentsStore = create<StudentsState>()(
  persist(
    (set, get) => ({
      students: [],
      setStudents: (students: IStudent[]) => set({ students }),
      addStudent: (newStudent: IStudent) => {
        const currentStudents = get().students;

        currentStudents.push(newStudent);

        set({ students: currentStudents });
      },
      removeStudent: (id: number) => {
        const currentStudents = get().students;
        const updatedStudents = currentStudents.filter((student) => {
          return student.id !== id;
        });
        set({ students: updatedStudents });
      },
    }),

    {
      name: 'students-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
