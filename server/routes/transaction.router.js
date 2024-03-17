const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route
 */
router.get('/', (req, res) => {
  const queryText = ` 
SELECT "transaction"."id", "transaction"."name", "transaction"."amount", 
"transaction"."trans_date", "transaction"."category_id", "category"."name" AS "category_name"
FROM "transaction"
JOIN "category" ON "transaction"."category_id" = "category"."id"
ORDER BY "transaction".trans_date DESC;`;
  pool
    .query(queryText)
    .then((result) => res.send(result.rows))
    .catch((error) => {
      console.error('Error fetching transactions:', error);
      res.sendStatus(500);
    });
});

/**
 * POST route
 */
router.post('/', (req, res) => {
  const { name, amount, category_id, trans_date } = req.body;
  const insertTransactionValues = [name, amount, category_id, trans_date];

  const queryText =
    'INSERT INTO "transaction" (name, amount, category_id, trans_date) VALUES ($1, $2, $3, $4);';
  pool
    .query(queryText, insertTransactionValues)
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
  const transactionId = Number(req.params.id);
  const queryText = 'DELETE FROM "transaction" WHERE id = $1;';
  pool
    .query(queryText, [transactionId])
    .then((results) => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.error('Error deleting transaction:', error);
      res.sendStatus(500);
    });
});

module.exports = router;
