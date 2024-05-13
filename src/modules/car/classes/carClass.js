import Models from "../../../layer/models/index.js";

export default class CarClass {
  async getCars() {
    const foundCars = await Models.Car.findAll();
    return foundCars;
  }
}
