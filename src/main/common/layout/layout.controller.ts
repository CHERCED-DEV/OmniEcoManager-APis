import { Controller, Get } from '@nestjs/common';
import { FooterService } from './services/footer/footer.service';
import { HeaderService } from './services/header/header.service';
import { FooterConfig } from './entities/footer.entity';
import { HeaderConfig } from './entities/header.entity';
import { LayoutConfig } from './entities/layout.entity';

@Controller('common/layout')
export class LayoutController {
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
  getLayout() {
    const res: LayoutConfig = {
      layout: {
        header: this.headerData,
        footer: this.footerData,
      },
    };
    return res;
  }
}
