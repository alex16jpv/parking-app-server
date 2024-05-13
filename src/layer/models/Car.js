import { Model } from "sequelize";

export class Car extends Model {
  static associate(models) {}
}

export default (sequelize, DataTypes) => {
  Car.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      plate: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { sequelize, tableName: "Car" }
  );

  return Car;
};
