import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'galileoDate'
})
export class GalileoDatePipe extends
  DatePipe implements PipeTransform {

  galileoDate(value: any, showSeconds?: any): any {
    if (value) {
      const now: any = new Date(value);
      const start: any = new Date(now.getFullYear(), 0, 0);
      const diff = (now - start) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
      const oneDay: number = 1000 * 60 * 60 * 24;
      const dayOfYear = Math.floor(diff / oneDay);

      const pattern = !!showSeconds ? 'yyyy.DDD.HH.mm' : 'yyyy.DDD.HH.mm.ss.SSS';

      let result = super.transform(value, pattern);

      if (result != null) {
        if (dayOfYear >= 100) {
          result = result.replace('DDD', dayOfYear + '');

        } else {

          result = result.replace('DDD', '0' + dayOfYear + '')
        }
      }
      return result
    }
  }
}
