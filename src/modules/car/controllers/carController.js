import CarClass from "../classes/carClass.js";
import { CarService } from "../../../layer/index.js";

export default class CarController {
  constructor() {
    this.carClass = new CarClass({
      carService: new CarService(),
    });
  }

  async getCars(request, reply) {
    return this.carClass.getCars();
  }
}
