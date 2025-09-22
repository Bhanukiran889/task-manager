import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  columns: {
    todo: { id: "todo", name: "To Do", items: [] },
    inprogress: { id: "inprogress", name: "On Progress", items: [] },
    done: { id: "done", name: "Done", items: [] },
  },
  filter: { query: "", priority: "all" },
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    initializeState(state, action) {
      return action.payload;
    },
    ensureColumnsExist(state) {
      // Ensure all required columns exist
      if (!state.columns.todo) {
        state.columns.todo = { id: "todo", name: "To Do", items: [] };
      }
      if (!state.columns.inprogress) {
        state.columns.inprogress = { id: "inprogress", name: "In Progress", items: [] };
      }
      if (!state.columns.done) {
        state.columns.done = { id: "done", name: "Done", items: [] };
      }

      // Deduplicate any existing task ids across all columns (handles previously duplicated Date.now ids)
      const seenIds = new Set();
      const columnsList = [state.columns.todo, state.columns.inprogress, state.columns.done];
      columnsList.forEach((col) => {
        if (!col || !Array.isArray(col.items)) return;
        col.items.forEach((task) => {
          if (!task.id || seenIds.has(task.id)) {
            task.id = nanoid();
          }
          seenIds.add(task.id);
        });
      });
    },
    addTask(state, action) {
      const { columnId, title, description, priority = "low" } = action.payload;
      const newTask = {
        id: nanoid(),
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
  ensureColumnsExist,
  addTask,
  moveTask,
  reorderWithinColumn,
  setFilter,
  updateTask,
  deleteTask,
} = tasksSlice.actions;

export default tasksSlice.reducer;
