import Fastify from "fastify";
import Routes from "./routes/index.js";
import { closeConnection, openConnection } from "./layer/connection.js";
import Models from "./layer/models/index.js";
import "dotenv/config";

const fastify = Fastify({
  logger: true,
});

// Register all routes
Routes(fastify);

try {
  await fastify.listen({ port: 3000 });
  await openConnection();
} catch (err) {
  await closeConnection(Models?.sequelize);
  fastify.log.error(err);
  process.exit(1);
}
