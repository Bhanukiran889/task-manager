import React from "react";

export default function Header({ toggleSidebar }) {
  return (
    <header className="flex items-center justify-between px-6 py-3 bg-white dark:bg-gray-800 shadow">
      <div className="flex items-center gap-3">
        <button onClick={toggleSidebar} className="p-2 rounded hover:bg-gray-100">
          {/* collapse icon */}
          <svg className="w-6 h-6" /* simple icon */ viewBox="0 0 24 24" fill="none">
            <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
        <h1 className="text-lg font-semibold">Dashboard</h1>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-sm text-gray-600 hidden sm:block">Hello, Padma</div>
        <div className="w-9 h-9 rounded-full bg-indigo-500 flex items-center justify-center text-white">
          P
        </div>
      </div>
    </header>
  );
}