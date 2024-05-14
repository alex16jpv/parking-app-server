"use strict";
const { TABLE_NAMES } = require("../utils/constants.js");
const { BasicSchemaAI } = require("./basic/index.js");

const { USER_CAR_TABLE, USER_TABLE, CAR_TABLE } = TABLE_NAMES;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const { DataTypes } = Sequelize;
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.createTable(
        USER_CAR_TABLE,
        BasicSchemaAI(DataTypes, {
          idUser: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
              model: USER_TABLE,
              key: "id",
            },
          },
          idCar: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
              model: CAR_TABLE,
              key: "id",
            },
          },
        }),
        {
          transaction,
        }
      );

      await queryInterface.addIndex(USER_CAR_TABLE, ["idUser", "idCar"], {
        unique: true,
        transaction,
      });

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },

  async down(queryInterface) {
    await queryInterface.dropTable(USER_CAR_TABLE);
  },
};
