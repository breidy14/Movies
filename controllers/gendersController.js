const Gender = require('../models').Gender;
const paramsBuldier = require('./helpers').paramsBuilder;
const validParams = ['name']

module.exports = {
  find: async function(req, res){
      
      let genderId = await Gender.findOne({where:{slug: req.params.slug}}).catch(error=>{console.log(error);});

      if (!genderId) {
        res.json({error:"Generó invalido"})
      }
      
      Gender.findByPk(genderId.id,{
        include:['movies']
      }).then((gender)=>{
          res.json(gender)
      }).catch(error =>{
        console.log(error);
        res.json(error);
      });
  },

  index: function(req, res) {
    Gender.findAll()
      .then(genders =>{
        res.json(genders);
      }).catch(error =>{
        console.log(error);
        res.json(error);
      })
  },

  create: function(req,res){
    let params = paramsBuldier(validParams, req.body);

    Gender.create(params)
      .then(gender =>{
        res.json(gender);
      }).catch(error =>{
        console.log(error);
        res.json(error);
      })
  },

  destroy: function(req, res){
    Gender.destroy({where:{slug: req.params.slug}})
      .then(result =>{
        res.json(result);
      }).catch(error =>{
        console.log(error);
        res.json(error);
      })
  }
}
