const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS so the React app can communicate with this server
app.use(cors());

// Configure JSON payload limit to support base64 file transmission
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Create a directory to save uploaded resumes locally for verification
const UPLOADS_DIR = path.join(__dirname, 'uploads');
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR);
}

// ================= API ENDPOINTS =================

/**
 * 1. Contact Scoping Form Enquiry
 */
app.post('/api/contact', (req, res) => {
  console.log('\n--- NEW CONTACT SCOPING ENQUIRY ---');
  console.log('Received:', req.body);

  const { fullName, email, company, description } = req.body;
  if (!fullName || !email || !description) {
    return res.status(400).json({
      success: false,
      message: 'Required fields: fullName, email, description.'
    });
  }

  // Simulate storing in database or sending slack alert
  return res.status(200).json({
    success: true,
    message: 'Scoping query successfully received. A senior systems architect will reach out within 24 hours.'
  });
});

/**
 * 2. Careers Job Application
 */
app.post('/api/careers/apply', (req, res) => {
  console.log('\n--- NEW CAREERS JOB APPLICATION ---');
  const { jobTitle, fullName, email, resumeBase64, resumeFileName } = req.body;

  console.log(`Applicant: ${fullName} (${email}) for role: ${jobTitle}`);

  if (!fullName || !email || !resumeBase64 || !resumeFileName) {
    return res.status(400).json({
      success: false,
      message: 'Required fields: fullName, email, resumeBase64, resumeFileName.'
    });
  }

  try {
    // Decode base64 and write the uploaded file locally to server/uploads/
    const buffer = Buffer.from(resumeBase64, 'base64');
    const safeFileName = `${Date.now()}-${resumeFileName.replace(/\s+/g, '_')}`;
    const filePath = path.join(UPLOADS_DIR, safeFileName);
    
    fs.writeFileSync(filePath, buffer);
    console.log(`Uploaded resume saved to: ${filePath}`);

    return res.status(200).json({
      success: true,
      message: `Application for ${jobTitle} submitted successfully. Resume processed.`
    });
  } catch (error) {
    console.error('File writing error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to write uploaded file on server.'
    });
  }
});

/**
 * 3. Internship Track Application
 */
app.post('/api/internship/apply', (req, res) => {
  console.log('\n--- NEW INTERNSHIP APPLICATION ---');
  const { trackTitle, name, email, resumeBase64, resumeFileName } = req.body;

  console.log(`Intern Candidate: ${name} (${email}) for track: ${trackTitle}`);

  if (!name || !email || !resumeBase64 || !resumeFileName) {
    return res.status(400).json({
      success: false,
      message: 'Required fields: name, email, resumeBase64, resumeFileName.'
    });
  }

  try {
    const buffer = Buffer.from(resumeBase64, 'base64');
    const safeFileName = `intern-${Date.now()}-${resumeFileName.replace(/\s+/g, '_')}`;
    const filePath = path.join(UPLOADS_DIR, safeFileName);
    
    fs.writeFileSync(filePath, buffer);
    console.log(`Intern resume saved to: ${filePath}`);

    return res.status(200).json({
      success: true,
      message: `Internship track application for ${trackTitle} received.`
    });
  } catch (error) {
    console.error('File writing error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to write uploaded file on server.'
    });
  }
});

/**
 * 4. Training Bootcamp Enrollment
 */
app.post('/api/training/enroll', (req, res) => {
  console.log('\n--- NEW TRAINING BOOTCAMP ENROLLMENT ---');
  console.log('Received:', req.body);

  const { name, email, course, experience } = req.body;
  if (!name || !email || !course) {
    return res.status(400).json({
      success: false,
      message: 'Required fields: name, email, course.'
    });
  }

  return res.status(200).json({
    success: true,
    message: 'Enrollment enquiry processed. Bootcamp orientation schedules will be emailed shortly.'
  });
});

app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`Ascope Tech Enterprise Backend server running on:`);
  console.log(`👉 http://localhost:${PORT}`);
  console.log(`====================================================`);
});
