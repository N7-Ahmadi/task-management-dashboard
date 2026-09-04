import type { Task } from '../types/task';

export const initialTasks: Task[] = [
  {
    id: '1',
    title: 'Finish Portfolio Wireframes',
    description: 'Sketch out low-fidelity wireframes for the homepage and project detail screens.',
    category: 'Design',
    priority: 'high',
    completed: false,
    dueDate: '2026-08-22',
  },
  {
    id: '2',
    title: 'Build TaskFlow Base UI',
    description: 'Set up Vite, Tailwind v4, React Router v7, and main routing components.',
    category: 'Development',
    priority: 'high',
    completed: true,
    dueDate: '2026-08-21',
  },
  {
    id: '3',
    title: 'Learn React State Flow',
    description: 'Practice passing data through state down into child components using props.',
    category: 'Learning',
    priority: 'medium',
    completed: true,
    dueDate: '2026-08-20',
  },
  {
    id: '4',
    title: 'Deploy Project to Vercel',
    description: 'Connect GitHub repository to Vercel and verify production build.',
    category: 'DevOps',
    priority: 'low',
    completed: false,
    dueDate: '2026-08-25',
  },
];