import { useState } from 'react';
import { X } from 'lucide-react';
import type { Task, Priority } from '../types/task';

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveTask: (task: Task) => void;
  taskToEdit?: Task | null;
}

export const AddTaskModal = ({ isOpen, onClose, onSaveTask, taskToEdit }: AddTaskModalProps) => {
  const [title, setTitle] = useState(taskToEdit?.title || '');
  const [description, setDescription] = useState(taskToEdit?.description || '');
  const [category, setCategory] = useState(taskToEdit?.category || 'Development');
  const [priority, setPriority] = useState<Priority>(taskToEdit?.priority || 'medium');
  const [dueDate, setDueDate] = useState(taskToEdit?.dueDate || '');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !dueDate) return;

    const taskData: Task = {
      id: taskToEdit ? taskToEdit.id : Date.now().toString(),
      title,
      description,
      category,
      priority,
      completed: taskToEdit ? taskToEdit.completed : false,
      dueDate,
    };

    onSaveTask(taskData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center p-3 sm:p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-md w-full p-5 sm:p-6 space-y-4 shadow-xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <h3 className="text-base sm:text-lg font-bold text-slate-800">
            {taskToEdit ? 'Edit Task' : 'Create New Task'}
          </h3>
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-600 rounded-lg cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Title *</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2.5 sm:py-2 border border-gray-200 rounded-lg text-sm focus:outline-indigo-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Description</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2.5 sm:py-2 border border-gray-200 rounded-lg text-sm focus:outline-indigo-600 resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2.5 sm:py-2 border border-gray-200 rounded-lg text-sm focus:outline-indigo-600 bg-white"
              >
                <option value="Development">Development</option>
                <option value="Design">Design</option>
                <option value="Learning">Learning</option>
                <option value="DevOps">DevOps</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Priority</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as Priority)}
                className="w-full px-3 py-2.5 sm:py-2 border border-gray-200 rounded-lg text-sm focus:outline-indigo-600 bg-white"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Due Date *</label>
            <input
              type="date"
              required
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full px-3 py-2.5 sm:py-2 border border-gray-200 rounded-lg text-sm focus:outline-indigo-600"
            />
          </div>

          <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-2 sm:gap-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-2.5 sm:py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg cursor-pointer text-center"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full sm:w-auto px-4 py-2.5 sm:py-2 text-sm font-medium bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 cursor-pointer text-center"
            >
              {taskToEdit ? 'Save Changes' : 'Add Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};