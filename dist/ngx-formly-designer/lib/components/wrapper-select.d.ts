import { AfterViewInit, OnDestroy, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl } from '@angular/forms';
import { FormlyDesignerConfig } from '../formly-designer-config';
import * as i0 from "@angular/core";
export declare class WrapperSelectComponent implements AfterViewInit, ControlValueAccessor, OnDestroy, OnInit {
    private formlyDesignerConfig;
    private valueChangesSubscription?;
    constructor(formlyDesignerConfig: FormlyDesignerConfig);
    formControl: FormControl;
    wrappers: string[];
    protected onChange: (value: any) => void;
    protected onTouched: () => void;
    ngAfterViewInit(): void;
    ngOnInit(): void;
    ngOnDestroy(): void;
    writeValue(obj: any): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    setDisabledState(isDisabled: boolean): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<WrapperSelectComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<WrapperSelectComponent, "formly-designer-wrapper-select", never, {}, {}, never, never>;
}
