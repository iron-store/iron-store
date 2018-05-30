import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'searchByName'
})

export class SearchPipe implements PipeTransform {
    transform(input: Array<any>, searchText: string, arg: any[]): any {
        if (!searchText) {
            return input;
        }

        searchText = searchText.toLowerCase();

        return input.filter(found => {
            return found.name.toLowerCase().includes(searchText);
        });
    }
}
