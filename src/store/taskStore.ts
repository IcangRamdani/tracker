import { create } from 'zustand';

export interface Task {
  id: string;
  airdropId: string;
  title: string;
  completed: boolean;
  link?: string;
  order: number;
}

interface TaskState {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  addTask: (task: Task) => void;
  updateTask: (id: string, task: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  getTasksByAirdrop: (airdropId: string) => Task[];
  reorderTasks: (airdropId: string, newOrder: Task[]) => void;
}

export const useTaskStore = create<TaskState>((set, get) => ({
  tasks: [],
  setTasks: (tasks) => set({ tasks }),
  addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
  updateTask: (id, task) =>
    set((state) => ({
      tasks: state.tasks.map((t) => (t.id === id ? { ...t, ...task } : t)),
    })),
  deleteTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((t) => t.id !== id),
    })),
  getTasksByAirdrop: (airdropId) => get().tasks.filter((t) => t.airdropId === airdropId),
  reorderTasks: (airdropId, newOrder) =>
    set((state) => {
      const otherTasks = state.tasks.filter((t) => t.airdropId !== airdropId);
      return { tasks: [...otherTasks, ...newOrder] };
    }),
}));
