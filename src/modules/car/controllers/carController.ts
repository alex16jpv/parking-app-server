import CarClass from "../classes/carClass.js";
import { CarService } from "../../../layer/index.js";

export default class CarController {
  carClass: CarClass;

  constructor() {
    this.carClass = new CarClass({
      carService: new CarService(),
    });
  }

  async getCars(request, reply) {
    return this.carClass.getCars();
  }
}
