import { Controller, Get } from '@nestjs/common';
import { HeaderConfig } from '../../entities/header.entity';
import { HeaderService } from './../../services/header/header.service';

@Controller('static/layout/header')
export class HeaderController {
  constructor(private readonly headerService: HeaderService) {}

  @Get()
  getHeader(): HeaderConfig {
    return this.headerService.getHeaderConfig();
  }
}
