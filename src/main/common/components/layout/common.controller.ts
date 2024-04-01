import { Controller, Get } from '@nestjs/common';
import { Observable, firstValueFrom, from } from 'rxjs';
import { BaseController } from 'src/main/core/extensions/base-controller/base.controller';
import {
  FileManagerDomain,
  FileManagerFolder,
} from 'src/main/core/types/enums/file-manager.folder.enum';
import { CommonConfig } from './entities/layout.entity';
import { FooterService } from './services/footer/footer.service';
import { HeaderService } from './services/header/header.service';

@Controller('common')
export class CommonController extends BaseController<CommonConfig> {
  private commonData$: Observable<CommonConfig>;

  constructor(
    private footerService: FooterService,
    private headerService: HeaderService,
  ) {
    super(FileManagerFolder.COMMON, FileManagerDomain.COMMON);
  }

  protected fetchData(culture: string): Observable<CommonConfig> {
    return from(
      new Promise<CommonConfig>(async (resolve, reject) => {
        try {
          const [footerData, headerData] = await Promise.all([
            this.footerService.getFooterConfig(culture),
            this.headerService.getHeaderConfig(culture),
          ]);
          const commonConfig: CommonConfig = {
            common: {
              layout: {
                header: headerData,
                footer: footerData,
              },
            },
          };
          resolve(commonConfig);
        } catch (error) {
          console.error('Error fetching data:', error);
          reject(error);
        }
      }),
    );
  }

  @Get()
  async getCommon(): Promise<CommonConfig> {
    this.commonData$ = this.onInitMethod();
    const commonData = await firstValueFrom(this.commonData$);
    return commonData;
  }
}
