'use client'

// React Imports
import type { RefObject } from 'react'
import { useEffect, useState } from 'react'

// Third-party imports
import { useDragAndDrop } from '@formkit/drag-and-drop/react'
import { animations } from '@formkit/drag-and-drop'
import { useDispatch, useSelector } from 'react-redux'

// Type Imports
import type { RootState } from '@/redux'

// Slice Imports
import { addColumn, updateColumns } from '@/redux/slices/interview'

// Component Imports
import InterviewList from './InterviewList'
import NewColumn from './NewColumn'
import InterviewDrawer from './InterviewDrawer'

const Cardlist = () => {
  // State
  const [drawerOpen, setDrawerOpen] = useState(false)

  // Hooks
  const interviewStore = useSelector((state: RootState) => state.interviewReducer)
  const dispatch = useDispatch()

  const [boardRef, columns, setColumns] = useDragAndDrop(interviewStore.columns, {
    plugins: [animations()],
    dragHandle: '.list-handle'
  })

  // Add New Column
  const addNewColumn = (title: string) => {
    const maxId = Math.max(...interviewStore.columns.map(column => column.id))

    dispatch(addColumn(title))
    setColumns([...columns, { id: maxId + 1, title, taskIds: [] }])
  }

  // To get the current task for the drawer
  const currentTask = interviewStore.tasks.find(task => task.id === interviewStore.currentTaskId)

  // Update Columns on Drag and Drop
  useEffect(() => {
    if (columns !== interviewStore.columns) dispatch(updateColumns(columns))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [columns])

  return (
    <div className='flex items-start gap-6'>
      <div ref={boardRef as RefObject<HTMLDivElement>} className='flex gap-6'>
        {columns.map(column => (
          <InterviewList
            key={column.id}
            dispatch={dispatch}
            column={column}
            store={interviewStore}
            setDrawerOpen={setDrawerOpen}
            columns={columns}
            setColumns={setColumns}
            currentTask={currentTask}
            tasks={column.taskIds.map(taskId => interviewStore.tasks.find(task => task.id === taskId))}
          />
        ))}
      </div>
      <NewColumn addNewColumn={addNewColumn} />
      {currentTask && (
        <InterviewDrawer
          task={currentTask}
          drawerOpen={drawerOpen}
          setDrawerOpen={setDrawerOpen}
          dispatch={dispatch}
          columns={columns}
          setColumns={setColumns}
        />
      )}
    </div>
  )
}

export default Cardlist
