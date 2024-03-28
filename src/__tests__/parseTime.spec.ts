import formatTime, { parseTime } from '../index';
import { describe, test, expect } from '@jest/globals';

describe('parseTime', () => {
    const testTable = new Array(24).fill(false).map((_, k) => k);

    describe('# Simple 24 hours parsing', () => {
        testTable.forEach((expected) => {
            test(`should format and parse ${expected} hours`, () => {
                const formatted = formatTime(expected);

                expect(parseTime(formatted)).toEqual(expected);
            });
        });
    });

    describe('# Simple AM-PM hours parsing', () => {
        testTable.forEach((expected) => {
            test(`should format and parse ${expected} hours in AM-PM format`, () => {
                const formatted = formatTime(expected, { timeFormat: 'AM-PM' });

                expect(parseTime(formatted, 'AM-PM')).toEqual(expected);
            });
        });

        testTable.forEach((expected) => {
            test(`should format and parse ${expected} hours in AM-PM format with custom suffixes`, () => {
                const formatted = formatTime(expected, { timeFormat: 'AM-PM', suffixes: ['a.m.', 'p.m.'] });

                expect(parseTime(formatted, 'AM-PM')).toEqual(expected);
            });
        });
    });

    describe('# Full-size AM-PM hours parsing', () => {
        testTable.forEach((expected) => {
            test(`should format and parse full size ${expected} hours in AM-PM format`, () => {
                const formatted = formatTime(expected, { timeFormat: 'AM-PM', fullSize: true });

                expect(parseTime(formatted, 'AM-PM')).toEqual(expected);
            });
        });
    });

    describe('# Full-size 24 hours parsing', () => {
        testTable.forEach((expected) => {
            test(`should format and parse full size ${expected} hours`, () => {
                const formatted = formatTime(expected, { fullSize: true });

                expect(parseTime(formatted)).toEqual(expected);
            });
        });
    });

    describe('# Full-size 24 hours with custom divider parsing', () => {
        testTable.forEach((expected) => {
            test(`should format and parse ${expected} hours with '-' divider`, () => {
                const formatted = formatTime(expected, { fullSize: true, divider: '-' });

                expect(parseTime(formatted)).toEqual(expected);
            });
        });

        testTable.forEach((expected) => {
            test(`should format and parse ${expected} hours with '/'`, () => {
                const formatted = formatTime(expected, { fullSize: true, divider: '/' });

                expect(parseTime(formatted)).toEqual(expected);
            });
        });
    });

    describe('# Float hours parsing', () => {
        const localTestTable = [11.5, 12.75, 23.25, 9.3, 6.2, 0.5, 15.62, 5.2];

        localTestTable.forEach((expected) => {
            test(`should format and parse ${expected} hours`, () => {
                const formatted = formatTime(expected);

                expect(parseTime(formatted)).toEqual(expected);
            });
        });
    });

    describe('# Incorrect input', () => {
        const localTestTable = [
            'there is no time',
            '15 monkeys and 21 trees',
            'there are 9 donuts',
            48,
            11,
            undefined,
            null
        ];

        localTestTable.forEach((input) => {
            test(`should return null for input "${input}"`, () => {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                expect(parseTime(input)).toEqual(null);
            });
        });
    });

    describe('# Unsafe usage of parsing', () => {
        const localTestTable = [11, 15, 16, 23];

        localTestTable.forEach((expected) => {
            test(`should format and parse ${expected} hours`, () => {
                const formatted = formatTime(expected, { timeFormat: '12h' });

                expect(parseTime(formatted, '12h')).toEqual(expected > 12 ? expected - 12 : expected);
            });
        });

        test('should confuse 12 and 24 hours', () => {
            const formatted12 = formatTime(12, { timeFormat: '12h' });
            const formatted24 = formatTime(24, { timeFormat: '12h' });

            expect(parseTime(formatted12)).toEqual(12);
            expect(parseTime(formatted24)).toEqual(12); // This is wrong
        });
    });

    describe('# Overflow protection', () => {
        const localTestTable = ['13:78', '50:20', '01:60', '11:90'];

        localTestTable.forEach((input) => {
            test(`should parse ${input} hours as null`, () => {
                expect(parseTime(input)).toEqual(null);
            });
        });
    });
});
