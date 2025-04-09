// components/PomodoroTimer.tsx
'use client';
import { useState, useEffect, useCallback } from 'react';
import { useTheme } from '../../context/ThemeContext';

export default function PomodoroTimer() {
  const { theme } = useTheme();
  const [mode, setMode] = useState<'work' | 'break'>('work');
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes
  const [isActive, setIsActive] = useState(false);
  const [cycles, setCycles] = useState(0);

  const resetTimer = useCallback(() => {
    setIsActive(false);
    setTimeLeft(mode === 'work' ? 25 * 60 : 5 * 60);
  }, [mode]);

  useEffect(() => {
    resetTimer();
  }, [mode, resetTimer]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (isActive && timeLeft === 0) {
      setIsActive(false);
      const newMode = mode === 'work' ? 'break' : 'work';
      setMode(newMode);
      if (mode === 'work') {
        setCycles((prev) => prev + 1);
      }
      new Audio('/notification.mp3').play().catch(console.error);
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft, mode]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}`;
  };

  return (
    <div
      className={`p-6 rounded-2xl shadow-lg transition-all duration-300 ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-blue-50'
      }`}
    >
      <h2 className='text-2xl font-bold text-center mb-6'>
        Pomodoro Timer
      </h2>
      <div className='text-center mb-6'>
        <div
          className={`text-6xl font-extrabold mb-3 text-black`} // Set timer color to black
        >
          {formatTime(timeLeft)}
        </div>
        <div className='text-lg'>
          {mode === 'work' ? 'Work Time' : 'Break Time'} • Cycles: {cycles}
        </div>
      </div>
      <div className='flex justify-center space-x-6'>
        <button
          onClick={toggleTimer}
          className={`px-6 py-3 rounded-xl text-lg font-semibold transition-all duration-200 ${
            isActive ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
          } hover:bg-opacity-90`}
        >
          {isActive ? 'Pause' : 'Start'}
        </button>
        <button
          onClick={() => setMode(mode === 'work' ? 'break' : 'work')}
          className={`px-6 py-3 rounded-xl text-lg font-semibold transition-all duration-200 ${
            theme === 'dark'
              ? 'bg-gray-600 text-white'
              : 'bg-blue-200 text-blue-800'
          } hover:bg-opacity-80`}
        >
          Switch Mode
        </button>
      </div>
    </div>
  );
}
