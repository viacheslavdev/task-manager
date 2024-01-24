import React, { useEffect, useState } from 'react'


const colors = {
    'Done': 'green',
    'Working on': 'orange',
    'Stuck': 'tomato',
    'Not started': 'silver'
}

const EditStatus = ({ show, setShow, task }) => {
    const [buttonStyle, setButtonStyle] = useState(task.status)

    const setStatus = async (status) => {
        try {
            const response = await fetch(`http://localhost:5001/tasks/${task.id}`, {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    taskName: task.taskName,
                    status: buttonStyle,
                    priority: task.priority,
                    date: task.date,
                    description: task.description
                })
            })
        } catch (err) {
            console.log('Failed to set status', err);
        }
    }

    useEffect(() => {
        setStatus(buttonStyle)
    }, [buttonStyle])

    return (
        <div onClick={() => setShow()} style={{ backgroundColor: colors[buttonStyle] }}>
            {buttonStyle}
            <div className='edit__status' style={{ display: show ? '' : 'none' }}>
                <ul className='edit__list'>
                    <li style={{ backgroundColor: 'green' }} onClick={() => {
                        setButtonStyle('Done')
                        setShow()
                    }} >Done</li>
                    <li style={{ backgroundColor: 'orange' }} onClick={() => {
                        setButtonStyle('Working on')
                        setShow()
                    }} >Working on</li>
                    <li style={{ backgroundColor: 'tomato' }} onClick={() => {
                        setButtonStyle('Stuck')
                        setShow()
                    }} >Stuck</li>
                    <li style={{ backgroundColor: 'silver' }} onClick={() => {
                        setButtonStyle('Not started')
                        setShow()
                    }} >Not started</li>
                </ul>
            </div>
        </div>
    )
}

export default EditStatus