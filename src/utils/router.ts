import { IncomingMessage, ServerResponse } from "http";
import { ERROR_CODE } from "../constants/http.constants";
import { parseJsonBody } from "./parseBody";
import utils from "./utils";

type Handler = (req: IncomingMessage, res: ServerResponse) => void;
type Middleware = (
  req: IncomingMessage,
  res: ServerResponse,
  next: () => void
) => void;
export class Router {
  private routes: {
    [key: string]: { middlewares: Middleware[]; handler: Handler };
  } = {};

  public get(path: string, ...middlewares: Middleware[]) {
    const handler = middlewares.pop() as Handler;
    this.routes[`GET:${path}`] = { middlewares, handler };
  }

  public post(path: string, ...middlewares: Middleware[]) {
    const handler = middlewares.pop() as Handler;
    this.routes[`POST:${path}`] = { middlewares, handler };
  }

  public patch(path: string, ...middlewares: Middleware[]) {
    const handler = middlewares.pop() as Handler;
    this.routes[`PATCH:${path}`] = { middlewares, handler };
  }

  public delete(path: string, ...middlewares: Middleware[]) {
    const handler = middlewares.pop() as Handler;
    this.routes[`DELETE:${path}`] = { middlewares, handler };
  }

  public use(basePath: string, router: Router) {
    for (const [key, { middlewares, handler }] of Object.entries(
      router.routes
    )) {
      const { method, path } = utils.getMethodAndPath(key);
      this.routes[`${method}:${basePath}${path}`] = { middlewares, handler };
    }
  }

  private executeMiddlewares(
    req: IncomingMessage,
    res: ServerResponse,
    middlewares: Middleware[],
    index: number,
    next: () => void
  ) {
    index < middlewares.length
      ? middlewares[index](req, res, () =>
          this.executeMiddlewares(req, res, middlewares, index + 1, next)
        )
      : next();
  }
  private parseParams(path: string, route: string): { [key: string]: string } {
    const routeParts = route.split("/");
    const pathParts = path.split("/");
    const params: { [key: string]: string } = {};

    if (routeParts.length === pathParts.length) {
      routeParts.forEach((part, index) => {
        if (part.startsWith(":")) {
          params[part.substring(1)] = pathParts[index];
        }
      });
    }

    return params;
  }

  public handleRequest(req: IncomingMessage, res: ServerResponse) {
    const url = new URL(req.url || "", `http://${req.headers.host}`);
    const path = url.pathname;
    const query = url.searchParams;
    (req as any).query = Object.fromEntries(query.entries());

    let key = `${req.method}:${path}`;
    let route = this.routes[key];
    if (!route) {
      for (const [routeKey, routeHandler] of Object.entries(this.routes)) {
        const { method, path: routePath } = utils.getMethodAndPath(routeKey);

        const params = this.parseParams(path, routePath);
        if (method === req.method && Object.keys(params).length > 0) {
          req.params = params;
          route = routeHandler;
          break;
        }
      }
    }

    if (route) {
      const { middlewares, handler } = route;

      this.executeMiddlewares(
        req,
        res,
        [parseJsonBody, ...middlewares],
        0,
        () => {
          handler(req, res);
        }
      );
    } else {
      res.statusCode = ERROR_CODE.NOT_FOUND_ERROR;
      res.end("Not Found endpoint ");
    }
  }
}
