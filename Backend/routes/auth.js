const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const db = require('../config/db');

// ─── Helper: ensure security columns exist ────────────────────────
// Runs once on startup so you don't have to manually ALTER the table.
(async () => {
  try {
    await db.query(`
      ALTER TABLE users
        ADD COLUMN IF NOT EXISTS security_question TEXT,
        ADD COLUMN IF NOT EXISTS security_answer   TEXT
    `);
  } catch (err) {
    console.error('Could not alter users table (non-fatal):', err.message);
  }
})();

// ═══════════════════════════════════════════════════════════════════
//  REGISTER
// ═══════════════════════════════════════════════════════════════════
router.post('/register', async (req, res) => {
  const { name, email, password, securityQuestion, securityAnswer } = req.body;

  if (!name || !email || !password || !securityQuestion || !securityAnswer) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const result = await db.query('SELECT id FROM users WHERE email = $1', [email]);
    if (result.rows.length > 0) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const hashedAnswer   = await bcrypt.hash(securityAnswer.trim().toLowerCase(), 10);

    const insertResult = await db.query(
      `INSERT INTO users (name, email, password, security_question, security_answer)
       VALUES ($1, $2, $3, $4, $5) RETURNING id`,
      [name, email, hashedPassword, securityQuestion, hashedAnswer]
    );

    res.status(201).json({ message: 'Account created successfully', userId: insertResult.rows[0].id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// ═══════════════════════════════════════════════════════════════════
//  LOGIN
// ═══════════════════════════════════════════════════════════════════
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const result = await db.query('SELECT id, name, email, password FROM users WHERE email = $1', [email]);
    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const user = result.rows[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' } // Token expires in 7 days
    );

    res.status(200).json({
      message: 'Login successful',
      token: token,
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// ═══════════════════════════════════════════════════════════════════
//  FORGOT PASSWORD — Step 1: Get security question by email
// ═══════════════════════════════════════════════════════════════════
router.post('/forgot-password/question', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  try {
    const result = await db.query(
      'SELECT security_question FROM users WHERE email = $1',
      [email]
    );

    if (result.rows.length === 0 || !result.rows[0].security_question) {
      return res.status(404).json({ message: 'No account found with that email or no security question set.' });
    }

    res.status(200).json({ securityQuestion: result.rows[0].security_question });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// ═══════════════════════════════════════════════════════════════════
//  FORGOT PASSWORD — Step 2: Verify security answer
// ═══════════════════════════════════════════════════════════════════
router.post('/forgot-password/verify', async (req, res) => {
  const { email, securityAnswer } = req.body;

  if (!email || !securityAnswer) {
    return res.status(400).json({ message: 'Email and security answer are required' });
  }

  try {
    const result = await db.query(
      'SELECT security_answer FROM users WHERE email = $1',
      [email]
    );

    if (result.rows.length === 0 || !result.rows[0].security_answer) {
      return res.status(404).json({ message: 'Account not found.' });
    }

    const isMatch = await bcrypt.compare(
      securityAnswer.trim().toLowerCase(),
      result.rows[0].security_answer
    );

    if (!isMatch) {
      return res.status(401).json({ message: 'Incorrect answer. Please try again.' });
    }

    res.status(200).json({ message: 'Answer verified' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// ═══════════════════════════════════════════════════════════════════
//  FORGOT PASSWORD — Step 3: Reset password
// ═══════════════════════════════════════════════════════════════════
router.post('/forgot-password/reset', async (req, res) => {
  const { email, securityAnswer, newPassword } = req.body;

  if (!email || !securityAnswer || !newPassword) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  if (newPassword.length < 6) {
    return res.status(400).json({ message: 'Password must be at least 6 characters' });
  }

  try {
    const result = await db.query(
      'SELECT id, security_answer FROM users WHERE email = $1',
      [email]
    );

    if (result.rows.length === 0 || !result.rows[0].security_answer) {
      return res.status(404).json({ message: 'Account not found.' });
    }

    // Re-verify the security answer (prevents skipping step 2)
    const isMatch = await bcrypt.compare(
      securityAnswer.trim().toLowerCase(),
      result.rows[0].security_answer
    );

    if (!isMatch) {
      return res.status(401).json({ message: 'Security verification failed.' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await db.query('UPDATE users SET password = $1 WHERE id = $2', [
      hashedPassword,
      result.rows[0].id,
    ]);

    res.status(200).json({ message: 'Password reset successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
