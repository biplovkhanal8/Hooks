// components/TodoApp.tsx
'use client';
import { useState } from 'react';
import useLocalStorage from '../../hooks/useLocalStorage';
import { useTheme } from '../../context/ThemeContext';
import TodoList from './TodoList';
import TodoForm from './TodoForm';
import PomodoroTimer from './PomodoroTimer';
import TodoCalendar from './TodoCalendar';

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  dueDate?: string;
  priority?: 'low' | 'medium' | 'high';
}

export default function TodoApp() {
  const { theme } = useTheme();
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [activeTab, setActiveTab] = useState<'list' | 'calendar'>('list');

  const addTodo = (
    title: string,
    dueDate?: string,
    priority?: 'low' | 'medium' | 'high'
  ) => {
    if (title.trim()) {
      setTodos([
        ...todos,
        {
          id: Date.now(),
          title,
          completed: false,
          dueDate,
          priority,
        },
      ]);
    }
  };

  const updateTodo = (id: number, updates: Partial<Todo>) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, ...updates } : todo))
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div
      className={`max-w-6xl mx-auto p-8 rounded-lg ${
        theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'
      }`}
    >
      <div className='flex justify-center mb-10'>
        <h1 className='text-4xl font-extrabold text-center text-gray-800'>
          Tasks Details 
        </h1>
      </div>
      
      <div className='flex justify-center items-center mb-8'>
        <div className='flex space-x-4'>
          <button
            onClick={() => setActiveTab('list')}
            className={`px-6 py-3 rounded-lg text-lg font-semibold transition-all duration-200 ${
              activeTab === 'list'
                ? 'bg-blue-600 text-white'
                : theme === 'dark'
                ? 'bg-gray-700 text-gray-300'
                : 'bg-gray-300 text-gray-700'
            } hover:bg-opacity-90`}
          >
            List View
          </button>
          <button
            onClick={() => setActiveTab('calendar')}
            className={`px-6 py-3 rounded-lg text-lg font-semibold transition-all duration-200 ${
              activeTab === 'calendar'
                ? 'bg-blue-600 text-white'
                : theme === 'dark'
                ? 'bg-gray-700 text-gray-300'
                : 'bg-gray-300 text-gray-700'
            } hover:bg-opacity-90`}
          >
            Calendar
          </button>
        </div>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-10'>
        <div className='lg:col-span-2'>
          {activeTab === 'list' ? (
            <TodoList
              todos={todos}
              onUpdate={updateTodo}
              onDelete={deleteTodo}
            />
          ) : (
            <TodoCalendar todos={todos} />
          )}
        </div>

        <div className='space-y-8'>
          {/* Added border and padding for "Your Tasks" section */}
          <div className="border-2 p-6 rounded-lg border-gray-300 bg-white">
            <h2 className='text-2xl font-semibold text-gray-800 mb-6'>
              Your Tasks
            </h2>
            <TodoForm onSubmit={addTodo} />
          </div>

          <div className="border-2 p-6 rounded-lg border-gray-300 bg-white">
            <h2 className='text-2xl font-semibold text-gray-800 mb-6'>
              Pomodoro Timer
            </h2>
            <PomodoroTimer />
          </div>
        </div>
      </div>
    </div>
  );
}
