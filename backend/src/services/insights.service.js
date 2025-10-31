const db = require('../db/db');

function getInsights() {
  const totalOpen = db.prepare("SELECT COUNT(*) AS count FROM tasks WHERE status = 'Open'").get().count;
  const low = db.prepare("SELECT COUNT(*) AS count FROM tasks WHERE priority = 'Low'").get().count;
  const medium = db.prepare("SELECT COUNT(*) AS count FROM tasks WHERE priority = 'Medium'").get().count;
  const high = db.prepare("SELECT COUNT(*) AS count FROM tasks WHERE priority = 'High'").get().count;
  const dueSoon = db.prepare("SELECT COUNT(*) AS count FROM tasks WHERE due_date <= date('now', '+3 days')").get().count;

  let summary = `You have ${totalOpen} open task(s).`;
  if (dueSoon > 0) summary += ` ${dueSoon} task(s) are due within 3 days.`;
  if (high > medium && high > low) summary += ` Most of your tasks are High priority.`;
  else if (medium > high && medium > low) summary += ` Most of your tasks are Medium priority.`;
  else if (low > medium && low > high) summary += ` Most of your tasks are Low priority.`;

  return {
    totalOpen,
    byPriority: { low, medium, high },
    dueSoon,
    summary,
  };
}

module.exports = { getInsights };