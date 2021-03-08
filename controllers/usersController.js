//const sequelize = require('sequelize');
const User = require('../models').User;
const paramsBuilder = require('./helpers').paramsBuilder;
const validParams = ['email','name', 'lastName','password'];




module.exports = {
  find: function(req, res){
    User.findOne({where:{id: req.fullUser},attributes: ['name', 'lastName','email']})
      .then(user =>{
        res.status(200).json(user);
      }).catch(error=>{
        res.status(404).json(error);
      })
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