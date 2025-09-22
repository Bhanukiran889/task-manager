import React from 'react'
import { useDispatch } from 'react-redux'
import { addTask } from '../store/tasksSlice'

const SampleDataButton = () => {
  const dispatch = useDispatch()

  const addSampleData = () => {
    const sampleTasks = [
      {
        columnId: 'todo',
        title: 'Brainstorming',
        description: 'Generate ideas for the mobile app features and user experience',
        priority: 'low'
      },
      {
        columnId: 'todo',
        title: 'Research',
        description: 'Conduct market research and competitor analysis',
        priority: 'high'
      },
      {
        columnId: 'todo',
        title: 'Wireframes',
        description: 'Create low-fidelity wireframes for key screens',
        priority: 'medium'
      },
      {
        columnId: 'todo',
        title: 'Design System',
        description: 'Develop a comprehensive design system and component library',
        priority: 'low'
      },
      {
        columnId: 'inprogress',
        title: 'User Stories',
        description: 'Write detailed user stories and acceptance criteria',
        priority: 'high'
      },
      {
        columnId: 'inprogress',
        title: 'Prototype',
        description: 'Create interactive prototypes for user testing',
        priority: 'medium'
      },
      {
        columnId: 'inprogress',
        title: 'Database Design',
        description: 'Design the database schema and data models',
        priority: 'low'
      },
      {
        columnId: 'done',
        title: 'Project Setup',
        description: 'Initialize the project repository and development environment',
        priority: 'completed'
      },
      {
        columnId: 'done',
        title: 'Team Onboarding',
        description: 'Onboard team members and set up communication channels',
        priority: 'completed'
      }
    ]

    sampleTasks.forEach(task => {
      dispatch(addTask(task))
    })
  }

  return (
    <button
      onClick={addSampleData}
      className="bg-purple-400 text-black px-4 py-2 rounded-lg hover:bg-purple-300 transition-color"
    >
      Add Sample Data
    </button>
  )
}

export default SampleDataButton
