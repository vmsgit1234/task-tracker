const express = require('express');
const router = express.Router();
const { createTask, getAllTasks, updateTask } = require('../services/tasks.service');

// POST /tasks
router.post('/', (req, res) => {
  const { title, description, priority, due_date } = req.body;

  if (!title || !priority || !due_date) {
    return res.status(400).json({ error: 'title, priority, due_date are required' });
  }

  const task = createTask({ title, description, priority, due_date });
  res.status(201).json(task);
});

// GET /tasks
router.get('/', (req, res) => {
  const tasks = getAllTasks(req.query);
  res.json(tasks);
});

// PATCH /tasks/:id
router.patch('/:id', (req, res) => {
  const id = req.params.id;
  const updated = updateTask(id, req.body);
  if (!updated) return res.status(404).json({ error: 'Task not found' });
  res.json(updated);
});

module.exports = router;