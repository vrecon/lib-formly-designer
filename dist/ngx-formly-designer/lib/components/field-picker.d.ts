import { ElementRef, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { FormlyDesignerConfig } from '../formly-designer-config';
import { FormlyDesignerService } from '../formly-designer.service';
import * as i0 from "@angular/core";
export declare class FieldPickerComponent {
    private formlyDesignerConfig;
    private formlyDesignerService;
    modalRef?: ElementRef;
    selected: EventEmitter<FormlyFieldConfig>;
    constructor(fb: FormBuilder, formlyDesignerConfig: FormlyDesignerConfig, formlyDesignerService: FormlyDesignerService);
    form: FormGroup;
    readonly fieldEdit: FormControl;
    readonly type: FormControl;
    fieldGroup: boolean;
    get typeName(): string;
    private get $modal();
    add(): void;
    onApply(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<FieldPickerComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<FieldPickerComponent, "formly-designer-field-picker", never, {}, { "selected": "selected"; }, never, never>;
}
