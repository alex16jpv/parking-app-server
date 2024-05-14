"use strict";
const { TABLE_NAMES } = require("../utils/constants.js");
const { BasicSchemaAI } = require("./basic/index.js");

const { SLOTS_TABLE, SLOTS_STATUS_TABLE } = TABLE_NAMES;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const { DataTypes } = Sequelize;
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.createTable(
        SLOTS_TABLE,
        BasicSchemaAI(DataTypes, {
          idSlotStatus: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
              model: SLOTS_STATUS_TABLE,
              key: "id",
            },
          },
          name: {
            type: DataTypes.STRING,
            allowNull: false,
          },
        }),
        {
          transaction,
        }
      );

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },

  async down(queryInterface) {
    await queryInterface.dropTable(SLOTS_TABLE);
  },
};
