const express = require('express');
const mysql = require('mysql2')
const boyParser = require('body-parser');
const Sequelize = require ('sequelize');
const path = require("path");
const app = express();
const jwtMiddleware = require('express-jwt');
const initRole = require('./libs/initialSetup').createRoles;

initRole();

const secrets = require('./config/secrets').jwtSecret;

//Middlewares


//rutas
const sessionsRoutes = require('./routes/sessions_routes');
const userRoutes = require('./routes/users_routes');
const movieRoutes = require('./routes/movies_routes');
const genderRoutes = require('./routes/genders_routes');
const roleRoutes = require('./routes/roles_routes');


app.use(boyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));


app.use(
  jwtMiddleware({secret: secrets, algorithms:['HS256']})
      .unless({path: ['/signin','/signup','/users'], method: ['GET', 'OPTIONS']})
)

app.use('/api/', sessionsRoutes);//agregar use('api/', sessionsroutes');
app.use('/api/', userRoutes);
app.use('/api/', movieRoutes);
app.use('/api/', genderRoutes);
app.use('/api/', roleRoutes)
app.listen(3000, ()=> {
    console.log("Server listo");
})