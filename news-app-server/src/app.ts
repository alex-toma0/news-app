import Fastify from "fastify";
import userRoutes from "./modules/user/user.route";
import { userSchemas } from "./modules/user/user.schema";
import articleRoutes from "./modules/article/article.route";
import cors from "@fastify/cors";
const server = Fastify();

server.get("/test", async (request, response) => {
  return "test";
});

server.register(articleRoutes, { prefix: "api/articles" });
server.register(cors, {
  origin: "*",
});
server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    server.log.error(err);
    process.exit(1);
  }
  server.log.info(`Server running at ${address}`);
});
