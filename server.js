const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// MySQL connection settings
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'todo'
});

// API endpoint to get all tasks
app.get('/api/tasks', async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM tasks');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching tasks' });
  }
});

// API endpoint to create a new task
app.post('/api/tasks', async (req, res) => {
  try {
    const { task } = req.body;
    await db.execute('INSERT INTO tasks (task, completed) VALUES (?, 0)', [task]);
    res.json({ message: 'Task created successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating task' });
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
