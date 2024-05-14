"use strict";
const { TABLE_NAMES } = require("../utils/constants.js");
const { BasicSchemaAI } = require("./basic/index.js");

const { TICKET_TABLE, CAR_TABLE, SLOTS_TABLE } = TABLE_NAMES;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const { DataTypes } = Sequelize;
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.createTable(
        TICKET_TABLE,
        BasicSchemaAI(DataTypes, {
          idCar: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
              model: CAR_TABLE,
              key: "id",
            },
          },
          idSlot: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
              model: SLOTS_TABLE,
              key: "id",
            },
          },
          entryDate: {
            allowNull: false,
            type: DataTypes.DATE,
          },
          exitDate: {
            allowNull: true,
            type: DataTypes.DATE,
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
    await queryInterface.dropTable(TICKET_TABLE);
  },
};
