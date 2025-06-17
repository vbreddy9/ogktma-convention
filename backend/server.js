const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');
const PDFDocument = require('pdfkit');
const QRCode = require('qrcode');
const fs = require('fs');
const path = require('path');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json());

// 🔐 Setup Gmail transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // your Gmail ID
    pass: process.env.EMAIL_PASS  // Gmail App Password
  }
});

// 🧾 Generate PDF with QR Code
const generatePDF = async (formData) => {
  return new Promise(async (resolve, reject) => {
    const doc = new PDFDocument();
    const filename = `PaymentDetails_${Date.now()}.pdf`;
    const pdfDir = path.join(__dirname, 'pdfs');

    if (!fs.existsSync(pdfDir)) fs.mkdirSync(pdfDir);
    const filePath = path.join(pdfDir, filename);

    const stream = fs.createWriteStream(filePath);
    doc.pipe(stream);

    doc.fontSize(18).text('OGKTMA Convention - Member Registration', { align: 'center' });
    doc.moveDown();

    Object.entries(formData).forEach(([key, value]) => {
      doc.fontSize(12).text(`${key.toUpperCase()}: ${Array.isArray(value) ? JSON.stringify(value) : value}`);
    });

    // QR Code generation
    const qrText = `OGKTMA Registration - ${formData.firstName} ${formData.lastName} (${formData.email})`;
    const qrImage = await QRCode.toDataURL(qrText);
    const base64Data = qrImage.replace(/^data:image\/png;base64,/, "");
    const buffer = Buffer.from(base64Data, 'base64');
    doc.image(buffer, { fit: [100, 100], align: 'center' });

    doc.end();

    stream.on('finish', () => resolve(filePath));
    stream.on('error', reject);
  });
};

// 📩 Form submission endpoint
app.post('/api/register', async (req, res) => {
  const formData = req.body;

  try {
    const pdfPath = await generatePDF(formData);

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: [formData.email, process.env.ADMIN_EMAIL || 'info@ogktma.org'],
      subject: 'OGKTMA Member Registration Confirmation',
      text: `Dear ${formData.firstName},\n\nThank you for registering for OGKTMA Convention.\n\nPlease find the attached payment confirmation.\n\nRegards,\nOGKTMA Team`,
      attachments: [
        {
          filename: 'PaymentDetails.pdf',
          path: pdfPath
        }
      ]
    };

    await transporter.sendMail(mailOptions);

    // Clean up PDF after 10 seconds
    setTimeout(() => {
      if (fs.existsSync(pdfPath)) fs.unlinkSync(pdfPath);
    }, 10000);

    res.status(200).json({ success: true, message: 'Form submitted and email sent successfully!' });
  } catch (error) {
    console.error('❌ Email sending error:', error);
    res.status(500).json({ success: false, message: 'Submission failed. Try again later.' });
  }
});

// 🚀 Start server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
