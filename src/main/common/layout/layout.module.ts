import { Module } from '@nestjs/common';
import { CultureService } from 'src/main/core/services/culture/culture.service';
import { FooterController } from './controllers/footer/footer.controller';
import { HeaderController } from './controllers/header/header.controller';
import { FooterService } from './services/footer/footer.service';
import { HeaderService } from './services/header/header.service';
import { HttpModule } from '@nestjs/axios';
import { HttpHandlerService } from 'src/main/core/helpers/http-handler/http-handler.service';

@Module({
  imports: [HttpModule],
  controllers: [HeaderController, FooterController],
  providers: [CultureService, HttpHandlerService, FooterService, HeaderService],
})
export class LayoutModule {}
