import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'roundPipe',
})
export class RoundPipe implements PipeTransform {
  transform(value: number, method: 'ceil' | 'floor' = 'floor'): number {
    if (method === 'ceil') {
      return Math.ceil(value);
    }
    return Math.floor(value);
  }
}
