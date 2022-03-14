import { ElementRef, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { FormlyDesignerConfig } from '../formly-designer-config';
import { FormlyDesignerService } from '../formly-designer.service';
import * as i0 from "@angular/core";
export declare class WrapperPickerComponent {
    private formlyDesignerConfig;
    private formlyDesignerService;
    modalRef?: ElementRef;
    field?: FormlyFieldConfig;
    selected: EventEmitter<FormlyFieldConfig>;
    constructor(formBuilder: FormBuilder, formlyDesignerConfig: FormlyDesignerConfig, formlyDesignerService: FormlyDesignerService);
    form: FormGroup;
    fieldEdit: FormControl;
    get wrapper(): string | null;
    private get $modal();
    add(): void;
    onApply(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<WrapperPickerComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<WrapperPickerComponent, "formly-designer-wrapper-picker", never, { "field": "field"; }, { "selected": "selected"; }, never, never>;
}
