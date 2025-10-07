import { memo, ReactNode } from 'react';
import Link from 'next/link';

interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
  iconColor?: string;
}

const EmptyState = memo(function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  actionHref,
  iconColor = 'text-gray-400',
}: EmptyStateProps) {
  return (
    <div className="text-center py-16">
      <div className="inline-block p-12 bg-white rounded-2xl shadow-lg border border-gray-200">
        <div className={`w-20 h-20 mx-auto mb-6 ${iconColor}`}>{icon}</div>
        <p className="text-gray-700 text-2xl font-bold mb-3">{title}</p>
        <p className="text-gray-500 text-lg mb-6">{description}</p>
        {actionLabel && actionHref && (
          <Link
            href={actionHref}
            className="inline-block px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold rounded-lg transition-colors shadow-md"
          >
            {actionLabel}
          </Link>
        )}
      </div>
    </div>
  );
});

export default EmptyState;
