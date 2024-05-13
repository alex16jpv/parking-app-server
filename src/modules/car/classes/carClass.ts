import { CarService } from "../../../layer";

export default class CarClass {
  carService: CarService;

  constructor({ carService }) {
    this.carService = carService;
  }

  async getCars() {
    const foundCars = await this.carService.findAllByWhere({});
    return foundCars;
  }
}
