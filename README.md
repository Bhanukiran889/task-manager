#  Task Management Dashboard

A Kanban-style task management dashboard built with **React (Vite)**, **Redux Toolkit**, **Tailwind CSS**, and **react-beautiful-dnd**.  
It allows users to add, delete, filter, and drag tasks across different columns (`To Do`, `In Progress`, `Done`).  
The state is persisted in **localStorage**, so tasks remain intact even after a page refresh.

---

## Features

-  **Add Task**: Create new tasks with a dynamic title and description.
-  **Delete Task**: Remove tasks from any column.
-  **Move Tasks**: Drag and drop tasks between sections.
-  **UI**: Replicates the given Figma design with a collapsible sidebar and top header.
-  **Filtering**: Filter tasks by category, priority, or any chosen criteria.
-  **State Management**: Uses Redux Toolkit for centralized state and localStorage for persistence.
-  **Dark Mode Support** (via Tailwind).

---

##  Tech Stack

- [React 19](https://react.dev/) (with Vite)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [react-beautiful-dnd](https://github.com/atlassian/react-beautiful-dnd)
- Local Storage (state persistence)

---


---

## ⚙️ Installation & Setup

1. Clone the repository:
```bash
   git clone https://github.com/your-username/task-dashboard.git
   cd task-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```
4. Open in browser:
http://localhost:5173

## Usage
- Add a task: Use the form inside a column to create a new task.
- Delete a task: Click ❌ on a task card.
- Move a task: Drag and drop a task between columns.
- Filter tasks: Use the filter options in the header (if implemented).
- Persistence: Refresh the page — tasks remain saved.