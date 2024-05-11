import fastify, { FastifyReply, FastifyRequest } from "fastify";
import articleRoutes from "./modules/article/article.route";
import cors from "@fastify/cors";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
const dotenv = require("dotenv");
const server = fastify().withTypeProvider<TypeBoxTypeProvider>();
dotenv.config();
// graceful shutdown
const listeners = ["SIGINT", "SIGTERM"];
listeners.forEach((signal) => {
  process.on(signal, async () => {
    await server.close();
    process.exit(0);
  });
});
server.register(cors, {
  origin: "http://localhost:3000",
  credentials: true,
});

server.register(articleRoutes, { prefix: "api/articles" });
server.get("/healthcheck", async (req, res) => {
  return res.send("hello");
});
server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    server.log.error(err);
    process.exit(1);
  }
  server.log.info(`Server running at ${address}`);
});
