import { Controller, Get, OnModuleInit } from '@nestjs/common';
import { Observable, from } from 'rxjs';
import { BaseController } from 'src/main/core/extensions/base-controller/base.controller';
import { FileManagerService } from 'src/main/core/helpers/file-manager/file-manager.service';
import { CultureService } from 'src/main/core/services/culture/culture.service';
import {
  FileManagerDomain,
  FileManagerFolder,
} from 'src/main/core/types/enums/file-manager.folder.enum';
import { FooterConfig } from './entities/footer.entity';
import { HeaderConfig } from './entities/header.entity';
import { CommonConfig } from './entities/layout.entity';
import { FooterService } from './services/footer/footer.service';
import { HeaderService } from './services/header/header.service';

@Controller('common')
export class CommonController
  extends BaseController<CommonConfig>
  implements OnModuleInit
{
  private footerData: FooterConfig;
  private headerData: HeaderConfig;
  constructor(
    protected cultureService: CultureService,
    protected fileManagerService: FileManagerService,
    private footerService: FooterService,
    private headerService: HeaderService,
  ) {
    super(
      cultureService,
      fileManagerService,
      FileManagerFolder.COMMON,
      FileManagerDomain.COMMON,
    );
  }

  onModuleInit() {
    this.onInitMethod((commonConfig) => {
      this.headerData = commonConfig.common.layout.header;
      this.footerData = commonConfig.common.layout.footer;
    });
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
  getCommon(): CommonConfig {
    if (this.dataInitialized) {
      return {
        common: {
          layout: {
            header: this.headerData,
            footer: this.footerData,
          },
        },
      };
    }
  }
}
