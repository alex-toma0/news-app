import {
  FastifyPluginCallback,
  FastifyReply,
  FastifyRequest,
  FastifySchema,
} from "fastify";
import { TCreateUser, TCreateUserResponse, TLoginUser } from "./user.types";
import prisma from "../../utils/prisma";
import bcrypt from "bcrypt";
const SALT_ROUNDS = 10;
export async function createUserHandler(
  req: FastifyRequest<{ Body: TCreateUser }>,
  reply: FastifyReply
) {
  const { password, email, name } = req.body;
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  if (user) {
    return reply.code(401).send({
      message: "A user already exists with this email address",
    });
  }
  try {
    const hash = await bcrypt.hash(password, SALT_ROUNDS);
    const user = await prisma.user.create({
      data: {
        password: hash,
        email,
        name,
      },
    });
    return reply.code(201).send(user);
  } catch (err) {
    return reply.code(500).send(err);
  }
}

export async function loginUserHandler(
  req: FastifyRequest<{ Body: TLoginUser }>,
  reply: FastifyReply
) {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({
    where: { email: email },
  });
  const isMatch = user && (await bcrypt.compare(password, user.password));
  if (!user || !isMatch) {
    return reply.code(401).send({
      message: "Invalid email or password!",
    });
  }
  const payload = {
    id: user.id,
    email: user.email,
    name: user.name,
  };
  const token = req.jwt.sign(payload);
  reply.setCookie("access_token", token, {
    path: "/",
    httpOnly: true,
    secure: true,
  });
  return { accessToken: token };
}

export async function logoutHandler(req: FastifyRequest, reply: FastifyReply) {
  reply.clearCookie("access_token");
  return reply.send({ message: "Logout succesful" });
}
