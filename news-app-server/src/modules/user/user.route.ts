import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import {
  CreateUserBody,
  CreateUserResponse,
  LoginResponse,
  LoginUserBody,
} from "./user.schema";
import {
  createUserHandler,
  loginUserHandler,
  logoutHandler,
} from "./user.controller";
export async function userRoutes(server: FastifyInstance) {
  server.get(
    "/",
    {
      preHandler: [server.authenticate],
    },
    (req: FastifyRequest, reply: FastifyReply) => {
      reply.send({ message: "/ route hit" });
    }
  );
  server.post(
    "/register",
    {
      schema: {
        body: CreateUserBody,
        response: {
          201: CreateUserBody,
        },
      },
    },
    createUserHandler
  );
  server.post(
    "/login",
    {
      schema: {
        body: LoginUserBody,
        response: {
          201: LoginResponse,
        },
      },
    },
    loginUserHandler
  );
  server.delete(
    "/logout",
    { preHandler: [server.authenticate] },
    logoutHandler
  );
  server.log.info("user routes registered");
}
