const express = require('express');
const router = express.Router();
const fs = require('fs-extra');

router.get('/', async (req, res) => {
  const blogs = await fs.readJSON('./data/blogs.json');
  res.render('index', { blogs });
});

module.exports = router;
