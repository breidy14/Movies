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
			name: {
				type: Sequelize.STRING,
			},
			sinopsis: {
				type: Sequelize.STRING,
			},
			reparto: {
				type: Sequelize.STRING,
			},
			director: {
				type: Sequelize.STRING,
			},
			fechaEstreno: {
				type: Sequelize.DATE,
			},
			img: {
				type: Sequelize.STRING,
			},
			slug: {
				type: Sequelize.STRING,
			},
			linkTrailer: {
				type: Sequelize.STRING,
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
