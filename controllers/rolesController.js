const Role = require('../models').Role;
const paramsBuldier = require('./helpers').paramsBuilder;
const validParams = ['name']

module.exports = {
  find: async function(req, res){
      
      let roleId = await Role.findOne({where:{slug: req.params.slug}}).catch(error=>{console.log(error);});

      if (!roleId) {
        res.json({error:"Rol invalido"})
      }
      
      Role.findByPk(roleId.id,{
        include:['users']
      }).then((role)=>{
          res.status(200).json(role)
      }).catch(error =>{
        console.log(error);
        res.status(404).json(error);
      });
  },

  index: function(req, res) {
    Role.findAll()
      .then(roles =>{
        res.status(200).json(roles);
      }).catch(error =>{
        console.log(error);
        res.status(404).json(error);
      })
  },

  create: function(req,res){
    let params = paramsBuldier(validParams, req.body);

    Role.create(params)
      .then(role =>{
        res.status(201).json(role);
      }).catch(error =>{
        console.log(error);
        res.json(error);
      })
  },

  destroy: function(req, res){
    Role.destroy({where:{slug: req.params.slug}})
      .then(result =>{
        res.status(204).json(result);
      }).catch(error =>{
        console.log(error);
        res.json(error);
      })
  }
}
