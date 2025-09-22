import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../store/tasksSlice";

export default function AddTaskForm() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [column, setColumn] = useState("todo");
  const [priority, setPriority] = useState("low");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    dispatch(addTask({ columnId: column, title, description: desc, priority }));
    setTitle(""); setDesc(""); setOpen(false);
  };

  return (
    <div>
      <button onClick={() => setOpen(true)} className="bg-indigo-600 text-white px-3 py-1 rounded">+ Add Task</button>

      {open && (
        <div className="fixed inset-0 z-50">
          <div className="fixed inset-0 bg-black opacity-30" onClick={()=>setOpen(false)}></div>
          <div className="flex items-center justify-center min-h-screen" style={{ pointerEvents: 'none' }}>
            <div className="bg-white p-6 rounded shadow w-96 relative" style={{ pointerEvents: 'auto' }} onClick={e => e.stopPropagation()}>
              <h3 className="mb-3">Add Task</h3>
              <form onSubmit={handleSubmit} className="space-y-3">
                <input value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="Title" className="w-full p-2 border rounded" />
                <textarea value={desc} onChange={(e)=>setDesc(e.target.value)} placeholder="Description" className="w-full p-2 border rounded" />
                <div className="flex gap-2">
                  <select value={column} onChange={(e)=>setColumn(e.target.value)} className="p-2 border rounded">
                    <option value="todo">To Do</option>
                    <option value="inprogress">In Progress</option>
                    <option value="done">Done</option>
                  </select>
                  <select value={priority} onChange={(e)=>setPriority(e.target.value)} className="p-2 border rounded">
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                <div className="flex justify-end gap-2">
                  <button type="button" onClick={()=>setOpen(false)} className="px-3 py-1 border rounded">Cancel</button>
                  <button type="submit" className="px-3 py-1 bg-indigo-600 text-white rounded">Add</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
