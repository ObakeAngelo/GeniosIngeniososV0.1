import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'separador',
})
export class SeparadorPipe implements PipeTransform {
  transform(value: string | null): string | undefined {
    return value?.replace(/,/gi, 'x').replace(/\./gi, ',').replace(/x/gi, '.').replace(/\$/gi, '$ ');
  }
}
