import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpModule } from '@nestjs/axios';
import { HttpHandlerService } from './main/core/helpers/http-handler/http-handler.service';

@Module({
  imports: [HttpModule],
  controllers: [AppController],
  providers: [AppService, HttpHandlerService],
})
export class AppModule {}
