// components/Toast.tsx
import toast, { Toast } from 'react-hot-toast';
import { User2Icon } from 'lucide-react';

interface ToastProps {
  t: Toast;
  username: string;
}

export const CustomToast = ({ t, username }: ToastProps) => (
  <div
    className={`${
      t.visible ? 'animate-enter' : 'animate-leave'
    } max-w-xs w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
  >
    <div className="flex-1 w-0 p-4">
      <div className="flex items-start">
        <div className="flex-shrink-0 pt-0.5">
          <User2Icon className="text-black" />
        </div>
        <div className="ml-3 flex-1">
          <p className="text-sm font-medium text-gray-900">{username}</p>
          <p className="mt-1 text-sm text-gray-500">Joined event now!</p>
        </div>
      </div>
    </div>
    <div className="flex border-l border-gray-200">
      <button
        onClick={() => toast.remove(t.id)}
        className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500"
      >
        Close
      </button>
    </div>
  </div>
);