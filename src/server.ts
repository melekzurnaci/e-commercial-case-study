import http from "http";
import appRouter from "./app";
import sequelize from "./utils/database";
import { errorHandler } from "./middlewares/error";
import { User } from "./interfaces/userEntity";

declare module "http" {
  interface IncomingMessage {
    query?: { [key: string]: string };
    params?: { [key: string]: string } | any;
    body?: any;
    user: User;
  }
}
const server = http.createServer((req, res) => {
  try {
    appRouter.handleRequest(req, res);
  } catch (error) {
    errorHandler(error, req, res);
  }
});

const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
  server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
});
