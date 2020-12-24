'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class userRol extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  userRol.init({
    idRol: DataTypes.NUMBER,
    idUser: DataTypes.NUMBER
  }, {
    sequelize,
    modelName: 'userRol',
  });
  return userRol;
};