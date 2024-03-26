//q2.js

const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');

// Import Product model/schema
const Product = require('./models/product');
const database = require('./config/database2');
const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//hand
const hbs = exphbs.create({ extname: '.hbs' });
app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');


// Connect to MongoDB Atlas
mongoose.connect(database.uri, database.options)
.then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
  });
  app.use(bodyParser.json());

  app.use('/products', router);

// Get all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find().lean();
        //res.json(products);
        res.render('products', { title: 'All Products', products: products });
    } catch (err) {
        res.status(500).send(err);
    }
});
router.get('/new', async (req, res) => {
    try {
    console.log('hello');
    res.render('new-product');
    } catch (err) {
        res.send(err);
    }
});

//new functionality---- 
// Get titles of all best-selling products
router.get('/bestsellers/titles', async (req, res) => {
    try {
        const bestSellers = await Product.find({ isBestSeller: "TRUE" }, { title: 1, _id: 0 }).lean();
        const titles = bestSellers.map(product => product.title);
        res.json(titles);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});




//////////////////////////////////////////////////////
// Get a specific product by ID
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).send('Product not found');
        }
        res.json(product);
    } catch (err) {
        res.status(500).send(err);
    }
});
// Insert a new product
router.post('/', async (req, res) => {
    try {
        const product = new Product({
            asin: req.body.asin,
            title: req.body.title,
            imgUrl: req.body.imgUrl,
            stars: req.body.stars,
            reviews: req.body.reviews,
            price: req.body.price,
            listPrice: req.body.listPrice,
            categoryName: req.body.categoryName,
            isBestSeller: req.body.isBestSeller,
            boughtInLastMonth: req.body.boughtInLastMonth
        });
    //     await product.save();
    //   //  res.json(product);
    //     res.status(201).json(product);
    // } catch (err) {
    //     res.status(500).send(err);
    const savedProduct = await product.save(); // Save the product
        res.status(201).json(savedProduct); // Respond with the inserted product data
    } catch (err) {
        res.status(500).json({ error: err.message }); 
    }
});

// Update a product by ID
router.put('/:id', async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedProduct);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Delete a product by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            return res.status(404).send('Product not found');
        }
        res.send('Product deleted successfully');
    } catch (err) {
        res.status(500).send(err);
    }
});

// Set the port
const PORT = 8000;

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
module.exports = router;
