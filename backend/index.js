const express = require('express');
const Bookroutes = require('./routes/book');
const cors = require('cors');
const app = express();

require('dotenv').config();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send("welcometo library")
})

app.use('/books', Bookroutes)

app.listen(PORT, () => {
    console.log(`server is running at http://localhost:${PORT}`)
})