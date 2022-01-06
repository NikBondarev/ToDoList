import { useState } from 'react';
import TodoItem from './ToDos/ToDosItems/TodoItem'
import './App.css';

function App() {

  let tasks;
 

   
  localStorage.length < 1 ? tasks = [] : tasks = JSON.parse(localStorage.getItem('tasks'));
  const [todoItems, setTodoItems] = useState(tasks);
  const [inputValue, setInputValue] = useState('');
  const handleInput = e => setInputValue(e.target.value);

  const addTask = () =>{
    let items = JSON.parse(JSON.stringify(todoItems));
    items.push({
      id : items.length + 1,
      text : inputValue,
      completed : false
    })
    localStorage.setItem('tasks', JSON.stringify(items));
    setInputValue('');
    setTodoItems(items);
  }
  const handleChange = id => {
    const items = JSON.parse(JSON.stringify(todoItems));
    const index = items.findIndex(item => item.id === id);
    if(items[index].completed===false){
      items[index].completed = true;
    }else{
      items[index].completed = false;
    }
    localStorage.setItem('tasks', JSON.stringify(items));
    setTodoItems(items);
  }
  const removeTask = id => {
    const items = JSON.parse(JSON.stringify(todoItems));
    const index = items.findIndex(item => item.id === id);
    items.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(items));
    setTodoItems(items);
  }

  let activeTasks = [];
  let completedTasks =[];
  for(const item of todoItems){
    if(item.completed){
      completedTasks.push(item);
    }else{
      activeTasks.push(item);
    }
  }
  const finalTasks = [...activeTasks, ...completedTasks].map(item => {
    return(
      <TodoItem
        key = {item.id}
        description = {item.text}
        completed = {item.completed}
        handleChange = {() => handleChange(item.id)}
        remove = { () => removeTask(item.id)}
      />
    )
  } )
    
  
  return (
    
    <div className="App">
      <div className='d-flex container'>
        <div className='text-area'>
          <input type = "text"
            value={inputValue}
            placeholder='Type your Task'
            onChange={handleInput}
            className='cases'
          />
          <button onClick = {addTask} className='btn-add'>  
            Add a new Task
          </button>
        </div>
        <div className='tasks'>
          {finalTasks}
        </div>
      </div>
    </div>
  );
}

export default App;
