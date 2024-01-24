import React from 'react'
import { v4 as uuidv4 } from 'uuid'

const AddTask = ({ updateTasks }) => {

    const addTaskHandler = async () => {
        try {
            const taskId = uuidv4()

            const response = await fetch('http://localhost:5001/tasks/', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                    id: taskId,
                    taskName: '',
                    status: 'Not started',
                    priority: 'Low',
                    date: '',
                    description: 'Enter description'

                })
            })

            updateTasks()
        } catch (err) {
            console.log('error', err);
        }
    }


    return (
        <div className='add__task'>
            <button onClick={addTaskHandler}>+</button>
        </div>
    )
}

export default AddTask