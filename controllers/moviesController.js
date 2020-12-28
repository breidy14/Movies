const Movie = require('../models').Movie;
//const Genders = require('../models').Gender;
const paramsBuldier = require('./helpers').paramsBuilder;
const validParams = ['title', 'sinopsis', 'reparto', 'director', 'fechaEstreno', 'img', 'linkTrailer']

module.exports = {
  find: async function(req, res){

    let movieId = await Movie.findOne({where:{slug: req.params.slug}}).catch(error=>{console.log(error);});

      if (!movieId) {
        res.json({error:"Esta pelicula no esta disponible"})
      }

    Movie.findByPk(movieId.id,{
      include:['genders']
    }).then(movie =>{
        req.movieId = movie.id
        res.json(movie);
      }).catch(error =>{
        console.log(error);
        res.json(error)
      })
  },

  index: function(req, res){
    Movie.findAll()
      .then(movies =>{
        res.json(movies)
      }).catch(error =>{
        console.log(error);
        res.json(error)
      })
  },

  create: function(req, res){
    let params = paramsBuldier(validParams, req.body);
    let gendersIds = req.body.genders.split(',');
    console.log(gendersIds);
    Movie.create(params)
      .then(movie =>{
        movie.addGenders(gendersIds);
        res.json(movie);
      }).catch(error =>{
        console.log(error);
        res.json(error)
      })
  },

  destroy: function(req, res){
    Movie.destroy({where:{slug: req.params.slug}})
      .then(movie =>{
        res.json(movie)
      }).catch(error =>{
        console.log(error);
        res.json(error)
      })
  }
}

/**
 * 
 * task.save().then(()=>{
                let categoriesIds = req.body.checkCate;
                task.addCategories(categoriesIds)
                .then(()=>{
                    res.redirect(`/tasks/${task.id}`);
                })
            })
 */