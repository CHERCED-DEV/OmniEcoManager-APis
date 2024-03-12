import { Controller } from '@nestjs/common';
import { switchMap } from 'rxjs';
import { FileManagerService } from '../../helpers/file-manager/file-manager.service';
import { CultureService } from '../../services/culture/culture.service';
import {
  FileManagerDomain,
  FileManagerFolder,
} from '../../types/enums/file-manager.folder.enum';

@Controller()
export abstract class BaseController<T> {
  protected constructor(
    protected cultureService: CultureService,
    protected fileManagerService: FileManagerService,
    private backupCoreFolder: FileManagerFolder,
    private backupCoreDomain: FileManagerDomain,
  ) {}

  /**
   * Method to subscribe to the culture service and execute the callback when there is a culture change.
   * @param callback The callback to execute when there is a culture change.
   */
  protected onInitMethod(callback: (data: T) => void): void {
    this.cultureService
      .cultureListener()
      .pipe(
        switchMap((culture) => {
          if (culture !== null && culture !== undefined && culture !== '') {
            return this.fetchData(culture);
          }
        }),
      )
      .subscribe({
        next: callback,
        error: (error) => {
          console.error('Error fetching data:', error);
          // Handle the error as needed
        },
      });
  }

  /**
   * Abstract method to fetch data depending on the culture.
   * @param culture The culture for which data should be fetched.
   * @returns A promise that resolves to the fetched data.
   */
  protected abstract fetchData(culture: string | null): Promise<T>;

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
}
