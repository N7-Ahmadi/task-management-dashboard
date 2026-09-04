import { useState } from 'react';
import { Calendar, CheckCircle2, Circle, Pencil, Trash2, AlertCircle } from 'lucide-react';
import type { Task } from '../types/task';
import { PriorityBadge, CategoryBadge } from './TaskBadges';

interface TaskCardProps {
  task: Task;
  onToggleComplete: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

export const TaskCard = ({ task, onToggleComplete, onEdit, onDelete }: TaskCardProps) => {
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div
      className={`p-4 sm:p-5 bg-white dark:bg-slate-900 rounded-xl border transition-all duration-200 shadow-xs hover:shadow-md flex flex-col justify-between gap-3 min-w-0 ${
        task.completed
          ? 'border-gray-200 dark:border-slate-800 opacity-75'
          : 'border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-800/80'
      }`}
    >
      {/* Header */}
      <div className="space-y-2 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-start gap-2.5 min-w-0 flex-1">
            <button
              onClick={() => onToggleComplete(task.id)}
              className="mt-0.5 text-gray-400 hover:text-emerald-500 cursor-pointer transition-colors shrink-0"
            >
              {task.completed ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              ) : (
                <Circle className="w-5 h-5 text-gray-300 dark:text-slate-600" />
              )}
            </button>
            <h3
              className={`font-semibold text-slate-800 dark:text-slate-100 text-sm sm:text-base wrap-break-words truncate ${
                task.completed ? 'line-through text-gray-400 dark:text-slate-500' : ''
              }`}
            >
              {task.title}
            </h3>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={() => onEdit(task)}
              className="p-1.5 text-gray-400 dark:text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
            >
              <Pencil className="w-4 h-4" />
            </button>
            <button
              onClick={() => setShowConfirm(true)}
              className="p-1.5 text-gray-400 dark:text-slate-500 hover:text-rose-600 dark:hover:text-rose-400 cursor-pointer rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        <p className="text-xs text-gray-500 dark:text-slate-400 line-clamp-2 pl-7 wrap-break-words">
          {task.description || 'No description provided.'}
        </p>
      </div>

      {/* Delete Confirmation Banner */}
      {showConfirm && (
        <div className="ml-7 p-2.5 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 rounded-lg flex items-center justify-between gap-2 text-xs">
          <span className="text-rose-700 dark:text-rose-300 font-medium flex items-center gap-1.5">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            Delete task?
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowConfirm(false)}
              className="text-gray-600 dark:text-slate-400 hover:underline cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onDelete(task.id);
                setShowConfirm(false);
              }}
              className="px-2 py-1 bg-rose-600 text-white rounded-md font-semibold hover:bg-rose-700 cursor-pointer"
            >
              Confirm
            </button>
          </div>
        </div>
      )}

      {/* Badges */}
      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 pl-7">
        <CategoryBadge category={task.category} />
        <PriorityBadge priority={task.priority} />
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-slate-400 pt-3 border-t border-gray-100 dark:border-slate-800/80 mt-1">
        <div className="flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate">Due {task.dueDate}</span>
        </div>
        <span
          className={`font-semibold shrink-0 ${
            task.completed ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'
          }`}
        >
          {task.completed ? 'Completed' : 'Pending'}
        </span>
      </div>
    </div>
  );
};