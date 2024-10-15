const Shipping=require("../models/shipping");
const stripe = require('stripe')('sk_test_51PuYsfRx325Nv2MWAkQKjGiOblOOp9x1u5J731jiQLUvczHClE7UZ8rqlPfHwOPwLnNrhbqYhTl2vQlACO78cwf100zJ7Q6MEy');
const ShippingPost=async(req,res)=>
{
    const { firstName,lastName,phone,country,city,address,shippingMethod}=req.body;
    try {
        const shippingData = new Shipping({firstName,lastName,phone,country,city,address,shippingMethod});
        await shippingData.save();
        res.status(201).send('Shipping data saved successfully');
    } catch (error) {  
        res.status(400).send({ error: 'Error saving shipping data', message: error.message });
    }
}
const ShippingGet=async(req,res)=>
    {
    
        try {
            const user = await Shipping.findOne({ phone: req.params.phone });
            if (!user) {
              return res.status(404).json({ error: 'User not found' });
            }
            res.json(user);
          } catch (error) {
            res.status(500).json({ error: 'Error retrieving user data' });
          }
    }

    const PaymentPost=async(req,res)=>
    {
        const { amount } = req.body;

        if (typeof amount !== 'number' || amount <= 0) {
            return res.status(400).send({ error: 'Invalid amount' });
        }
    
        try {
            const paymentIntent = await stripe.paymentIntents.create({
                amount,
                currency: 'usd',
                payment_method_types: ['card'],
            });
    
            res.send({ clientSecret: paymentIntent.client_secret });
        } catch (error) {
            console.error('Error creating payment intent:', error);
    
            if (error.type === 'StripeCardError') {
                res.status(400).send({ error: 'Card error: ' + error.message });
            } else if (error.type === 'StripeRateLimitError') {
                res.status(429).send({ error: 'Too many requests made to the API too quickly' });
            } else if (error.type === 'StripeInvalidRequestError') {
                res.status(400).send({ error: 'Invalid parameters: ' + error.message });
            } else if (error.type === 'StripeAPIError') {
                res.status(500).send({ error: 'Stripe API error: ' + error.message });
            } else {
                res.status(500).send({ error: 'Internal Server Error' });
            }
        }
    }
module.exports={
    ShippingPost,
    ShippingGet,
    PaymentPost
}