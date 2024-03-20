const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
  const queryText = 'SELECT * FROM "plan";';
  pool
    .query(queryText)
    .then((result) => res.send(result.rows))
    .catch((error) => {
      console.error('Error fetching plan:', error);
      res.sendStatus(500);
    });
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  const { name, target_date, budget_goal } = req.body;
  const insertPlanValues = [name, target_date, budget_goal];

  const queryText =
    'INSERT INTO "plan" ("name", "target_date", "budget_goal") VALUES ($1, $2, $3);';
  pool
    .query(queryText, insertPlanValues)
    .then((result) => {
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log('Error adding plan:', error);
      res.sendStatus(500);
    });
});

module.exports = router;
