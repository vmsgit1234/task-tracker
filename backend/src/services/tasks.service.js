const db = require('../db/db');

function createTask({ title, description, priority, due_date }) {
  const stmt = db.prepare(`
    INSERT INTO tasks (title, description, priority, due_date)
    VALUES (?, ?, ?, ?)
  `);
  const info = stmt.run(title, description, priority, due_date);
  return { id: info.lastInsertRowid, title, description, priority, due_date, status: 'Open' };
}

function getAllTasks({ status, priority, sortByDue, limit = 5, page = 1 }) {
  const offset = (page - 1) * limit;
  let query = "SELECT * FROM tasks WHERE 1=1";
  const params = [];

  if (status) { query += " AND status = ?"; params.push(status); }
  if (priority) { query += " AND priority = ?"; params.push(priority); }

  if (sortByDue === "asc") query += " ORDER BY due_date ASC";
  else if (sortByDue === "desc") query += " ORDER BY due_date DESC";
  else query += " ORDER BY created_at DESC";

  query += " LIMIT ? OFFSET ?";
  params.push(limit, offset);

  const tasks = db.prepare(query).all(...params);
  const totalCount = db.prepare("SELECT COUNT(*) AS count FROM tasks").get().count;
  const totalPages = Math.ceil(totalCount / limit);

  return { tasks, pagination: { totalCount, totalPages, currentPage: page, pageSize: limit } };
}

function updateTask(id, { status, priority }) {
  const stmt = db.prepare(`
    UPDATE tasks
    SET status = COALESCE(?, status),
        priority = COALESCE(?, priority)
    WHERE id = ?
  `);
  stmt.run(status, priority, id);
  return db.prepare("SELECT * FROM tasks WHERE id = ?").get(id);
}

module.exports = { createTask, getAllTasks, updateTask };