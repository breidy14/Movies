'use strict';
const {  Model } = require('sequelize');
const slugify = require('../plugins/slugify');

module.exports = (sequelize, DataTypes) => {
  class Gender extends Model {
    generateSlugAndContinue(count, next){
      this.slug = slugify(this.name);
      if(count != 0)
          this.slug = this.slug + "-"+count;
  
      Gender.validateSlugCount(this.slug).then(isValid=>{
          if(!isValid)
          return Gender.generateSlugAndContinue.call(this,count+1,next);
          
          //next();
      });
    }

    static validateSlugCount(slug){
      return Gender.count({where: {slug: slug}}).then(count=>{
        if(count > 0) return false;
        return true;
        });
    }

    static associate(models) {
      Gender.belongsToMany(models.Movie, {
        through: 'MovieGenders', 
        as: 'movies', 
        foreignKey:'idMovie',
        onDelete:'CASCADE',
        onUpdate: 'CASCADE'
      })
    }
  };
  Gender.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    slug: {
      type: DataTypes.STRING,
      unique: true
    }
  }, {
    sequelize,
    modelName: 'Gender',
  });

  Gender.beforeCreate((gender, next)=>{
    if (gender.slug) return next();

    gender.slug = slugify(gender.name);
    gender.generateSlugAndContinue.call(gender,0,next);
  })

  return Gender;
};