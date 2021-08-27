import { BaseComponent, IBaseProps } from '../../base';
import { DisplayType } from '../../components/popup/popup';
/** @hidden */
export interface IWheelIndexChangeArgs {
    click?: boolean;
    diff: number;
    index: number;
    wheel: any;
    selected?: boolean;
}
/** @hidden */
export interface IWheelProps extends IBaseProps {
    disabled?: Map<any, boolean>;
    display?: DisplayType;
    itemHeight: number;
    rows: number;
    scroll3d: boolean;
    selectedIndex: number;
    selectedValues?: any[];
    selectOnScroll?: boolean;
    wheel: any;
    maxIndex: number;
    maxWheelWidth?: number | number[];
    minIndex: number;
    minWheelWidth?: number | number[];
    multiple: boolean;
    wheelWidth?: number | number[];
    onIndexChange(args: any): void;
}
/** @hidden */
export declare class WheelBase extends BaseComponent<IWheelProps, any> {
    _angle3d: number;
    _batchSize3d: number;
    _style: any;
    _innerStyle: any;
    _items: any[];
    _itemNr: number;
    _wheelStyle: any;
    private _shouldFocus;
    _onIndexChange: (args: any) => void;
    _onItemClick: (args: any) => void;
    _onKeyDown: (ev: any) => void;
    _getText(data: any): string;
    _getValue(data: any): any;
    _isSelected(item: any): boolean;
    _isDisabled(data: any): boolean;
    protected _render(s: IWheelProps): void;
    protected _updated(): void;
}
