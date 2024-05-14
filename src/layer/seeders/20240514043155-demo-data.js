"use strict";
const { TABLE_NAMES } = require("../utils/constants.js");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const dates = {
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    await queryInterface.bulkInsert(
      TABLE_NAMES.COMPANY_TABLE,
      [
        {
          name: "Company 1",
          ...dates,
        },
      ],
      {}
    );

    const foundCompany = await queryInterface.sequelize.query(
      `SELECT * FROM ${TABLE_NAMES.COMPANY_TABLE}`
    );

    await queryInterface.bulkInsert(
      TABLE_NAMES.USER_TABLE,
      [
        {
          name: "User 1",
          idCompany: foundCompany[0][0].id,
          ...dates,
        },
        {
          name: "User 2",
          idCompany: foundCompany[0][0].id,
          ...dates,
        },
      ],
      {}
    );

    const foundUser = await queryInterface.sequelize.query(
      `SELECT * FROM "${TABLE_NAMES.USER_TABLE}"`
    );

    await queryInterface.bulkInsert(
      TABLE_NAMES.CAR_TABLE,
      [
        {
          plate: "ABC-1234",
          ...dates,
        },
        {
          plate: "DEF-5678",
          ...dates,
        },
        {
          plate: "GHI-9101",
          ...dates,
        },
      ],
      {}
    );

    const foundCar = await queryInterface.sequelize.query(
      `SELECT * FROM ${TABLE_NAMES.CAR_TABLE}`
    );

    await queryInterface.bulkInsert(TABLE_NAMES.USER_CAR_TABLE, [
      {
        idCar: foundCar[0][0].id,
        idUser: foundUser[0][0].id,
        ...dates,
      },
      {
        idCar: foundCar[0][1].id,
        idUser: foundUser[0][1].id,
        ...dates,
      },
    ]);

    await queryInterface.bulkInsert(TABLE_NAMES.SLOTS_STATUS_TABLE, [
      {
        id: 1,
        key: "AVAILABLE",
        ...dates,
      },
      {
        id: 2,
        key: "RESERVED",
        ...dates,
      },
      {
        id: 3,
        key: "OCCUPIED",
        ...dates,
      },
      {
        id: 4,
        key: "UNAVAILABLE",
        ...dates,
      },
    ]);

    await queryInterface.bulkInsert(TABLE_NAMES.SLOTS_TABLE, [
      {
        name: "Slot 1",
        idSlotStatus: 1,
        ...dates,
      },
      {
        name: "Slot 2",
        idSlotStatus: 1,
        ...dates,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
