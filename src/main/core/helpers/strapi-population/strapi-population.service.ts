import { Injectable } from '@nestjs/common';
import * as qs from 'qs';

@Injectable()
export class StrapiPopulationService {
  createQsObject(instance: any): string {
    const queryString: string = qs.stringify(
      {
        populate: this.buildPopulateArray(instance),
      },
      {
        encodeValuesOnly: true, // prettify URL
      },
    );
    return queryString;
  }
  private buildPopulateArray(instance: any): string[] {
    const populateArray: string[] = [];
    for (const key in instance) {
      if (instance.hasOwnProperty(key)) {
        const propertyValue = instance[key];
        if (Array.isArray(propertyValue)) {
          // Tratar arrays recursivamente
          propertyValue.forEach((item) => {
            populateArray.push(`${key}.${item.keyInterna}`);
          });
        } else if (
          typeof propertyValue === 'object' &&
          propertyValue !== null
        ) {
          // Tratar objetos recursivamente (asumiendo que son anidados)
          const nestedProperties = this.buildPopulateArray(propertyValue);
          populateArray.push(
            ...nestedProperties.map((nested) => `${key}.${nested}`),
          );
        } else {
          // Tratar propiedades individuales
          populateArray.push(key);
        }
      }
    }
    return populateArray;
  }
}
