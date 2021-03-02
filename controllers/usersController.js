//const sequelize = require('sequelize');
const User = require('../models').User;
const paramsBuilder = require('./helpers').paramsBuilder;
const validParams = ['email','name', 'lastName','password'];




module.exports = {
  index: function(req, res){
  },
  create: function(req, res){
    let params = paramsBuilder(validParams, req.body)
    
    User.create(params)
      .then(user=>{
        res.status(201).json(user)
      }).catch(error=>{
        console.log(error);
        res.status(422).json({
            error
        });
      })
  },
  edit: function(req, res){
    
  },
  destroy: function(req, res){
    User.destroy({where:{id: req.user.id}})
      .then(result=>{
        res.status(204);
      }).catch(error=>{
        console.log(error);
        res.status(422).json({
            error
        });
      })
  }
}