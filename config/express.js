const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');


module.exports = (app) => {
    app.use(express.static("static"));

    app.engine('.hbs', handlebars({extname: '.hbs'}))
    app.set('view engine', '.hbs')
    app.use(bodyParser.urlencoded({ extended: false }));
};