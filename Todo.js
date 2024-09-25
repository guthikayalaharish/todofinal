const db = require('./User');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS todos (
    id TEXT PRIMARY KEY,
    user_id TEXT,
    title TEXT,
    description TEXT,
    status TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id)
  )`);
});

module.exports = db;
