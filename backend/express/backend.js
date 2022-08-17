const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const lwJSON = require('./public/letters_words.json');

app.use(express.static("public", options={})); 
app.use(cors())

app.get('/api/getWords', (req, res) => {
  res.send(lwJSON);
});

const port = 3001;
app.listen(port, () => {
  console.log(`run on port ${port}`);
});