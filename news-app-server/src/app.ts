import fastify, { FastifyReply, FastifyRequest } from "fastify";
import articleRoutes from "./modules/article/article.route";
import { userRoutes } from "./modules/user/user.route";
import cors from "@fastify/cors";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import fjwt, { FastifyJWT } from "@fastify/jwt";
import fCookie from "@fastify/cookie";
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
  origin: true,
});
server.register(fjwt, { secret: process.env.JWT_SECRET! });

server.addHook("preHandler", (req, res, next) => {
  req.jwt = server.jwt;
  return next();
});

server.decorate(
  "authenticate",
  async (req: FastifyRequest, reply: FastifyReply) => {
    const token = req.cookies.access_token;
    if (!token) {
      return reply.status(401).send({ message: "Authentication required" });
    }
    const decoded = req.jwt.verify<FastifyJWT["user"]>(token);
    req.user = decoded;
  }
);
server.register(fCookie, {
  secret: "secret-key",
  hook: "preHandler",
});
server.register(userRoutes, { prefix: "api/users" });
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
