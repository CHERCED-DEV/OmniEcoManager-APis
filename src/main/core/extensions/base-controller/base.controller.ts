import { Controller, Inject } from '@nestjs/common';
import { EMPTY, Observable, catchError, from, switchMap } from 'rxjs';
import { FileManagerService } from '../../helpers/file-manager/file-manager.service';
import { CultureService } from '../../services/culture/culture.service';
import {
  FileManagerDomain,
  FileManagerFolder,
} from '../../types/enums/file-manager.folder.enum';

@Controller()
export abstract class BaseController<T> {
  @Inject(CultureService)
  protected cultureService: CultureService;

  @Inject(FileManagerService)
  protected fileManagerService: FileManagerService;

  protected constructor(
    private backupCoreFolder: FileManagerFolder,
    private backupCoreDomain: FileManagerDomain,
  ) {}

  /**
   * Method to subscribe to the culture service and execute the callback when there is a culture change.
   */
  protected onInitMethod(): Observable<T> {
    return this.cultureService.cultureListener().pipe(
      switchMap((culture) => {
        if (culture !== null && culture !== undefined && culture !== '') {
          const backUpData = this.getBackUpDataByCulture(culture);
          if (!!backUpData) {
            return from(backUpData);
          } else {
            return this.fetchData(culture).pipe(
              catchError((error) => {
                console.error('Error fetching data:', error);
                throw error;
              }),
            );
          }
        } else {
          return EMPTY;
        }
      }),
    );
  }

  /**
   * Abstract method to fetch data depending on the culture.
   * @param culture The culture for which data should be fetched.
   * @returns A promise that resolves to the fetched data.
   */
  protected abstract fetchData(culture: string | null): Observable<T>;

  /**
   * Method to save data by culture.
   * @param data The data to save.
   * @param culture The culture for which data should be saved.
   */
  async saveDataByCulture(data: any, culture: string): Promise<void> {
    await this.fileManagerService.saveDataToFile(
      data,
      this.backupCoreDomain,
      this.backupCoreFolder,
      culture,
    );
  }

  /**
   * Method to save data by culture.
   * @param data The data to save.
   * @param culture The culture for which data should be saved.
   */
  async getBackUpDataByCulture(culture: string): Promise<T> {
    return await this.fileManagerService.getDataFromFile(
      this.backupCoreDomain,
      this.backupCoreFolder,
      culture,
    );
  }
}
