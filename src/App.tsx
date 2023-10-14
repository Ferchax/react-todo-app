import { useState } from 'react'
import './App.css'

function App() {
  const [model, setModel] = useState<TaskModel>({
    task: '',
    completed: false
  });
  const [tasks, setTasks] = useState<TaskModel[]>([]);
  const [errors, setErrors] = useState({
    task: false
  });

  function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if(model.task.trim()) {
      addTask();
      resetModel();
    }
  }

  function addTask() {
    console.log('addTask');
    setTasks(prevTasks => [...prevTasks, model]);
  }

  function resetModel() {
    setModel({ task:'', completed:false });
  }

  function completed(item: TaskModel) {
    console.log('completed');
    const idx = tasks.indexOf(item);
    setTasks(prevTasks => prevTasks.map((task, i) => i == idx ? { ...task, completed: !task.completed } : task));
  }

  function remove(item: TaskModel) {
    console.log('remove');
    const idx = tasks.indexOf(item);
    setTasks(prevTasks => prevTasks.filter((item, i) => i != idx));
  }

  function onInputHandler(e:  React.ChangeEvent<HTMLInputElement>) {
    const taskValue = (e.target as HTMLInputElement).value;
    setModel({task:taskValue, completed:false});
    setErrors({...errors, task:!taskValue.length})
  }

  return (
    <div className="main">
      <h1>ToDo App</h1>

      <form onSubmit={submitHandler} autoComplete="off">
        <input type="text" name="task" placeholder="Add a task" autoFocus
          onInput={onInputHandler} 
          value={model.task} />
        <button type="submit" disabled={!model.task.length}>Add</button>
        { errors.task && <div className="error">Task is required</div> }
      </form>
  
      <p>Things to do...</p>
      <ul>
        {
          tasks.map((item, index) => 
            <li key={index} className={item.completed ? 'completed' : ''}>
              <span onClick={() => completed(item)} className="cursor">&#9989;</span> 
              {item.task} 
              <span onClick={() => remove(item)} className="cursor">&#10062;</span>
            </li>)
        }
      </ul>
    </div>
  )
}

interface TaskModel {
  task: string,
  completed: boolean
}

export default App
