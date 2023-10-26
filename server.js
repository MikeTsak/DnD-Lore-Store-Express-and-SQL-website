require('dotenv').config();
const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
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


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~API~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

app.post('/add-lore', (req, res) => {
    if (req.isAuthenticated() && req.user.role === 'DM') {
      const { title, content } = req.body;
      db('lore').insert({ title, content })
        .then(() => res.json('Lore added'))
        .catch(err => res.status(400).json('Error: ' + err));
    } else {
      res.status(403).json('Access Denied: You must be a DM to add lore');
    }
  });
  

app.get('/get-lore', (req, res) => {
  db.select('*').from('lore')
    .then(data => res.json(data))
    .catch(err => res.status(400).json('Error: ' + err));
});

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~LOGIN~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: false
  }));
  
  passport.use(new LocalStrategy(
    function(username, password, done) {
      db('users').where({ username: username }).first()
        .then(user => {
          if (!user || user.password !== password) {
            return done(null, false, { message: 'Invalid username or password' });
          }
          return done(null, user);
        })
        .catch(err => done(err));
    }
  ));
  
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    db('users').where({ id: id }).first()
      .then(user => done(null, user))
      .catch(err => done(err));
  });
  
  app.use(passport.initialize());
  app.use(passport.session());


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~FIN~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
