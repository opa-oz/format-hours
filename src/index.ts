const MAX_HOUR_VALUE = 24;
const HALF_OF_DAY = 12;
const MINUTES_IN_HOUR = 60;

export type TimeFormat = '12h' | '24h' | 'AM-PM';

export type Options = {
    timeFormat?: TimeFormat;
    divider?: string;
    fullSize?: boolean;
    removeOverflow?: boolean;
    suffixes?: [string, string];
};

/**
 * @description Format hours and minutes
 * @param {number|Date} input Number from 0 to 23.99
 * @param {Options} options
 * @param {TimeFormat} [options.timeFormat = '24h'] Output time format. Available values: `'12h' | '24h'`
 * @param {string} [options.divider = ':'] Custom divider between hours and minutes
 * @param {boolean} [options.fullSize = false] If set, will add leading zero to hours
 * @param {boolean} [options.removeOverflow = false] If set, will decrease hours which is more than 23.99
 * @param {string[]} [options.suffixes = [' AM', ' PM']] Pair of AM/PM suffixes (with space, as well). Will be used if `timeFormat = 'AM-PM'`
 */
const formatTime = (input: number | Date, options?: Options): string => {
    const { timeFormat = '24h', fullSize = false, divider = ':', removeOverflow = false, suffixes = [' AM', ' PM'] } =
        options ?? {};

    let hours: number;
    let minutes: number;
    let suffixSelect = 0;

    if (input instanceof Date) {
        hours = input.getHours();
        minutes = input.getMinutes();
    } else {
        let base = Math.floor(input);
        let rest = input % 1;

        if (removeOverflow && base >= MAX_HOUR_VALUE) {
            const overflowCount = Math.floor(base / MAX_HOUR_VALUE);
            base = base - overflowCount * MAX_HOUR_VALUE;
        }

        if (rest > 0) {
            rest = Math.floor(MINUTES_IN_HOUR * rest);
        }

        hours = base;
        minutes = rest;
    }

    if (timeFormat === '12h' && hours > HALF_OF_DAY) {
        hours = hours - HALF_OF_DAY;
    }

    if (timeFormat === 'AM-PM') {
        if (hours === 0) {
            hours = HALF_OF_DAY;
        } else if (hours > HALF_OF_DAY) {
            hours = hours - HALF_OF_DAY;
            suffixSelect = 1;
        } else if (hours === HALF_OF_DAY) {
            suffixSelect = 1;
        }
    }

    const prefix = fullSize && hours < 10 ? '0' : '';
    const restStr = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const suffix = timeFormat === 'AM-PM' ? suffixes[suffixSelect] : '';

    return `${prefix}${hours}${divider}${restStr}${suffix}`;
};

export default formatTime;
