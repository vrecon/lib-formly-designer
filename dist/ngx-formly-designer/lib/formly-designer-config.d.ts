import { InjectionToken } from '@angular/core';
import { FormlyConfig, FormlyFieldConfig } from '@ngx-formly/core';
import * as i0 from "@angular/core";
export declare const FORMLY_DESIGNER_CONFIG_TOKEN: InjectionToken<string>;
export declare const DESIGNER_WRAPPER_NAME = "$designer";
export declare const FIELD_DESIGNER_WRAPPER_NAME = "$fieldDesigner";
export declare const DESIGNER_WRAPPER_TYPES: string[];
export declare class FormlyDesignerConfig {
    private formlyConfig;
    constructor(configs: DesignerConfigOption[] | undefined, formlyConfig: FormlyConfig);
    types: {
        [name: string]: DesignerTypeOption;
    };
    wrappers: {
        [name: string]: DesignerOption;
    };
    settings: DesignerSettings;
    addConfig(config: DesignerConfigOption): void;
    setSettings(settings: DesignerSettings): void;
    setType(options: DesignerTypeOption | DesignerTypeOption[]): void;
    setWrapper(options: DesignerOption | DesignerOption[]): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<FormlyDesignerConfig, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<FormlyDesignerConfig>;
}
export interface DesignerOption {
    name: string;
    fields?: FormlyFieldConfig[];
}
export interface DesignerTypeOption extends DesignerOption {
    fieldArray?: boolean;
    fieldGroup?: boolean;
}
export interface DesignerSettings {
    showClassName?: boolean;
    filterWrapper?: (wrapper: string, field: FormlyFieldConfig) => boolean;
}
export interface DesignerConfigOption {
    settings?: DesignerSettings;
    types?: DesignerTypeOption[];
    wrappers?: DesignerOption[];
}
