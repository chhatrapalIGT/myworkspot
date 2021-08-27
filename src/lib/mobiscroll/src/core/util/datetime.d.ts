import { IBaseProps } from '../base';
import { MbscCalendarSystem } from '../commons';
import { IDate, ITimezonePlugin } from './timezone';
export * from './timezone';
export declare const DAY_OF_MONTH: RegExp;
export declare const DAY_OF_WEEK: RegExp;
export declare const ONE_MIN = 60000;
export declare const ONE_HOUR: number;
export declare const ONE_DAY: number;
export declare type DateType = string | Date | {};
/** @hidden */
export interface IDatetimeProps extends IBaseProps {
    amText?: string;
    calendarSystem?: MbscCalendarSystem;
    dateFormat?: string;
    dateFormatLong?: string;
    dayNames?: string[];
    dayNamesMin?: string[];
    dayNamesShort?: string[];
    daySuffix?: string;
    defaultValue?: any;
    exclusiveEndDates?: boolean;
    firstDay?: number;
    invalid?: any[];
    max?: DateType;
    min?: DateType;
    moment?: any;
    monthNames?: string[];
    monthNamesShort?: string[];
    monthSuffix?: string;
    pmText?: string;
    returnFormat?: 'jsdate' | 'iso8601' | 'locale' | 'moment';
    separator?: string;
    shortYearCutoff?: string | number;
    timeFormat?: string;
    timezonePlugin?: ITimezonePlugin;
    displayTimezone?: 'local' | 'utc' | string;
    dataTimezone?: 'local' | 'utc' | string;
    todayText?: string;
    yearSuffix?: string;
    valid?: any[];
    getDate?: (y: number, m: number, d: number, h?: number, i?: number, s?: number, u?: number) => Date;
    getDay?: (d: Date) => number;
    getMaxDayOfMonth?: (y: number, m: number) => number;
    getMonth?: (d: Date) => number;
    getWeekNumber?: (d: Date) => number;
    getYear?: (d: Date) => number;
}
/**
 * Returns if a date object is a pseudo-date object
 * Pseudo-date objects are our implementation of a Date interface
 */
export declare function isMBSCDate(d: Date): d is IDate;
/** @hidden */
export declare const dateTimeLocale: IDatetimeProps;
export declare const ISO_8601_FULL: RegExp;
export declare const ISO_8601_TIME: RegExp;
/**
 * Returns the milliseconds of a date since midnight.
 * @hidden
 * @param d The date.
 */
export declare function getDayMilliseconds(d: Date): number;
/**
 * Checks if two events are overlapping each other
 * @hidden
 * @param aStart start date of the first event
 * @param aEnd end date of the first event
 * @param bStart start date of the second event
 * @param bEnd end date of the first event
 * @returns true if there is overlap false otherwise
 */
export declare function checkDateRangeOverlap(aStart: Date, aEnd: Date, bStart: Date, bEnd: Date): boolean;
/** @hidden */
export declare function getEndDate(s: IDatetimeProps, start: Date, end: Date): Date;
/** @hidden */
export declare function getDateStr(d: Date): string;
/** @hidden */
export declare function getDateOnly(d: any): Date;
/** @hidden */
export declare function getUTCDateOnly(d: Date): number;
/**
 * Returns the difference in days for two dates
 * @hidden
 * @param d1 First date
 * @param d2 Second date
 * @returns Difference in days
 */
export declare function getDayDiff(d1: Date, d2: Date): number;
/**
 * Returns the date of the first day of the week for a given date
 * @hidden
 */
export declare function getFirstDayOfWeek(d: Date, s: any, w?: number): Date;
/**
 * Checks if two dates are on the same date
 * @hidden
 * @param d1 First date
 * @param d2 Second date
 * @returns True or false
 */
export declare function isSameDay(d1: Date, d2: Date): boolean;
/**
 * Checks if two dates renges are on the same range
 * @hidden
 * @param d1 First date of first range
 * @param d2 Second date of first range
 * @param d3 First date of second range
 * @param d4 Second date of second range
 * @returns True or false
 */
export declare function isSameDateRange(d1: Date, d2: Date, d3: Date, d4: Date): boolean;
/**
 * Check if 2 dates are in the same month (depends on the calendar system).
 * @param d1 First date.
 * @param d2 Second date.
 * @param s Settings containing the calendar system functions.
 */
export declare function isSameMonth(d1: Date, d2: Date, s: IDatetimeProps): boolean;
/** @hidden */
export declare function adjustedDate(y: number, m: number, d: number, h?: number, i?: number, s?: number, u?: number): Date;
export declare function isDate(d: any): d is Date;
/**
 * Creates a new date object, depending on the parameters.
 * Will return a native Date object or a Mobiscroll Date object depending on what timezoneplugin is specified in
 * the Settings object.
 * Can be passed another datetime to initialize from, or can be passed individual date and time parameters
 * @param s Mobiscroll Settings object
 * @param yearOrStamp The year or the other date string/timestamp/object
 * @param month The month
 * @param date The date of month
 * @param h The Hour
 * @param min The Minute
 * @param sec The Second
 * @param ms The Millisecond
 * @returns
 */
export declare function createDate(s: any, value?: number | string | Date | IDate): Date;
export declare function createDate(s: any, year: number, month: number, date: number, hour?: number, min?: number, sec?: number, ms?: number): Date;
/** @hidden */
export declare function makeDate(d: any, s?: any, format?: any, parts?: any): any;
/** @hidden */
export declare function returnDate(d: Date, s: IDatetimeProps, displayFormat: string, isoParts: any): any;
/**
 * Format a date into a string value with a specified format
 * @param {string} format Output format
 * @param {Date} date  Date to format
 * @param {IDatetimeProps} options Locale options
 * @returns {string} The formatted date string
 */
export declare function formatDate(format: string, date: Date, options?: IDatetimeProps): string;
/**
 * Extract a date from a string value with a specified format.
 * @param {string} format Input format.
 * @param {string} value String to parse.
 * @param {IDatetimeProps} options Locale options
 * @return {Date} Returns the extracted date or defaults to now if no format or no value is given
 */
export declare function parseDate(format: string, value: string, options: IDatetimeProps): Date;
/** Value Equality function for Date and Array of Date types
 * Checks if two dates or two array of dates are the same.
 * NOTE: empty Arrays are treated the same way as null values because,
 * when parsing a null value, the returned value representation is an empty object (datepicker),
 * which when turned back, won't be null, but rather an empty array
 */
export declare function dateValueEquals(v1: any, v2: any, s: IDatetimeProps): boolean;
/**
 * Adds the sepcified number of days to a date. Returns a new date object.
 * @param date The date.
 * @param days Days to add.
 */
export declare function addDays(date: Date, days: number): Date;
/**
 * Rounds a date to the specified minute step.
 * @param date The date to round.
 * @param step Step specified as minutes.
 */
export declare function roundTime(date: Date, step: number): Date;
/** Constrains a date to min and max */
export declare function constrainDate(date: Date, min?: Date, max?: Date): Date;
