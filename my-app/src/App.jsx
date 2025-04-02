import './App.css'
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3000/api/todos').then((res) => setTodos(res.data));
  }, []);

  const addTodo = () => {
    axios.post('http://localhost:3000/api/todos', { text }).then((res) => {
      setTodos([...todos, res.data]);
      setText('');
    });
  };

  const deleteTodo = (id) => {
    axios.delete(`http://localhost:3000/api/todos/${id}`).then(() => {
      setTodos(todos.filter((todo) => todo._id !== id));
    });
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>To-Do List</h1>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a to-do"
      />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>
            {todo.text} <button onClick={() => deleteTodo(todo._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

