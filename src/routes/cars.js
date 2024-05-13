import CarController from "../modules/car/controllers/carController.js";

export default async function carRouter(fastify, options) {
  const carController = new CarController();
  fastify.route({
    method: "GET",
    url: "/",
    handler: async (request, reply) => {
      return carController.getCars(request, reply);
    },
  });
}
