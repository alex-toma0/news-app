const bcrypt = require("bcrypt");
const hashPassword = async (password: string): Promise<string> => {
  const workFactor = 8;
  const hashedPassword = await bcrypt.hash(password, workFactor);
  return hashedPassword;
};

const verifyPassword = (password: string, hash: string): boolean => {
  bcrypt.compare(password, hash, (err: any, result: boolean) => {
    return result === true;
  });
  return false;
};
export { hashPassword, verifyPassword };
