const User = require('../models').User;
const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets').jwtSecret;

module.exports = {
  create: function(req, res, next){
    User.login(req.body.email, req.body.password)
      .then(user => {
        if (user) {
          req.user = user;
          next();
        }

        next(new Error("Invalid Credentials"));
      }).catch(error=>{
        console.log(error);
        res.json(error)
      })
  },

  generateToken: function (req,res,next){
    if(!req.user) return next();

    req.token = jwt.sign({id: req.user._id},secrets);

    next();
  },

  sendToken: function(req,res){
      if(req.user){
          res.json({
              user: req.user,
              jwt: req.token
          });
      }else{
          res.status(422).json({
              error: 'No se pudo crear el usuario'
          });
      }
  },

  destroy: (req,res)=>{
    req.session.destroy(()=>{
        res.redirect('/sessions');
    });
  }
}