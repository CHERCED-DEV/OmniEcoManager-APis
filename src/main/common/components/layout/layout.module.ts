import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { HttpHandlerService } from 'src/main/core/helpers/http-handler/http-handler.service';
import { StrapiPopulationService } from 'src/main/core/helpers/strapi-population/strapi-population.service';
import { CultureService } from 'src/main/core/services/culture/culture.service';
import { CommonController } from './common.controller';
import { FooterService } from './services/footer/footer.service';
import { HeaderService } from './services/header/header.service';

@Module({
  imports: [HttpModule],
  controllers: [CommonController],
  providers: [
    CultureService,
    HttpHandlerService,
    StrapiPopulationService,
    FooterService,
    HeaderService,
  ],
})
export class LayoutModule {}
