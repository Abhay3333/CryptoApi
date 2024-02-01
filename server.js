const express = require('express');
const cors = require('cors');
const cryptoRoute = require('./routes/cryptoRoute')
require('./config/db')
require('dotenv').config();

const app = express();

const port = process.env.PORT || 3500;


app.use(cors());
app.use(express.json());

app.set('view engine', 'ejs');

app.use('/', cryptoRoute);



app.listen(port, () => {
  console.log('Server listening on port 3500');
})

