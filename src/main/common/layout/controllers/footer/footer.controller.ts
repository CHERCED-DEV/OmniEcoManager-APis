import { Controller, Get } from '@nestjs/common';
// import { FooterConfig } from '../../entities/footer.entity';
import { FooterService } from './../../services/footer/footer.service';

@Controller('static/layout/footer')
export class FooterController {
  constructor(private readonly footerService: FooterService) {}

  @Get()
  getFooter(): any {
    return this.footerService.getStrapiFooter();
  }
}
