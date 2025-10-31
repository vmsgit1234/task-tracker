# Task Traacker with smart insights

## A basic full-stack task tracker built with Node.js, SQLite, and plain JavaScript.
It lets you add, view, and update tasks, with options to filter and sort them.
Includes a smart summary feature that gives insights based on task rules.

task-tracker/
|__backend/
|   |__server.js
|   |___package.json
|   |___task_tracker.db
|   |____src/
|   |_____db/database.js
|   |______services/
|   |     |__tasks.service.js
|   |     |__insights.service.js
|   |
|   |___routes/
|   |___tasks.router.js
|   |___insights.router.js
|__frontend/
|
|__public/
   |
   |__index.html
   |__app.js
   |__styles.css



## How to run (local)

### Backend
```bash
cd backend
npm install
node server.js
# backend runs on http://localhost:3000


Frontend Setup
You can run the frontend using a static server:
Option A (Recommended):
Use http-server to serve the app:


cd frontend/public  
npx http-server -a localhost -p 3001 -c-1 .
Access the app at http://localhost:3001


API Endpoints
- POST /tasks — Create a new task
Request body:

{ "title": "...", "description": "...", "priority": "...", "due_date": "..." }

- GET /tasks — Get a list of tasks
Optional query parameters:
status, priority, sortByDue
- PATCH /tasks/:id — Update a task
Request body:

{ "status": "...", "priority": "..." }

- GET /insights — Get task summary
Response format:

{
  "totalOpen": number,
  "byPriority": { ... },
  "dueSoon": [ ... ],
  "summary": "..."
}
