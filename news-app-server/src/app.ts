import Fastify from 'fastify'
import userRoutes from './modules/user/user.route';
const server = Fastify()

server.get('/test', async (request, response) => {
  return 'test';
})
server.register(userRoutes, {prefix: "api/users"});
server.listen({port: 8080}, (err, address) => {
  if (err) {
    server.log.error(err);
    process.exit(1);
  }
  server.log.info(`Server running at ${address}`);
})