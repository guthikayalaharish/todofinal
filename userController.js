const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const db = require('../models/User');

const SECRET_KEY = 'your_secret_key';

// User Signup
exports.signup = (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  const userId = uuidv4();

  db.run(`INSERT INTO users (id, name, email, password) VALUES (?, ?, ?, ?)`, 
    [userId, name, email, hashedPassword],
    (err) => {
      if (err) return res.status(500).json({ message: 'Error registering user' });
      res.status(200).json({ message: 'User registered successfully' });
    }
  );
};

// User Login
exports.login = (req, res) => {
  const { email, password } = req.body;
  
  db.get(`SELECT * FROM users WHERE email = ?`, [email], (err, user) => {
    if (err || !user) return res.status(404).json({ message: 'User not found' });

    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
  });
};

// Get Profile
exports.getProfile = (req, res) => {
  const userId = req.userId;
  db.get(`SELECT * FROM users WHERE id = ?`, [userId], (err, user) => {
    if (err || !user) return res.status(404).json({ message: 'User not found' });
    res.json({ id: user.id, name: user.name, email: user.email });
  });
};

// Update Profile
exports.updateProfile = (req, res) => {
  const { name, email } = req.body;
  const userId = req.userId;
  db.run(`UPDATE users SET name = ?, email = ? WHERE id = ?`, 
    [name, email, userId],
    (err) => {
      if (err) return res.status(500).json({ message: 'Error updating profile' });
      res.status(200).json({ message: 'Profile updated successfully' });
    }
  );
};
