import { Controller, Get } from '@nestjs/common';
import { CommonConfig } from './entities/layout.entity';
import { CommonService } from './services/common.service';

@Controller('common')
export class CommonController {
  constructor(private commonService: CommonService) {}
  @Get()
  getCommon(): CommonConfig {
    return this.commonService.getCommonData();
  }
}
