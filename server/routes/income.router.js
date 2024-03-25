const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
  const queryText = 'SELECT * FROM "income";';
  pool
    .query(queryText)
    .then((result) => res.send(result.rows))
    .catch((error) => {
      console.error('Error fetching income:', error);
      res.sendStatus(500);
    });
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  const { monthly_amount } = req.body;
  const insertIncomeValue = [monthly_amount];

  const queryText = 'INSERT INTO "income" (monthly_amount) VALUES ($1);';
  pool
    .query(queryText, insertIncomeValue)
    .then((result) => {
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log('Error adding income:', error);
      res.sendStatus(500);
    });
});

/**
 * PUT route
 */
router.put('/:id', (req, res) => {
  const incomeId = req.params.id;
  const { id, monthly_amount } = req.body;

  const queryText = `
    UPDATE "income" 
    SET "monthly_amount" = $1
    WHERE "id" = $2
  `;
  const queryValues = [monthly_amount, incomeId];

  pool
    .query(queryText, queryValues)
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.error('Error updating income:', error);
      res.sendStatus(500);
    });
});

module.exports = router;
