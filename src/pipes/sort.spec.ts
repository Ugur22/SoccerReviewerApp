import {SortPipe} from './sort';

describe('Sort pipe', () => {
    let sortPipe: SortPipe;

    beforeEach(() => {
        sortPipe = new SortPipe();
    });

    it('sort array on name', () => {
        const toSort = [
            { name: 'Foo' },
            { name: 'Bar' },
            { name: 'Baz' },
        ];
        const expected = [
            { name: 'Bar' },
            { name: 'Baz' },
            { name: 'Foo' },
        ];
        const sorted = sortPipe.transform(toSort, 'name', 'asc');

        expect(sorted).toEqual(expected);
    });
});