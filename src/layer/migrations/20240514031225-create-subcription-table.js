"use strict";
const { TABLE_NAMES } = require("../utils/constants.js");
const { BasicSchemaAI } = require("./basic/index.js");

const { RESERVED_SLOTS_TABLE, SLOTS_TABLE, SUBSCRIPTION_TABLE } = TABLE_NAMES;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const { DataTypes } = Sequelize;
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.createTable(
        RESERVED_SLOTS_TABLE,
        BasicSchemaAI(DataTypes, {
          idSlot: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
              model: SLOTS_TABLE,
              key: "id",
            },
          },
          idSubscription: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
              model: SUBSCRIPTION_TABLE,
              key: "id",
            },
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
    await queryInterface.dropTable(RESERVED_SLOTS_TABLE);
  },
};
