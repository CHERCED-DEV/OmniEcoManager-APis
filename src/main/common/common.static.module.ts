import { Module } from '@nestjs/common';
import { LayoutModule } from './components/layout/layout.module';

@Module({
  imports: [LayoutModule],
  controllers: [],
  providers: [],
})
export class CommonDataModule {}
