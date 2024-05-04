import { Type, Static } from "@fastify/type-provider-typebox";
import { FastifySchema } from "fastify";

export const CreateUserBody = Type.Object({
  email: Type.String({ format: "email" }),
  name: Type.String(),
  password: Type.String({
    minLength: 4,
  }),
});

export const CreateUserResponse = Type.Object({
  id: Type.Number(),
  email: Type.String({ format: "email" }),
  name: Type.String(),
  password: Type.String({
    minLength: 4,
  }),
});

export const LoginUserBody = Type.Object({
  email: Type.String({ format: "email" }),
  password: Type.String({
    minLength: 4,
  }),
});

export const LoginResponse = Type.Object({
  accesToken: Type.String(),
});
