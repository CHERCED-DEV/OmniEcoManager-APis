import { Controller } from '@nestjs/common';
import { Observable } from 'rxjs';
import { FileManagerService } from '../../helpers/file-manager/file-manager.service';
import { CultureService } from '../../services/culture/culture.service';
import {
  FileManagerDomain,
  FileManagerFolder,
} from '../../types/enums/file-manager.folder.enum';

@Controller()
export abstract class BaseController<T> {
  public dataInitialized: boolean = false;
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
  protected async onInitMethod(callback: (data: T) => void): Promise<void> {
    this.cultureService.cultureListener().subscribe(
      async (culture) => {
        if (culture !== null && culture !== undefined && culture !== '') {
          try {
            const data = await this.fetchData(culture).toPromise();
            this.dataInitialized = true;
            callback(data);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        }
      },
      (error) => {
        console.error('Error listening to culture changes:', error);
      },
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
}
