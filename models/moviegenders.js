'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MovieGenders extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  MovieGenders.init({
    idMovie: {
      type:DataTypes.NUMBER,
      allowNull: false
    },
    idGender: {
      type:DataTypes.NUMBER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'MovieGenders',
  });
  return MovieGenders;
};