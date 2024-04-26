import { FastifyReply, FastifyRequest } from "fastify";
require("dotenv").config();
const getTopArticlesHandler = async (
  request: FastifyRequest<{}>,
  reply: FastifyReply
) => {
  try {
    const res = await fetch(
      "https://api.webz.io/newsApiLite?token=67091c05-f1ac-4fe5-9634-f9ee91a0bcd1&q=site_type%3Anews"
    );
    return reply.code(200).send(res);
  } catch (err) {
    console.log(err);
    return reply.code(500).send(err);
  }
};

export default getTopArticlesHandler;
