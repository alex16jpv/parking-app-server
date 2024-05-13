import { BasicService } from "./utils/BasicService.js";
import Models from "../models/index.js";

export class CarService extends BasicService {
  constructor() {
    super(Models.Car, []);
  }
}
