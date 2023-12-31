import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { CultureService } from '../../services/culture/culture.service';

@Injectable()
export class CultureMiddleware implements NestMiddleware {
  constructor(private cultureService: CultureService) {}
  use(req: Request, res: Response, next: NextFunction) {
    const acceptLanguageHeader = req.headers['accept-language'];
    const culture = acceptLanguageHeader;
    this.cultureService.setCulture(culture);
    next();
  }
}
