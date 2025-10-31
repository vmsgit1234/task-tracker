const API_BASE = "http://localhost:3000";


let currentPage = 1; // pagination state
const pageSize = 5;  // tasks per page

// Load all tasks
async function loadTasks() {
  const status = document.getElementById("filter-status").value;
  const priority = document.getElementById("filter-priority").value;
  const sortByDue = document.getElementById("sort-due").value;

  let url = `${API_BASE}/tasks`;
  const params = [];
  if (status && status !== "All") params.push(`status=${status}`);
  if (priority && priority !== "All") params.push(`priority=${priority}`);
  if (sortByDue) params.push(`sortByDue=${sortByDue}`);
  if (params.length) url += "?" + params.join("&");

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch tasks");
    const data = await res.json();

    // Check if response is an array or wrapped in an object
    const tasks = Array.isArray(data) ? data : data.tasks;

    renderTasks(tasks);
  } catch (err) {
    console.error("Error loading tasks:", err);
    document.getElementById("tasks").innerHTML = "<p>Failed to load tasks.</p>";
  }
}


function renderTasks(tasks) {
  const container = document.getElementById("tasks");
  container.innerHTML = "";

  if (!tasks || tasks.length === 0) {
    container.innerHTML = "<p>No tasks found.</p>";
    return;
  }

  tasks.forEach(t => {
    const div = document.createElement("div");
    div.className = "task";
    div.style.border = "1px solid #ddd";
    div.style.padding = "10px";
    div.style.margin = "10px 0";
    div.style.borderRadius = "8px";
    div.innerHTML = `
      <strong>${t.title}</strong><br>
      <small>Priority: ${t.priority} | Status: ${t.status} | Due: ${t.due_date}</small><br>
      <p>${t.description || ""}</p>
      <select id="status-${t.id}">
        <option ${t.status === "Open" ? "selected" : ""}>Open</option>
        <option ${t.status === "In Progress" ? "selected" : ""}>In Progress</option>
        <option ${t.status === "Done" ? "selected" : ""}>Done</option>
      </select>
      <select id="priority-${t.id}">
        <option ${t.priority === "Low" ? "selected" : ""}>Low</option>
        <option ${t.priority === "Medium" ? "selected" : ""}>Medium</option>
        <option ${t.priority === "High" ? "selected" : ""}>High</option>
      </select>
      <button onclick="updateTask(${t.id})">Update</button>
    `;
    container.appendChild(div);
  });
}

// Add a new task
document.getElementById("taskForm").addEventListener("submit", async e => {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const priority = document.getElementById("priority").value;
  const due_date = document.getElementById("due_date").value;

  await fetch(`${API_BASE}/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, description, priority, due_date })
  });

  e.target.reset();
  await loadTasks();
  await loadInsights();
});

// Update a task
async function updateTask(id) {
  const status = document.getElementById(`status-${id}`).value;
  const priority = document.getElementById(`priority-${id}`).value;
  await fetch(`${API_BASE}/tasks/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status, priority })
  });
  await loadTasks();
  await loadInsights();
}

// Load insights from backend
async function loadInsights() {
  const res = await fetch(`${API_BASE}/insights`);
  const data = await res.json();
  document.getElementById("insights").innerText = data.summary || "No insights yet.";
}

// Apply filters
document.getElementById("apply-filters").addEventListener("click", async () => {
  await loadTasks();
});

// Initialize
loadTasks();
loadInsights();