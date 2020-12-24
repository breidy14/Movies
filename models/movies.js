'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movies extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Movies.init({
    name: DataTypes.STRING,
    sinopsis: DataTypes.STRING,
    reparto: DataTypes.STRING,
    director: DataTypes.STRING,
    fechaEstreno: DataTypes.DATE,
    img: DataTypes.STRING,
    slug: DataTypes.STRING,
    linkTrailer: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Movies',
  });
  return Movies;
};