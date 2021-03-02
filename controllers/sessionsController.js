const User = require('../models').User;
const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets').jwtSecret;

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