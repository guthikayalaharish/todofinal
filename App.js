import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';        // Ensure this is the correct path
import Register from './Register';  // Ensure this is the correct path
import TodoList from './TodoList';  // Ensure this is the correct path

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />               {/* Login route */}
          <Route path="/register" element={<Register />} />   {/* Register route */}
          <Route path="/todos" element={<TodoList />} />      {/* Todo List route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
