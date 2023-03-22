const {arrangeData} = require('./utils.js')

describe('arrangeData', () => {
    test('takes an empty array and returns an array', () => {
        expect(arrangeData([{}])).toEqual([])
    });
    test('takes an array with a single-value object inide and returns a single nested array with the value inside the nested array', () => {
        const input = [{1: "a"}];
        const output = [["a"]];
        expect(arrangeData(input)).toEqual(output);
    });
    test('takes an array with single object with multiple values inside and returns only the values inside the nested array', () => {
        const input = [{1: "a", 2: "b"}];
        const output = [["a", "b"]];
        expect(arrangeData(input)).toEqual(output);
    });
    test('takes an array with multiple-single-value objects inside and returns an array of nested arrays with the value inside corresponding to the objects', () => {
        const input = [{1: "a"}, {2: "b"}];
        const output = [["a"], ["b"]];
        expect(arrangeData(input)).toEqual(output);
    });
    test('takes an array with multiple-value objects inside and returns an array of nested arrays with the values inside corresponding to the objects', () => {
        const input = [{1: "a", 2: "b"}, {3: "c", 4: "d"}];
        const output = [["a", "b"], ["c", "d"]];
        expect(arrangeData(input)).toEqual(output);
    });
    test('does not mutate the original array and inside objects', () => {
        const input = [{1: "a", 2: "b"}];
        const inputCopy = [{1: "a", 2: "b"}];
        arrangeData(input);
        expect(input).toEqual(inputCopy);
    });
});