"use strict";
const { TABLE_NAMES } = require("../utils/constants.js");
const { BasicSchemaAI } = require("./basic/index.js");

const { SLOTS_STATUS_TABLE } = TABLE_NAMES;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const { DataTypes } = Sequelize;
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.createTable(
        SLOTS_STATUS_TABLE,
        BasicSchemaAI(DataTypes, {
          key: {
            type: DataTypes.STRING,
            allowNull: false,
          },
        }),
        {
          transaction,
        }
      );

      await queryInterface.addIndex(SLOTS_STATUS_TABLE, ["key"], {
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
    await queryInterface.dropTable(SLOTS_STATUS_TABLE);
  },
};
