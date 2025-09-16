import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'capitalize',
})
export class CapitalizePipe implements PipeTransform {
    transform(value: string): string {
        return value.split(" ").map((v) => v[0].toUpperCase() + v.substring(1)).join(" ");
    }
}