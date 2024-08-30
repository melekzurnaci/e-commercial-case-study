import { Router } from "./utils/router";
import { initializeRoutes } from "./routers/index";

class App {
  public router: Router;

  constructor() {
    this.router = new Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    initializeRoutes(this.router);
  }
}
export default new App().router;
