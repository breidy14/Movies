const User = require('../models').User;
const Role = require('../models').Role;
const UserRoles = require('../models').UserRoles;
const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets').jwtSecret;
const paramsBuilder = require('./helpers').paramsBuilder;
const validParams = ['email','name', 'lastName','password'];

module.exports = {
  signin: function(req, res, next){
    User.login(req.body.email, req.body.password)
      .then(user => {
        if (!user) next(new Error("Invalid Credentials"));

        req.user = user;
        next();
      }).catch(error=>{
        console.log(error);
        res.json(error)
      })
  },

  signup: async (req, res)=>{
    let params = paramsBuilder(validParams, req.body)
    const [role,created] = await Role.findOrCreate({where: { name: 'user' }, defaults: {name: 'user'}});
    
    const user = await User.create(params);
    if(!user) res.status(422).json({message:'error al crear al usuario'});

    
    
    UserRoles.create({idUser:user.id,idRole:role.id})
      .then(userRole =>{
        res.status(201).json({message: "Usuario creado correctamente, ahora puede iniciar sessión"});
      }).catch(err=>{
        res.status(422).json({err})
      })

  },

  generateToken: function (req,res,next){
    if(!req.user) return next();

    req.token = jwt.sign({id: req.user.id},secrets,{
      expiresIn: 86400
    });

    next();
  },

  sendToken: function(req,res){
      if(req.user){
          res.json({
              token: req.token
          });
      }else{
          res.status(422);
      }
  },

  logout: (req,res)=>{
    req.user.destroy(()=>{
        res.status(204);
    })
  }
}