import React, {useEffect, useState} from 'react'

const colors = {
    'Critical': 'black',
    'High': 'purple',
    'Medium': 'blue',
    'Low' : 'rgb(87, 155, 252)'
}

const EditPriority = ({show, setShow, task}) => {
    const [buttonStyle, setButtonStyle] = useState(task.priority)

    const setPriority = async (priority) => {
        try {
            const response = await fetch(`http://localhost:5001/tasks/${task.id}`, {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    taskName: task.taskName,
                    status: task.status,
                    priority: buttonStyle,
                    date: task.date,
                    description: task.description
                })
            })
        } catch (err) {
            console.log('Failed to set priority', err);
        }
    }   

    useEffect(() => {
        setPriority(buttonStyle)
    }, [buttonStyle])

  return (
    <div onClick={() => setShow()} style={{backgroundColor: colors[buttonStyle]}}>
            {buttonStyle}
            <div className='edit__priority' style={{ display: show ? '' : 'none' }}>
                <ul className='edit__list'>
                    <li style={{ backgroundColor: 'black' }} onClick={() => {
                        setButtonStyle('Critical')
                        setShow()
                        }}>Critical</li>
                    <li style={{ backgroundColor: 'purple' }} onClick={() => {
                        setButtonStyle('High') 
                        setShow()
                    }}>High</li>
                    <li style={{ backgroundColor: 'blue' }} onClick={() =>{ 
                        setButtonStyle('Medium')
                        setShow()
                        }}>Medium</li>
                    <li style={{ backgroundColor: 'rgb(87, 155, 252)' }} onClick={() => {
                        setButtonStyle('Low')
                        setShow()
                    }} >Low</li>
                </ul>
            </div>
        </div>
  )
}

export default EditPriority