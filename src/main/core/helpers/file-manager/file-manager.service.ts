import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { promisify } from 'util';
import {
  FileManagerDomain,
  FileManagerFolder,
} from '../../types/enums/file-manager.folder.enum';

@Injectable()
export class FileManagerService {
  async saveDataToFile(
    data: any,
    dataFolderPath: FileManagerDomain,
    fileName: FileManagerFolder,
    culture: string,
  ): Promise<void> {
    const filePath = `${dataFolderPath}/${fileName}.${culture}.json`;
    try {
      const currentStoreData = await this.getDataFromFile(
        dataFolderPath,
        fileName,
        culture,
      );
      if (!currentStoreData || !this.areDataEqual(currentStoreData, data)) {
        await promisify(fs.mkdir)(dataFolderPath, { recursive: true });
        await promisify(fs.writeFile)(filePath, JSON.stringify(data));
      }
    } catch (error) {
      throw new Error(`Error saving data to file: ${error.message}`);
    }
  }

  async getDataFromFile(
    dataFolderPath: FileManagerDomain,
    fileName: FileManagerFolder,
    culture: string,
  ): Promise<any | null> {
    const filePath = `${dataFolderPath}/${fileName}.${culture}.json`;
    try {
      if (fs.existsSync(filePath)) {
        const rawData = await promisify(fs.readFile)(filePath, 'utf8');
        return JSON.parse(rawData);
      }
      return null;
    } catch (error) {
      throw new Error(`Error reading data from file: ${error.message}`);
    }
  }

  private areDataEqual(data1: any, data2: any): boolean {
    const str1 = JSON.stringify(data1);
    const str2 = JSON.stringify(data2);
    return str1 === str2;
  }
}
