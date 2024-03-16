const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET request to fetch categories
router.get('/', (req, res) => {
  const queryText = 'SELECT * FROM "category";';
  pool.query(queryText)
    .then((result) => res.send(result.rows))
    .catch((error) => {
      console.error('Error fetching categories:', error);
      res.sendStatus(500);
    });
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;
