import { useState, useEffect } from 'react';
import { Plus, CheckCircle2, Clock, AlertTriangle, ListTodo, FolderKanban, SearchX, Check } from 'lucide-react';
import type { Task } from '../types/task';
import { initialTasks } from '../data/tasks';
import { TaskCard } from '../components/TaskCard';
import { AddTaskModal } from '../components/AddTaskModal';
import { TaskFilters } from '../components/TaskFilters';

const LOCAL_STORAGE_KEY = 'taskflow_tasks';

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse tasks', e);
      }
    }
    return initialTasks;
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleSaveTask = (savedTask: Task) => {
    if (taskToEdit) {
      setTasks((prev) => prev.map((t) => (t.id === savedTask.id ? savedTask : t)));
      showToast('Task updated successfully!');
    } else {
      setTasks((prev) => [savedTask, ...prev]);
      showToast('New task added!');
    }
  };

  const handleToggleComplete = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const handleDeleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
    showToast('Task deleted');
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setStatusFilter('all');
    setPriorityFilter('all');
    setCategoryFilter('all');
  };

  // Stats calculation
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.completed).length;
  const pendingTasks = tasks.filter((t) => !t.completed).length;

  // Filtered Tasks Logic
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === 'all'
        ? true
        : statusFilter === 'completed'
        ? task.completed
        : !task.completed;

    const matchesPriority =
      priorityFilter === 'all' ? true : task.priority === priorityFilter;

    const matchesCategory =
      categoryFilter === 'all' ? true : task.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesPriority && matchesCategory;
  });

  return (
    <div className="space-y-8 pb-12 transition-colors duration-200">
      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2 text-sm font-medium animate-bounce">
          <Check className="w-4 h-4 text-emerald-400 dark:text-emerald-600" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Welcome back! 👋</h2>
          <p className="text-gray-500 dark:text-slate-400 text-sm mt-1">
            Manage your tasks and track productivity.
          </p>
        </div>
        <button
          onClick={() => {
            setTaskToEdit(null);
            setIsModalOpen(true);
          }}
          className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-2.5 rounded-xl transition-all cursor-pointer w-fit shadow-xs hover:shadow-md active:scale-98"
        >
          <Plus className="w-4 h-4" />
          <span>New Task</span>
        </button>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-800 flex items-center justify-between shadow-xs">
          <div>
            <p className="text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wider">Total Tasks</p>
            <p className="text-2xl font-bold text-slate-800 dark:text-slate-100 mt-1">{totalTasks}</p>
          </div>
          <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/50"><ListTodo className="w-6 h-6 text-blue-600 dark:text-blue-400" /></div>
        </div>

        <div className="p-5 bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-800 flex items-center justify-between shadow-xs">
          <div>
            <p className="text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wider">Completed</p>
            <p className="text-2xl font-bold text-slate-800 dark:text-slate-100 mt-1">{completedTasks}</p>
          </div>
          <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/50"><CheckCircle2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400" /></div>
        </div>

        <div className="p-5 bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-800 flex items-center justify-between shadow-xs">
          <div>
            <p className="text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wider">Pending</p>
            <p className="text-2xl font-bold text-slate-800 dark:text-slate-100 mt-1">{pendingTasks}</p>
          </div>
          <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/50"><Clock className="w-6 h-6 text-amber-600 dark:text-amber-400" /></div>
        </div>

        <div className="p-5 bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-800 flex items-center justify-between shadow-xs">
          <div>
            <p className="text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wider">Overdue</p>
            <p className="text-2xl font-bold text-slate-800 dark:text-slate-100 mt-1">0</p>
          </div>
          <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/50"><AlertTriangle className="w-6 h-6 text-rose-600 dark:text-rose-400" /></div>
        </div>
      </div>

      {/* Control Panel (Filters) */}
      <TaskFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        priorityFilter={priorityFilter}
        onPriorityChange={setPriorityFilter}
        categoryFilter={categoryFilter}
        onCategoryChange={setCategoryFilter}
        onResetFilters={handleResetFilters}
      />

      {/* Task Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Task Overview</h3>
          <span className="text-xs font-medium text-gray-500 dark:text-slate-400">
            Showing {filteredTasks.length} of {totalTasks} tasks
          </span>
        </div>

        {/* Dynamic Empty States */}
        {tasks.length === 0 ? (
          <div className="p-10 text-center bg-white dark:bg-slate-900 rounded-2xl border border-dashed border-gray-300 dark:border-slate-800 flex flex-col items-center justify-center gap-3">
            <div className="p-4 bg-indigo-50 dark:bg-indigo-950/50 rounded-full text-indigo-600 dark:text-indigo-400">
              <FolderKanban className="w-8 h-8" />
            </div>
            <div>
              <h4 className="text-base font-semibold text-slate-800 dark:text-slate-200">No tasks yet</h4>
              <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">Create your first task to start organizing your workflow.</p>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-xs font-semibold hover:bg-indigo-700 cursor-pointer"
            >
              Add First Task
            </button>
          </div>
        ) : filteredTasks.length === 0 ? (
          <div className="p-10 text-center bg-white dark:bg-slate-900 rounded-2xl border border-dashed border-gray-300 dark:border-slate-800 flex flex-col items-center justify-center gap-3">
            <div className="p-4 bg-amber-50 dark:bg-amber-950/50 rounded-full text-amber-600 dark:text-amber-400">
              <SearchX className="w-8 h-8" />
            </div>
            <div>
              <h4 className="text-base font-semibold text-slate-800 dark:text-slate-200">No tasks found</h4>
              <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">Try adjusting your search query or filter options.</p>
            </div>
            <button
              onClick={handleResetFilters}
              className="mt-2 px-4 py-2 bg-gray-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-lg text-xs font-semibold hover:bg-gray-200 dark:hover:bg-slate-700 cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            {filteredTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onToggleComplete={handleToggleComplete}
                onEdit={(t) => {
                  setTaskToEdit(t);
                  setIsModalOpen(true);
                }}
                onDelete={handleDeleteTask}
              />
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      <AddTaskModal
        key={taskToEdit ? taskToEdit.id : 'new-task'}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setTaskToEdit(null);
        }}
        onSaveTask={handleSaveTask}
        taskToEdit={taskToEdit}
      />
    </div>
  );
}