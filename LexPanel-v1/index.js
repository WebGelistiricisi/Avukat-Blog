const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const fs = require('fs-extra');
const path = require('path');

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'lexpanel-secret', resave: false, saveUninitialized: true }));

// Routes
const adminRoutes = require('./routes/admin');
const siteRoutes = require('./routes/site');

app.use('/', siteRoutes);
app.use('/admin', adminRoutes);

app.listen(PORT, () => {
  console.log(`LexPanel v1 running on http://localhost:${PORT}`);
});
