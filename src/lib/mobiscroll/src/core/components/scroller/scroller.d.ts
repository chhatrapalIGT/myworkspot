import { DisplayType } from '../../components/popup/popup';
import { IPickerProps, IPickerState, PickerBase } from '../../shared/picker/picker';
import { IWheelIndexChangeArgs } from '../../shared/wheel/wheel';
/**
 * Options for all scroller based components
 */
export interface IScrollerProps extends IPickerProps {
    circular?: boolean | boolean[];
    /** @hidden */
    displayStyle?: DisplayType;
    /** @hidden */
    inContentTemplate?: any;
    /**
     * Height of the wheel items in pixels.
     */
    itemHeight?: number;
    minWheelWidth?: number | number[];
    maxWheelWidth?: number | number[];
    wheelWidth?: number | number[];
    /** @hidden */
    preContentData?: any;
    /** @hidden */
    preContentTemplate?: any;
    selectOnScroll?: boolean;
    /**
     * Number of visible rows on the wheel.
     */
    rows?: number;
    scroll3d?: boolean;
    showLabel?: boolean;
    /** @hidden */
    renderInContent?: (inst: any) => any;
    /** @hidden */
    renderPreContent?: (inst: any) => any;
    validate?: (args: IScrollerValidateArgs) => {};
    valueEquality?: (v1: any, v2: any) => boolean;
    /** function that is called to decide if the value should be validated */
    shouldValidate?: (s: any, prevS: any) => boolean;
}
/**
 * Scroller options
 */
export interface MbscScrollerOptions extends IScrollerProps {
    wheels?: MbscScrollerWheel[][];
    formatValue?(values: any[]): string;
    getValue?(values: any[]): any;
    writeValue?(elm: HTMLElement, text: string, value: any): boolean;
    parseValue?(valueStr: string): any[];
}
/** @hidden */
export interface MbscScrollerState extends IPickerState {
    value?: any;
}
/** @hidden */
declare type IWheelDataItem = string | number | {
    display: string;
    value: any;
};
/** @hidden */
export declare type IScrollerRepresentation = any[];
export interface MbscScrollerWheel {
    label?: string;
    circular?: boolean;
    cssClass?: string;
    data?: IWheelDataItem[];
    max?: number;
    min?: number;
    multiple?: boolean;
    checkmark?: boolean;
    spaceAround?: boolean;
    getItem?: (index: number) => any;
    getIndex?: (value: any) => number;
    _circular?: boolean;
    _key?: number;
    _map?: Map<any, number>;
    _offset?: number;
}
/** @hidden */
export interface IScrollerValidateArgs {
    direction?: number;
    index?: number;
    values: IScrollerRepresentation;
    wheels: MbscScrollerWheel[];
}
/**
 * Returns the closest valid value on a wheel.
 * @hidden
 * @param wheel The wheel object.
 * @param val The current value.
 * @param direction Direction of the wheel movement.
 * @param disabled Disabled values on the wheel.
 */
export declare function getValid(wheel: MbscScrollerWheel, val: any, disabled?: Map<any, boolean>, direction?: number): any;
/** @hidden */
export declare class ScrollerBase extends PickerBase<MbscScrollerOptions, MbscScrollerState> {
    /** @hidden */
    static defaults: MbscScrollerOptions;
    protected static _name: string;
    /** @hidden */
    _circular: boolean | boolean[] | undefined;
    /** @hidden */
    _disabled: Array<Map<any, boolean>>;
    /** @hidden */
    _displayStyle: DisplayType;
    /** @hidden */
    _indexes: number[];
    /** @hidden */
    _lineStyle: any;
    /** @hidden */
    _overlayStyle: any;
    /** @hidden */
    _rows: number;
    /** @hidden */
    _scroll3d: boolean;
    /** @hidden */
    _wheels: MbscScrollerWheel[][];
    /** @hidden */
    _isAnyMulti: boolean;
    private _batches;
    private _lastIndexes;
    private _shouldSetIndex;
    private _indexFromValue;
    private _wheelMap;
    _onWheelIndexChange: (args: IWheelIndexChangeArgs) => void;
    _initWheels(): void;
    _shouldValidate(s: MbscScrollerOptions, prevS: MbscScrollerOptions): boolean;
    _valueEquals(v1: any, v2: any): boolean;
    protected _render(s: MbscScrollerOptions, state: MbscScrollerState): void;
    protected _writeValue(elm: HTMLInputElement, text: string, value: any): boolean;
    protected _copy(value: any[]): any[];
    protected _format(value: any[]): string;
    protected _get(value: any[]): any;
    protected _parse(valueStr: any): any[];
    protected _validate(index?: number, direction?: number): void;
    protected _onOpen(): void;
    protected _onParse(): void;
    private _initWheel;
    private _setIndexes;
}
export {};
