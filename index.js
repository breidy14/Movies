const express = require('express');
const boyParser = require('body-parser');
const Sequelize = require ('sequelize');
const app = express();

app.use(boyParser.urlencoded({extended: true}));

app.listen(3000, ()=> {
    console.log("Server listo");
})