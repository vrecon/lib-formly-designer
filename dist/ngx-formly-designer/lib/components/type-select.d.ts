import { AfterViewInit, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, FormControl } from '@angular/forms';
import { FormlyDesignerConfig } from '../';
import * as i0 from "@angular/core";
export declare class TypeSelectComponent implements AfterViewInit, ControlValueAccessor, OnChanges, OnInit, OnDestroy {
    private formlyDesignerConfig;
    private valueChangesSubscription?;
    type?: string;
    fieldGroup?: boolean;
    formControl: FormControl;
    types: {
        label: string;
        value: string;
    }[];
    constructor(formlyDesignerConfig: FormlyDesignerConfig);
    protected onChange: (value: any) => void;
    protected onTouched: () => void;
    ngAfterViewInit(): void;
    ngOnChanges(change: SimpleChanges): void;
    ngOnInit(): void;
    ngOnDestroy(): void;
    writeValue(obj: any): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    setDisabledState(isDisabled: boolean): void;
    private updateTypes;
    private getTypes;
    static ɵfac: i0.ɵɵFactoryDeclaration<TypeSelectComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TypeSelectComponent, "formly-designer-type-select", never, { "type": "type"; "fieldGroup": "fieldGroup"; }, {}, never, never>;
}
