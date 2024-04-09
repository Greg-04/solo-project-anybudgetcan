const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const axios = require('axios');

const API_KEY = process.env.API_KEY;
// console.log('API key:', API_KEY);

//from docuclipper documentation
const FormData = require('form-data');
const fs = require('fs');
const jwtToken = API_KEY;
const filePath = '';
const url =
  'https://www.docuclipper.com/api/v1/protected/document?asyncProcessing=false';
const formData = new FormData();
formData.append('document', fs.createReadStream(filePath));
const headers = {
  Authorization: `Bearer ${jwtToken}`,
  ...formData.getHeaders(),
};
axios
  .post(url, formData, { headers })
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.error(error);
  });

//

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
