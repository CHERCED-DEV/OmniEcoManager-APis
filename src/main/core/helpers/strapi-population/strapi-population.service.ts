import { Injectable } from '@nestjs/common';
import * as qs from 'qs';

@Injectable()
export class StrapiPopulationService {
  createQsObject(api: string, culture: string, instance: string[]): string {
    const queryString: string = qs.stringify(
      {
        populate: instance,
      },
      {
        encodeValuesOnly: true, // prettify URL
      },
    );
    return `${api}?locale=${culture}&${queryString}`;
  }
}
