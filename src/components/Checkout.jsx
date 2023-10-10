import { useState } from "react";

import React from "react";

const Checkout = ({ cart, totalValue }) => {
  const [formData, setFormData] = useState({
    cardNumber: "",
    expiration: "",
    cvv: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const [shippingData, setShippingData] = useState({
    fullName: "",
    address: "",
    city: "",
    zipCode: "",
  });

  const handlePaymentInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentData({
      ...paymentData,
      [name]: value,
    });
  };

  const handleShippingInputChange = (e) => {
    const { name, value } = e.target;
    setShippingData({
      ...shippingData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    console.log("Shipping Data: ", shippingData);
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>

      {/* Shipping Information */}
      <h3>Shipping Information</h3>
      <label htmlFor="full-name">Full Name</label>
      <input
        type="text"
        id="full-name"
        name="fullName"
        placeholder="Full Name"
        required
        value={shippingData.fullName}
        onChange={handleShippingInputChange}
      />

      <label htmlFor="address">Address</label>
      <input
        type="text"
        id="address"
        name="address"
        placeholder="1234 Glenwood Dr."
        required
        value={shippingData.address}
        onChange={handleShippingInputChange}
      />

      <label htmlFor="city">City</label>
      <input
        type="text"
        id="city"
        name="city"
        placeholder="Miami"
        required
        value={shippingData.city}
        onChange={handleShippingInputChange}
      />

      <label htmlFor="zip-code">Zip Code</label>
      <input
        type="text"
        id="zip-code"
        name="zipCode"
        placeholder="90001"
        required
        value={shippingData.zipCode}
        onChange={handleShippingInputChange}
      />

      {/* Card Info */}
      <form id="checkout-form" onSubmit={handleSubmit}>
        <label htmlFor="card-number">Card Number</label>
        <input
          type="text"
          id="card-number"
          name="cardNumber"
          placeholder="1234 5678 9012 3456"
          required
          value={formData.cardNumber}
          onChange={handleInputChange}
        />

        <label htmlFor="expiration-date">Expiration Date</label>
        <input
          type="text"
          id="expiration-date"
          name="expirationDate"
          placeholder="MM/YY"
          required
          value={formData.expirationDate}
          onChange={handleInputChange}
        />

        <label htmlFor="cvv">CVV</label>
        <input
          type="text"
          id="cvv"
          name="cvv"
          placeholder="123"
          required
          value={formData.cvv}
          onChange={handleInputChange}
        />

        <button type="submit">Pay Now</button>
      </form>
    </div>
  );
};

export default Checkout;
