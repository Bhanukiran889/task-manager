import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./tacksSice";

const LOCAL_KEY = "creative-upaay-dashboard-v1";

const preloaded = (() => {
  try {
    const raw = localStorage.getItem(LOCAL_KEY);
    return raw ? JSON.parse(raw) : undefined;
  } catch {
    return undefined;
  }
})();

export const store = configureStore({
  reducer: { tasks: tasksReducer },
  preloadedState: preloaded ? { tasks: preloaded } : undefined,
});

// Persist on changes
store.subscribe(() => {
  const state = store.getState().tasks;
  localStorage.setItem(LOCAL_KEY, JSON.stringify(state));
});
