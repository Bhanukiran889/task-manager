import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setFilter } from "../store/tasksSlice";

export default function FilterBar() {
  const dispatch = useDispatch();
  const [q, setQ] = useState("");
  const [priority, setPriority] = useState("all");

  const apply = () => {
    dispatch(setFilter({ query: q, priority }));
  };

  return (
    <div className="flex items-center gap-2">
      <input value={q} onChange={(e)=>setQ(e.target.value)} placeholder="Search..." className="px-2 py-1 border rounded" />
      <select value={priority} onChange={(e)=>setPriority(e.target.value)} className="px-2 py-1 border rounded">
        <option value="all">All</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <button onClick={apply} className="px-3 py-1 bg-gray-200 rounded">Filter</button>
    </div>
  );
}
