import React, { useState } from 'react';
import '../styles/MemberRegistrationForm.css';
import creditImage from '../assets/credit.png';
import guestImage from '../assets/guest.png';
import proceedImage from '../assets/proceed.png';

const generateCaptcha = () => {
  const num1 = Math.floor(Math.random() * 10) + 1;
  const num2 = Math.floor(Math.random() * 10) + 1;
  return { question: `${num1} + ${num2}`, answer: (num1 + num2).toString() };
};

const SimpleRegistrationForm = () => {
  const [captcha, setCaptcha] = useState(generateCaptcha());
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', phone: '', companyName: '',
    taxId: '', donation: '', captchaAnswer: '', termsAccepted: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const calculateTotal = () => {
    const value = parseFloat(formData.donation);
    return isNaN(value) ? '0.00' : value.toFixed(2);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (submitting) return;

    if (formData.captchaAnswer !== captcha.answer) {
      alert('Incorrect captcha answer');
      setCaptcha(generateCaptcha());
      return;
    }

    setSubmitting(true);

    const totalAmount = calculateTotal();

    const customData = {
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      companyName: formData.companyName.trim(),
      taxId: formData.taxId.trim(),
      donation: totalAmount
    };

    // ✅ Save locally so ThankYou page can access it
    sessionStorage.setItem("sponsorFormData", JSON.stringify(customData));

    // ✅ Clear previous confirmation lock
    sessionStorage.removeItem("sponsorConfirmationSent");

    // ✅ Redirect to PayPal
   const paypalURL = `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=president@ogktma.org&item_name=OGKTMA+Sponsor+Donation&amount=${totalAmount}&currency_code=USD&return=https://event.ogktma.org/thank-you`;

    window.location.href = paypalURL;
  };

  return (
    <form className="registration-form" onSubmit={handleSubmit}>
      <h2>Sponsor Registration Form</h2>

      <div className="form-row">
        <input type="text" name="firstName" placeholder="First Name *" onChange={handleChange} required />
        <input type="text" name="lastName" placeholder="Last Name *" onChange={handleChange} required />
      </div>

      <div className="form-row">
        <input type="email" name="email" placeholder="Email *" onChange={handleChange} required />
        <input type="text" name="phone" placeholder="Mobile No" onChange={handleChange} />
      </div>

      <div className="form-row">
        <input type="text" name="companyName" placeholder="Company Name *" onChange={handleChange} required />
        <input type="text" name="taxId" placeholder="Tax ID / W9" onChange={handleChange} />
      </div>

      <h2>Donation</h2>
      <div className="form-row">
        <input type="text" name="donation" placeholder="Donation Amount ($)*" onChange={handleChange} required />
      </div>

      <div className="form-row">
        <strong>Total Payable: ${calculateTotal()}</strong>
      </div>

      <div className="form-row captcha">
        <label>Security Captcha: {captcha.question}</label>
        <input type="text" name="captchaAnswer" onChange={handleChange} required />
      </div>

      <div className="paypal-note">
        <strong>Note:</strong> PayPal not required. Use your credit card to register as a guest. <br />
        Follow the instructions shown in the screenshots below. Complete payment by entering your <strong>guest email address</strong>.
        <div className="step-images">
          <div className="step-box"><img src={creditImage} alt="Step 1" /><p className="step-label">Step 1</p></div>
          <div className="step-box"><img src={guestImage} alt="Step 2" /><p className="step-label">Step 2</p></div>
          <div className="step-box"><img src={proceedImage} alt="Step 3" /><p className="step-label">Step 3</p></div>
        </div>
      </div>

      <button type="submit" className="submit-btn" disabled={submitting}>
        {submitting ? 'Redirecting to PayPal...' : 'Proceed to Payment'}
      </button>
    </form>
  );
};

export default SimpleRegistrationForm;
