import { Controller, Get, OnModuleInit } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
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
    this.onInitMethod(({ common }) => {
      this.headerData = common.layout.header;
      this.footerData = common.layout.footer;
    });
  }

  protected fetchData(culture: string): Promise<CommonConfig> {
    return Promise.all([
      lastValueFrom(this.footerService.getFooterConfig(culture)),
      lastValueFrom(this.headerService.getHeaderConfig(culture)),
    ]).then(([footerData, headerData]) => ({
      common: {
        layout: {
          header: headerData,
          footer: footerData,
        },
      },
    }));
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
