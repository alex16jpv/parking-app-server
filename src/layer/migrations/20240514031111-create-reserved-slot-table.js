"use strict";
const { TABLE_NAMES } = require("../utils/constants.js");
const { BasicSchemaAI } = require("./basic/index.js");

const { SUBSCRIPTION_TABLE, COMPANY_TABLE, USER_TABLE } = TABLE_NAMES;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const { DataTypes } = Sequelize;
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.createTable(
        SUBSCRIPTION_TABLE,
        BasicSchemaAI(DataTypes, {
          idCompany: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
              model: COMPANY_TABLE,
              key: "id",
            },
          },
          idUser: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
              model: USER_TABLE,
              key: "id",
            },
          },
          renew: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          startDate: {
            allowNull: false,
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
    await queryInterface.dropTable(SUBSCRIPTION_TABLE);
  },
};
