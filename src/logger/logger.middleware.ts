import { Injectable, NestMiddleware, Request, Response } from '@nestjs/common';
// import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Response, res: Request, next: () => void) {
    console.log('Request...');
    next();
  }
}

// export function logger(req: Request, res: Response, next: NextFunction) {
//   console.log(`Request...`);
//   next();
// };