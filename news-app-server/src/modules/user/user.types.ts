import { Static } from "@fastify/type-provider-typebox";
import {
  CreateUserBody,
  CreateUserResponse,
  LoginUserBody,
} from "./user.schema";
export type TCreateUser = Static<typeof CreateUserBody>;
export type TCreateUserResponse = Static<typeof CreateUserResponse>;
export type TLoginUser = Static<typeof LoginUserBody>;
