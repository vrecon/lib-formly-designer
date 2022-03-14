import { ElementRef, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { FormlyDesignerConfig } from '../formly-designer-config';
import { FormlyDesignerService } from '../formly-designer.service';
import * as i0 from "@angular/core";
export declare class WrappersPickerComponent implements OnChanges {
    private formlyDesignerConfig;
    private formlyDesignerService;
    modalRef?: ElementRef;
    field?: FormlyFieldConfig;
    selected: EventEmitter<FormlyFieldConfig>;
    wrapper: string | null;
    fieldEdit: FormControl;
    wrappers: string[];
    constructor(formlyDesignerConfig: FormlyDesignerConfig, formlyDesignerService: FormlyDesignerService);
    ngOnChanges(changes: SimpleChanges): void;
    private get $modal();
    onWrapperSelected(field: FormlyFieldConfig): void;
    edit(index: number): void;
    remove(index: number): void;
    onApply(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<WrappersPickerComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<WrappersPickerComponent, "formly-designer-wrappers-picker", never, { "field": "field"; }, { "selected": "selected"; }, never, never>;
}
