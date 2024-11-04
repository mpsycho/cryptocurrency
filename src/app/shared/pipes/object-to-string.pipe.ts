import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'objectToString',
  standalone: true,
})
export class ObjectToStringPipe implements PipeTransform {
  transform(value: any): string {
    if (!value) {
      return '';
    }
    return Object.entries(value)
      .map(([key, val]) => `${key}: ${val}`)
      .join(', ');
  }
}
