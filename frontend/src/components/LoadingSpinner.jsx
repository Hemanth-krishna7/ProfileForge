import React from 'react';

/**
 * Reusable Loading Spinner Component
 * Displays a styled CSS animation overlay or spinner indicating background operations.
 */
export default function LoadingSpinner({ message = 'Generating your professional profile...' }) {
  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-4 text-center">
      <div className="relative w-16 h-16">
        {/* Outer glowing ring */}
        <div className="absolute inset-0 rounded-full border-4 border-violet-100 animate-pulse"></div>
        {/* Spinning gradient ring */}
        <div className="absolute inset-0 rounded-full border-4 border-t-violet-600 border-r-indigo-500 border-b-transparent border-l-transparent animate-spin"></div>
      </div>
      <p className="text-sm font-medium text-slate-600 animate-pulse">{message}</p>
    </div>
  );
}
