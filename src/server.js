import Fastify from "fastify";
import Routes from "./routes/index.js";

const fastify = Fastify({
  logger: true,
});

// Register all routes
Routes(fastify);

try {
  await fastify.listen({ port: 3000 });
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
