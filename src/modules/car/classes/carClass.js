export default class CarClass {
  constructor({ carService }) {
    this.carService = carService;
  }

  async getCars() {
    const foundCars = await this.carService.findAllByWhere({});
    return foundCars;
  }
}
