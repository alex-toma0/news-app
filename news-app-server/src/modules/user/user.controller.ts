import { FastifyReply, FastifyRequest } from "fastify";
import createUser from "./user.service";
import { CreateUserInput } from "./user.schema";

const registerUserHandler = async (
  request: FastifyRequest<{
    Body: CreateUserInput;
  }>,
  reply: FastifyReply
) => {
  const body = request.body;
  try {
    const user = await createUser(body);
    return reply.code(201).send(user);
  } catch (err) {
    console.log(err);
    return reply.code(500).send(err);
  }
};

export default registerUserHandler;
