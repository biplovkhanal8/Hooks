'use client';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import useForm from '../hooks/useForm';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const { values, handleChange, handleSubmit } = useForm({
    email: '',
    password: '',
  });

  const onSubmit = () => {
    // In a real app, you would validate credentials with your backend
    login({ id: 1, name: 'Admin User', email: values.email });
    router.push('/');
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-400 dark:from-gray-800 dark:to-gray-900'>
      <div className='bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md'>
        <h1 className='text-3xl font-bold mb-6 text-center dark:text-white'>
          Sign me in
        </h1>
        <form onSubmit={(e) => handleSubmit(e, onSubmit)} className='space-y-6'>
          <div>
            <label className='block text-lg font-medium mb-1 dark:text-gray-300'>
              Email
            </label>
            <input
              type='email'
              name='email'
              value={values.email}
              onChange={handleChange}
              className='w-full px-4 py-3 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white text-lg'
              placeholder='Enter your valid email'
              required
            />
          </div>
          <div>
            <label className='block text-lg font-medium mb-1 dark:text-gray-300'>
              Password
            </label>
            <input
              type='password'
              name='password'
              value={values.password}
              onChange={handleChange}
              className='w-full px-4 py-3 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white text-lg'
              placeholder='Enter your password'
              required
            />
          </div>
          <button
            type='submit'
            className='w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition-colors text-lg'
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
