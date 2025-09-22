import React from "react";
import { Draggable } from "@hello-pangea/dnd";
import { useDispatch } from "react-redux";
import { deleteTask } from "../store/tasksSlice";

const TaskCard = ({ task, index, columnId, isDragEnabled = true }) => {
  const dispatch = useDispatch();

  // Safety check: Ensure task has required properties
  if (!task || !task.id) {
    return null;
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-pink-100 text-pink-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-orange-100 text-orange-800";
      case "completed":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    dispatch(deleteTask({ columnId, taskId: task.id }));
  };

  return (
    <Draggable
      draggableId={task.id}
      index={index}
      isDragDisabled={!isDragEnabled}
    >
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`
            bg-white rounded-lg border border-gray-200 p-4 mb-3 shadow-sm hover:shadow-md 
            transition-all duration-200 ${
              isDragEnabled
                ? "cursor-grab active:cursor-grabbing"
                : "cursor-default"
            }
            ${snapshot.isDragging ? "shadow-lg rotate-2 scale-105" : ""}
            ${snapshot.isDragging ? "border-purple-300" : "border-gray-200"}
            ${!isDragEnabled ? "opacity-75" : ""}
          `}
        >
          {/* Priority Label */}
          <div className="flex justify-between items-start mb-3">
            <span
              className={`
              inline-flex items-center px-2 py-1 rounded-full text-xs font-medium
              ${getPriorityColor(task.priority)}
            `}
            >
              {task.priority}
            </span>
            <button
              onClick={handleDelete}
              className="text-gray-400 hover:text-red-500 transition-colors text-sm"
              title="Delete task"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Task Title */}
          <h4 className="font-semibold text-gray-800 text-md  leading-tight mb-2">
            {task.title}
          </h4>

          {/* Task Description */}
          {task.description && (
            <p className="text-gray-600 text-xs mb-4 leading-relaxed">
              {task.description}
            </p>
          )}

          {/* Task Footer */}
          <div className="flex justify-between items-center">
            {/* User Avatars */}
            <div className="flex -space-x-1">
              <div className="w-6 h-6 bg-blue-400 rounded-full border-2 border-white flex items-center justify-center">
                <span className="text-white text-xs font-medium">A</span>
              </div>
              <div className="w-6 h-6 bg-green-400 rounded-full border-2 border-white flex items-center justify-center">
                <span className="text-white text-xs font-medium">B</span>
              </div>
            </div>

            {/* Action Icons */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 text-gray-500">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 15.2067C7.54 15.2067 7.10667 14.9733 6.8 14.5667L5.8 13.2333C5.78 13.2067 5.7 13.1733 5.66667 13.1667H5.33334C2.55334 13.1667 0.833336 12.4133 0.833336 8.66667V5.33334C0.833336 2.38667 2.38667 0.833336 5.33334 0.833336H10.6667C13.6133 0.833336 15.1667 2.38667 15.1667 5.33334V8.66667C15.1667 11.6133 13.6133 13.1667 10.6667 13.1667H10.3333C10.28 13.1667 10.2333 13.1933 10.2 13.2333L9.2 14.5667C8.89334 14.9733 8.46 15.2067 8 15.2067ZM5.33334 1.83334C2.94667 1.83334 1.83334 2.94667 1.83334 5.33334V8.66667C1.83334 11.68 2.86667 12.1667 5.33334 12.1667H5.66667C6.00667 12.1667 6.39334 12.36 6.6 12.6333L7.6 13.9667C7.83334 14.2733 8.16667 14.2733 8.4 13.9667L9.4 12.6333C9.62 12.34 9.96667 12.1667 10.3333 12.1667H10.6667C13.0533 12.1667 14.1667 11.0533 14.1667 8.66667V5.33334C14.1667 2.94667 13.0533 1.83334 10.6667 1.83334H5.33334Z"
                    fill="#787486"
                  />
                  <path
                    d="M8 8C7.62667 8 7.33334 7.7 7.33334 7.33333C7.33334 6.96666 7.63334 6.66666 8 6.66666C8.36667 6.66666 8.66667 6.96666 8.66667 7.33333C8.66667 7.7 8.37334 8 8 8Z"
                    fill="#787486"
                  />
                  <path
                    d="M10.6667 8C10.2933 8 10 7.7 10 7.33333C10 6.96666 10.3 6.66666 10.6667 6.66666C11.0333 6.66666 11.3333 6.96666 11.3333 7.33333C11.3333 7.7 11.04 8 10.6667 8Z"
                    fill="#787486"
                  />
                  <path
                    d="M5.33333 8C4.96 8 4.66666 7.7 4.66666 7.33333C4.66666 6.96666 4.96666 6.66666 5.33333 6.66666C5.7 6.66666 6 6.96666 6 7.33333C6 7.7 5.70666 8 5.33333 8Z"
                    fill="#787486"
                  />
                </svg>

                <span className="text-xs sm:hidden text-gray-500">
                  12 comments
                </span>
              </div>

              <div className="flex items-center gap-1 text-gray-500">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.3334 7.33334V11.3333C14.3334 14 13.6667 14.6667 11.0001 14.6667H4.33341C1.66674 14.6667 1.00008 14 1.00008 11.3333V4.66667C1.00008 2 1.66674 1.33334 4.33341 1.33334H5.33341C6.33341 1.33334 6.55341 1.62667 6.93341 2.13334L7.93341 3.46667C8.18674 3.8 8.33341 4 9.00008 4H11.0001C13.6667 4 14.3334 4.66667 14.3334 7.33334Z"
                    stroke="#787486"
                    stroke-miterlimit="10"
                  />
                  <path
                    d="M5.33333 1.33334H11.3333C12.6667 1.33334 13.3333 2 13.3333 3.33334V4.25334"
                    stroke="#787486"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M9.33333 10H6"
                    stroke="#787486"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>

                <span className="text-xs sm:hidden text-gray-600">3 files</span>
              </div>

              <button className="text-gray-400 hover:text-gray-600">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;
