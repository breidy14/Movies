const express = require('express');
const mysql = require('mysql2')
const boyParser = require('body-parser');
const Sequelize = require ('sequelize');
const path = require("path");
const app = express();
const jwtMiddleware = require('express-jwt');


const secrets = require('./config/secrets').jwtSecret;
//rutas
const sessionsRoutes = require('./routes/sessions_routes');
const userRoutes = require('./routes/users_routes');
const movieRoutes = require('./routes/movies_routes');
const genderRoutes = require('./routes/genders_routes');

app.use(boyParser.json());
app.use(boyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));


app.use(
  jwtMiddleware({secret: secrets, algorithms:['HS256']})
      .unless({path: ['/sessions','/users'], method: ['GET', 'OPTIONS']})
)

app.use(sessionsRoutes);
app.use(userRoutes);
app.use(movieRoutes);
app.use(genderRoutes);

app.listen(3000, ()=> {
    console.log("Server listo");
})