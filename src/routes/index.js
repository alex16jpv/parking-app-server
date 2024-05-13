import carRouter from "./cars.js";

export default function routes(fastify) {
  fastify.register(carRouter, { prefix: "/cars" });
}
