"use strict";
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("Movies", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			title: {
        type: Sequelize.STRING,
        allowNull: false,
			},
			sinopsis: {
        type: Sequelize.STRING,
        allowNull: false,
			},
			reparto: {
        type: Sequelize.STRING,
        allowNull: false,
			},
			director: {
        type: Sequelize.STRING,
        allowNull: false,
			},
			fechaEstreno: {
        type: Sequelize.DATE,
        allowNull: false,
			},
			img: {
        type: Sequelize.STRING,
        allowNull: false,
			},
			slug: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
			},
			linkTrailer: {
        type: Sequelize.STRING,
        allowNull: false,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable("Movies");
	},
};
