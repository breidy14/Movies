'use strict';
const {
  Model
} = require('sequelize');
const slugify = require('../plugins/slugify');
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /*generateSlugAndContinue(count, next){
      this.slug = slugify(this.name);
      if(count != 0)
          this.slug = this.slug + "-"+count;
  
      Role.validateSlugCount(this.slug).then(isValid=>{
          if(!isValid)
          return Role.generateSlugAndContinue.call(this,count+1,next);
          
          //next();
      });
    }*/

    static validateSlugCount(slug){
      return Role.count({where: {slug: slug}}).then(count=>{
        if(count > 0) return false;
        return true;
        });
      }

    static associate(models) {
      Role.belongsToMany(models.User, {
        through: 'UserRoles', 
        as: 'users', 
        foreignKey:'idUser',
        onDelete:'CASCADE',
        onUpdate: 'CASCADE'
      })
    }
  };
  Role.init({
    name: DataTypes.STRING,
    slug: {
      type: DataTypes.STRING,
      unique: true
    }
  }, {
    sequelize,
    modelName: 'Role',
  });

  Role.beforeCreate((role, next)=>{
    if (role.slug) return next();

    role.slug = slugify(role.name);
    role.save();
    //role.generateSlugAndContinue.call(role,0,next);
  })

  return Role;
};