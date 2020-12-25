'use strict';
const {  Model } = require('sequelize');
const slugify = require('../plugins/slugify');

module.exports = (sequelize, DataTypes) => {
  class Movies extends Model {
    
    generateSlugAndContinue(count,next){
      this.slug = slugify(this.title);
      if(count != 0)
          this.slug = this.slug + "-"+count;
  
      Movies.validateSlugCount(this.slug).then(isValid=>{
          if(!isValid)
          return generateSlugAndContinue.call(this,count+1,next);
          next();
      });
    }

    static validateSlugCount(slug){
      return Movies.count({slug: slug}).then(count=>{
        if(count > 0) return false;
        return true;
        });
    }

    static associate(models) {
      // define association here
    }
  };
  Movies.init({
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
    modelName: 'Movies',
  });

  Movies.beforeCreate(function(next){
    if (this.slug) return next();

    this.slug = slugify(this.title);

  })

  return Movies;
};