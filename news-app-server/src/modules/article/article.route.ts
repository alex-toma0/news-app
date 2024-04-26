import { FastifyInstance } from "fastify";
import getTopArticlesHandler from "./article.controller";
const articleRoutes = async (server: FastifyInstance) => {
  server.get("/", getTopArticlesHandler);
};

export default articleRoutes;
