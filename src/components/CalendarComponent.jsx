import '../assets/styles/css/calendar.css'
import Calendar from 'react-calendar'
import { format } from 'date-fns'

const CalendarComponent = ({ setDate, task }) => {

    const setDatum = async (date) => {
        try {
            const response = await fetch(`http://localhost:5001/tasks/${task.id}`, {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    taskName: task.taskName,
                    status: task.status,
                    priority: task.priority,
                    date: date,
                    description: task.description
                })
            })
        } catch (err) {
            console.log('Failed to set date', err);
        }
    }

    return (
        <div style={{ position: 'absolute', bottom: '-15%', left: '5%', zIndex: '9999' }}>

            <Calendar onChange={e => {
                const date = format(e, 'dd.MM.yyyy')
                setDate(date)
                setDatum(date)
                }} locale='en-US' />
        </div>
    )
}

export default CalendarComponent