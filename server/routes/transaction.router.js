const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
  const queryText = 'SELECT * FROM "transaction";';
  pool
    .query(queryText)
    .then((result) => res.send(result.rows))
    .catch((error) => {
      console.error('Error fetching transactions:', error);
      res.sendStatus(500);
    });
});

/**
 * POST route template
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

module.exports = router;
