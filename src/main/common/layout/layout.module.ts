import { LayoutController } from './layout.controller';
import { Module } from '@nestjs/common';
import { CultureService } from 'src/main/core/services/culture/culture.service';
import { FooterService } from './services/footer/footer.service';
import { HeaderService } from './services/header/header.service';
import { HttpModule } from '@nestjs/axios';
import { HttpHandlerService } from 'src/main/core/helpers/http-handler/http-handler.service';
import { StrapiPopulationService } from 'src/main/core/helpers/strapi-population/strapi-population.service';

@Module({
  imports: [HttpModule],
  controllers: [LayoutController],
  providers: [
    CultureService,
    HttpHandlerService,
    StrapiPopulationService,
    FooterService,
    HeaderService,
  ],
})
export class LayoutModule {}
