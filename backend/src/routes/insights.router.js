const express = require('express');
const router = express.Router();
const { getInsights } = require('../services/insights.service');

// GET /insights - fetch workload insights
router.get('/', (req, res) => {
  const insights = getInsights();
  res.json(insights);
});

module.exports = router;