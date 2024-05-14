"use strict";
const { TABLE_NAMES } = require("../utils/constants.js");
const { BasicSchemaAI } = require("./basic/index.js");

const { PRICE_RULE_TABLE, COMPANY_TABLE } = TABLE_NAMES;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const { DataTypes } = Sequelize;
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.createTable(
        PRICE_RULE_TABLE,
        BasicSchemaAI(DataTypes, {
          idCompany: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
              model: COMPANY_TABLE,
              key: "id",
            },
          },
          rule: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          price: {
            type: DataTypes.INTEGER,
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
    await queryInterface.dropTable(PRICE_RULE_TABLE);
  },
};
