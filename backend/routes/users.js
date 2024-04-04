const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const { query } = require('../db/db');

const DOMAIN = process.env.MG_DOMAIN;
const mailgun = require('mailgun-js')
    ({ apiKey: process.env.MAILGUN_API_KEY, domain: process.env.MG_DOMAIN });


// Route to send email with one-time token
router.post('/send-email', async (req, res) => {
  try {
    const domain = process.env.MG_DOMAIN;
    const { email } = req.body;

    // Generate one-time token
    const token = generateToken();

    // Create email data
    const data = {
      from: `Mailgun Sandbox <postmaster@${domain}>`,
      to: email,
      subject: "Hello",
      text: `Your one-time token is: ${token}` // Include token in the email
    };

    // Send email using Mailgun
    mailgun.messages().send(data, async (error, body) => {
      if (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to send email" });
      } else {
        console.log(body);
        try {
          await insertToken(email, token);
          res.status(200).json({ message: "Email sent successfully" });
        } catch (err) {
          console.error(err);
          res.status(500).json({ message: "Failed to insert token into the database" });
        }
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to send email" });
  }
});

// Generate one-time token
function generateToken() {
  return crypto.randomBytes(10).toString('hex');
}

async function insertToken(email, token) {
  try {
    // Check if email already exists in the database
    const checkEmailQuery = 'SELECT * FROM users WHERE email = $1';
    const { rowCount } = await query(checkEmailQuery, [email]);

    if (rowCount === 0) {
      // Email does not exist, insert the token
      const insertQuery = 'INSERT INTO tokens (email, token, used, date_created) VALUES ($1, $2, false, NOW())';
      await query(insertQuery, [email, token]);
    } else {
      // Email already exists, you can handle this case as per your requirement
      console.log(`Email ${email} already exists in the database.`);
    }
  } catch (error) {
    throw error;
  }
}

router.get('/', async (req, res) => {
  try {
    const result = await query('SELECT * FROM users');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/:id', async (req, res) => {
  const userId = req.params.id;

  try {
    const result = await query('SELECT * FROM users WHERE id = $1', [userId]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

router.post("/", async (req, res) => {

  return res.status(200).json({ success: true });
});

module.exports = router;