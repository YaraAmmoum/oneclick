const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
    name: { type: String, required: true },
    desc: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    image: { type: String },
    category: { type: String, required: true },
    reviews: [{
        rating: { type: Number, required: true },
        comment: { type: String, required: true },
    }],
});

module.exports = mongoose.model('Product', productSchema);
