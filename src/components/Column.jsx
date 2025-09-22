import React from 'react'
import { Droppable } from 'react-beautiful-dnd'
import TaskCard from './TaskCard'
import AddTaskForm from './AddTaskForm'

const Column = ({ column, isDragEnabled = true }) => {
  // Safety check: Ensure column has required properties
  if (!column || !column.id) {
    return (
      <div className="flex-1 min-w-80 max-w-96">
        <div className="rounded-lg border-2 bg-gray-50 border-gray-200 min-h-96">
          <div className="p-4 rounded-t-lg bg-gray-100 text-gray-800">
            <h3 className="text-lg font-semibold">Loading...</h3>
          </div>
          <div className="p-4 min-h-80">
            <div className="text-center text-gray-500 py-8">
              <div className="text-4xl mb-2">⏳</div>
              <p>Loading column...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  


  const getDotColor = (columnId) => {
    switch (columnId) {
      case 'todo':
        return 'bg-purple-400'
      case 'inprogress':
        return 'bg-amber-400'
      case 'done':
        return 'bg-green-400'
      default:
        return 'bg-gray-500'
    }
  }

  const getLineColor = (columnId) => {
    switch (columnId) {
      case 'todo':
        return 'bg-purple-400'
      case 'inprogress':
        return 'bg-amber-400'
      case 'done':
        return 'bg-green-400'
      default:
        return 'bg-gray-500'
    }
  }

  return (
    <div className="flex-1 min-w-0">
      <div className={`rounded-4xl border-2 bg-gray-100 border-gray-100 min-h-96 h-full`}>
        {/* Column Header */}
        <div className="p-4 rounded-4xl bg-gray-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-2 h-2 rounded-full bg ${getDotColor(column.id)}`}></div>
              <h3 className="text-lg font-semibold text-gray-800">{column.name}</h3>
              <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                {column.items.length}
              </span>
            </div>
            {column.id === 'todo' && (
              <button className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200">
                <AddTaskForm />
              </button>
            )}
          </div>
          <div className={`w-full h-1 mt-3 rounded-full ${getLineColor(column.id)}`}></div>
        </div>

        {/* Droppable Area */}
        <Droppable droppableId={column.id} key={column.id} isDropDisabled={!isDragEnabled}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={`p-4 min-h-80 h-full transition-colors duration-200 ${
                snapshot.isDraggingOver 
                  ? 'bg-blue-100 bg-opacity-50' 
                  : ''
              }`}
            >
              {column.items.length === 0 ? (
                <div className="text-center text-gray-500 py-8">
                  <p>No tasks yet</p>
                  <p className="text-sm">Drag tasks here or add new ones</p>
                </div>
              ) : (
                column.items.map((task, index) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    index={index}
                    columnId={column.id}
                    isDragEnabled={isDragEnabled}
                  />
                ))
              )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </div>
  )
}

export default Column
