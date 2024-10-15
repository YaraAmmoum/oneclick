const mongoose=require("mongoose")
const shippingSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    phone: String,
    country: String,
    city: String,
    address: String,
    shippingMethod: String
});
const Shipping = mongoose.model('Shipping', shippingSchema);
module.exports=Shipping;
