export type Priority = 'low' | 'medium' | 'high';

export interface Task {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: Priority;
  completed: boolean;
  dueDate: string;
}