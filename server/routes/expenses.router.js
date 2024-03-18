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

module.exports = router;
