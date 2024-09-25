import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');

  useEffect(() => {
    // Fetch existing tasks from the server (if applicable)
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/tasks'); // Adjust the API endpoint as needed
      setTasks(response.data); // Assuming the response data is an array of tasks
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!task) return; // Prevent adding empty tasks

    try {
      const response = await axios.post('http://localhost:5000/api/tasks', { task });
      setTasks([...tasks, response.data]); // Assuming the response contains the new task
      setTask(''); // Clear input field
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  return (
    <div>
      <h2>Todo List</h2>
      <form onSubmit={handleAddTask}>
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Add a new task"
          required
        />
        <button type="submit">Add Task</button>
      </form>
      <ul>
        {tasks.map((t, index) => (
          <li key={index}>{t.task}</li> // Adjust according to your task structure
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
