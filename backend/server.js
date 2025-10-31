const express = require('express');
const cors = require('cors');
const app = express();

const tasksRouter = require('./src/routes/tasks.router');
const insightsRouter = require('./src/routes/insights.router');

app.use(cors());
app.use(express.json());
app.use('/tasks', tasksRouter);
app.use('/insights', insightsRouter);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));