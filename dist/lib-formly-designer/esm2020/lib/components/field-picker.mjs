import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "../formly-designer-config";
import * as i3 from "../formly-designer.service";
import * as i4 from "./type-select";
import * as i5 from "./field-editor";
export class FieldPickerComponent {
    constructor(fb, formlyDesignerConfig, formlyDesignerService) {
        this.formlyDesignerConfig = formlyDesignerConfig;
        this.formlyDesignerService = formlyDesignerService;
        this.selected = new EventEmitter();
        this.fieldEdit = new FormControl({});
        this.fieldGroup = false;
        this.form = fb.group({
            type: this.type = fb.control('', Validators.compose([Validators.required, Validators.pattern(/^\s*\S.*$/)]))
        });
    }
    get typeName() {
        return this.formlyDesignerService.getTypeName(this.type.value);
    }
    get $modal() {
        return $(this.modalRef?.nativeElement);
    }
    add() {
        const type = this.type.value;
        const field = {};
        if (type !== 'formly-group') {
            field.type = type;
        }
        const designerType = this.formlyDesignerConfig.types[type] || {};
        if (designerType.fieldArray) {
            field.fieldArray = { fieldGroup: [] };
        }
        if (this.fieldGroup = (type === 'formly-group' || designerType.fieldGroup != null)) {
            field.fieldGroup = [];
        }
        this.fieldEdit.setValue(field);
        this.$modal.modal('show');
    }
    onApply() {
        this.selected.emit(this.fieldEdit.value);
        this.$modal.modal('hide');
    }
}
FieldPickerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.6", ngImport: i0, type: FieldPickerComponent, deps: [{ token: i1.FormBuilder }, { token: i2.FormlyDesignerConfig }, { token: i3.FormlyDesignerService }], target: i0.ɵɵFactoryTarget.Component });
FieldPickerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.2.6", type: FieldPickerComponent, selector: "formly-designer-field-picker", outputs: { selected: "selected" }, viewQueries: [{ propertyName: "modalRef", first: true, predicate: ["modal"], descendants: true, static: true }], ngImport: i0, template: `
    <form novalidate [formGroup]="form">
      <div class="form-group">
        <div class="input-group">
          <formly-designer-type-select formControlName="type">
          </formly-designer-type-select>
          <button type="button" class="btn btn-secondary" [disabled]="form.invalid" (click)="add()">
            Add
          </button>
        </div>
      </div>
      <div #modal class="modal fade" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Add {{ typeName }}</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Cancel">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <formly-designer-field-editor #editor [fieldGroup]="fieldEdit.value.fieldGroup" [formControl]="fieldEdit">
              </formly-designer-field-editor>
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
  `, isInline: true, styles: [".btn:not(:disabled){cursor:pointer}.input-group>.btn{border-radius:0 .25rem .25rem 0}.input-group,.modal-header{display:flex}.modal-header{justify-content:space-between}formly-designer-type-select{flex-grow:2}\n"], components: [{ type: i4.TypeSelectComponent, selector: "formly-designer-type-select", inputs: ["type", "fieldGroup"] }, { type: i5.FieldEditorComponent, selector: "formly-designer-field-editor", inputs: ["fieldGroup", "showType", "showWrappers", "hasContent"] }], directives: [{ type: i1.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { type: i1.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i1.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i1.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { type: i1.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.6", ngImport: i0, type: FieldPickerComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'formly-designer-field-picker',
                    template: `
    <form novalidate [formGroup]="form">
      <div class="form-group">
        <div class="input-group">
          <formly-designer-type-select formControlName="type">
          </formly-designer-type-select>
          <button type="button" class="btn btn-secondary" [disabled]="form.invalid" (click)="add()">
            Add
          </button>
        </div>
      </div>
      <div #modal class="modal fade" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Add {{ typeName }}</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Cancel">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <formly-designer-field-editor #editor [fieldGroup]="fieldEdit.value.fieldGroup" [formControl]="fieldEdit">
              </formly-designer-field-editor>
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
    formly-designer-type-select {
      flex-grow: 2;
    }
  `]
                }]
        }], ctorParameters: function () { return [{ type: i1.FormBuilder }, { type: i2.FormlyDesignerConfig }, { type: i3.FormlyDesignerService }]; }, propDecorators: { modalRef: [{
                type: ViewChild,
                args: ['modal', { static: true }]
            }], selected: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmllbGQtcGlja2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbGliLWZvcm1seS1kZXNpZ25lci9zcmMvbGliL2NvbXBvbmVudHMvZmllbGQtcGlja2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQWMsWUFBWSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDdkYsT0FBTyxFQUFlLFdBQVcsRUFBYSxVQUFVLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7Ozs7OztBQTJEakYsTUFBTSxPQUFPLG9CQUFvQjtJQUkvQixZQUNFLEVBQWUsRUFDUCxvQkFBMEMsRUFDMUMscUJBQTRDO1FBRDVDLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBc0I7UUFDMUMsMEJBQXFCLEdBQXJCLHFCQUFxQixDQUF1QjtRQUw1QyxhQUFRLEdBQUcsSUFBSSxZQUFZLEVBQXFCLENBQUM7UUFhbEQsY0FBUyxHQUFHLElBQUksV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBRXpDLGVBQVUsR0FBRyxLQUFLLENBQUM7UUFSakIsSUFBSSxDQUFDLElBQUksR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDO1lBQ25CLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLFVBQVUsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQzdHLENBQUMsQ0FBQztJQUNMLENBQUM7SUFPRCxJQUFJLFFBQVE7UUFDVixPQUFPLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNqRSxDQUFDO0lBRUQsSUFBWSxNQUFNO1FBQ2hCLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsYUFBYSxDQUFRLENBQUM7SUFDaEQsQ0FBQztJQUVELEdBQUc7UUFDRCxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUM3QixNQUFNLEtBQUssR0FBRyxFQUF1QixDQUFDO1FBQ3RDLElBQUksSUFBSSxLQUFLLGNBQWMsRUFBRTtZQUMzQixLQUFLLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztTQUNuQjtRQUNELE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksRUFBd0IsQ0FBQztRQUN2RixJQUFJLFlBQVksQ0FBQyxVQUFVLEVBQUU7WUFDM0IsS0FBSyxDQUFDLFVBQVUsR0FBRyxFQUFFLFVBQVUsRUFBRSxFQUFFLEVBQUUsQ0FBQztTQUN2QztRQUNELElBQUksSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLElBQUksS0FBSyxjQUFjLElBQUksWUFBWSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsRUFBRTtZQUNsRixLQUFLLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQztTQUN2QjtRQUNELElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQy9CLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFFRCxPQUFPO1FBQ0wsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN6QyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUM1QixDQUFDOztpSEEvQ1Usb0JBQW9CO3FHQUFwQixvQkFBb0Isd05BcERyQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBaUNUOzJGQW1CVSxvQkFBb0I7a0JBdERoQyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSw4QkFBOEI7b0JBQ3hDLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBaUNUO29CQUNELE1BQU0sRUFBRSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7O0dBZ0JSLENBQUM7aUJBQ0g7eUtBRXVDLFFBQVE7c0JBQTdDLFNBQVM7dUJBQUMsT0FBTyxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtnQkFDMUIsUUFBUTtzQkFBakIsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBPdXRwdXQsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUJ1aWxkZXIsIEZvcm1Db250cm9sLCBGb3JtR3JvdXAsIFZhbGlkYXRvcnMgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBGb3JtbHlGaWVsZENvbmZpZyB9IGZyb20gJ0BuZ3gtZm9ybWx5L2NvcmUnO1xuaW1wb3J0IHsgRGVzaWduZXJUeXBlT3B0aW9uLCBGb3JtbHlEZXNpZ25lckNvbmZpZyB9IGZyb20gJy4uL2Zvcm1seS1kZXNpZ25lci1jb25maWcnO1xuaW1wb3J0IHsgRm9ybWx5RGVzaWduZXJTZXJ2aWNlIH0gZnJvbSAnLi4vZm9ybWx5LWRlc2lnbmVyLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdmb3JtbHktZGVzaWduZXItZmllbGQtcGlja2VyJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8Zm9ybSBub3ZhbGlkYXRlIFtmb3JtR3JvdXBdPVwiZm9ybVwiPlxuICAgICAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0LWdyb3VwXCI+XG4gICAgICAgICAgPGZvcm1seS1kZXNpZ25lci10eXBlLXNlbGVjdCBmb3JtQ29udHJvbE5hbWU9XCJ0eXBlXCI+XG4gICAgICAgICAgPC9mb3JtbHktZGVzaWduZXItdHlwZS1zZWxlY3Q+XG4gICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLXNlY29uZGFyeVwiIFtkaXNhYmxlZF09XCJmb3JtLmludmFsaWRcIiAoY2xpY2spPVwiYWRkKClcIj5cbiAgICAgICAgICAgIEFkZFxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiAjbW9kYWwgY2xhc3M9XCJtb2RhbCBmYWRlXCIgdGFiaW5kZXg9XCItMVwiIHJvbGU9XCJkaWFsb2dcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGFsLWRpYWxvZyBtb2RhbC1sZ1wiIHJvbGU9XCJkb2N1bWVudFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJtb2RhbC1jb250ZW50XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwibW9kYWwtaGVhZGVyXCI+XG4gICAgICAgICAgICAgIDxoNSBjbGFzcz1cIm1vZGFsLXRpdGxlXCI+QWRkIHt7IHR5cGVOYW1lIH19PC9oNT5cbiAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJjbG9zZVwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCIgYXJpYS1sYWJlbD1cIkNhbmNlbFwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPiZ0aW1lczs8L3NwYW4+XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwibW9kYWwtYm9keVwiPlxuICAgICAgICAgICAgICA8Zm9ybWx5LWRlc2lnbmVyLWZpZWxkLWVkaXRvciAjZWRpdG9yIFtmaWVsZEdyb3VwXT1cImZpZWxkRWRpdC52YWx1ZS5maWVsZEdyb3VwXCIgW2Zvcm1Db250cm9sXT1cImZpZWxkRWRpdFwiPlxuICAgICAgICAgICAgICA8L2Zvcm1seS1kZXNpZ25lci1maWVsZC1lZGl0b3I+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtb2RhbC1mb290ZXJcIj5cbiAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLXNlY29uZGFyeVwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCI+Q2FuY2VsPC9idXR0b24+XG4gICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1wcmltYXJ5XCIgKGNsaWNrKT1cIm9uQXBwbHkoKVwiXG4gICAgICAgICAgICAgICAgW2Rpc2FibGVkXT1cImVkaXRvci5pbnZhbGlkXCI+QXBwbHk8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZm9ybT5cbiAgYCxcbiAgc3R5bGVzOiBbYFxuICAgIC5idG46bm90KDpkaXNhYmxlZCkge1xuICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgIH1cbiAgICAuaW5wdXQtZ3JvdXAgPiAuYnRuIHtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDAgLjI1cmVtIC4yNXJlbSAwO1xuICAgIH1cbiAgICAuaW5wdXQtZ3JvdXAsIC5tb2RhbC1oZWFkZXIge1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICB9XG4gICAgLm1vZGFsLWhlYWRlciB7XG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gICAgfVxuICAgIGZvcm1seS1kZXNpZ25lci10eXBlLXNlbGVjdCB7XG4gICAgICBmbGV4LWdyb3c6IDI7XG4gICAgfVxuICBgXVxufSlcbmV4cG9ydCBjbGFzcyBGaWVsZFBpY2tlckNvbXBvbmVudCB7XG4gIEBWaWV3Q2hpbGQoJ21vZGFsJywgeyBzdGF0aWM6IHRydWUgfSkgbW9kYWxSZWY/OiBFbGVtZW50UmVmO1xuICBAT3V0cHV0KCkgc2VsZWN0ZWQgPSBuZXcgRXZlbnRFbWl0dGVyPEZvcm1seUZpZWxkQ29uZmlnPigpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIGZiOiBGb3JtQnVpbGRlcixcbiAgICBwcml2YXRlIGZvcm1seURlc2lnbmVyQ29uZmlnOiBGb3JtbHlEZXNpZ25lckNvbmZpZyxcbiAgICBwcml2YXRlIGZvcm1seURlc2lnbmVyU2VydmljZTogRm9ybWx5RGVzaWduZXJTZXJ2aWNlLFxuICApIHtcbiAgICB0aGlzLmZvcm0gPSBmYi5ncm91cCh7XG4gICAgICB0eXBlOiB0aGlzLnR5cGUgPSBmYi5jb250cm9sKCcnLCBWYWxpZGF0b3JzLmNvbXBvc2UoW1ZhbGlkYXRvcnMucmVxdWlyZWQsIFZhbGlkYXRvcnMucGF0dGVybigvXlxccypcXFMuKiQvKV0pKVxuICAgIH0pO1xuICB9XG5cbiAgZm9ybTogRm9ybUdyb3VwO1xuICByZWFkb25seSBmaWVsZEVkaXQgPSBuZXcgRm9ybUNvbnRyb2woe30pO1xuICByZWFkb25seSB0eXBlOiBGb3JtQ29udHJvbDtcbiAgZmllbGRHcm91cCA9IGZhbHNlO1xuXG4gIGdldCB0eXBlTmFtZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmZvcm1seURlc2lnbmVyU2VydmljZS5nZXRUeXBlTmFtZSh0aGlzLnR5cGUudmFsdWUpO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXQgJG1vZGFsKCk6IEpRdWVyeSAmIHsgbW9kYWw6IChjb21tYW5kOiBzdHJpbmcpID0+IHZvaWQgfSB7XG4gICAgcmV0dXJuICQodGhpcy5tb2RhbFJlZj8ubmF0aXZlRWxlbWVudCkgYXMgYW55O1xuICB9XG5cbiAgYWRkKCk6IHZvaWQge1xuICAgIGNvbnN0IHR5cGUgPSB0aGlzLnR5cGUudmFsdWU7XG4gICAgY29uc3QgZmllbGQgPSB7fSBhcyBGb3JtbHlGaWVsZENvbmZpZztcbiAgICBpZiAodHlwZSAhPT0gJ2Zvcm1seS1ncm91cCcpIHtcbiAgICAgIGZpZWxkLnR5cGUgPSB0eXBlO1xuICAgIH1cbiAgICBjb25zdCBkZXNpZ25lclR5cGUgPSB0aGlzLmZvcm1seURlc2lnbmVyQ29uZmlnLnR5cGVzW3R5cGVdIHx8IHt9IGFzIERlc2lnbmVyVHlwZU9wdGlvbjtcbiAgICBpZiAoZGVzaWduZXJUeXBlLmZpZWxkQXJyYXkpIHtcbiAgICAgIGZpZWxkLmZpZWxkQXJyYXkgPSB7IGZpZWxkR3JvdXA6IFtdIH07XG4gICAgfVxuICAgIGlmICh0aGlzLmZpZWxkR3JvdXAgPSAodHlwZSA9PT0gJ2Zvcm1seS1ncm91cCcgfHwgZGVzaWduZXJUeXBlLmZpZWxkR3JvdXAgIT0gbnVsbCkpIHtcbiAgICAgIGZpZWxkLmZpZWxkR3JvdXAgPSBbXTtcbiAgICB9XG4gICAgdGhpcy5maWVsZEVkaXQuc2V0VmFsdWUoZmllbGQpO1xuICAgIHRoaXMuJG1vZGFsLm1vZGFsKCdzaG93Jyk7XG4gIH1cblxuICBvbkFwcGx5KCk6IHZvaWQge1xuICAgIHRoaXMuc2VsZWN0ZWQuZW1pdCh0aGlzLmZpZWxkRWRpdC52YWx1ZSk7XG4gICAgdGhpcy4kbW9kYWwubW9kYWwoJ2hpZGUnKTtcbiAgfVxufVxuIl19