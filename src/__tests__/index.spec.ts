import formatTime from '../index';
import { describe, test, expect } from '@jest/globals';

describe('formatTime', () => {
    describe('# Simple 24 hours format', () => {
        const testTable = [
            { input: 9, output: '9:00' },
            { input: 0, output: '0:00' },
            { input: 12.5, output: '12:30' },
            { input: 23, output: '23:00' },
            { input: 11, output: '11:00' },
            { input: 6.25, output: '6:15' },
            { input: 19.3, output: '19:18' }
        ];

        testTable.forEach(({ input, output }) => {
            test(`should format number ${input} as "${output}"`, () => {
                expect(formatTime(input)).toEqual(output);
            });
        });
    });

    describe('# Full size 12 hours format', () => {
        const testTable = [
            { input: 9, output: '09:00' },
            { input: 0, output: '00:00' },
            { input: 1.5, output: '01:30' },
            { input: 3.75, output: '03:45' },
            { input: 11, output: '11:00' },
            { input: 6.25, output: '06:15' },
            { input: 9.3, output: '09:18' }
        ];

        testTable.forEach(({ input, output }) => {
            test(`should format number ${input} as "${output}"`, () => {
                expect(formatTime(input, { fullSize: true })).toEqual(output);
            });
        });
    });

    describe('# Simple 12 hours format', () => {
        const testTable = [
            { input: 19, output: '7:00' },
            { input: 20, output: '8:00' },
            { input: 12.5, output: '12:30' },
            { input: 23, output: '11:00' },
            { input: 15.4, output: '3:24' },
            { input: 6.25, output: '6:15' },
            { input: 19.3, output: '7:18' }
        ];

        testTable.forEach(({ input, output }) => {
            test(`should format number ${input} as "${output}"`, () => {
                expect(formatTime(input, { timeFormat: '12h' })).toEqual(output);
            });
        });
    });

    describe('# Full size 12 hours format', () => {
        const testTable = [
            { input: 19, output: '7.00' },
            { input: 20, output: '8.00' },
            { input: 12.5, output: '12.30' },
            { input: 23, output: '11.00' },
            { input: 20, output: '8.00' },
            { input: 12.5, output: '12.30' },
            { input: 23, output: '11.00' },
            { input: 15.4, output: '3.24' },
            { input: 6.25, output: '6.15' },
            { input: 19.3, output: '7.18' },
            { input: 22.1, output: '10.06' }
        ];

        testTable.forEach(({ input, output }) => {
            test(`should format number ${input} as "${output}"`, () => {
                expect(formatTime(input, { timeFormat: '12h', divider: '.' })).toEqual(output);
            });
        });
    });

    describe('# Format with custom divider', () => {
        const testTable = [
            { input: 19, output: '07:00' },
            { input: 20, output: '08:00' },
            { input: 12.5, output: '12:30' },
            { input: 23, output: '11:00' },
            { input: 15.4, output: '03:24' },
            { input: 6.25, output: '06:15' },
            { input: 19.3, output: '07:18' },
            { input: 22.1, output: '10:06' }
        ];

        testTable.forEach(({ input, output }) => {
            test(`should format number ${input} as "${output}"`, () => {
                expect(formatTime(input, { timeFormat: '12h', fullSize: true })).toEqual(output);
            });
        });
    });

    describe('# Format while removing overflow', () => {
        const testTable = [
            { input: 29, output: '5:00' },
            { input: 20, output: '20:00' },
            { input: 22.5, output: '22:30' },
            { input: 43, output: '19:00' },
            { input: 41, output: '17:00' },
            { input: 66.25, output: '18:15' },
            { input: 29.3, output: '5:18' },
            { input: 24, output: '0:00' },
            { input: 23.99, output: '23:59' }
        ];

        testTable.forEach(({ input, output }) => {
            test(`should format number ${input} as "${output}"`, () => {
                expect(formatTime(input, { removeOverflow: true })).toEqual(output);
            });
        });
    });

    describe('# Format with Date input as well', () => {
        test('should format Date properly', () => {
            const date = new Date('March 13, 08 14:20');

            expect(formatTime(date)).toEqual('14:20');
            expect(formatTime(date, { timeFormat: '12h' })).toEqual('2:20');
            expect(formatTime(date, { timeFormat: '12h', fullSize: true })).toEqual('02:20');
            expect(formatTime(date, { timeFormat: '12h', fullSize: true, divider: '.' })).toEqual('02.20');
        });
    });

    describe('# Format in AM/PM metric', () => {
        const testTable = [
            { input: 19, output: '7:00 PM' },
            { input: 20, output: '8:00 PM' },
            { input: 12.5, output: '12:30 PM' },
            { input: 23, output: '11:00 PM' },
            { input: 20, output: '8:00 PM' },
            { input: 11.5, output: '11:30 AM' },
            { input: 23, output: '11:00 PM' },
            { input: 15.4, output: '3:24 PM' },
            { input: 6.25, output: '6:15 AM' },
            { input: 19.3, output: '7:18 PM' },
            { input: 22.1, output: '10:06 PM' },
            { input: 0, output: '12:00 AM' },
            { input: 12, output: '12:00 PM' }
        ];

        testTable.forEach(({ input, output }) => {
            test(`should format number ${input} as "${output}"`, () => {
                expect(formatTime(input, { timeFormat: 'AM-PM' })).toEqual(output);
            });
        });
    });
});
