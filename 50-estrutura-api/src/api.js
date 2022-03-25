const express = require('express');

const routeHero = require('./routes/hero.route');

const app = express();

app.use(express.json());
app.use(routeHero);

module.exports = app;
