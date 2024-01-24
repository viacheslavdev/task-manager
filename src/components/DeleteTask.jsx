import React from 'react'

export const DeleteTask = ({ task, updateTasks }) => {

    const deleteHandler = async () => {
        try {
            const response = await fetch(`http://localhost:5001/tasks/${task.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json',
                }
            })
            updateTasks()

        } catch (err) {
            console.log('Failed to delete the task', err);
        }
    }


    return (
        <div className='delete__task'>
            <button onClick={deleteHandler}>Delete</button>
        </div>
    )
}
