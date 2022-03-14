import { FormlyConfig, FormlyFieldConfig } from '@ngx-formly/core';
import { Observable } from 'rxjs';
import { FieldsService } from './fields.service';
import { FormlyDesignerConfig } from './formly-designer-config';
import * as i0 from "@angular/core";
export declare enum FieldType {
    Plain = 0,
    Designer = 1
}
export declare class FormlyDesignerService {
    private designerConfig;
    private fieldsService;
    private formlyConfig;
    constructor(designerConfig: FormlyDesignerConfig, fieldsService: FieldsService, formlyConfig: FormlyConfig);
    private readonly _disabled;
    private readonly _designerFields;
    private readonly _fields;
    private readonly _selectedField;
    private readonly _model;
    get disabled(): boolean;
    set disabled(value: boolean);
    get disabled$(): Observable<boolean>;
    get selectedField$(): Observable<FormlyFieldConfig | null>;
    get selectedDesignerId(): string;
    get designerFields(): FormlyFieldConfig[];
    set designerFields(value: FormlyFieldConfig[]);
    get designerFields$(): Observable<FormlyFieldConfig[]>;
    get fields(): FormlyFieldConfig[];
    set fields(value: FormlyFieldConfig[]);
    get fields$(): Observable<FormlyFieldConfig[]>;
    get model(): unknown;
    set model(value: unknown);
    get model$(): Observable<unknown>;
    addField(field: FormlyFieldConfig, index?: number): void;
    createField(type: string): FormlyFieldConfig;
    didClickField(value: FormlyFieldConfig): void;
    removeField(field: FormlyFieldConfig): void;
    updateField(original: FormlyFieldConfig | null, modified: FormlyFieldConfig): void;
    getWrappers(field: FormlyFieldConfig): string[];
    /** Prunes field of unrecognized properties */
    createPrunedField(field: FormlyFieldConfig, fieldType?: FieldType): FormlyFieldConfig;
    /** Prunes fields of unrecognized properties */
    createPrunedFields(fields: FormlyFieldConfig[] | undefined, fieldType?: FieldType): FormlyFieldConfig[];
    getTypeName(type: string | null | undefined): string;
    private applyProperties;
    private getDesignerType;
    private replaceField;
    private replaceFieldArray;
    private buildPath;
    private path;
    private unsetField;
    private removeControl;
    private updateFields;
    static ɵfac: i0.ɵɵFactoryDeclaration<FormlyDesignerService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<FormlyDesignerService>;
}
