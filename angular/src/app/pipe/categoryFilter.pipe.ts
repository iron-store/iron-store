import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'searchByCategory'
})

export class FilterByCategoryPipe implements PipeTransform {
    transform(input: Array<any>, searchText: string, arg: any[]): any {
        if (!searchText)
            return input;


        searchText = searchText.toLowerCase();

        return input.filter(found => {
            return found.category.toLowerCase().includes(searchText);
        });
    }
}




