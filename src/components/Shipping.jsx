import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
//import "./css/Shipping-Payment.css";

export default function Shipping() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  useEffect(() => {
    const myStoredUsername = localStorage.getItem("username");
    if (myStoredUsername) {
      // You can use setUsername here if needed.
    }
  }, []);

  // handle submit form
  function handleSubmitForm(event) {
    event.preventDefault();
    // Add your form submission logic here.
  }

  // useNavigate & useLocation
  const navigate = useNavigate();
  const location = useLocation();
  const { cart } = location.state || {};

  function backToContact() {
    navigate("/checkout", {
      state: {
        cart: cart,
      },
    });
  }

  function goToPayment() {
    navigate("/payment", {
      state: {
        cart: cart,
      },
    });
  }

  return (
    <>
      <br />
      <hr />
      <div className="shipping-black-background">
        <div className="step-two"> Step 2 of 3: Shipping</div>
      </div>
      <div className="shipping-container">
        <span>* indicates a required field</span>
        <h5
          style={{
            textDecoration: "none",
            marginTop: "10px",
            marginBottom: "0px",
          }}
        >
          Shipping
          <hr />
        </h5>
        <img src="/images/packages.jpg" className="packages" />
        <div className="shipping-form-container">
          <form onSubmit={handleSubmitForm}>
            <label>
              First Name:
              <input
                type="text"
                placeholder="First Name*"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </label>
            {/* Add similar input elements for Last Name, Address, City, and State */}
            <label>
              State:
              <input
                type="text"
                className="state"
                placeholder="State"
                onChange={(e) => setState(e.target.value)}
              />
              <span className="available-countries">Available Countries:*</span>
              <select className="selectCounty">
                <option value="unitedStates">United States</option>
                <option value="cameroon">Cameroon</option>
                <option value="nigeria">Nigeria</option>
                <option value="morocco">Morocco</option>
                <option value="egypt">Egypt</option>
              </select>
            </label>
            <div className="shipping-buttons">
              <button type="button" onClick={backToContact}>
                Back To Contact Info
              </button>
              <button type="button" onClick={goToPayment}>
                Continue To Payment
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
