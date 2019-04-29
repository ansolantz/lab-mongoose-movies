// bin/seed.js

const mongoose = require('mongoose');
const Celebrity = require('../models/Celebrity');

const dbName = 'celebrityDb';
mongoose.connect(`mongodb://localhost/${dbName}`);

const celebritiesSeed = [
  {
    name: "Tom Cruise",
    occupation: "Actor",
    catchPhrase: "Mission imossible",
  },
  {
    name: "Frank Sinatra",
    occupation: "Singer",
    catchPhrase: "My way or the highway",
  },
  {
    name: "Madona",
    occupation: "Singer",
    catchPhrase: "Like a virgin",
  }
]

Celebrity.create(celebritiesSeed, (err) => {
  if (err) { throw (err) }
  console.log(`Inserted ${celebritiesSeed.length} celebrities`)
  mongoose.connection.close();
});