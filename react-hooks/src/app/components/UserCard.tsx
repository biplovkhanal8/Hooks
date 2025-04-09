import React from 'react';
import { User } from '../types/types';

interface UserCardProps {
  user: User;
  onViewProfile: (userId: number) => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, onViewProfile }) => {
  return (
    <div className='flex p-6 bg-gray-200 dark:bg-gray-700 rounded-lg shadow-md'>
      {/* Avatar Image */}
      <div className='mr-4'>
        <img
          src={user.avatar}
          alt={`${user.name}'s avatar`}
          className='w-16 h-16 rounded-full object-cover'
        />
      </div>

      {/* User Info */}
      <div className='flex flex-col flex-1'>
        <div className='flex justify-between items-center'>
          <h3 className='text-xl font-bold text-gray-800 dark:text-white'>
            {user.name}
          </h3>
          <button
            onClick={() => onViewProfile(user.id)}
            className='bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700'
          >
            View Profile
          </button>
        </div>

        {/* Status */}
        <div className='flex items-center mt-2'>
          <span
            className={`text-sm font-bold py-1 px-3 rounded-full inline-block ${
              user.isActive
                ? 'bg-green-600 text-white'
                : 'bg-red-600 text-white'
            }`}
          >
            {user.isActive ? 'Active' : 'Inactive'}
          </span>
        </div>

        {/* User Details */}
        <div className='flex flex-col space-y-2 mt-4 text-sm text-black dark:text-black'>
          <div>
            <span className='font-semibold'>Email: </span>{user.email}
          </div>
          <div>
            <span className='font-semibold'>Join Date: </span>{user.joinDate}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
