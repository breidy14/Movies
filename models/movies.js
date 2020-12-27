'use strict';
const {  Model } = require('sequelize');
const slugify = require('../plugins/slugify');
//const moviegenders = require('./moviegenders');

module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    
    generateSlugAndContinue(count, next){
      this.slug = slugify(this.title);
      if(count != 0)
          this.slug = this.slug + "-"+count;
  
      Movie.validateSlugCount(this.slug).then(isValid=>{
          if(!isValid)
          return Movie.generateSlugAndContinue.call(this,count+1,next);
          
          //next();
      });
    }

    static validateSlugCount(slug){
      return Movie.count({where: {slug: slug}}).then(count=>{
        if(count > 0) return false;
        return true;
        });
    }

    static associate(models) {
      Movie.belongsToMany(models.Gender, {
        through: 'MovieGenders', 
        as: 'Genders', 
        foreignKey:'idGender',
        onDelete:'CASCADE',
        onUpdate: 'CASCADE'
      })
    }
  };
  Movie.init({
    title: {
      type:DataTypes.STRING,
      allowNull: false
    },
    sinopsis: {
      type:DataTypes.STRING,
      allowNull: false
    },
    reparto: {
      type:DataTypes.STRING,
      allowNull: false
    },
    director: {
      type:DataTypes.STRING,
      allowNull: false
    },
    fechaEstreno: {
      type:DataTypes.DATE,
      allowNull: false
    },
    img: {
      type:DataTypes.STRING,
      allowNull: false
    },
    slug: {
      type:DataTypes.STRING,
      unique: true
    },
    linkTrailer: {
      type:DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Movie',
  });

  Movie.beforeCreate((movie, next)=>{
    if (movie.slug) return next();

    movie.slug = slugify(movie.title);
    movie.generateSlugAndContinue.call(movie,0,next);
  })

  return Movie;
};