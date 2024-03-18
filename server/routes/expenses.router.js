const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
  const queryText = `SELECT "expenses"."id", "expenses"."name", "expenses"."amount", "expenses"."category_id", "category"."name" AS "category_name"
FROM "expenses"
JOIN "category" ON "expenses"."category_id" = "category"."id"
ORDER BY "expenses"."id" DESC;
`;
  pool
    .query(queryText)
    .then((result) => res.send(result.rows))
    .catch((error) => {
      console.error('Error fetching expenses:', error);
      res.sendStatus(500);
    });
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  const { name, amount, category_id } = req.body;
  const insertExpenseValues = [name, amount, category_id];

  const queryText =
    'INSERT INTO "expenses" (name, amount, category_id) VALUES ($1, $2, $3);';
  pool
    .query(queryText, insertExpenseValues)
    .then((result) => {
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log('Error adding transaction:', error);
      res.sendStatus(500);
    });
});

/**
 * DELETE route
 */
router.delete('/:id', (req, res) => {
  const expenseId = Number(req.params.id);
  const queryText = 'DELETE FROM "expenses" WHERE "id" = $1;';
  pool
    .query(queryText, [expenseId])
    .then((results) => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.error('Error deleting transaction:', error);
      res.sendStatus(500);
    });
});

/**
 * PUT route
 */
router.put('/:id', (req, res) => {
  const expenseId = req.params.id;
  const { name, amount, category_id } = req.body;

  const queryText = `
    UPDATE "expenses" 
    SET "amount" = $1
    WHERE "id" = $2
  `;
  const queryValues = [amount, expenseId];

  pool
    .query(queryText, queryValues)
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.error('Error updating expenses:', error);
      res.sendStatus(500);
    });
});

module.exports = router;
