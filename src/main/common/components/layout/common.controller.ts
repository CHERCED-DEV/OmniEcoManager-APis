import { Controller, Get, OnModuleInit } from '@nestjs/common';
import { Observable, forkJoin, lastValueFrom } from 'rxjs';
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
  implements OnModuleInit {
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
    return new Observable((observer) => {
      forkJoin([
        this.footerService.getFooterConfig(culture),
        this.headerService.getHeaderConfig(culture),
      ]).subscribe(
        ([footerData, headerData]) => {
          observer.next({
            common: {
              layout: {
                header: headerData,
                footer: footerData,
              },
            },
          });
          observer.complete();
        },
        (error) => {
          observer.error(error);
        },
      );
    });
  }

  @Get()
  getCommon(): CommonConfig {
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
