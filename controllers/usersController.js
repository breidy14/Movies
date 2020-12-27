//const sequelize = require('sequelize');
const User = require('../models').User;
const paramsBuilder = require('./helpers').paramsBuilder;
const validParams = ['email','name', 'lastName','password'];




module.exports = {
  index: function(req, res){
  },
  create: function(req, res){
    console.log(req.body);
    console.log(req.headers);
    let params = paramsBuilder(validParams, req.body)
    
    User.create(params)
      .then(user=>{
        res.json(user)
      }).catch(error=>{
        console.log(error);
        res.status(422).json({
            error
        });
      })
  },
  edit: function(req, res){
    
  },
  delete: function(req, res){
    
  }
}