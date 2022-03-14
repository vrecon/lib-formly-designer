import { CommonModule } from '@angular/common';
import { ANALYZE_FOR_ENTRY_COMPONENTS, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyForm, FormlyModule } from '@ngx-formly/core';
import 'jquery';
import { FieldEditorComponent } from './components/field-editor';
import { FieldPickerComponent } from './components/field-picker';
import { PropertiesComponent } from './components/properties';
import { TypeSelectComponent } from './components/type-select';
import { TypesComponent } from './components/types';
import { WrapperEditorComponent } from './components/wrapper-editor';
import { WrapperPickerComponent } from './components/wrapper-picker';
import { WrapperSelectComponent } from './components/wrapper-select';
import { WrappersPickerComponent } from './components/wrappers-picker';
import { Config, fieldComponents, wrapperComponents } from './config';
import { DragDropService } from './drag-drop.service';
import { DesignerExtension } from './extensions/designer';
import { FieldsService } from './fields.service';
import { FormlyDesignerConfig, FORMLY_DESIGNER_CONFIG_TOKEN } from './formly-designer-config';
import { FormlyDesignerComponent } from './formly-designer.component';
import { DecyclePipe } from './pipes/decycle';
import * as i0 from "@angular/core";
import * as i1 from "./config";
import * as i2 from "@ngx-formly/core";
import * as i3 from "./wrappers/designer";
import * as i4 from "./wrappers/field-designer";
export class FormlyDesignerModule {
    constructor(config, formlyConfig) {
        formlyConfig.addConfig(config);
    }
    static forRoot(designerConfig = {}) {
        return {
            ngModule: FormlyDesignerModule,
            providers: [
                { provide: ANALYZE_FOR_ENTRY_COMPONENTS, useValue: [fieldComponents, wrapperComponents], multi: true },
                { provide: FORMLY_DESIGNER_CONFIG_TOKEN, useValue: designerConfig, multi: true }
            ]
        };
    }
}
FormlyDesignerModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.6", ngImport: i0, type: FormlyDesignerModule, deps: [{ token: i1.Config }, { token: i2.FormlyConfig }], target: i0.ɵɵFactoryTarget.NgModule });
FormlyDesignerModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.2.6", ngImport: i0, type: FormlyDesignerModule, declarations: [FieldEditorComponent,
        FieldPickerComponent,
        FormlyDesignerComponent,
        PropertiesComponent,
        TypesComponent,
        TypeSelectComponent,
        WrapperEditorComponent,
        WrapperSelectComponent,
        WrapperPickerComponent,
        WrappersPickerComponent,
        DecyclePipe, i3.FormlyDesignerWrapperComponent, i4.FormlyDesignerFieldWrapperComponent], imports: [CommonModule,
        FormsModule,
        ReactiveFormsModule, i2.FormlyModule], exports: [FieldEditorComponent,
        FormlyDesignerComponent,
        PropertiesComponent,
        TypesComponent,
        WrapperEditorComponent] });
FormlyDesignerModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.2.6", ngImport: i0, type: FormlyDesignerModule, providers: [
        Config,
        DesignerExtension,
        DragDropService,
        FormlyDesignerConfig,
        FieldsService
    ], imports: [[
            CommonModule,
            FormsModule,
            ReactiveFormsModule,
            FormlyModule.forChild()
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.6", ngImport: i0, type: FormlyDesignerModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        FieldEditorComponent,
                        FieldPickerComponent,
                        FormlyDesignerComponent,
                        PropertiesComponent,
                        TypesComponent,
                        TypeSelectComponent,
                        WrapperEditorComponent,
                        WrapperSelectComponent,
                        WrapperPickerComponent,
                        WrappersPickerComponent,
                        DecyclePipe,
                        fieldComponents,
                        wrapperComponents
                    ],
                    imports: [
                        CommonModule,
                        FormsModule,
                        ReactiveFormsModule,
                        FormlyModule.forChild()
                    ],
                    exports: [
                        FieldEditorComponent,
                        FormlyDesignerComponent,
                        PropertiesComponent,
                        TypesComponent,
                        WrapperEditorComponent
                    ],
                    providers: [
                        Config,
                        DesignerExtension,
                        DragDropService,
                        FormlyDesignerConfig,
                        FieldsService
                    ],
                    entryComponents: [FormlyForm]
                }]
        }], ctorParameters: function () { return [{ type: i1.Config }, { type: i2.FormlyConfig }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybWx5LWRlc2lnbmVyLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL2xpYi1mb3JtbHktZGVzaWduZXIvc3JjL2xpYi9mb3JtbHktZGVzaWduZXIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsNEJBQTRCLEVBQXVCLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM1RixPQUFPLEVBQUUsV0FBVyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDbEUsT0FBTyxFQUFnQixVQUFVLEVBQUUsWUFBWSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDMUUsT0FBTyxRQUFRLENBQUM7QUFDaEIsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDakUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDakUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDOUQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDL0QsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ3JFLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ3JFLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ3JFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxNQUFNLEVBQUUsZUFBZSxFQUFFLGlCQUFpQixFQUFFLE1BQU0sVUFBVSxDQUFDO0FBQ3RFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN0RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDakQsT0FBTyxFQUF3QixvQkFBb0IsRUFBRSw0QkFBNEIsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3BILE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ3RFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7Ozs7O0FBMkM5QyxNQUFNLE9BQU8sb0JBQW9CO0lBQy9CLFlBQ0UsTUFBYyxFQUNkLFlBQTBCO1FBRTFCLFlBQVksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUVELE1BQU0sQ0FBQyxPQUFPLENBQUMsaUJBQXVDLEVBQUU7UUFDdEQsT0FBTztZQUNMLFFBQVEsRUFBRSxvQkFBb0I7WUFDOUIsU0FBUyxFQUFFO2dCQUNULEVBQUUsT0FBTyxFQUFFLDRCQUE0QixFQUFFLFFBQVEsRUFBRSxDQUFDLGVBQWUsRUFBRSxpQkFBaUIsQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUU7Z0JBQ3RHLEVBQUUsT0FBTyxFQUFFLDRCQUE0QixFQUFFLFFBQVEsRUFBRSxjQUFjLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRTthQUNqRjtTQUNGLENBQUM7SUFDSixDQUFDOztpSEFoQlUsb0JBQW9CO2tIQUFwQixvQkFBb0IsaUJBdkM3QixvQkFBb0I7UUFDcEIsb0JBQW9CO1FBQ3BCLHVCQUF1QjtRQUN2QixtQkFBbUI7UUFDbkIsY0FBYztRQUNkLG1CQUFtQjtRQUNuQixzQkFBc0I7UUFDdEIsc0JBQXNCO1FBQ3RCLHNCQUFzQjtRQUN0Qix1QkFBdUI7UUFFdkIsV0FBVyx3RkFNWCxZQUFZO1FBQ1osV0FBVztRQUNYLG1CQUFtQiw4QkFLbkIsb0JBQW9CO1FBQ3BCLHVCQUF1QjtRQUN2QixtQkFBbUI7UUFDbkIsY0FBYztRQUNkLHNCQUFzQjtrSEFXYixvQkFBb0IsYUFUcEI7UUFDVCxNQUFNO1FBQ04saUJBQWlCO1FBQ2pCLGVBQWU7UUFDZixvQkFBb0I7UUFDcEIsYUFBYTtLQUNkLFlBcEJRO1lBQ1AsWUFBWTtZQUNaLFdBQVc7WUFDWCxtQkFBbUI7WUFFbkIsWUFBWSxDQUFDLFFBQVEsRUFBRTtTQUN4QjsyRkFpQlUsb0JBQW9CO2tCQXpDaEMsUUFBUTttQkFBQztvQkFDUixZQUFZLEVBQUU7d0JBQ1osb0JBQW9CO3dCQUNwQixvQkFBb0I7d0JBQ3BCLHVCQUF1Qjt3QkFDdkIsbUJBQW1CO3dCQUNuQixjQUFjO3dCQUNkLG1CQUFtQjt3QkFDbkIsc0JBQXNCO3dCQUN0QixzQkFBc0I7d0JBQ3RCLHNCQUFzQjt3QkFDdEIsdUJBQXVCO3dCQUV2QixXQUFXO3dCQUVYLGVBQWU7d0JBQ2YsaUJBQWlCO3FCQUNsQjtvQkFDRCxPQUFPLEVBQUU7d0JBQ1AsWUFBWTt3QkFDWixXQUFXO3dCQUNYLG1CQUFtQjt3QkFFbkIsWUFBWSxDQUFDLFFBQVEsRUFBRTtxQkFDeEI7b0JBQ0QsT0FBTyxFQUFFO3dCQUNQLG9CQUFvQjt3QkFDcEIsdUJBQXVCO3dCQUN2QixtQkFBbUI7d0JBQ25CLGNBQWM7d0JBQ2Qsc0JBQXNCO3FCQUN2QjtvQkFDRCxTQUFTLEVBQUU7d0JBQ1QsTUFBTTt3QkFDTixpQkFBaUI7d0JBQ2pCLGVBQWU7d0JBQ2Ysb0JBQW9CO3dCQUNwQixhQUFhO3FCQUNkO29CQUNELGVBQWUsRUFBRSxDQUFDLFVBQVUsQ0FBQztpQkFDOUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgQU5BTFlaRV9GT1JfRU5UUllfQ09NUE9ORU5UUywgTW9kdWxlV2l0aFByb3ZpZGVycywgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlLCBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgRm9ybWx5Q29uZmlnLCBGb3JtbHlGb3JtLCBGb3JtbHlNb2R1bGUgfSBmcm9tICdAbmd4LWZvcm1seS9jb3JlJztcbmltcG9ydCAnanF1ZXJ5JztcbmltcG9ydCB7IEZpZWxkRWRpdG9yQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2ZpZWxkLWVkaXRvcic7XG5pbXBvcnQgeyBGaWVsZFBpY2tlckNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9maWVsZC1waWNrZXInO1xuaW1wb3J0IHsgUHJvcGVydGllc0NvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9wcm9wZXJ0aWVzJztcbmltcG9ydCB7IFR5cGVTZWxlY3RDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvdHlwZS1zZWxlY3QnO1xuaW1wb3J0IHsgVHlwZXNDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvdHlwZXMnO1xuaW1wb3J0IHsgV3JhcHBlckVkaXRvckNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy93cmFwcGVyLWVkaXRvcic7XG5pbXBvcnQgeyBXcmFwcGVyUGlja2VyQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3dyYXBwZXItcGlja2VyJztcbmltcG9ydCB7IFdyYXBwZXJTZWxlY3RDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvd3JhcHBlci1zZWxlY3QnO1xuaW1wb3J0IHsgV3JhcHBlcnNQaWNrZXJDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvd3JhcHBlcnMtcGlja2VyJztcbmltcG9ydCB7IENvbmZpZywgZmllbGRDb21wb25lbnRzLCB3cmFwcGVyQ29tcG9uZW50cyB9IGZyb20gJy4vY29uZmlnJztcbmltcG9ydCB7IERyYWdEcm9wU2VydmljZSB9IGZyb20gJy4vZHJhZy1kcm9wLnNlcnZpY2UnO1xuaW1wb3J0IHsgRGVzaWduZXJFeHRlbnNpb24gfSBmcm9tICcuL2V4dGVuc2lvbnMvZGVzaWduZXInO1xuaW1wb3J0IHsgRmllbGRzU2VydmljZSB9IGZyb20gJy4vZmllbGRzLnNlcnZpY2UnO1xuaW1wb3J0IHsgRGVzaWduZXJDb25maWdPcHRpb24sIEZvcm1seURlc2lnbmVyQ29uZmlnLCBGT1JNTFlfREVTSUdORVJfQ09ORklHX1RPS0VOIH0gZnJvbSAnLi9mb3JtbHktZGVzaWduZXItY29uZmlnJztcbmltcG9ydCB7IEZvcm1seURlc2lnbmVyQ29tcG9uZW50IH0gZnJvbSAnLi9mb3JtbHktZGVzaWduZXIuY29tcG9uZW50JztcbmltcG9ydCB7IERlY3ljbGVQaXBlIH0gZnJvbSAnLi9waXBlcy9kZWN5Y2xlJztcblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgRmllbGRFZGl0b3JDb21wb25lbnQsXG4gICAgRmllbGRQaWNrZXJDb21wb25lbnQsXG4gICAgRm9ybWx5RGVzaWduZXJDb21wb25lbnQsXG4gICAgUHJvcGVydGllc0NvbXBvbmVudCxcbiAgICBUeXBlc0NvbXBvbmVudCxcbiAgICBUeXBlU2VsZWN0Q29tcG9uZW50LFxuICAgIFdyYXBwZXJFZGl0b3JDb21wb25lbnQsXG4gICAgV3JhcHBlclNlbGVjdENvbXBvbmVudCxcbiAgICBXcmFwcGVyUGlja2VyQ29tcG9uZW50LFxuICAgIFdyYXBwZXJzUGlja2VyQ29tcG9uZW50LFxuXG4gICAgRGVjeWNsZVBpcGUsXG5cbiAgICBmaWVsZENvbXBvbmVudHMsXG4gICAgd3JhcHBlckNvbXBvbmVudHNcbiAgXSxcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBGb3Jtc01vZHVsZSxcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxuXG4gICAgRm9ybWx5TW9kdWxlLmZvckNoaWxkKClcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIEZpZWxkRWRpdG9yQ29tcG9uZW50LFxuICAgIEZvcm1seURlc2lnbmVyQ29tcG9uZW50LFxuICAgIFByb3BlcnRpZXNDb21wb25lbnQsXG4gICAgVHlwZXNDb21wb25lbnQsXG4gICAgV3JhcHBlckVkaXRvckNvbXBvbmVudFxuICBdLFxuICBwcm92aWRlcnM6IFtcbiAgICBDb25maWcsXG4gICAgRGVzaWduZXJFeHRlbnNpb24sXG4gICAgRHJhZ0Ryb3BTZXJ2aWNlLFxuICAgIEZvcm1seURlc2lnbmVyQ29uZmlnLFxuICAgIEZpZWxkc1NlcnZpY2VcbiAgXSxcbiAgZW50cnlDb21wb25lbnRzOiBbRm9ybWx5Rm9ybV1cbn0pXG5leHBvcnQgY2xhc3MgRm9ybWx5RGVzaWduZXJNb2R1bGUge1xuICBjb25zdHJ1Y3RvcihcbiAgICBjb25maWc6IENvbmZpZyxcbiAgICBmb3JtbHlDb25maWc6IEZvcm1seUNvbmZpZ1xuICApIHtcbiAgICBmb3JtbHlDb25maWcuYWRkQ29uZmlnKGNvbmZpZyk7XG4gIH1cblxuICBzdGF0aWMgZm9yUm9vdChkZXNpZ25lckNvbmZpZzogRGVzaWduZXJDb25maWdPcHRpb24gPSB7fSk6IE1vZHVsZVdpdGhQcm92aWRlcnM8Rm9ybWx5RGVzaWduZXJNb2R1bGU+IHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IEZvcm1seURlc2lnbmVyTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHsgcHJvdmlkZTogQU5BTFlaRV9GT1JfRU5UUllfQ09NUE9ORU5UUywgdXNlVmFsdWU6IFtmaWVsZENvbXBvbmVudHMsIHdyYXBwZXJDb21wb25lbnRzXSwgbXVsdGk6IHRydWUgfSxcbiAgICAgICAgeyBwcm92aWRlOiBGT1JNTFlfREVTSUdORVJfQ09ORklHX1RPS0VOLCB1c2VWYWx1ZTogZGVzaWduZXJDb25maWcsIG11bHRpOiB0cnVlIH1cbiAgICAgIF1cbiAgICB9O1xuICB9XG59XG4iXX0=