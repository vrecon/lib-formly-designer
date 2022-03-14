import { OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FieldsService, FormlyDesignerConfig, FormlyDesignerService } from '../';
import * as i0 from "@angular/core";
export declare class PropertiesComponent implements OnInit, OnDestroy {
    private fieldsService;
    private formlyDesignerConfig;
    private formlyDesignerService;
    private readonly subscriptions;
    fieldGroup: boolean;
    fieldEdit: FormControl;
    private field;
    get hasField(): boolean;
    constructor(fieldsService: FieldsService, formlyDesignerConfig: FormlyDesignerConfig, formlyDesignerService: FormlyDesignerService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    remove(): void;
    accept(): void;
    cancel(): void;
    private setField;
    static ɵfac: i0.ɵɵFactoryDeclaration<PropertiesComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<PropertiesComponent, "formly-designer-properties", never, {}, {}, never, never>;
}
