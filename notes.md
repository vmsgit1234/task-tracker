## Project Notes 

# 1. Key Decisions

## Why I choose SQLite
- I choosed Sqlite because it's light weight, easy to use, file based ideal for this type of assignments.
- it doesn't require any external setup, ensuring easy portability and quick initialization.

# 2. Database Schema Definition

### Table: `tasks`
| Field | Type | Description |
|--------|------|-------------|
| `id` | INTEGER (Primary Key, Auto Increment) | Unique task ID |
| `title` | TEXT (NOT NULL) | Task title |
| `description` | TEXT | Task description |
| `priority` | TEXT CHECK(`priority` IN ('Low', 'Medium', 'High')) | Task importance |
| `due_date` | TEXT (YYYY-MM-DD) | Due date of the task |
| `status` | TEXT CHECK(`status` IN ('Open', 'In Progress', 'Done')) | Task progress status |
| `created_at` | DATETIME (DEFAULT CURRENT_TIMESTAMP) | Timestamp of creation |

*Design Notes:*
- Chosen to maintain *data integrity* with constraints for `priority` and `status`.
- Stored `due_date` as text in ISO format for simplicity and compatibility with JavaScript Date objects.
- The schema supports sorting, filtering, and easy aggregation for insights.

## 3. Logic Behind Smart Insights

The `/insights` endpoint provides an **AI-like rule-based summary** of the user’s workload using basic aggregation logic.

*Steps performed:*
1. Count total number of open tasks (`status = 'Open'`).
2. Group open tasks by `priority` (High, Medium, Low).
3. Count tasks that are **due within the next 3 days**.
4. Generate a summary string that dynamically reflects the current workload.

**Example Output:**
> You have 8 open tasks. 5 are High priority and 3 are due soon.

*Logic Rationale:*
- Designed to mimic AI insights **without using any LLMs**.
- Keeps the logic transparent, rule-based, and easy to verify from DB queries.
- Demonstrates understanding of data aggregation and conditional reasoning.

## 4. Design Philosophy
- Built a modular backend structure (`routes`, `services`, `db`) for clarity.
- Used **Vanilla JavaScript** for frontend to show clear understanding of REST API integration without relying on frameworks.
- Prioritized clean folder structure and maintainability over advanced styling.

## 5. Possible Future Improvements
- Add `DELETE /tasks/:id` endpoint for task removal.
- Add user authentication and multi-user support.
- Implement pagination for large task lists.
- Deploy backend on Render and frontend on Vercel for public access.
- Add data visualization for insights (e.g., pie chart by priority).