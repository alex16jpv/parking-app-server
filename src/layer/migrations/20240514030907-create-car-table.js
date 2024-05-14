"use strict";
const { TABLE_NAMES } = require("../utils/constants.js");
const { BasicSchemaAI } = require("./basic/index.js");

const { CAR_TABLE } = TABLE_NAMES;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const { DataTypes } = Sequelize;
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.createTable(
        CAR_TABLE,
        BasicSchemaAI(DataTypes, {
          plate: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          color: {
            type: DataTypes.STRING,
            allowNull: true,
          },
        }),
        {
          transaction,
        }
      );

      await queryInterface.addIndex(CAR_TABLE, ["plate"], {
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
    await queryInterface.dropTable(CAR_TABLE);
  },
};
