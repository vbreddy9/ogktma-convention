import React, { useState } from 'react';
import '../styles/MemberRegistrationForm.css';
import { useLocation } from 'react-router-dom';
import creditImage from '../assets/credit.png'; // adjust path if needed
import guestImage from '../assets/guest.png'; // adjust path if needed
import proceedImage from '../assets/proceed.png'; // adjust path if needed


const generateCaptcha = () => {
  const num1 = Math.floor(Math.random() * 10) + 1;
  const num2 = Math.floor(Math.random() * 10) + 1;
  return { question: `${num1} + ${num2}`, answer: (num1 + num2).toString() };
};

const membershipPrices = {
  "VIP EXCLUSIVE ($5,000)": { price: 5000},
  "VIP SPONSOR ($3,000)": { price: 3000},
  "PREMIUM DOUBLE ($1,500)": { price: 1500},
  "PREMIUM SINGLE ($1,000)": { price: 1000},
  "SINGLE REGISTRATION ($300)": { price: 300},
  "COUPLE REGISTRATION ($500)": { price: 500},
  "NEXT GEN/YPS/MRSF ($200)": { price: 200, subtitle: "For alumni kids 21+" },
  "STUDENT/TRAINEE ($200)": { price: 200, subtitle: "Member of OGKTMA alumni" }
};

const membershipFeatures = {
  "VIP EXCLUSIVE ($5,000)": [
    'Registration for 4 Person',
    '2-night stay for two at Marriott (1 room on double occupancy)',
    'Full-page ad in souvenir',
    'Donor Reconginsation',
    'Priority Seating',
    'Include CME',
    'Friday dinner, Saturday breakfast, lunch, dinner, and Sunday brunch',
    'Access to the Expo Hall',
    'Cultural Programs'
  ],
  "VIP SPONSOR ($3,000)": [
    'Registration for 2 Person',
    '2-night stay for two at Marriott (1 room on double occupancy)',
    'Full-page ad in souvenir',
    'Donor Reconginsation',
    'Priority Seating',
    'Include CME',
    'Friday dinner, Saturday breakfast, lunch, dinner, and Sunday brunch',
    'Access to the Expo Hall',
    'Cultural Programs'
  ],
  "PREMIUM DOUBLE ($1,500)": [
    'Registration for 2 Person',
    '2-night stay for two at Marriott (1 room on double occupancy)',
    'Half-page ad in souvenir',
    'Included CME',
    'Friday dinner, Saturday breakfast, lunch, dinner, and Sunday brunch',
    'Access to the Expo Hall',
    'Cultural Programs'
  ],
  "PREMIUM SINGLE ($1,000)": [
    'Registration for 1 Person',
    '2-night stay (1 room)',
    'Half-page ad',
    'Included CME',
    'Friday dinner, Saturday breakfast, lunch, dinner, and Sunday brunch',
    'Access to the Expo Hall',
    'Cultural Programs'
  ],
  "SINGLE REGISTRATION ($300)": [
    'Registration for 1 Person',
    'Hotel not included – book your own through Marriott',
    'CME on Saturday',
    'Friday dinner, Saturday breakfast, lunch, dinner, and Sunday brunch',
    'Friday night cultural program –OGKTMA Got Talent',
    'Saturday night Gala Cultural Program',
    'Entry to Expo/Booths'
  ],
  "COUPLE REGISTRATION ($500)": [
    'Registration for couple',
    'Hotel not included – book your own through Marriott',
    'CME on Saturday',
    'Friday dinner, Saturday breakfast, lunch, dinner, and Sunday brunch',
    'Friday night cultural program –OGKTMA Got Talent',
    'Saturday night Gala Cultural Program',
    'Entry to Expo/Booths'
  ],
  "NEXT GEN/YPS/MRSF ($200)": [
    'Does not include hotel – please book through Marriott Website',
    'Includes CME',
    'Includes Saturday Riverboat Cruise (1–4 PM) on Ohio River',
    'Includes Saturday Night DJ, Cocktails & Dinner',
    'Friday dinner, Saturday breakfast, lunch, dinner, and Sunday brunch',
    'Over 21 years kids of OGKTMA alumni',
    'Entry to Expo/Booths'
  ],
    "STUDENT/TRAINEE ($200)": [
    'Registration for 1 Person',
    'Hotel not included – book your own through Marriott',
    'CME on Saturday',
    'Friday dinner, Saturday breakfast, lunch, dinner, and Sunday brunch',
    'Friday night cultural program –OGKTMA Got Talent',
    'Saturday night Gala Cultural Program',
    'Entry to Expo/Booths'
  ]

};

const MemberRegistrationForm = () => {
  const location = useLocation();
  const preselectedMembership = location.state?.selectedMembership || '';

  const [captcha, setCaptcha] = useState(generateCaptcha());
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', phone: '', password: '', confirmPassword: '',
    address: '', city: '', state: '', zipcode: '', homePhone: '', yearJoined: '', speciality: '',
    membershipType: preselectedMembership, spouseName: '', spouseEmail: '', spouseOccupation: '', spouseSpeciality: '',
    isRangarayan: '', children: [{ name: '', age: '' }], donation: '', captchaAnswer: '', termsAccepted: false
  });

  const handleChange = (e, index = null) => {
    const { name, value, type, checked } = e.target;
    if (name === 'termsAccepted') {
      setFormData({ ...formData, [name]: checked });
    } else if (name === 'name' || name === 'age') {
      const children = [...formData.children];
      children[index][name] = value;
      setFormData({ ...formData, children });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const addChild = () => {
    setFormData({ ...formData, children: [...formData.children, { name: '', age: '' }] });
  };

  const calculateTotal = () => {
  const membership = membershipPrices[formData.membershipType];
  const membershipAmount = membership?.price || 0;
  const donationAmount = parseFloat(formData.donation) || 0;
  return membershipAmount + donationAmount;
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;

    if (formData.captchaAnswer !== captcha.answer) {
      alert('Incorrect captcha answer');
      setCaptcha(generateCaptcha());
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch('https://ogktma-convention-backend.vercel.app/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      if (!data.success) {
        alert(data.message || 'Submission failed.');
        setSubmitting(false);
        return;
      }

      alert('Form submitted successfully. Redirecting to PayPal...');
      window.location.href = data.redirectUrl;

    } catch (err) {
      console.error(err);
      alert('Server error. Please try again later.');
      setSubmitting(false);
    }
  };

  return (
    <form className="registration-form" onSubmit={handleSubmit}>
      <h2>Personal Info</h2>
      <div className="form-row">
        <input type="text" name="firstName" placeholder="First Name *" onChange={handleChange} required />
        <input type="text" name="lastName" placeholder="Last Name *" onChange={handleChange} required />
      </div>
      <div className="form-row">
        <input type="email" name="email" placeholder="Email Id *" onChange={handleChange} required />
        <input type="text" name="phone" placeholder="Mobile Number *" onChange={handleChange} required />
      </div>
      <div className="form-row">
        <input type="text" name="address" placeholder="Address" onChange={handleChange} />
        <input type="text" name="city" placeholder="City" onChange={handleChange}  />
      </div>
      <div className="form-row">
        <input
          type="text"
          name="state"
          placeholder="Enter your state"
          onChange={handleChange}
          
        />

        <input type="text" name="zipcode" placeholder="Zipcode" onChange={handleChange} />
      </div>
      <div className="form-row">
        <input type="text" name="yearJoined" placeholder="Year of joining OGKTMA " onChange={handleChange} />
        <input type="text" name="speciality" placeholder="Speciality " onChange={handleChange}  />
      </div>

      <h2>Membership Type</h2>
      <div className="membership-type-wrapper">
          <label htmlFor="membershipType"><strong>Select Membership Type:</strong></label>
          <select
            name="membershipType"
            value={formData.membershipType}
            onChange={handleChange}
            required
          >
            <option value="">Select Membership Type</option>
            {Object.keys(membershipPrices).map((label, i) => (
              <option key={i} value={label}>{label}</option>
            ))}
          </select>
        </div>
      {formData.membershipType && membershipFeatures[formData.membershipType] && (
          <div className="membership-note-box">
            {/* Subtitle */}
            {membershipPrices[formData.membershipType]?.subtitle && (
              <p className="membership-subtitle">
                <em>{membershipPrices[formData.membershipType].subtitle}</em>
              </p>
            )}

            {/* Features */}
            <p><strong>What's Included:</strong></p>
            <ul>
              {membershipFeatures[formData.membershipType].map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>

            {/* Total */}
            <div className="membership-total">
              <strong>Total Payable:</strong> ${calculateTotal()}
            </div>
          </div>
        )}

      <h2>Spouse Details</h2>
      <div className="form-row">
        <input type="text" name="spouseName" placeholder="Spouse Name" onChange={handleChange} />
        <input type="email" name="spouseEmail" placeholder="Spouse Email" onChange={handleChange} />
      </div>
      <div className="form-row">
        <input type="text" name="spouseOccupation" placeholder="Spouse Occupation" onChange={handleChange} />
        <input type="text" name="spouseSpeciality" placeholder="Spouse Speciality" onChange={handleChange} />
      </div>
      <label>She is OGKTMA?:
        <label><input type="radio" name="isRangarayan" value="Yes" onChange={handleChange} /> Yes</label>
        <label><input type="radio" name="isRangarayan" value="No" onChange={handleChange} /> No</label>
      </label>

      <h2>Children Details</h2>
      {formData.children.map((child, index) => (
        <div className="form-row" key={index}>
          <input type="text" name="name" placeholder="Name" value={child.name} onChange={(e) => handleChange(e, index)} />
          <input type="text" name="age" placeholder="Age" value={child.age} onChange={(e) => handleChange(e, index)} />
        </div>
      ))}
      <button type="button" className="add-child" onClick={addChild}>+ Add Child</button>

      <h2>Donations to OGKTMA</h2>
      <div className="form-row">
        <input type="text" name="donation" placeholder="Donation Amount ($)" onChange={handleChange} />
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
        Follow the instructions shown in the screenshots below. Complete payment by entering your <strong>guest email address</strong> when prompted on the next page.

        <div className="step-images">
          <div className="step-box">
            <img src={creditImage} alt="Step 1" />
            <p className="step-label">Step 1</p>
          </div>
          <div className="step-box">
            <img src={guestImage} alt="Step 2" />
            <p className="step-label">Step 2</p>
          </div>
          <div className="step-box">
            <img src={proceedImage} alt="Step 3" />
            <p className="step-label">Step 3</p>
          </div>
        </div>
      </div>

      <button type="submit" className="submit-btn" disabled={submitting}>
        {submitting ? 'Redirecting to PayPal...' : 'Proceed to Payment'}
      </button>
    </form>
  );
};

export default MemberRegistrationForm;
