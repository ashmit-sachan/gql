const express = require('express');
const userRoutes = require('./routes/users');
const productRoutes = require('./routes/products');
const reviewRoutes = require('./routes/reviews');
const orderRoutes = require('./routes/orders');
const cartRoutes = require('./routes/carts');
const cors = require('cors');
require('./models');

const app = express();
const port = 8000;

const User = require('./controllers/userController');
app.use(cors());
app.use(express.json());

app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/reviews', reviewRoutes);
app.use('/orders', orderRoutes);
app.use('/carts', cartRoutes);

app.listen(port || 8000, () => {
    console.log(`Server is running on port ${port}`);
});