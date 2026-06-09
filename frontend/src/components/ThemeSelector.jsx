import React from 'react';

/**
 * Theme Selector Component
 * Allows users to choose between light and dark themes for their profile card.
 */
export default function ThemeSelector({ theme, onChangeTheme }) {
  return (
    <div className="flex flex-col space-y-2 animate-fadeIn">
      <label className="text-[10px] font-bold uppercase tracking-widest text-slate-450">
        Card Theme
      </label>
      <div className="flex bg-slate-100/80 p-1.5 rounded-2xl border border-slate-200/40 w-full max-w-[260px]">
        {/* Light Theme Button */}
        <button
          type="button"
          onClick={() => onChangeTheme('light')}
          className={`flex-1 flex items-center justify-center space-x-2 py-2 px-3 rounded-xl text-xs font-bold transition-all duration-250 cursor-pointer ${
            theme === 'light'
              ? 'bg-white text-slate-900 shadow-sm border border-slate-200/30'
              : 'text-slate-500 hover:text-slate-900 hover:bg-white/40'
          }`}
        >
          {/* Sun icon */}
          <svg
            className={`h-4 w-4 transition-colors duration-200 ${theme === 'light' ? 'text-amber-500' : 'text-slate-400'}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707.707M12 8a4 4 0 100 8 4 4 0 000-8z"
            />
          </svg>
          <span>Light Theme</span>
        </button>

        {/* Dark Theme Button */}
        <button
          type="button"
          onClick={() => onChangeTheme('dark')}
          className={`flex-1 flex items-center justify-center space-x-2 py-2 px-3 rounded-xl text-xs font-bold transition-all duration-250 cursor-pointer ${
            theme === 'dark'
              ? 'bg-slate-900 text-white shadow-md border border-slate-800'
              : 'text-slate-500 hover:text-slate-900 hover:bg-white/40'
          }`}
        >
          {/* Moon icon */}
          <svg
            className={`h-4 w-4 transition-colors duration-200 ${theme === 'dark' ? 'text-indigo-400' : 'text-slate-400'}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          </svg>
          <span>Dark Theme</span>
        </button>
      </div>
    </div>
  );
}
