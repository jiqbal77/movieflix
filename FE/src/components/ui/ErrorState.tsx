import { memo } from 'react';

interface ErrorStateProps {
  title?: string;
  message?: string;
}

const ErrorState = memo(function ErrorState({
  title = 'Something went wrong',
  message = 'Please try again later',
}: ErrorStateProps) {
  return (
    <div className="text-center py-12">
      <div className="inline-block p-6 bg-red-50 rounded-xl border-2 border-red-200">
        <svg
          className="w-12 h-12 text-red-500 mx-auto mb-3"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <p className="text-red-600 text-lg font-semibold">{title}</p>
        <p className="text-red-500 text-sm mt-1">{message}</p>
      </div>
    </div>
  );
});

export default ErrorState;
