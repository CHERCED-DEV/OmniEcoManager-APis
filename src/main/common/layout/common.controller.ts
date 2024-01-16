import { Controller, Get } from '@nestjs/common';
import { FooterService } from './services/footer/footer.service';
import { HeaderService } from './services/header/header.service';
import { FooterConfig } from './entities/footer.entity';
import { HeaderConfig } from './entities/header.entity';
import { CommonConfig } from './entities/layout.entity';

@Controller('common')
export class CommonController {
  private footerData: FooterConfig;
  private headerData: HeaderConfig;
  constructor(
    private footerService: FooterService,
    private headerService: HeaderService,
  ) {
    this.footerService.getFooterConfig().subscribe((data) => {
      this.footerData = data;
    });
    this.headerService.getHeaderConfig().subscribe((data) => {
      this.headerData = data;
    });
  }
  @Get()
  getCommon() {
    const res: CommonConfig = {
      common: {
        layout: {
          header: this.headerData,
          footer: this.footerData,
        },
      },
    };
    return res;
  }
}
