import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export type Todos = {
  id: string;
  task: string;
  isDone: boolean;
};

export type DataTodos = {
  id: string;
  title: string;
  label: string;
  todos: Todos[];
};

export type TodoStore = {
  allTodos: DataTodos[];
  updateAllTodos: (allTodos: DataTodos[]) => void;
};

export const useTodosStore = create<TodoStore>()(
  devtools(
    persist(
      (set) => ({
        allTodos: [],
        updateAllTodos: (allTodos) => set({ allTodos }),
      }),
      {
        name: "todos store",
      }
    )
  )
);
