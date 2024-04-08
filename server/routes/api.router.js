const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const axios = require('axios');

const API_KEY = process.env.API_KEY;
// console.log('key:', API_KEY);

/**
 * GET route template
 */
router.get('/', (req, res) => {
  // GET route code here
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;
