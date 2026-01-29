import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'summary',
    standalone: false
})
export class SummaryPipe implements PipeTransform {
    // you can pass parameters as you want because the transform has ...args array
    transform(value: string, limit?: number) {
        if (!value) {
            return null;
        }
        const actualLimit = limit ? limit : 50;
        return value.substr(0, actualLimit) + '...';
    }

}
