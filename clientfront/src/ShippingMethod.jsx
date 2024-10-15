
import React, { useState } from 'react';
import './assets/styles/star.css';
import Nav from "./Nav";
import Footer from "./Footer";
export function ShippingAddress({ onSubmitShipping }) {
  return (
    <div>
      <ShippingMethod onSubmitShipping={onSubmitShipping} />
    </div>
  );
}

const ShippingMethod = ({ onSubmitShipping }) => {
  const [selectedMethod, setSelectedMethod] = useState('');
  const [shippingCost, setShippingCost] = useState(0);
  const [shippingData, setShippingData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    country: 'Jordan',
    city: '',
    address: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingData({ ...shippingData, [name]: value });
  };

  const handleShippingMethodChange = (e) => {
    const method = e.target.value;
    setSelectedMethod(method);

    if (method === 'standard') {
      setShippingCost(0);
    } else if (method === 'express') {
      setShippingCost(5);
    } else if (method === 'overnight') {
      setShippingCost(20);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (selectedMethod) {
      try {
        const response = await fetch('http://localhost:5000/api/shipping', { 
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ ...shippingData, shippingMethod: selectedMethod, shippingCost }) 
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        onSubmitShipping({ ...shippingData, shippingMethod: selectedMethod, shippingCost }); 
      } catch (error) {
        alert('Failed to save shipping data');
      }
    } else {
      alert('Please select a shipping method.');
    }
  };

  return (
    <> <Nav/>
    <div className="shipping-method-container">
         

           <form className='addressForm'  onSubmit={handleSubmit}>
         <h2>Your Address</h2>
         <label htmlFor="firstName" className='addressLabel'>First Name:</label>
         <input type="text" id="firstName" name="firstName" placeholder="e.g., Yara" className='addressInput' value={shippingData.firstName} onChange={handleInputChange} required />
        <br /><br />
        <label htmlFor="lastName" className='addressLabel'>Last Name:</label>
        <input type="text" id="lastName" name="lastName" placeholder="e.g., Ammoum" className='addressInput' value={shippingData.lastName} onChange={handleInputChange} required />
         <br /><br />
         <label htmlFor="phone" className='addressLabel'>Phone Number:</label>
        <input type="tel" id="phone" name="phone" placeholder="0791164xxx" className='addressInput' value={shippingData.phone} onChange={handleInputChange} required />
       <br /><br />
        <label htmlFor="country" className='addressLabel'>Country:</label>
        <select id="country" name="country" className="addressSelect" value={shippingData.country} onChange={handleInputChange} required>
          <option>Jordan</option>
        </select>
       <br /><br />
        <label htmlFor="city" className='addressLabel'>City:</label>
        <select id="city" name="city" className="addressSelect" value={shippingData.city} onChange={handleInputChange} required>
       <option>All cities</option>
        <option>Amman</option>
          <option>Irbid</option>
          <option>Jerash</option>
           <option>Al-Zarqa'a</option>
           <option>Ajloun</option>
           <option>Alkarak</option>
          <option>Ma'an</option>
           <option>Aqaba</option>
         </select>
        <br /><br />
         <label htmlFor="address" className='addressLabel'>Address:</label>
         <input type="text" id="address" name="address" placeholder="e.g., Amman, Tabrbour" className='addressTextarea' value={shippingData.address} onChange={handleInputChange} required />
        <br /><br />

        <h2>Select Shipping Method</h2>
        <div className="form-control">
          <label>
            <input
              type="radio"
              name="shippingMethod"
              value="standard"
              checked={selectedMethod === 'standard'}
              onChange={handleShippingMethodChange}
            />
            Standard Shipping (7-10 work days)- Free
          </label>
        </div>
        <div className="form-control">
          <label>
            <input
              type="radio"
              name="shippingMethod"
              value="express"
              checked={selectedMethod === 'express'}
              onChange={handleShippingMethodChange}
            />
            Express Shipping (3-5 work days)- 5.00 $
          </label>
        </div>
        <div className="form-control">
          <label>
            <input
              type="radio"
              name="shippingMethod"
              value="overnight"
              checked={selectedMethod === 'overnight'}
              onChange={handleShippingMethodChange}
            />
            Overnight Shipping (1 work day)- 20.00 $
          </label>
        </div>
        <button type="submit" className='shippingButton'>Next</button>
      </form>
      
    </div><Footer/></>
  );
};

export default ShippingAddress;
