import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'jsonStringify',
  standalone: true,
})
export class JasonStringifyPipe implements PipeTransform {
  transform(value: any, args?: any): string {
    let jsonString = JSON.stringify(value, null, 2); // Format JSON with 2-space indentation

    // Remove the opening and closing curly braces and double quotes
    jsonString = jsonString
      .replace(/^{\s*/, '')
      .replace(/\s*}$/, '')
      .replace(/"/g, '');

    return jsonString;
  }
}
