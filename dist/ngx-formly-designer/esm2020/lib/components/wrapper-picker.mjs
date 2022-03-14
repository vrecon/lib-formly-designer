import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { cloneDeep, isArray, isObject } from '../util';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "../formly-designer-config";
import * as i3 from "../formly-designer.service";
import * as i4 from "./wrapper-select";
import * as i5 from "./wrapper-editor";
export class WrapperPickerComponent {
    constructor(formBuilder, formlyDesignerConfig, formlyDesignerService) {
        this.formlyDesignerConfig = formlyDesignerConfig;
        this.formlyDesignerService = formlyDesignerService;
        this.selected = new EventEmitter();
        this.fieldEdit = new FormControl({});
        this.form = formBuilder.group({
            wrapper: ['', Validators.compose([Validators.required, Validators.pattern(/^\s*\S.*$/)])]
        });
    }
    get wrapper() {
        return this.form.get('wrapper')?.value;
    }
    get $modal() {
        return $(this.modalRef?.nativeElement);
    }
    add() {
        if (!this.wrapper) {
            return;
        }
        if (isObject(this.field)) {
            const field = cloneDeep(this.field);
            if (isArray(field.wrappers) && field.wrappers.length > 0) {
                field.wrappers.splice(field.wrappers.length - 1, 0, this.wrapper);
            }
            else {
                field.wrappers = [this.wrapper];
            }
            this.fieldEdit.setValue(field);
            const fields = this.formlyDesignerConfig.wrappers[this.wrapper].fields;
            if (isArray(fields) && fields.length > 0) {
                this.$modal.modal('show');
            }
            else {
                this.onApply();
            }
        }
    }
    onApply() {
        this.field = this.formlyDesignerService.createPrunedField(this.fieldEdit.value);
        this.selected.emit(this.fieldEdit.value);
        this.$modal.modal('hide');
    }
}
WrapperPickerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.6", ngImport: i0, type: WrapperPickerComponent, deps: [{ token: i1.FormBuilder }, { token: i2.FormlyDesignerConfig }, { token: i3.FormlyDesignerService }], target: i0.ɵɵFactoryTarget.Component });
WrapperPickerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.2.6", type: WrapperPickerComponent, selector: "formly-designer-wrapper-picker", inputs: { field: "field" }, outputs: { selected: "selected" }, viewQueries: [{ propertyName: "modalRef", first: true, predicate: ["modal"], descendants: true, static: true }], ngImport: i0, template: `
    <form novalidate [formGroup]="form">
      <div class="form-group">
        <div class="input-group">
          <formly-designer-wrapper-select formControlName="wrapper">
          </formly-designer-wrapper-select>
          <button type="button" class="btn btn-secondary" [disabled]="form.invalid" (click)="add()">
            Add
          </button>
        </div>
      </div>
      <div #modal class="modal fade" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Add {{ wrapper }}</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Cancel">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <formly-designer-wrapper-editor #editor [formControl]="fieldEdit" [wrapper]="wrapper">
              </formly-designer-wrapper-editor>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
              <button type="button" class="btn btn-primary" (click)="onApply()"
                [disabled]="editor.invalid">Apply</button>
            </div>
          </div>
        </div>
      </div>
    </form>
  `, isInline: true, styles: [":host{width:inherit}.btn:not(:disabled){cursor:pointer}.input-group>.btn{border-radius:0 .25rem .25rem 0}.input-group,.modal-header{display:flex}.modal-header{justify-content:space-between}formly-designer-wrapper-select{flex-grow:2}\n"], components: [{ type: i4.WrapperSelectComponent, selector: "formly-designer-wrapper-select" }, { type: i5.WrapperEditorComponent, selector: "formly-designer-wrapper-editor", inputs: ["wrapper"] }], directives: [{ type: i1.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { type: i1.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i1.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i1.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { type: i1.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.6", ngImport: i0, type: WrapperPickerComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'formly-designer-wrapper-picker',
                    template: `
    <form novalidate [formGroup]="form">
      <div class="form-group">
        <div class="input-group">
          <formly-designer-wrapper-select formControlName="wrapper">
          </formly-designer-wrapper-select>
          <button type="button" class="btn btn-secondary" [disabled]="form.invalid" (click)="add()">
            Add
          </button>
        </div>
      </div>
      <div #modal class="modal fade" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Add {{ wrapper }}</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Cancel">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <formly-designer-wrapper-editor #editor [formControl]="fieldEdit" [wrapper]="wrapper">
              </formly-designer-wrapper-editor>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
              <button type="button" class="btn btn-primary" (click)="onApply()"
                [disabled]="editor.invalid">Apply</button>
            </div>
          </div>
        </div>
      </div>
    </form>
  `,
                    styles: [`
    :host {
      width: inherit;
    }
    .btn:not(:disabled) {
      cursor: pointer;
    }
    .input-group > .btn {
      border-radius: 0 .25rem .25rem 0;
    }
    .input-group, .modal-header {
      display: flex;
    }
    .modal-header {
      justify-content: space-between;
    }
    formly-designer-wrapper-select {
      flex-grow: 2;
    }
  `]
                }]
        }], ctorParameters: function () { return [{ type: i1.FormBuilder }, { type: i2.FormlyDesignerConfig }, { type: i3.FormlyDesignerService }]; }, propDecorators: { modalRef: [{
                type: ViewChild,
                args: ['modal', { static: true }]
            }], field: [{
                type: Input
            }], selected: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3JhcHBlci1waWNrZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3gtZm9ybWx5LWRlc2lnbmVyL3NyYy9saWIvY29tcG9uZW50cy93cmFwcGVyLXBpY2tlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFjLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM5RixPQUFPLEVBQWUsV0FBVyxFQUFhLFVBQVUsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBSWpGLE9BQU8sRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLFNBQVMsQ0FBQzs7Ozs7OztBQTZEdkQsTUFBTSxPQUFPLHNCQUFzQjtJQUtqQyxZQUNFLFdBQXdCLEVBQ2hCLG9CQUEwQyxFQUMxQyxxQkFBNEM7UUFENUMseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFzQjtRQUMxQywwQkFBcUIsR0FBckIscUJBQXFCLENBQXVCO1FBTDVDLGFBQVEsR0FBRyxJQUFJLFlBQVksRUFBcUIsQ0FBQztRQWEzRCxjQUFTLEdBQUcsSUFBSSxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUM7UUFOOUIsSUFBSSxDQUFDLElBQUksR0FBRyxXQUFXLENBQUMsS0FBSyxDQUFDO1lBQzVCLE9BQU8sRUFBRSxDQUFDLEVBQUUsRUFBRSxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxVQUFVLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUMxRixDQUFDLENBQUM7SUFDTCxDQUFDO0lBS0QsSUFBSSxPQUFPO1FBQ1QsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsRUFBRSxLQUFLLENBQUM7SUFDekMsQ0FBQztJQUVELElBQVksTUFBTTtRQUNoQixPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLGFBQWEsQ0FBUSxDQUFDO0lBQ2hELENBQUM7SUFFRCxHQUFHO1FBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDakIsT0FBTztTQUNSO1FBQ0QsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ3hCLE1BQU0sS0FBSyxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFzQixDQUFDO1lBQ3pELElBQUksT0FBTyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7Z0JBQ3hELEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQ25FO2lCQUFNO2dCQUNMLEtBQUssQ0FBQyxRQUFRLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDakM7WUFDRCxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUUvQixNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsb0JBQW9CLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLENBQUM7WUFDdkUsSUFBSSxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7Z0JBQ3hDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQzNCO2lCQUFNO2dCQUNMLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQzthQUNoQjtTQUNGO0lBQ0gsQ0FBQztJQUVELE9BQU87UUFDTCxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2hGLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDekMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDNUIsQ0FBQzs7bUhBcERVLHNCQUFzQjt1R0FBdEIsc0JBQXNCLHNQQXZEdkI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWlDVDsyRkFzQlUsc0JBQXNCO2tCQXpEbEMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsZ0NBQWdDO29CQUMxQyxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWlDVDtvQkFDRCxNQUFNLEVBQUUsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW1CUixDQUFDO2lCQUNIO3lLQUV1QyxRQUFRO3NCQUE3QyxTQUFTO3VCQUFDLE9BQU8sRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7Z0JBQzNCLEtBQUs7c0JBQWIsS0FBSztnQkFDSSxRQUFRO3NCQUFqQixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIElucHV0LCBPdXRwdXQsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUJ1aWxkZXIsIEZvcm1Db250cm9sLCBGb3JtR3JvdXAsIFZhbGlkYXRvcnMgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBGb3JtbHlGaWVsZENvbmZpZyB9IGZyb20gJ0BuZ3gtZm9ybWx5L2NvcmUnO1xuaW1wb3J0IHsgRm9ybWx5RGVzaWduZXJDb25maWcgfSBmcm9tICcuLi9mb3JtbHktZGVzaWduZXItY29uZmlnJztcbmltcG9ydCB7IEZvcm1seURlc2lnbmVyU2VydmljZSB9IGZyb20gJy4uL2Zvcm1seS1kZXNpZ25lci5zZXJ2aWNlJztcbmltcG9ydCB7IGNsb25lRGVlcCwgaXNBcnJheSwgaXNPYmplY3QgfSBmcm9tICcuLi91dGlsJztcblxuZGVjbGFyZSB2YXIgJDogSlF1ZXJ5U3RhdGljO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdmb3JtbHktZGVzaWduZXItd3JhcHBlci1waWNrZXInLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxmb3JtIG5vdmFsaWRhdGUgW2Zvcm1Hcm91cF09XCJmb3JtXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXBcIj5cbiAgICAgICAgICA8Zm9ybWx5LWRlc2lnbmVyLXdyYXBwZXItc2VsZWN0IGZvcm1Db250cm9sTmFtZT1cIndyYXBwZXJcIj5cbiAgICAgICAgICA8L2Zvcm1seS1kZXNpZ25lci13cmFwcGVyLXNlbGVjdD5cbiAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tc2Vjb25kYXJ5XCIgW2Rpc2FibGVkXT1cImZvcm0uaW52YWxpZFwiIChjbGljayk9XCJhZGQoKVwiPlxuICAgICAgICAgICAgQWRkXG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2ICNtb2RhbCBjbGFzcz1cIm1vZGFsIGZhZGVcIiB0YWJpbmRleD1cIi0xXCIgcm9sZT1cImRpYWxvZ1wiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwibW9kYWwtZGlhbG9nIG1vZGFsLWxnXCIgcm9sZT1cImRvY3VtZW50XCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGFsLWNvbnRlbnRcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtb2RhbC1oZWFkZXJcIj5cbiAgICAgICAgICAgICAgPGg1IGNsYXNzPVwibW9kYWwtdGl0bGVcIj5BZGQge3sgd3JhcHBlciB9fTwvaDU+XG4gICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiY2xvc2VcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiIGFyaWEtbGFiZWw9XCJDYW5jZWxcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBhcmlhLWhpZGRlbj1cInRydWVcIj4mdGltZXM7PC9zcGFuPlxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGFsLWJvZHlcIj5cbiAgICAgICAgICAgICAgPGZvcm1seS1kZXNpZ25lci13cmFwcGVyLWVkaXRvciAjZWRpdG9yIFtmb3JtQ29udHJvbF09XCJmaWVsZEVkaXRcIiBbd3JhcHBlcl09XCJ3cmFwcGVyXCI+XG4gICAgICAgICAgICAgIDwvZm9ybWx5LWRlc2lnbmVyLXdyYXBwZXItZWRpdG9yPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwibW9kYWwtZm9vdGVyXCI+XG4gICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1zZWNvbmRhcnlcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPkNhbmNlbDwvYnV0dG9uPlxuICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tcHJpbWFyeVwiIChjbGljayk9XCJvbkFwcGx5KClcIlxuICAgICAgICAgICAgICAgIFtkaXNhYmxlZF09XCJlZGl0b3IuaW52YWxpZFwiPkFwcGx5PC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Zvcm0+XG4gIGAsXG4gIHN0eWxlczogW2BcbiAgICA6aG9zdCB7XG4gICAgICB3aWR0aDogaW5oZXJpdDtcbiAgICB9XG4gICAgLmJ0bjpub3QoOmRpc2FibGVkKSB7XG4gICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgfVxuICAgIC5pbnB1dC1ncm91cCA+IC5idG4ge1xuICAgICAgYm9yZGVyLXJhZGl1czogMCAuMjVyZW0gLjI1cmVtIDA7XG4gICAgfVxuICAgIC5pbnB1dC1ncm91cCwgLm1vZGFsLWhlYWRlciB7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgIH1cbiAgICAubW9kYWwtaGVhZGVyIHtcbiAgICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgICB9XG4gICAgZm9ybWx5LWRlc2lnbmVyLXdyYXBwZXItc2VsZWN0IHtcbiAgICAgIGZsZXgtZ3JvdzogMjtcbiAgICB9XG4gIGBdXG59KVxuZXhwb3J0IGNsYXNzIFdyYXBwZXJQaWNrZXJDb21wb25lbnQge1xuICBAVmlld0NoaWxkKCdtb2RhbCcsIHsgc3RhdGljOiB0cnVlIH0pIG1vZGFsUmVmPzogRWxlbWVudFJlZjtcbiAgQElucHV0KCkgZmllbGQ/OiBGb3JtbHlGaWVsZENvbmZpZztcbiAgQE91dHB1dCgpIHNlbGVjdGVkID0gbmV3IEV2ZW50RW1pdHRlcjxGb3JtbHlGaWVsZENvbmZpZz4oKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBmb3JtQnVpbGRlcjogRm9ybUJ1aWxkZXIsXG4gICAgcHJpdmF0ZSBmb3JtbHlEZXNpZ25lckNvbmZpZzogRm9ybWx5RGVzaWduZXJDb25maWcsXG4gICAgcHJpdmF0ZSBmb3JtbHlEZXNpZ25lclNlcnZpY2U6IEZvcm1seURlc2lnbmVyU2VydmljZVxuICApIHtcbiAgICB0aGlzLmZvcm0gPSBmb3JtQnVpbGRlci5ncm91cCh7XG4gICAgICB3cmFwcGVyOiBbJycsIFZhbGlkYXRvcnMuY29tcG9zZShbVmFsaWRhdG9ycy5yZXF1aXJlZCwgVmFsaWRhdG9ycy5wYXR0ZXJuKC9eXFxzKlxcUy4qJC8pXSldXG4gICAgfSk7XG4gIH1cblxuICBmb3JtOiBGb3JtR3JvdXA7XG4gIGZpZWxkRWRpdCA9IG5ldyBGb3JtQ29udHJvbCh7fSk7XG5cbiAgZ2V0IHdyYXBwZXIoKTogc3RyaW5nIHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXMuZm9ybS5nZXQoJ3dyYXBwZXInKT8udmFsdWU7XG4gIH1cblxuICBwcml2YXRlIGdldCAkbW9kYWwoKTogSlF1ZXJ5ICYgeyBtb2RhbDogKGNvbW1hbmQ6IHN0cmluZykgPT4gdm9pZCB9IHtcbiAgICByZXR1cm4gJCh0aGlzLm1vZGFsUmVmPy5uYXRpdmVFbGVtZW50KSBhcyBhbnk7XG4gIH1cblxuICBhZGQoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLndyYXBwZXIpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKGlzT2JqZWN0KHRoaXMuZmllbGQpKSB7XG4gICAgICBjb25zdCBmaWVsZCA9IGNsb25lRGVlcCh0aGlzLmZpZWxkKSBhcyBGb3JtbHlGaWVsZENvbmZpZztcbiAgICAgIGlmIChpc0FycmF5KGZpZWxkLndyYXBwZXJzKSAmJiBmaWVsZC53cmFwcGVycy5sZW5ndGggPiAwKSB7XG4gICAgICAgIGZpZWxkLndyYXBwZXJzLnNwbGljZShmaWVsZC53cmFwcGVycy5sZW5ndGggLSAxLCAwLCB0aGlzLndyYXBwZXIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZmllbGQud3JhcHBlcnMgPSBbdGhpcy53cmFwcGVyXTtcbiAgICAgIH1cbiAgICAgIHRoaXMuZmllbGRFZGl0LnNldFZhbHVlKGZpZWxkKTtcblxuICAgICAgY29uc3QgZmllbGRzID0gdGhpcy5mb3JtbHlEZXNpZ25lckNvbmZpZy53cmFwcGVyc1t0aGlzLndyYXBwZXJdLmZpZWxkcztcbiAgICAgIGlmIChpc0FycmF5KGZpZWxkcykgJiYgZmllbGRzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdGhpcy4kbW9kYWwubW9kYWwoJ3Nob3cnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMub25BcHBseSgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG9uQXBwbHkoKTogdm9pZCB7XG4gICAgdGhpcy5maWVsZCA9IHRoaXMuZm9ybWx5RGVzaWduZXJTZXJ2aWNlLmNyZWF0ZVBydW5lZEZpZWxkKHRoaXMuZmllbGRFZGl0LnZhbHVlKTtcbiAgICB0aGlzLnNlbGVjdGVkLmVtaXQodGhpcy5maWVsZEVkaXQudmFsdWUpO1xuICAgIHRoaXMuJG1vZGFsLm1vZGFsKCdoaWRlJyk7XG4gIH1cbn1cbiJdfQ==