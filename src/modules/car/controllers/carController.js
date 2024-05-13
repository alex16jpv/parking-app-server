import CarClass from "../classes/carClass.js";

export default class CarController {
  constructor() {
    this.carClass = new CarClass();
  }

  async getCars(request, reply) {
    return this.carClass.getCars();
  }
}
