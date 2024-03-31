import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { HttpHandlerService } from 'src/main/core/helpers/http-handler/http-handler.service';
import { StrapiPopulationService } from 'src/main/core/helpers/strapi-population/strapi-population.service';
import { CultureService } from 'src/main/core/services/culture/culture.service';
import { CommonController } from './common.controller';
import { FooterService } from './services/footer/footer.service';
import { HeaderService } from './services/header/header.service';
import { FileManagerService } from 'src/main/core/helpers/file-manager/file-manager.service';
import { AuthService } from 'src/main/core/services/auth/auth.service';

@Module({
  imports: [HttpModule],
  controllers: [CommonController],
  providers: [
    AuthService,
    CultureService,
    HttpHandlerService,
    FileManagerService,
    StrapiPopulationService,
    FooterService,
    HeaderService,
  ],
})
export class LayoutModule {}
