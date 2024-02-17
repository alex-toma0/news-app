import prisma from "../../utils/prisma";
import { hashPassword, verifyPassword } from "../../utils/hash";
import { CreateUserInput } from "./user.schema";

const createUser = async (input: CreateUserInput) => {
  const hashedPassword = await hashPassword(input.password);
  const user = await prisma.user.create({
    data: {
      email: input.email,
      name: input.name,
      password: hashedPassword,
    },
  });
  return user;
};

export default createUser;
