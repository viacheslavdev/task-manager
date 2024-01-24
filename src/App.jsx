import TaskCard from "./components/taskCard"
import "./assets/styles/css/app.css"
import { useState, useEffect } from "react"
import AddTask from "./components/AddTask";

function App() {

    const [data, setData] = useState('');

    const getData = async () => {
        try {
            const response = await fetch('http://localhost:5001/tasks/');
            const result = await response.json();
            setData(result);

        } catch (err) {
            console.log('Fetch error:', err);
        }
    };

    useEffect(() => {
        getData();
    }, []);


  return (
    <section>
      {data && data.map((task) => (
        <TaskCard key={task.id} task={task} updateTasks={getData} />
      )) }
      <AddTask updateTasks={getData}/>
    </section>
  )
}

export default App
