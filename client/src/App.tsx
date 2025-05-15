import { useEffect, useState } from 'react'
import './App.css'
import type { Todo } from './types'
import { socket } from './socket'
import {v4 as uuidv4} from 'uuid'

function App() {
const [todos ,setTodos] = useState<Todo[]>([])
const [text ,setText] = useState<string>('')
useEffect(()=>{
  socket.on('todos',(data : Todo[])=>{
    setTodos(data)
  })
  return()=>{
    socket.off('todos')
  }
},[])
const handleAdd = ()=>{
  if(text.trim()){
    const newTodo : Todo = {id :uuidv4(), text , completed : false}
    socket.emit('createTodo',newTodo)
    setText('')
  }
}

const handleDelete = (id:string)=>{
  console.log('delete',id)
  socket.emit('deleteTodo',id)
}
const handleTogle = (id: string )=>{
  const todo = todos.find(t=> t.id === id)
  if(todo){
    socket.emit('updateTodo',{...todo,completed : !todo.completed})
  }
}

  return (
     <div className="app">
      <h1 className="title">Socket Todo App</h1>

      <div className="input-group">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="input"
          placeholder="Enter todo..."
        />
        <button onClick={handleAdd} className="add-btn">Add Todo</button>
      </div>

      <ul className="todo-list">
        {todos.length > 0 ? (
          todos.map((todo) => (
            <li key={todo.id} className="todo-item">
              <span
                onClick={() => handleTogle(todo.id)}
                className={`todo-text ${todo.completed ? 'completed' : ''}`}
              >
                {todo.text}
              </span>
              <div className="actions">
                <button onClick={() => handleDelete(todo.id)} className="delete-btn">Delete</button>
                <button onClick={() => handleTogle(todo.id)} className="toggle-btn">
                  {todo.completed ? 'Not Completed' : 'Completed'}
                </button>
              </div>
            </li>
          ))
        ) : (
          <p className="empty-message">Add some todos!</p>
        )}
      </ul>
    </div>
  )
}

export default App
