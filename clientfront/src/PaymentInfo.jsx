import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import './assets/styles/star.css';
import Nav from "./Nav";
import Footer from "./Footer";
const stripePromise = loadStripe('pk_test_51PuYsfRx325Nv2MW9ETzTaManLGgnbzc2OujPNC4GZQZgsgfW2fPxcWRvAQ21fZwX56cogBw5bbMo73WlGhHdIAs00AZiEm4Zo'); 

const PaymentForm = ({ onSubmitPayment }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState('');

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(50, 'Must be 50 characters or less')
        .required('Required'),
    }),
    onSubmit: async (values) => {
      if (!stripe || !elements) {
        return;
      }

      try {
        const response = await fetch('http://localhost:5000/api/create-payment-intent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ amount: 50000 })
        });
        
        const { clientSecret } = await response.json();

        const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: elements.getElement(CardElement),
            billing_details: { name: values.name }
          }
        });

        if (error) {
          setErrorMessage(error.message); 
        } else if (paymentIntent.status === 'succeeded') {
          onSubmitPayment(); 
        }
      } catch (error) {
        console.log('Error processing payment:', error);
        setErrorMessage('An error occurred while processing the payment. Please try again.');
      }
    },
  });

  return (
    <><Nav/>
    <div className="payment-form-container">
      <h2 className='headPayment'>Payment Information</h2>
      <form onSubmit={formik.handleSubmit} className="payment-form">
        <div className="form-control">
          <label htmlFor="name" className='labelPayment'>Cardholder Name</label>
          <input
            className='inputPayment'
            id="name"
            name="name"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="error">{formik.errors.name}</div>
          ) : null}
        </div>

        <div className="form-control">
          <label htmlFor="cardNumber" className='labelPayment'>Card Details</label>
          <CardElement
  options={{
    style: {
      base: {
        fontSize: '16px',
        color: '#424770',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#9e2146',
      },
    },
    hidePostalCode: true,  
  }}
/>

        </div>

        {errorMessage && (
          <div className="error-message">
            {errorMessage}
          </div>
        )}

        <button type="submit" className='paymentbButton' disabled={!stripe}>Next</button>
      </form>
    </div>  <Footer/></>
  );
};

const WrappedPaymentForm = (props) => (
  <Elements stripe={stripePromise}>
    <PaymentForm {...props} />
  </Elements>
);

export default WrappedPaymentForm;
