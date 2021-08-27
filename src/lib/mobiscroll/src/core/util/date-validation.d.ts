import { IDatetimeProps } from './datetime';
/**
 * Checks if a date is invalid or not.
 * @param d The date to check.
 * @param invalids Object map containing the invalids.
 * @param valids Object map containing the valids.
 * @param min Timestamp of the min date.
 * @param max Timestamp of the max date.
 */
export declare function isInvalid(d: Date, invalids: any, valids: any, min?: number, max?: number): any;
/**
 * Returns the closest valid date.
 * @param d Initial date.
 * @param s Date & time options.
 * @param min Timestamp of the min date.
 * @param max Timestamp of the max date.
 * @param invalids Object map containing the invalids.
 * @param valids Object map containing the valids.
 * @param dir Direction to find the next valid date. If 1, it will search forwards, if -1, backwards,
 * otherwise will search both directions and return the closest one.
 */
export declare function getClosestValidDate(d: Date, s: IDatetimeProps, min: number, max: number, invalids?: any, valids?: any, dir?: number): Date;
