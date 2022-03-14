import { FormlyFieldConfig } from '@ngx-formly/core';
import { FormlyDesignerConfig } from './formly-designer-config';
import * as i0 from "@angular/core";
export declare class FieldsService {
    private formlyDesignerConfig;
    constructor(formlyDesignerConfig: FormlyDesignerConfig);
    getFullKeyPath(field: FormlyFieldConfig, fields: FormlyFieldConfig[]): (string | number)[];
    getTypeFields(type: string): FormlyFieldConfig[];
    getWrapperFields(wrapper: string | null | undefined): FormlyFieldConfig[];
    checkField(field: FormlyFieldConfig, fields: FormlyFieldConfig[], parent?: FormlyFieldConfig): boolean;
    find(id: string | null, fields?: FormlyFieldConfig[]): FormlyFieldConfig | undefined;
    /** Find a field by full key path  */
    findField(field: FormlyFieldConfig, fields: FormlyFieldConfig[], parent?: FormlyFieldConfig): FormlyFieldConfig | undefined;
    mutateField(field: FormlyFieldConfig, editorField: boolean): FormlyFieldConfig;
    mutateFields(fields: FormlyFieldConfig[], editorFields: boolean): void;
    traverseFields(fields: FormlyFieldConfig[], callback: (field: FormlyFieldConfig, path?: (string | number)[], parent?: FormlyFieldConfig) => boolean | any, path?: (string | number)[], parent?: FormlyFieldConfig): boolean | any;
    private getFields;
    private getDesignerOptions;
    static ɵfac: i0.ɵɵFactoryDeclaration<FieldsService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<FieldsService>;
}
