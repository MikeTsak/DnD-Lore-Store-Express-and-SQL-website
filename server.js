require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex');

const db = knex({
  client: 'mysql2',
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
  }
});

const app = express();

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(cors());

const PORT =  3000;

app.post('/add-lore', (req, res) => {
  const { title, content } = req.body;
  db('lore').insert({ title, content })
    .then(() => res.json('Lore added'))
    .catch(err => res.status(400).json('Error: ' + err));
});

app.get('/get-lore', (req, res) => {
  db.select('*').from('lore')
    .then(data => res.json(data))
    .catch(err => res.status(400).json('Error: ' + err));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
