const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const serverless = require('serverless-http');
const XLSX = require('xlsx');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json());

// 🔒 Replace with hardcoded credentials (use caution)
const ADMIN_EMAIL = 'info@vr2tech.in';
const EMAIL_PASS = 'ubrdxgraugotinxz';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: ADMIN_EMAIL,
    pass: EMAIL_PASS
  }
});

const membershipPrices = {
  "VIP EXCLUSIVE ($5,000)": 5000,
  "VIP SPONSOR ($3,000)": 3000,
  "PREMIUM DOUBLE ($1,500)": 1500,
  "PREMIUM SINGLE ($1,000)": 1000,
  "SINGLE REGISTRATION ($300)": 300,
  "COUPLE REGISTRATION ($500)": 500,
  "NEXT GEN/YPS/MRSF [$200]": 200,
  "HALF PAGE ADD ($300)": 300,
  "FULL PAGE ADD ($500)": 500
};

const createExcelBuffer = (formData) => {
  const childrenDetails = formData.children.map((child) => `${child.name} (Age: ${child.age})`).join(', ');

  const data = [{
    "First Name": formData.firstName,
    "Last Name": formData.lastName,
    "Email": formData.email,
    "Phone": formData.phone,
    "Address": `${formData.address}, ${formData.city}, ${formData.state} ${formData.zipcode}`,
    "Home Phone": formData.homePhone,
    "Year Joined": formData.yearJoined,
    "Speciality": formData.speciality,
    "Membership Type": formData.membershipType,
    "Spouse Name": formData.spouseName,
    "Spouse Email": formData.spouseEmail,
    "Spouse Occupation": formData.spouseOccupation,
    "Spouse Speciality": formData.spouseSpeciality,
    "Is OGKTMA Member": formData.isRangarayan,
    "Donation": formData.donation,
    "Children Details": childrenDetails,
    "Total Payable": (membershipPrices[formData.membershipType] || 0) + (parseFloat(formData.donation) || 0)
  }];

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Registration');
  return XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
};

app.post('/api/register', async (req, res) => {
  const formData = req.body;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!formData.firstName || !formData.email || !emailRegex.test(formData.email)) {
    return res.status(400).json({ success: false, message: 'Missing or invalid required fields.' });
  }

  const cleanEmail = formData.email.trim().toLowerCase();
  const membershipAmount = membershipPrices[formData.membershipType] || 0;
  const donationAmount = parseFloat(formData.donation) || 0;
  const totalAmount = membershipAmount + donationAmount;

  try {
    const excelBuffer = createExcelBuffer(formData);

    // 1️⃣ Send confirmation email to user
    await transporter.sendMail({
      from: ADMIN_EMAIL,
      to: cleanEmail,
      subject: 'OGKTMA Registration Confirmation',
      html: `<p>Dear <strong>${formData.firstName}</strong>,</p>
             <p>Thank you for registering for the OGKTMA Convention 2025.</p>
             <p>Your total amount payable is: <strong>$${totalAmount}</strong></p>
             <p>You will receive further event information soon.</p>
             <p>Regards, OGKTMA Team</p>`
    });

    // 2️⃣ Send admin email with Excel attachment
    await transporter.sendMail({
      from: ADMIN_EMAIL,
      to: ADMIN_EMAIL,
      subject: `New OGKTMA Registration: ${formData.firstName} ${formData.lastName}`,
      html: `<div><p><strong>Full Registration Details:</strong></p>
        <ul>
          <li><strong>Name:</strong> ${formData.firstName} ${formData.lastName}</li>
          <li><strong>Email:</strong> ${formData.email}</li>
          <li><strong>Phone:</strong> ${formData.phone}</li>
          <li><strong>Home Phone:</strong> ${formData.homePhone}</li>
          <li><strong>Address:</strong> ${formData.address}, ${formData.city}, ${formData.state} ${formData.zipcode}</li>
          <li><strong>Year Joined:</strong> ${formData.yearJoined}</li>
          <li><strong>Speciality:</strong> ${formData.speciality}</li>
          <li><strong>Membership Type:</strong> ${formData.membershipType}</li>
          <li><strong>Spouse Name:</strong> ${formData.spouseName}</li>
          <li><strong>Spouse Email:</strong> ${formData.spouseEmail}</li>
          <li><strong>Spouse Occupation:</strong> ${formData.spouseOccupation}</li>
          <li><strong>Spouse Speciality:</strong> ${formData.spouseSpeciality}</li>
          <li><strong>Is OGKTMA Member:</strong> ${formData.isRangarayan}</li>
          <li><strong>Donation:</strong> $${formData.donation}</li>
          <li><strong>Total Payable:</strong> $${totalAmount}</li>
          <li><strong>Children:</strong> <ul>${formData.children.map(c => `<li>${c.name} (Age: ${c.age})</li>`).join('')}</ul></li>
        </ul>
        <p>Excel file with all details is attached.</p></div>`,
      attachments: [
        {
          filename: `OGKTMA-Registration-${Date.now()}.xlsx`,
          content: excelBuffer,
          contentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        }
      ]
    });

    // 3️⃣ Respond with PayPal redirect
    const paypalURL = `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=president@ogktma.org&item_name=OGKTMA+Membership+Registration&amount=${totalAmount}&currency_code=USD`;
    res.status(200).json({ success: true, redirectUrl: paypalURL });

  } catch (error) {
    console.error('❌ Email error:', error);
    res.status(500).json({ success: false, message: 'Submission failed. Try again later.' });
  }
});

app.get('/home', (req, res) => {
  res.send('OGKTMA Backend is running 🎉');
});

if (process.env.NODE_ENV !== 'serverless') {
  app.listen(PORT, () => {
    console.log(`✅ Server running locally at http://localhost:${PORT}`);
  });
}

module.exports = serverless(app);
