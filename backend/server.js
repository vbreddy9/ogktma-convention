const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const XLSX = require('xlsx');

const app = express();
const PORT = process.env.PORT || 4000;
const processedSponsors = new Set();

app.use(cors());
app.use(bodyParser.json());

// 🔒 Replace with hardcoded credentials (use caution)
const ADMIN_EMAIL = 'president@ogktma.org';
const EMAIL_PASS = 'ajudlwnozjvgztzr';

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
  "NEXT GEN/YPS/MRSF ($200)": 200,
  "STUDENT/TRAINEE ($200)":200
};

const createExcelBuffer = (formData) => {
  const children = Array.isArray(formData.children) ? formData.children : [];
  const childrenDetails = children.map((child) => `${child.name} (Age: ${child.age})`).join(', ');

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


app.post('/register', async (req, res) => {
  const formData = req.body;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!formData.firstName || !formData.email || !emailRegex.test(formData.email)) {
    return res.status(400).json({ success: false, message: 'Missing or invalid required fields.' });
  }

  const membershipAmount = membershipPrices[formData.membershipType] || 0;
  const donationAmount = parseFloat(formData.donation) || 0;
  const totalAmount = membershipAmount + donationAmount;

  try {
    // ✅ Only redirect to PayPal (no email yet)
    const paypalURL = `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=president@ogktma.org&item_name=OGKTMA+Membership+Registration&amount=${totalAmount}&currency_code=USD&return=https://event.ogktma.org/thank-you-member`;

    
    res.status(200).json({ success: true, redirectUrl: paypalURL });

  } catch (error) {
    console.error('❌ PayPal redirect error:', error);
    res.status(500).json({ success: false, message: 'Submission failed. Try again later.' });
  }
});


// ✅ Sponsor donation endpoint
app.post('/sponsor-donate', async (req, res) => {
  const { firstName, lastName, email, phone, companyName, taxId, donation } = req.body;

  if (!firstName || !lastName || !email || !companyName || !donation) {
    return res.status(400).json({ success: false, message: 'Missing required sponsor fields.' });
  }

  // ✅ Prevent duplicate submissions
  const uniqueKey = `${firstName}-${lastName}-${email}-${donation}`;
  if (processedSponsors.has(uniqueKey)) {
    return res.status(200).json({ success: true, message: 'Duplicate sponsor submission ignored' });
  }
  processedSponsors.add(uniqueKey);
  try {
    // ✅ Send confirmation to sponsor
    await transporter.sendMail({
  from: ADMIN_EMAIL,
  to: email,
  subject: '🎉 OGKTMA Sponsorship Confirmation',
  html: `
    <div style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px;">
      <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 8px; padding: 30px; box-shadow: 0 0 10px rgba(0,0,0,0.05);">
        
        <h2 style="color: #2e86de; text-align: center;">🙏 Thank You for Your Sponsorship!</h2>
        
        <p style="font-size: 16px; color: #333;">Dear <strong>${firstName} ${lastName}</strong>,</p>
        
        <p style="font-size: 15px; color: #444;">Thank you for supporting <strong>OGKTMA Convention 2025</strong><br/>! We're truly grateful for your contribution.</p>

        <table style="width: 100%; margin-top: 20px; border-collapse: collapse;">
          <tr>
            <td style="padding: 10px; font-weight: bold;">Company</td>
            <td style="padding: 10px;">${companyName}</td>
          </tr>
          <tr>
            <td style="padding: 10px;  font-weight: bold;">Donation Amount</td>
            <td style="padding: 10px;">$${donation}</td>
          </tr>
          <tr>
            <td style="padding: 10px; font-weight: bold;">Tax ID / W9</td>
            <td style="padding: 10px;">${taxId || 'N/A'}</td>
          </tr>
        </table>

        <p style="margin-top: 25px; font-size: 14px; color: #555;">
          Please retain this email as proof of your contribution.
        </p>

        <p style="font-size: 14px; color: #333;"><strong>President:</strong> Dr. Surender Sandella</p>
        <p style="font-size: 14px; color: #333;"><strong>OGKTMA Tax Identification Number:</strong> 52-1612092</p>

        <p style="margin-top: 20px; font-size: 15px; color: #444;">We sincerely appreciate your generosity!</p>

        <p style="margin-top: 30px; font-size: 14px; color: #777;">
          Regards,<br/>
          <strong>OGKTMA Team</strong>
        </p>
      </div>
    </div>
  `
});

    // ✅ Notify admin
    await transporter.sendMail({
  from: ADMIN_EMAIL,
  to: ADMIN_EMAIL,
  subject: `📥 Sponsor Donation Received: ${firstName} ${lastName}`,
  html: `
    <div style="font-family: Arial, sans-serif; background-color: #f5f5f5; padding: 20px;">
      <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 8px; padding: 30px; box-shadow: 0 0 10px rgba(0,0,0,0.05);">
        
        <h2 style="color: #d35400; text-align: center;">📥 New Sponsor Donation Received</h2>
        <p style="font-size: 15px; color: #333;">A new sponsor has completed their donation. Below are the details:</p>

        <table style="width: 100%; margin-top: 20px; border-collapse: collapse;">
          <tr>
            <td style="padding: 10px; font-weight: bold;">Name</td>
            <td style="padding: 10px;">${firstName} ${lastName}</td>
          </tr>
          <tr>
            <td style="padding: 10px;  font-weight: bold;">Email</td>
            <td style="padding: 10px;">${email}</td>
          </tr>
          <tr>
            <td style="padding: 10px;  font-weight: bold;">Phone</td>
            <td style="padding: 10px;">${phone || 'N/A'}</td>
          </tr>
          <tr>
            <td style="padding: 10px;  font-weight: bold;">Company</td>
            <td style="padding: 10px;">${companyName}</td>
          </tr>
          <tr>
            <td style="padding: 10px;  font-weight: bold;">Tax ID / W9</td>
            <td style="padding: 10px;">${taxId || 'N/A'}</td>
          </tr>
          <tr>
            <td style="padding: 10px;  font-weight: bold;">Donation Amount</td>
            <td style="padding: 10px;">$${donation}</td>
          </tr>
        </table>

        <p style="margin-top: 25px; font-size: 14px; color: #555;">
          Please log in to the admin panel to view or download the full record.
        </p>

        <p style="margin-top: 30px; font-size: 14px; color: #777;">
          Regards,<br/>
          <strong>OGKTMA System</strong>
        </p>
      </div>
    </div>
  `
});

    // ✅ Send response
    res.status(200).json({ success: true, message: 'Sponsor confirmation sent' });

  } catch (err) {
    console.error('❌ Sponsor donation email error:', err);
    res.status(500).json({ success: false, message: 'Failed to send sponsor confirmation' });
  }
});

// ✅ Member donation confirmation after PayPal
app.post('/member-donate', async (req, res) => {
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

    // ✅ Send confirmation email to member
    await transporter.sendMail({
      from: ADMIN_EMAIL,
      to: cleanEmail,
      subject: 'OGKTMA Membership Confirmation',
      html: `
        <p>Dear <strong>${formData.firstName}</strong>,</p>
        <p>Thank you for registering for the OGKTMA Convention 2025.</p>
        <p><strong>Membership Type:</strong> ${formData.membershipType}</p>
        <p><strong>Membership Amount:</strong> $${membershipAmount.toFixed(2)}</p>
        <p><strong>Donation:</strong> $${donationAmount.toFixed(2)}</p>
        <p><strong>Total Amount Paid:</strong> <span style="font-size: 16px; font-weight: bold;">$${totalAmount.toFixed(2)}</span></p>
        <p>You will receive further event information soon.</p>
        <p>Regards,<br/>OGKTMA Team</p>
      `
    });

    // ✅ Send admin email with Excel attachment
    await transporter.sendMail({
      from: ADMIN_EMAIL,
      to: ADMIN_EMAIL,
      subject: `New OGKTMA Registration: ${formData.firstName} ${formData.lastName}`,
      html: `
        <div>
          <p><strong>Full Registration Details:</strong></p>
          <ul>
            <li><strong>Name:</strong> ${formData.firstName} ${formData.lastName}</li>
            <li><strong>Email:</strong> ${formData.email}</li>
            <li><strong>Phone:</strong> ${formData.phone}</li>
            <li><strong>Home Phone:</strong> ${formData.homePhone}</li>
            <li><strong>Address:</strong> ${formData.address}, ${formData.city}, ${formData.state} ${formData.zipcode}</li>
            <li><strong>Year Joined:</strong> ${formData.yearJoined}</li>
            <li><strong>Speciality:</strong> ${formData.speciality}</li>
            <li><strong>Membership Type:</strong> ${formData.membershipType}</li>
            <li><strong>Membership Amount:</strong> $${membershipAmount.toFixed(2)}</li>
            <li><strong>Donation:</strong> $${donationAmount.toFixed(2)}</li>
            <li><strong>Total Payable:</strong> $${totalAmount.toFixed(2)}</li>
            <li><strong>Spouse Name:</strong> ${formData.spouseName}</li>
            <li><strong>Spouse Email:</strong> ${formData.spouseEmail}</li>
            <li><strong>Spouse Occupation:</strong> ${formData.spouseOccupation}</li>
            <li><strong>Spouse Speciality:</strong> ${formData.spouseSpeciality}</li>
            <li><strong>Is OGKTMA Member:</strong> ${formData.isRangarayan}</li>
            <li><strong>Children:</strong> 
              <ul>
            ${(Array.isArray(formData.children) ? formData.children : []).map(c => `<li>${c.name} (Age: ${c.age})</li>`).join('')}
          </ul>
            </li>
          </ul>
          <p>Excel file with all details is attached.</p>
        </div>
      `,
      attachments: [
        {
          filename: `OGKTMA-Member-${Date.now()}.xlsx`,
          content: excelBuffer,
          contentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        }
      ]
    });

    // ✅ Response
    res.status(200).json({ success: true });

  } catch (error) {
    console.error('❌ Member confirmation email error:', error);
    res.status(500).json({ success: false, message: 'Failed to send confirmation' });
  }
});


// ✅ Health check route
app.get('/home', (req, res) => {
  res.send('OGKTMA Backend is running 🎉');
});

// ✅ Local server (only if not serverless)
if (process.env.NODE_ENV !== 'serverless') {
  app.listen(PORT, () => {
    console.log(`✅ Server running locally at http://localhost:${PORT}`);
  });
}

// ✅ Export for serverless (like Vercel/Netlify)
if (process.env.NODE_ENV === 'serverless') {
  const serverless = require('serverless-http');
  module.exports = serverless(app);
}
