
const navItems = [
  { id: "home", label: "Home" },
  { id: "messages", label: "Messages" },
  { id: "tasks", label: "Tasks" },
  { id: "members", label: "Members" },
  { id: "settings", label: "Settings" },
];

export default function Sidebar({ open, toggle }) {
  return (
    <aside className={`bg-white  shadow ${open ? "w-64" : "w-16"} transition-all duration-200`}>
      <div className="h-16 flex items-center px-4">
        <div className="flex-1">
          <div className="font-bold">{open ? "Creative" : "C"}</div>
        </div>
        <button onClick={toggle} className="p-2">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none"><path d="M6 9l6-6 6 6" stroke="currentColor" strokeWidth="2"/></svg>
        </button>
      </div>

      <nav className="mt-4 px-2">
        {navItems.map(item => (
          <div key={item.id} className="flex items-center gap-3 p-2 rounded hover:bg-gray-100 cursor-pointer">
            <div className="w-8 h-8 rounded bg-gray-200 flex items-center justify-center">{item.label[0]}</div>
            {open && <div className="text-sm">{item.label}</div>}
          </div>
        ))}
      </nav>
    </aside>
  );
}
