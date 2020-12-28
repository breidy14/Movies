"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static login(email,password){
      return User.findOne({
        where: {
          email: email //tambien puedes usar short hand property y solo poner email
        }
      }).then(user=>{
        if(!user) return null;
  
        return user.authenticatePassword(password).then(valid=>{
          if(valid) return user;
          return null // Tambien se puede escribir .then(valid=> valid ? user : null);
        });
      });
    }
  
    authenticatePassword = function(password){
      return new Promise((res,rej)=>{
        bcrypt.compare(password,this.passwordHash,function(err,valid){
          if(err) return rej(err);
  
          res(valid);
        })
      })
    }
    
    static associate(models) {
        // define association here
    }
  };
  User.init({
    name:{
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      default: false,
      allowNull: false
    },
    passwordHash: {
      type: DataTypes.STRING,
      allowNull: true
    },
    password: {
      type: DataTypes.VIRTUAL,
      validate: {
          isLongEnough: function (val) {
            if (val.length < 8) {
              throw new Error("Intrduzca una contraseña más larga")
            }
        }
      }
    }
  }, {
    sequelize,
    modelName: "User",
  });

  User.beforeCreate((user,options)=>{
    return new Promise((res,rej)=>{
      if(user.password){
        bcrypt.hash(user.password, 10, function(error,hash){
          user.passwordHash = hash;
          res();
        })
      };
    });
  });
  return User;
};
