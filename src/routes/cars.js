import CarController from "../modules/car/controllers/carController.js";

export default async function carRouter(fastify, options) {
  fastify.route({
    method: "GET",
    url: "/",
    handler: async (request, reply) => {
      const carController = new CarController();
      return carController.getCars(request, reply);
    },
  });
}
