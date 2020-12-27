const Movie = require('../models').Movie;
const paramsBuldier = require('./helpers').paramsBuilder;
const validParams = ['title', 'sinopsis', 'reparto', 'director', 'fechaEstreno', 'img', 'linkTrailer']


module.exports = {
  find: function(req, res){
    Movie.findOne({where:{slug: req.params.slug}})
      .then(movie =>{
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
   //console.log(params);
    Movie.create(params)
      .then(movie =>{
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