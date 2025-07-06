const express = require('express');
const router = express.Router();
const fs = require('fs-extra');

// Admin Login Page
router.get('/', (req, res) => {
  res.render('admin-login');
});

// Admin Login Post
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const users = await fs.readJSON('./data/users.json');

  const admin = users.find(u => u.username === username && u.password === password);
  if (admin) {
    req.session.user = admin;
    res.redirect('/admin/dashboard');
  } else {
    res.send('Hatalı giriş.');
  }
});

// Admin Dashboard
router.get('/dashboard', async (req, res) => {
  if (!req.session.user) return res.redirect('/admin');
  const blogs = await fs.readJSON('./data/blogs.json');
  res.render('admin-dashboard', { blogs });
});

// Add Blog Page
router.get('/add-blog', (req, res) => {
  if (!req.session.user) return res.redirect('/admin');
  res.render('add-blog');
});

// Add Blog POST
router.post('/add-blog', async (req, res) => {
  if (!req.session.user) return res.redirect('/admin');
  const { title, content, caseType } = req.body;
  const blogs = await fs.readJSON('./data/blogs.json');

  blogs.push({ title, content, caseType });
  await fs.writeJSON('./data/blogs.json', blogs);

  res.redirect('/admin/dashboard');
});

module.exports = router;
