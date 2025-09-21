import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  columns: {
    todo: { id: "todo", name: "To Do", items: [] },
    inprogress: { id: "inprogress", name: "In Progress", items: [] },
    done: { id: "done", name: "Done", items: [] },
  },
  filter: { query: "", priority: "all" }, // sample filter shape
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    initializeState(state, action) {
      return action.payload;
    },
    addTask(state, action) {
      const { columnId, title, description, priority = "low" } = action.payload;
      const newTask = {
        id: Date.now().toString(),
        title,
        description,
        priority,
        createdAt: Date.now(),
      };
      state.columns[columnId].items.push(newTask);
    },
    moveTask(state, action) {
      const { source, destination } = action.payload;
      if (!destination) return;
      const sourceCol = state.columns[source.droppableId];
      const destCol = state.columns[destination.droppableId];
      const [removed] = sourceCol.items.splice(source.index, 1);
      destCol.items.splice(destination.index, 0, removed);
    },
    reorderWithinColumn(state, action) {
      const { droppableId, sourceIndex, destIndex } = action.payload;
      const col = state.columns[droppableId];
      const [moved] = col.items.splice(sourceIndex, 1);
      col.items.splice(destIndex, 0, moved);
    },
    setFilter(state, action) {
      state.filter = { ...state.filter, ...action.payload };
    },
    updateTask(state, action) {
      const { columnId, taskId, updates } = action.payload;
      const tasks = state.columns[columnId].items;
      const idx = tasks.findIndex(t => t.id === taskId);
      if (idx >= 0) tasks[idx] = { ...tasks[idx], ...updates };
    },
    deleteTask(state, action) {
      const { columnId, taskId } = action.payload;
      state.columns[columnId].items = state.columns[columnId].items.filter(t => t.id !== taskId);
    }
  },
});

export const {
  initializeState,
  addTask,
  moveTask,
  reorderWithinColumn,
  setFilter,
  updateTask,
  deleteTask,
} = tasksSlice.actions;

export default tasksSlice.reducer;
