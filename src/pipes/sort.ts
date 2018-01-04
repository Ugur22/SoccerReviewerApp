import {Pipe, PipeTransform} from '@angular/core';

/**
 * Sort pipe.
 */
@Pipe({
    name: 'sort',
})
export class SortPipe implements PipeTransform {
    /**
     * Sort an array of objects
     */
    transform(array: Array<Object>, key: string, order = 'asc') {
        if (array == null) {
            return null;
        }

        // Make an immutable copy of the array
        const toSort = [...array];

        toSort.sort((a: any, b: any) => {
            if (a[key] < b[key]) {
                return order === 'asc' ? -1 : 1;
            } else if (a[key] > b[key]) {
                return order === 'asc' ? 1 : -1;
            } else {
                return 0;
            }
        });
        return toSort;
    }
}