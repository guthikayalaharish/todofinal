const { v4: uuidv4 } = require('uuid');
const db = require('../models/Todo');

// Create Todo
exports.createTodo = (req, res) => {
  const { title, description, status } = req.body;
  const todoId = uuidv4();
  const userId = req.userId;

  db.run(`INSERT INTO todos (id, user_id, title, description, status) VALUES (?, ?, ?, ?, ?)`, 
    [todoId, userId, title, description, status || 'pending'], 
    (err) => {
      if (err) return res.status(500).json({ message: 'Error creating todo' });
      res.status(200).json({ message: 'Todo created successfully' });
    }
  );
};

// Get All Todos
exports.getTodos = (req, res) => {
  const userId = req.userId;
  db.all(`SELECT * FROM todos WHERE user_id = ?`, [userId], (err, todos) => {
    if (err) return res.status(500).json({ message: 'Error retrieving todos' });
    res.json(todos);
  });
};

// Update Todo
exports.updateTodo = (req, res) => {
  const { title, description, status } = req.body;
  const todoId = req.params.id;

  db.run(`UPDATE todos SET title = ?, description = ?, status = ? WHERE id = ?`, 
    [title, description, status, todoId],
    (err) => {
      if (err) return res.status(500).json({ message: 'Error updating todo' });
      res.status(200).json({ message: 'Todo updated successfully' });
    }
  );
};

// Delete Todo
exports.deleteTodo = (req, res) => {
  const todoId = req.params.id;
  
  db.run(`DELETE FROM todos WHERE id = ?`, [todoId], (err) => {
    if (err) return res.status(500).json({ message: 'Error deleting todo' });
    res.status(200).json({ message: 'Todo deleted successfully' });
  });
};
