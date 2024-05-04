import { FastifyReply, FastifyRequest } from "fastify";
require("dotenv").config();
const getTopArticlesHandler = async (
  request: FastifyRequest<{}>,
  reply: FastifyReply
) => {
  try {
    const res = await fetch(
      `http://api.mediastack.com/v1/news?access_key=${process.env.API_KEY}&languages=en&limit=10`,
    );
    const topArticles = await res.json();
    return reply.code(200).send(topArticles);
  } catch (err) {
    console.log(err);
    return reply.code(500).send(err);
  }
};

const getArticlesByCategoryHandler = async (
  request: FastifyRequest<{Params: {category: string}}>,
  reply: FastifyReply,
) => {
  try {
    const {category} = request.params;
    const res = await fetch(
      `http://api.mediastack.com/v1/news?access_key=${process.env.API_KEY}&categories=${category}&languages=en&limit=10`
    )
    const articles = await res.json()
    return reply.code(200).send(articles);
  } catch (err) {
    console.log(err);
    return reply.code(500).send(err);
  }
}

export {getTopArticlesHandler, getArticlesByCategoryHandler};