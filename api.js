const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const todoController = require('../controllers/todoController');
const auth = require('../middlewares/auth');

// User Routes
router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.get('/profile', auth, userController.getProfile);
router.put('/profile', auth, userController.updateProfile);

// Todo Routes
router.post('/todos', auth, todoController.createTodo);
router.get('/todos', auth, todoController.getTodos);
router.put('/todos/:id', auth, todoController.updateTodo);
router.delete('/todos/:id', auth, todoController.deleteTodo);

module.exports = router;
