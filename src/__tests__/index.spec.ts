import process from '../index';

describe('Test them all', () => {
    test('should return value', () => {
        expect(process()).toEqual(2);
    });
});
