import React, { useEffect, useState } from 'react';
import '../assets/styles/css/task-card.css';
import EditStatus from './EditStatus';
import EditPriority from './editPriority';
import Calendar from './CalendarComponent';
import AddTask from './AddTask';
import { DeleteTask } from './DeleteTask';

const TaskCard = ({ key, task, updateTasks }) => {

    const [showEditStatus, setShowEditStatus] = useState(false)
    const [showEditPriority, setShowEditPriority] = useState(false)
    const [showCalendar, setShowCalendar] = useState(false)
    const [datum, setDatum] = useState(task.date)
    const [editedTaskName, setEditedTaskName] = useState(task.taskName)
    const [description, setDescription] = useState(task.description)


    const setDataHandler = (data) => {
        if (!data) return
        setDatum(data)
        setShowCalendar(!showCalendar)

    }

    const setTaskName = async () => {
        try {
            const response = await fetch(`http://localhost:5001/tasks/${task.id}`, {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                    taskName: editedTaskName,
                    status: task.status,
                    priority: task.priority,
                    date: task.date,
                    description: task.description
                })
            })


        } catch (err) {
            console.log('Failed to set task name', err);
        }
    }


    const setDescriptionComponent = async (e) => {
        try {
            const description = e.target.innerText
            console.log(description);
            setDescription(description)
            const response = await fetch(`http://localhost:5001/tasks/${task.id}`, {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                    taskName: task.taskName,
                    status: task.status,
                    priority: task.priority,
                    date: task.date,
                    description: description
                })
            })
        } catch (err) {
            console.log('Failed to desciption', err);
        }
    }




    return (
        <div className='card'>
            <div className='card__wrapper'>
                <input
                    className='card__name'
                    placeholder='Enter task name'
                    value={editedTaskName}
                    onChange={(e) => setEditedTaskName(e.target.value)}
                    onBlur={setTaskName}
                />
                <ul className='status'>
                    <li>Status</li>
                    <EditStatus show={showEditStatus} setShow={() => setShowEditStatus(!showEditStatus)} task={task} />

                </ul>
                <ul className='priority'>
                    <li>Priority</li>
                    <EditPriority show={showEditPriority} setShow={() => setShowEditPriority(!showEditPriority)} task={task} />
                </ul>
                <ul className='date'>
                    <li>Due date</li>
                    <div className='date__element' onClick={() => setShowCalendar(!showCalendar)}>{datum}</div>
                </ul>
                <div className='description'>
                    <div contentEditable='true' onBlur={setDescriptionComponent} suppressContentEditableWarning={true}>{description}</div>
                </div>
                {showCalendar && <Calendar setDate={setDataHandler} task={task} />}
                <DeleteTask task={task} updateTasks={updateTasks} />
            </div>

        </div>
    )
}

export default TaskCard