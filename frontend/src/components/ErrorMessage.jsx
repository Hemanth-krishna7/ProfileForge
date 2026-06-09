import React from 'react';

/**
 * Reusable Error Message Component
 * Displays a styled alert box containing single or multi-line error details.
 */
export default function ErrorMessage({ message, errors }) {
  if (!message) return null;

  return (
    <div className="bg-rose-50 border-l-4 border-rose-500 p-4 rounded-r-lg shadow-sm transition-all duration-300 animate-fadeIn">
      <div className="flex items-start">
        <div className="flex-shrink-0 mt-0.5">
          {/* Warning Icon */}
          <svg
            className="h-5 w-5 text-rose-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-semibold text-rose-800">Error</h3>
          <p className="mt-1 text-xs text-rose-700 leading-relaxed">{message}</p>
          
          {errors && Object.keys(errors).length > 0 && (
            <ul className="mt-2 list-disc list-inside text-xs text-rose-600 space-y-1">
              {Object.entries(errors).map(([field, errMsg]) => (
                <li key={field}>
                  <span className="font-medium capitalize">{field}:</span> {errMsg}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
