const express = require('express');
const cors = require('cors');
require('./models');

const app = express();
const port = 8000;

app.use(cors())


app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.listen(port || 8000, () => {
    console.log(`Server is running on port ${port}`);
});