import { useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Board from "./components/Board";
import './App.css'

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar open={sidebarOpen} toggle={() => setSidebarOpen(v => !v)} />
      <div className="flex-1 flex flex-col">
        <Header toggleSidebar={() => setSidebarOpen(v => !v)} />
        <main className="flex-1 bg-white">
          <Board />
        </main>
      </div>
    </div>
  );
}
