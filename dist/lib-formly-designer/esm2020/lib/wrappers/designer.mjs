import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { FieldWrapper } from '@ngx-formly/core';
import * as i0 from "@angular/core";
export class FormlyDesignerWrapperComponent extends FieldWrapper {
}
FormlyDesignerWrapperComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.6", ngImport: i0, type: FormlyDesignerWrapperComponent, deps: null, target: i0.ɵɵFactoryTarget.Component });
FormlyDesignerWrapperComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.2.6", type: FormlyDesignerWrapperComponent, selector: "formly-designer-wrapper", viewQueries: [{ propertyName: "fieldComponent", first: true, predicate: ["fieldComponent"], descendants: true, read: ViewContainerRef, static: true }], usesInheritance: true, ngImport: i0, template: `
    <ng-template #fieldComponent></ng-template>
  `, isInline: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.6", ngImport: i0, type: FormlyDesignerWrapperComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'formly-designer-wrapper',
                    template: `
    <ng-template #fieldComponent></ng-template>
  `
                }]
        }], propDecorators: { fieldComponent: [{
                type: ViewChild,
                args: ['fieldComponent', { read: ViewContainerRef, static: true }]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVzaWduZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9saWItZm9ybWx5LWRlc2lnbmVyL3NyYy9saWIvd3JhcHBlcnMvZGVzaWduZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDdkUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGtCQUFrQixDQUFDOztBQVFoRCxNQUFNLE9BQU8sOEJBQStCLFNBQVEsWUFBWTs7MkhBQW5ELDhCQUE4QjsrR0FBOUIsOEJBQThCLDRKQUNKLGdCQUFnQixrRUFMM0M7O0dBRVQ7MkZBRVUsOEJBQThCO2tCQU4xQyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSx5QkFBeUI7b0JBQ25DLFFBQVEsRUFBRTs7R0FFVDtpQkFDRjs4QkFFaUYsY0FBYztzQkFBN0YsU0FBUzt1QkFBQyxnQkFBZ0IsRUFBRSxFQUFFLElBQUksRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBWaWV3Q2hpbGQsIFZpZXdDb250YWluZXJSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZpZWxkV3JhcHBlciB9IGZyb20gJ0BuZ3gtZm9ybWx5L2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdmb3JtbHktZGVzaWduZXItd3JhcHBlcicsXG4gIHRlbXBsYXRlOiBgXG4gICAgPG5nLXRlbXBsYXRlICNmaWVsZENvbXBvbmVudD48L25nLXRlbXBsYXRlPlxuICBgXG59KVxuZXhwb3J0IGNsYXNzIEZvcm1seURlc2lnbmVyV3JhcHBlckNvbXBvbmVudCBleHRlbmRzIEZpZWxkV3JhcHBlciB7XG4gIEBWaWV3Q2hpbGQoJ2ZpZWxkQ29tcG9uZW50JywgeyByZWFkOiBWaWV3Q29udGFpbmVyUmVmLCBzdGF0aWM6IHRydWUgfSkgb3ZlcnJpZGUgZmllbGRDb21wb25lbnQhOiBWaWV3Q29udGFpbmVyUmVmO1xufVxuIl19