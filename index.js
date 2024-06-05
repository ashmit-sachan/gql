const express = require('express');
const userRoutes = require('./routes/users');
const cors = require('cors');
require('./models');

const app = express();
const port = 8000;

const User = require('./controllers/userController');
app.use(cors());
app.use(express.json());


// app.get('/', (req, res) => {
//     res.send('Hello, World!');
// });


app.use('/users', userRoutes);

app.listen(port || 8000, () => {
    console.log(`Server is running on port ${port}`);
});