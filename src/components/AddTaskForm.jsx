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
    setTitle("");
    setDesc("");
    setOpen(false);
  };

  return (
    <div>
      <button
        onClick={() => setOpen(true)}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            opacity="0.2"
            d="M16.19 2H7.81C4.17 2 2 4.17 2 7.81V16.18C2 19.83 4.17 22 7.81 22H16.18C19.82 22 21.99 19.83 21.99 16.19V7.81C22 4.17 19.83 2 16.19 2Z"
            fill="#5030E5"
          />
          <path
            d="M16 11.25H12.75V8C12.75 7.59 12.41 7.25 12 7.25C11.59 7.25 11.25 7.59 11.25 8V11.25H8C7.59 11.25 7.25 11.59 7.25 12C7.25 12.41 7.59 12.75 8 12.75H11.25V16C11.25 16.41 11.59 16.75 12 16.75C12.41 16.75 12.75 16.41 12.75 16V12.75H16C16.41 12.75 16.75 12.41 16.75 12C16.75 11.59 16.41 11.25 16 11.25Z"
            fill="#5030E5"
          />
        </svg>
      </button>

      {open && (
        <div className="fixed inset-0 z-50">
          <div
            className="fixed inset-0 bg-black opacity-30"
            onClick={() => setOpen(false)}
          ></div>
          <div
            className="flex items-center justify-center min-h-screen"
            style={{ pointerEvents: "none" }}
          >
            <div
              className="bg-white p-6 rounded shadow w-96 relative"
              style={{ pointerEvents: "auto" }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="mb-3">Add Task</h3>
              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Title"
                  className="w-full p-2 border rounded"
                />
                <textarea
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  placeholder="Description"
                  className="w-full p-2 border rounded"
                />
                <div className="flex gap-2">
                  <select
                    value={column}
                    onChange={(e) => setColumn(e.target.value)}
                    className="p-2 border rounded"
                  >
                    <option value="todo">To Do</option>
                    <option value="inprogress">In Progress</option>
                    <option value="done">Done</option>
                  </select>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="p-2 border rounded"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="px-3 py-1 border rounded"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-3 py-1 bg-indigo-600 text-white rounded"
                  >
                    Add
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
