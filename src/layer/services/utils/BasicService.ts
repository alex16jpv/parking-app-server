export class BasicService {
  // TODO: Add types
  model: any;
  includes: any;

  constructor(model, includes) {
    this.model = model;
    this.includes = includes;
  }

  findAllByWhere(where, includes = this.includes, options = {}) {
    return this.model.findAll({ where, include: includes, ...options });
  }
}
