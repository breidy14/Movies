const jwt = require('jsonwebtoken')
const User = require('../models').User;
const secrets = require('../config/secrets').jwtSecret;


const auth = async(req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  if(!token) return res.status(403).json({message: "No se ha proporcionado el token"})
  
  const data = jwt.verify(token, secrets);///secrets por variable de entorno con la JWT Key

  try {
      const user = await User.findByPk(data.id);
      if (!user) res.status(404).json({message: "Usuario no encontrado"})
      
      user.passwordHash = 0;
      req.fullUser = user.id;

      next();
  } catch (error) {
      return res.status(401).send({ error: 'No esta autorizado para acceder aquí' });
  }

}
module.exports = auth;