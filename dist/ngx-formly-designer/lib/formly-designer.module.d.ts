import { ModuleWithProviders } from '@angular/core';
import { FormlyConfig } from '@ngx-formly/core';
import 'jquery';
import { Config } from './config';
import { DesignerConfigOption } from './formly-designer-config';
import * as i0 from "@angular/core";
import * as i1 from "./components/field-editor";
import * as i2 from "./components/field-picker";
import * as i3 from "./formly-designer.component";
import * as i4 from "./components/properties";
import * as i5 from "./components/types";
import * as i6 from "./components/type-select";
import * as i7 from "./components/wrapper-editor";
import * as i8 from "./components/wrapper-select";
import * as i9 from "./components/wrapper-picker";
import * as i10 from "./components/wrappers-picker";
import * as i11 from "./pipes/decycle";
import * as i12 from "./wrappers/designer";
import * as i13 from "./wrappers/field-designer";
import * as i14 from "@angular/common";
import * as i15 from "@angular/forms";
import * as i16 from "@ngx-formly/core";
export declare class FormlyDesignerModule {
    constructor(config: Config, formlyConfig: FormlyConfig);
    static forRoot(designerConfig?: DesignerConfigOption): ModuleWithProviders<FormlyDesignerModule>;
    static ɵfac: i0.ɵɵFactoryDeclaration<FormlyDesignerModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<FormlyDesignerModule, [typeof i1.FieldEditorComponent, typeof i2.FieldPickerComponent, typeof i3.FormlyDesignerComponent, typeof i4.PropertiesComponent, typeof i5.TypesComponent, typeof i6.TypeSelectComponent, typeof i7.WrapperEditorComponent, typeof i8.WrapperSelectComponent, typeof i9.WrapperPickerComponent, typeof i10.WrappersPickerComponent, typeof i11.DecyclePipe, typeof i12.FormlyDesignerWrapperComponent, typeof i13.FormlyDesignerFieldWrapperComponent], [typeof i14.CommonModule, typeof i15.FormsModule, typeof i15.ReactiveFormsModule, typeof i16.FormlyModule], [typeof i1.FieldEditorComponent, typeof i3.FormlyDesignerComponent, typeof i4.PropertiesComponent, typeof i5.TypesComponent, typeof i7.WrapperEditorComponent]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<FormlyDesignerModule>;
}
