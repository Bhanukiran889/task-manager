import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { useDispatch } from 'react-redux'
import { deleteTask } from '../store/tasksSlice'

const TaskCard = ({ task, index, columnId, isDragEnabled = true }) => {
  const dispatch = useDispatch()

  // Safety check: Ensure task has required properties
  if (!task || !task.id) {
    return null
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-pink-100 text-pink-800'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800'
      case 'low':
        return 'bg-orange-100 text-orange-800'
      case 'completed':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const handleDelete = (e) => {
    e.stopPropagation()
    dispatch(deleteTask({ columnId, taskId: task.id }))
  }


  return (
    <Draggable draggableId={task.id} index={index} isDragDisabled={!isDragEnabled}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`
            bg-white rounded-lg border border-gray-200 p-4 mb-3 shadow-sm hover:shadow-md 
            transition-all duration-200 ${isDragEnabled ? 'cursor-grab active:cursor-grabbing' : 'cursor-default'}
            ${snapshot.isDragging ? 'shadow-lg rotate-2 scale-105' : ''}
            ${snapshot.isDragging ? 'border-purple-300' : 'border-gray-200'}
            ${!isDragEnabled ? 'opacity-75' : ''}
          `}
        >
          {/* Priority Label */}
          <div className="flex justify-between items-start mb-3">
            <span className={`
              inline-flex items-center px-2 py-1 rounded-full text-xs font-medium
              ${getPriorityColor(task.priority)}
            `}>
              {task.priority}
            </span>
            <button
              onClick={handleDelete}
              className="text-gray-400 hover:text-red-500 transition-colors text-sm"
              title="Delete task"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Task Title */}
          <h4 className="font-semibold text-gray-800 text-sm leading-tight mb-2">
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
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <span className="text-xs">12</span>
              </div>
              
              <div className="flex items-center gap-1 text-gray-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span className="text-xs">3</span>
              </div>
              
              <button className="text-gray-400 hover:text-gray-600">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  )
}

export default TaskCard
