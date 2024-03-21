const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/expenses', (req, res) => {
  const queryText = `
SELECT "category"."id", "category"."name", SUM("expenses"."amount") AS "expenses_total" FROM "category"
JOIN "expenses" ON "expenses"."category_id" = "category"."id"
GROUP BY "category"."id", "category"."name";
`;
  pool
    .query(queryText)
    .then((result) => res.send(result.rows))
    .catch((error) => {
      console.error('Error fetching expense totals:', error);
      res.sendStatus(500);
    });
});

/**
 * GET route template
 */
router.get('/transactions', (req, res) => {
  const queryText = `
  SELECT "category"."id", "category"."name", SUM("transaction"."amount") AS "transaction_total" FROM "category"
  JOIN "transaction" ON "transaction"."category_id" = "category"."id"
  GROUP BY "category"."id", "category"."name";
`;
  pool
    .query(queryText)
    .then((result) => res.send(result.rows))
    .catch((error) => {
      console.error('Error fetching transaction totals:', error);
      res.sendStatus(500);
    });
});

/**
 * GET route template
 */
router.get('/combinedTotals', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT "category"."id", "category"."name", 
      COALESCE((
        SELECT SUM("amount") 
        FROM "expenses" 
        WHERE "category_id" = "category"."id"), 0)
      +
      COALESCE((
        SELECT SUM("amount") 
        FROM "transaction" 
        WHERE "category_id" = "category"."id"
      ), 0) AS "combined_total"
      FROM "category"
      ORDER BY "category"."id";
    `);
    res.send(result.rows);
  } catch (error) {
    console.error('Error fetching combined amounts:', error);
    res.sendStatus(500);
  }
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;
