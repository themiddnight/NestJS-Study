import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const { method, originalUrl } = req;
    const now = Date.now();
    console.log(`-> [${method} ${originalUrl}] Request received`);
    res.on('finish', () => {
      const { statusCode } = res;
      const delay = Date.now() - now;
      console.log(`<- Response sent (${statusCode}) ${delay}ms`);
    });
    next();
  }
}
