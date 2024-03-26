// product.js

const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const productSchema = new Schema({
    asin : String,
    title : String,
    imgUrl : String,
    stars : Number,
    reviews : Number,
    price : Number,
    listPrice : Number,
    categoryName : String,
    isBestSeller : String,
    boughtInLastMonth : Number
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
