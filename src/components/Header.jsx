import React from "react";

export default function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-3 bg-white  shadow border-b-1">
      <div className="flex items-center gap-3">
       
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