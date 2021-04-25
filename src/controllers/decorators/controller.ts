import 'reflect-metadata';
import { Request, Response, NextFunction, RequestHandler } from 'express';
import { AppRouter } from '../../AppRouter';
import { MetadataKeys } from './MetadataKeys';
import { Methods } from './Method';

function bodyValidator(keys: string): RequestHandler {
  return function (req: Request, res: Response, next: NextFunction) {

  }
}

export function controller(routerPrefix: string) {
  return function (target: Function) {
    const router = AppRouter.getInstance();

    for (let key in target.prototype) {
      const routeHandler = target.prototype[key];
      const path = Reflect.getMetadata(
        MetadataKeys.path,
        target.prototype,
        key
      );
      const method: Methods = Reflect.getMetadata(
        MetadataKeys.method,
        target.prototype,
        key
      );

      const middlewares =
        Reflect.getMetadata(MetadataKeys.middleware, target.prototype, key)
        || [];

      if (path) {
        router[method](`${routerPrefix}${path}`, ...middlewares, routeHandler);
      }
    }
  };
}
