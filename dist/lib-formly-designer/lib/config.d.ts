import { ConfigOption } from '@ngx-formly/core';
import { DesignerExtension } from './extensions/designer';
import { FormlyDesignerWrapperComponent } from './wrappers/designer';
import { FormlyDesignerFieldWrapperComponent } from './wrappers/field-designer';
import * as i0 from "@angular/core";
export declare const fieldComponents: never[];
export declare const wrapperComponents: (typeof FormlyDesignerWrapperComponent | typeof FormlyDesignerFieldWrapperComponent)[];
export declare class Config implements ConfigOption {
    wrappers: {
        name: string;
        component: any;
    }[];
    extensions: {
        name: string;
        extension: any;
    }[];
    constructor(designerExtension: DesignerExtension);
    static ɵfac: i0.ɵɵFactoryDeclaration<Config, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<Config>;
}
