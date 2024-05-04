import { FastifyInstance } from "fastify";
import {getTopArticlesHandler, getArticlesByCategoryHandler } from "./article.controller";
const articleRoutes = async (server: FastifyInstance) => {
  server.get("/getTopArticles", getTopArticlesHandler);
  server.get("/getArticlesByCategory/:category", getArticlesByCategoryHandler);
};
export default articleRoutes;
