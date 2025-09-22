import React, { useCallback, useEffect, useState } from "react";
import { DragDropContext } from "@hello-pangea/dnd";
import { useDispatch, useSelector } from "react-redux";
import {
  moveTask,
  reorderWithinColumn,
  ensureColumnsExist,
} from "../store/tasksSlice";
import Column from "./Column";
import Profiles from "./Profiles";

const Board = () => {
  const dispatch = useDispatch();
  const { columns } = useSelector((state) => state.tasks);
  const [isDragEnabled, setIsDragEnabled] = useState(false);

  // Ensure columns exist on component mount
  useEffect(() => {
    dispatch(ensureColumnsExist());
    // Enable drag after ensuring columns are rendered
    const timer = setTimeout(() => {
      setIsDragEnabled(true);
    }, 200);
    return () => clearTimeout(timer);
  }, [dispatch]);

  // Re-enable drag when columns change
  useEffect(() => {
    if (columns && Object.keys(columns).length > 0) {
      const timer = setTimeout(() => {
        setIsDragEnabled(true);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [columns]);

  const onDragEnd = useCallback(
    (result) => {
      const { destination, source } = result;

      console.log("Drag ended:", {
        source,
        destination,
        columns,
        isDragEnabled,
      });

      // If drag is disabled, do nothing
      if (!isDragEnabled) {
        console.log("Drag is disabled, cancelling");
        return;
      }

      // If there's no destination, do nothing
      if (!destination) {
        console.log("No destination, cancelling drag");
        return;
      }

      // If dropped in the same position, do nothing
      if (
        destination.droppableId === source.droppableId &&
        destination.index === source.index
      ) {
        console.log("Same position, cancelling drag");
        return;
      }

      // If moving within the same column, reorder
      if (source.droppableId === destination.droppableId) {
        console.log("Reordering within column:", source.droppableId);
        dispatch(
          reorderWithinColumn({
            droppableId: source.droppableId,
            sourceIndex: source.index,
            destIndex: destination.index,
          })
        );
      } else {
        // If moving between columns, move the task
        console.log(
          "Moving between columns:",
          source.droppableId,
          "->",
          destination.droppableId
        );
        dispatch(
          moveTask({
            source: {
              droppableId: source.droppableId,
              index: source.index,
            },
            destination: {
              droppableId: destination.droppableId,
              index: destination.index,
            },
          })
        );
      }
    },
    [dispatch, columns, isDragEnabled]
  );

  return (
    <div className="flex-1 bg-white min-h-screen flex flex-col">
      <DragDropContext onDragEnd={onDragEnd} isDragDisabled={!isDragEnabled}>
        {/* Project Header */}
        <div className="px-6 py-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <h1 className="text-4xl font-bold text-gray-900">Mobile App</h1>
              <div className="flex items-center gap-1">
                <button className=" hover:bg-gray-100 rounded-lg">
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.25 27.5H18.75C25 27.5 27.5 25 27.5 18.75V11.25C27.5 5 25 2.5 18.75 2.5H11.25C5 2.5 2.5 5 2.5 11.25V18.75C2.5 25 5 27.5 11.25 27.5Z"
                      fill="#5030E5"
                      fill-opacity="0.2"
                    />
                    <path
                      d="M16.1375 9.80001L9.64998 16.2875C9.39998 16.5375 9.16249 17.025 9.11249 17.375L8.76249 19.85C8.63749 20.75 9.26249 21.375 10.1625 21.25L12.6375 20.9C12.9875 20.85 13.475 20.6125 13.725 20.3625L20.2125 13.875C21.325 12.7625 21.8625 11.4625 20.2125 9.81251C18.5625 8.15001 17.2625 8.67501 16.1375 9.80001Z"
                      stroke="#5030E5"
                      stroke-width="1.5"
                      stroke-miterlimit="10"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M15.2125 10.725C15.7625 12.6875 17.3 14.2375 19.275 14.7875"
                      stroke="#5030E5"
                      stroke-width="1.5"
                      stroke-miterlimit="10"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </button>
                <button className=" hover:bg-gray-100 rounded-lg">
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.25 27.5H18.75C25 27.5 27.5 25 27.5 18.75V11.25C27.5 5 25 2.5 18.75 2.5H11.25C5 2.5 2.5 5 2.5 11.25V18.75C2.5 25 5 27.5 11.25 27.5Z"
                      fill="#5030E5"
                      fill-opacity="0.2"
                    />
                    <path
                      d="M18.0002 10.683C20.3829 10.683 22.3166 12.6175 22.3166 15.0003C22.3164 17.383 20.3828 19.3167 18.0002 19.3167H16.9933C16.6372 19.3167 16.3429 19.0225 16.3429 18.6664C16.3431 18.3103 16.6373 18.0169 16.9933 18.0169H18.0002C19.6638 18.0168 21.0166 16.664 21.0168 15.0003C21.0168 13.3366 19.6639 11.9838 18.0002 11.9837H17.0002C16.644 11.9837 16.3498 11.6895 16.3498 11.3333C16.3498 10.9785 16.636 10.683 17.0002 10.683H18.0002Z"
                      fill="#5030E5"
                      stroke="#5030E5"
                      stroke-width="0.3"
                    />
                    <path
                      d="M13.0003 10.683C13.3564 10.6831 13.6497 10.9773 13.6497 11.3333C13.6497 11.6894 13.3564 11.9836 13.0003 11.9837H12.0003C10.3365 11.9837 8.98373 13.3365 8.98373 15.0003C8.9839 16.664 10.3366 18.0169 12.0003 18.0169H13.0003C13.3562 18.0171 13.6496 18.3104 13.6497 18.6664C13.6497 19.0224 13.3564 19.3166 13.0003 19.3167H12.0003C9.61759 19.3167 7.68312 17.383 7.68295 15.0003C7.68295 12.6175 9.61749 10.683 12.0003 10.683H13.0003Z"
                      fill="#5030E5"
                      stroke="#5030E5"
                      stroke-width="0.3"
                    />
                    <path
                      d="M17.6663 14.3496C18.0225 14.3496 18.3167 14.6438 18.3167 15C18.3167 15.3562 18.0225 15.6504 17.6663 15.6504H12.3333C11.9772 15.6504 11.6829 15.3562 11.6829 15C11.6829 14.6438 11.9772 14.3496 12.3333 14.3496H17.6663Z"
                      fill="#5030E5"
                      stroke="#5030E5"
                      stroke-width="0.3"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 px-4 py-2 bg-white text-purple-600 rounded-lg hover:bg-purple-100">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 9H12"
                    stroke="#5030E5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M9 12V6"
                    stroke="#5030E5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M6.75 16.5H11.25C15 16.5 16.5 15 16.5 11.25V6.75C16.5 3 15 1.5 11.25 1.5H6.75C3 1.5 1.5 3 1.5 6.75V11.25C1.5 15 3 16.5 6.75 16.5Z"
                    fill="#5030E5"
                    fill-opacity="0.2"
                  />
                </svg>

                <span className="text-sm font-medium">Invite</span>
              </button>
              <Profiles />
            </div>
          </div>

          {/* Action Bar */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.6 1H12.4C13.1333 1 13.7333 1.6 13.7333 2.33333V3.8C13.7333 4.33333 13.4 5 13.0667 5.33333L10.2 7.86667C9.8 8.2 9.53333 8.86667 9.53333 9.4V12.2667C9.53333 12.6667 9.26666 13.2 8.93333 13.4L8 14C7.13333 14.5333 5.93333 13.9333 5.93333 12.8667V9.33333C5.93333 8.86667 5.66666 8.26667 5.4 7.93333L2.86666 5.26667C2.53333 4.93333 2.26666 4.33333 2.26666 3.93333V2.4C2.26666 1.6 2.86666 1 3.6 1Z"
                    stroke="#787486"
                    stroke-width="1.3"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>

                <span className="text-sm text-gray-600">Filter</span>
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
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.6 1H12.4C13.1333 1 13.7333 1.6 13.7333 2.33333V3.8C13.7333 4.33333 13.4 5 13.0667 5.33333L10.2 7.86667C9.8 8.2 9.53333 8.86667 9.53333 9.4V12.2667C9.53333 12.6667 9.26666 13.2 8.93333 13.4L8 14C7.13333 14.5333 5.93333 13.9333 5.93333 12.8667V9.33333C5.93333 8.86667 5.66666 8.26667 5.4 7.93333L2.86666 5.26667C2.53333 4.93333 2.26666 4.33333 2.26666 3.93333V2.4C2.26666 1.6 2.86666 1 3.6 1Z"
                    stroke="#787486"
                    stroke-width="1.3"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>

                <span className="text-sm text-gray-600">Today</span>
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
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            </div>

            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.1064 7.74666C6.0864 7.74666 6.07307 7.74666 6.05307 7.74666C6.01973 7.73999 5.97307 7.73999 5.93307 7.74666C3.99973 7.68666 2.53973 6.16666 2.53973 4.29333C2.53973 2.38666 4.09307 0.833328 5.99973 0.833328C7.9064 0.833328 9.45973 2.38666 9.45973 4.29333C9.45307 6.16666 7.9864 7.68666 6.1264 7.74666C6.11973 7.74666 6.11307 7.74666 6.1064 7.74666ZM5.99973 1.83333C4.6464 1.83333 3.53973 2.93999 3.53973 4.29333C3.53973 5.62666 4.57973 6.69999 5.9064 6.74666C5.9464 6.73999 6.03307 6.73999 6.11973 6.74666C7.4264 6.68666 8.45307 5.61333 8.45973 4.29333C8.45973 2.93999 7.35307 1.83333 5.99973 1.83333Z"
                    fill="#787486"
                  />
                  <path
                    d="M11.0264 7.83334C11.0064 7.83334 10.9864 7.83334 10.9664 7.82667C10.6931 7.85334 10.4131 7.66001 10.3864 7.38667C10.3597 7.11334 10.5264 6.86667 10.7997 6.83334C10.8797 6.82667 10.9664 6.82667 11.0397 6.82667C12.0131 6.77334 12.7731 5.97334 12.7731 4.99334C12.7731 3.98001 11.9531 3.16 10.9397 3.16C10.6664 3.16667 10.4397 2.94001 10.4397 2.66667C10.4397 2.39334 10.6664 2.16667 10.9397 2.16667C12.4997 2.16667 13.7731 3.44001 13.7731 5.00001C13.7731 6.53334 12.5731 7.77334 11.0464 7.83334C11.0397 7.83334 11.0331 7.83334 11.0264 7.83334Z"
                    fill="#787486"
                  />
                  <path
                    d="M6.11307 15.0333C4.80641 15.0333 3.49307 14.7 2.49974 14.0333C1.57307 13.42 1.06641 12.58 1.06641 11.6667C1.06641 10.7533 1.57307 9.90667 2.49974 9.28667C4.49974 7.96001 7.73974 7.96001 9.72641 9.28667C10.6464 9.90001 11.1597 10.74 11.1597 11.6533C11.1597 12.5667 10.6531 13.4133 9.72641 14.0333C8.72641 14.7 7.41974 15.0333 6.11307 15.0333ZM3.05307 10.1267C2.41307 10.5533 2.06641 11.1 2.06641 11.6733C2.06641 12.24 2.41974 12.7867 3.05307 13.2067C4.71307 14.32 7.51307 14.32 9.17307 13.2067C9.81307 12.78 10.1597 12.2333 10.1597 11.66C10.1597 11.0933 9.80641 10.5467 9.17307 10.1267C7.51307 9.02 4.71307 9.02 3.05307 10.1267Z"
                    fill="#787486"
                  />
                  <path
                    d="M12.2264 13.8333C11.9931 13.8333 11.7864 13.6733 11.7397 13.4333C11.6864 13.16 11.8597 12.9 12.1264 12.84C12.5464 12.7533 12.9331 12.5867 13.2331 12.3533C13.6131 12.0667 13.8197 11.7067 13.8197 11.3267C13.8197 10.9467 13.6131 10.5867 13.2397 10.3067C12.9464 10.08 12.5797 9.92 12.1464 9.82C11.8797 9.76 11.7064 9.49333 11.7664 9.22C11.8264 8.95333 12.0931 8.78 12.3664 8.84C12.9397 8.96666 13.4397 9.19333 13.8464 9.50666C14.4664 9.97333 14.8197 10.6333 14.8197 11.3267C14.8197 12.02 14.4597 12.68 13.8397 13.1533C13.4264 13.4733 12.9064 13.7067 12.3331 13.82C12.2931 13.8333 12.2597 13.8333 12.2264 13.8333Z"
                    fill="#787486"
                  />
                </svg>

                <span className="text-sm font-medium">Share</span>
              </button>

              <div className="flex border border-gray-300 rounded-lg">
                <button className="p-2 bg-purple-600 text-white rounded-l-lg">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15.925 11.125L4.075 11.125C2.95 11.125 2.5 11.6 2.5 12.8L2.5 15.825C2.5 17.025 2.95 17.5 4.075 17.5L15.925 17.5C17.05 17.5 17.5 17.025 17.5 15.825L17.5 12.8C17.5 11.6 17.05 11.125 15.925 11.125Z"
                      fill="white"
                    />
                    <path
                      d="M15.925 2.5L4.075 2.5C2.95 2.5 2.5 2.975 2.5 4.175L2.5 7.2C2.5 8.39167 2.95 8.875 4.075 8.875L15.925 8.875C17.05 8.875 17.5 8.4 17.5 7.2L17.5 4.175C17.5 2.975 17.05 2.5 15.925 2.5Z"
                      fill="white"
                    />
                  </svg>
                </button>
                <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-r-lg">
                  <svg
                    width="21"
                    height="21"
                    viewBox="0 0 21 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15.1949 7.99994C16.5756 7.99994 17.6949 6.88065 17.6949 5.49994C17.6949 4.11923 16.5756 2.99994 15.1949 2.99994C13.8142 2.99994 12.6949 4.11923 12.6949 5.49994C12.6949 6.88065 13.8142 7.99994 15.1949 7.99994Z"
                      stroke="#787486"
                      stroke-width="1.5"
                      stroke-miterlimit="10"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M5.50001 7.99994C6.88072 7.99994 8 6.88065 8 5.49994C8 4.11923 6.88072 2.99994 5.50001 2.99994C4.11929 2.99994 3 4.11923 3 5.49994C3 6.88065 4.11929 7.99994 5.50001 7.99994Z"
                      stroke="#787486"
                      stroke-width="1.5"
                      stroke-miterlimit="10"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M15.1949 17.9999C16.5756 17.9999 17.6949 16.8807 17.6949 15.4999C17.6949 14.1192 16.5756 12.9999 15.1949 12.9999C13.8142 12.9999 12.6949 14.1192 12.6949 15.4999C12.6949 16.8807 13.8142 17.9999 15.1949 17.9999Z"
                      stroke="#787486"
                      stroke-width="1.5"
                      stroke-miterlimit="10"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M5.50001 17.9999C6.88072 17.9999 8 16.8807 8 15.4999C8 14.1192 6.88072 12.9999 5.50001 12.9999C4.11929 12.9999 3 14.1192 3 15.4999C3 16.8807 4.11929 17.9999 5.50001 17.9999Z"
                      stroke="#787486"
                      stroke-width="1.5"
                      stroke-miterlimit="10"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Board Content */}
        <div className="flex-1 p-6">
          <div className="flex gap-6 h-full w-full">
            {columns && Object.keys(columns).length > 0 ? (
              Object.values(columns).map((column) => (
                <Column
                  key={column.id}
                  column={column}
                  isDragEnabled={isDragEnabled}
                />
              ))
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl mb-4">📋</div>
                  <h2 className="text-xl font-semibold text-gray-600">
                    Loading columns...
                  </h2>
                </div>
              </div>
            )}
          </div>
        </div>
      </DragDropContext>
    </div>
  );
};

export default Board;
