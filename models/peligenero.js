'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PeliGenero extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  PeliGenero.init({
    idPeli: DataTypes.NUMBER,
    idGenero: DataTypes.NUMBER
  }, {
    sequelize,
    modelName: 'PeliGenero',
  });
  return PeliGenero;
};