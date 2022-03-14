import { Component, forwardRef, Input, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { merge } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { cloneDeep, isObject, isString } from '../util';
import * as i0 from "@angular/core";
import * as i1 from "..";
import * as i2 from "@angular/forms";
import * as i3 from "@ngx-formly/core";
import * as i4 from "@angular/common";
const FIELD_EDITOR_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => FieldEditorComponent),
    multi: true
};
export class FieldEditorComponent {
    constructor(fieldsService, fb, formlyDesignerConfig) {
        this.fieldsService = fieldsService;
        this.fb = fb;
        this.formlyDesignerConfig = formlyDesignerConfig;
        this.fieldGroup = false;
        this.showType = false;
        this.showWrappers = false;
        this.hasContent = false;
        this.subscriptions = [];
        this.field = {};
        this.fields = [];
        this.fieldArray = false;
        this.invalid = false;
        this.onChange = (_) => { };
        this.onTouched = () => { };
        this.form = fb.group({
            key: this.key = fb.control(''),
            className: this.className = fb.control(''),
            fieldGroupClassName: this.fieldGroupClassName = fb.control(''),
            type: this.type = fb.control('')
        }, { validator: (control) => this.validator(control) });
        this.fieldForm = fb.group({});
    }
    ngOnInit() {
        this.subscriptions.push(this.type.valueChanges
            .subscribe(() => this.onTypeChange()));
        this.subscriptions.push(this.form.statusChanges
            .pipe(debounceTime(0))
            .subscribe(() => this.invalid = this.form.invalid));
        this.subscribeValueChanges();
    }
    ngOnDestroy() {
        this.valueChangesSubscription?.unsubscribe();
        this.subscriptions.splice(0).forEach(subscription => subscription.unsubscribe());
    }
    writeValue(obj) {
        this.valueChangesSubscription?.unsubscribe();
        this.updateField(obj);
        this.form.markAsPristine();
        this.form.markAsUntouched();
        this.subscribeValueChanges();
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    setDisabledState(isDisabled) {
        if (isDisabled) {
            this.form.disable();
        }
        else {
            this.form.enable();
        }
    }
    subscribeValueChanges() {
        this.valueChangesSubscription = merge(this.fieldForm.valueChanges, this.form.valueChanges)
            .pipe(debounceTime(0))
            .subscribe(() => this.updateValue());
    }
    updateField(field) {
        if (!isObject(field)) {
            field = {};
        }
        this.key.setValue(isString(field.key) ? field.key : '');
        this.className.setValue(isString(field.className) ? field.className : '');
        this.fieldGroupClassName.setValue(isString(field.fieldGroupClassName) ? field.fieldGroupClassName : '');
        this.type.setValue(isString(field.type) ? field.type : '');
        this.fields = this.fieldsService.getTypeFields(this.type.value);
        this.fieldForm = this.fb.group({});
        this.field = cloneDeep(field);
    }
    updateValue() {
        if (!this.onChange) {
            return;
        }
        const field = this.field;
        field.key = this.key.value;
        field.className = this.className.value;
        field.fieldGroupClassName = this.fieldGroupClassName.value;
        field.type = this.type.value;
        this.onChange(field);
    }
    onTypeChange() {
        this.valueChangesSubscription?.unsubscribe();
        const type = this.type.value;
        this.fields = this.fieldsService.getTypeFields(type);
        const designerType = this.formlyDesignerConfig.types[type];
        this.fieldArray = designerType?.fieldArray != null;
        this.fieldForm = this.fb.group({});
        this.field = Object.assign({}, this.field);
        this.subscribeValueChanges();
    }
    onWrappersSelected(field) {
        this.updateField(field);
    }
    validator(control) {
        if (this.fieldGroup) {
            return null;
        }
        const type = control.get('type');
        const hasType = isString(type.value) && type.value.trim().length > 0;
        const result = { type: false };
        if (this.showType && !hasType) {
            result.type = true;
        }
        return result.type ? result : null;
    }
}
FieldEditorComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.6", ngImport: i0, type: FieldEditorComponent, deps: [{ token: i1.FieldsService }, { token: i2.FormBuilder }, { token: i1.FormlyDesignerConfig }], target: i0.ɵɵFactoryTarget.Component });
FieldEditorComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.2.6", type: FieldEditorComponent, selector: "formly-designer-field-editor", inputs: { fieldGroup: "fieldGroup", showType: "showType", showWrappers: "showWrappers", hasContent: "hasContent" }, providers: [
        FIELD_EDITOR_CONTROL_VALUE_ACCESSOR
    ], viewQueries: [{ propertyName: "blockElRef", first: true, predicate: ["block"], descendants: true, static: true }], ngImport: i0, template: `
    <form [formGroup]="form" novalidate>
      <div class="card card-d-editor">
        <div class="card-header" [ngClass]="{solo: !hasContent && fields.length === 0}">
          <div class="form-group">
            <label class="form-control-label">name</label>
            <input formControlName="key" class="form-control">
          </div>
          <div *ngIf="formlyDesignerConfig.settings.showClassName" class="form-group">
            <label class="form-control-label">className</label>
            <input formControlName="className" class="form-control">
          </div>
          <div *ngIf="fieldGroup && formlyDesignerConfig.settings.showClassName" class="form-group">
            <label class="form-control-label">fieldGroupClassName</label>
            <input formControlName="fieldGroupClassName" class="form-control">
          </div>
          <!--
          <div *ngIf="false" class="form-group"
            [ngClass]="{'has-danger': form.hasError('type') && (type.dirty || type.touched)}">
            <label class="form-control-label">type</label>
            <formly-designer-type-select formControlName="type" [fieldGroup]="fieldGroup" [type]="type.value"></formly-designer-type-select>
            <div *ngIf="form.hasError('type') && (type.dirty || type.touched)" class="form-control-feedback">
              type required.
            </div>
          </div>
          <div *ngIf="false" class="form-group">
            <label class="form-control-label">wrappers</label>
            <formly-designer-wrappers-picker [field]="field"
              (selected)="onWrappersSelected($event)">
            </formly-designer-wrappers-picker>
          </div>
          -->
        </div>
        <div #block class="card-body">
          <formly-form *ngIf="fields.length > 0" [form]="fieldForm" [fields]="fields" [model]="field">
          </formly-form>
          <ng-content></ng-content>
        </div>
      </div>
    </form>
  `, isInline: true, styles: [".card-header.solo{border-bottom:0}.card-header.solo+.card-body{display:none}\n"], components: [{ type: i3.FormlyForm, selector: "formly-form", inputs: ["model", "fields", "options", "form"], outputs: ["modelChange"] }], directives: [{ type: i2.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { type: i2.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i2.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i4.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i2.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i2.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.6", ngImport: i0, type: FieldEditorComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'formly-designer-field-editor',
                    template: `
    <form [formGroup]="form" novalidate>
      <div class="card card-d-editor">
        <div class="card-header" [ngClass]="{solo: !hasContent && fields.length === 0}">
          <div class="form-group">
            <label class="form-control-label">name</label>
            <input formControlName="key" class="form-control">
          </div>
          <div *ngIf="formlyDesignerConfig.settings.showClassName" class="form-group">
            <label class="form-control-label">className</label>
            <input formControlName="className" class="form-control">
          </div>
          <div *ngIf="fieldGroup && formlyDesignerConfig.settings.showClassName" class="form-group">
            <label class="form-control-label">fieldGroupClassName</label>
            <input formControlName="fieldGroupClassName" class="form-control">
          </div>
          <!--
          <div *ngIf="false" class="form-group"
            [ngClass]="{'has-danger': form.hasError('type') && (type.dirty || type.touched)}">
            <label class="form-control-label">type</label>
            <formly-designer-type-select formControlName="type" [fieldGroup]="fieldGroup" [type]="type.value"></formly-designer-type-select>
            <div *ngIf="form.hasError('type') && (type.dirty || type.touched)" class="form-control-feedback">
              type required.
            </div>
          </div>
          <div *ngIf="false" class="form-group">
            <label class="form-control-label">wrappers</label>
            <formly-designer-wrappers-picker [field]="field"
              (selected)="onWrappersSelected($event)">
            </formly-designer-wrappers-picker>
          </div>
          -->
        </div>
        <div #block class="card-body">
          <formly-form *ngIf="fields.length > 0" [form]="fieldForm" [fields]="fields" [model]="field">
          </formly-form>
          <ng-content></ng-content>
        </div>
      </div>
    </form>
  `,
                    styles: [`
    .card-header.solo {
      border-bottom: 0;
    }
    .card-header.solo + .card-body {
      display: none;
    }
  `],
                    providers: [
                        FIELD_EDITOR_CONTROL_VALUE_ACCESSOR
                    ]
                }]
        }], ctorParameters: function () { return [{ type: i1.FieldsService }, { type: i2.FormBuilder }, { type: i1.FormlyDesignerConfig }]; }, propDecorators: { fieldGroup: [{
                type: Input
            }], showType: [{
                type: Input
            }], showWrappers: [{
                type: Input
            }], hasContent: [{
                type: Input
            }], blockElRef: [{
                type: ViewChild,
                args: ['block', { static: true }]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmllbGQtZWRpdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbGliLWZvcm1seS1kZXNpZ25lci9zcmMvbGliL2NvbXBvbmVudHMvZmllbGQtZWRpdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQWMsVUFBVSxFQUFFLEtBQUssRUFBcUIsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3ZHLE9BQU8sRUFBNkQsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUU5RyxPQUFPLEVBQUUsS0FBSyxFQUFnQixNQUFNLE1BQU0sQ0FBQztBQUMzQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFOUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLE1BQU0sU0FBUyxDQUFDOzs7Ozs7QUFFeEQsTUFBTSxtQ0FBbUMsR0FBUTtJQUMvQyxPQUFPLEVBQUUsaUJBQWlCO0lBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsb0JBQW9CLENBQUM7SUFDbkQsS0FBSyxFQUFFLElBQUk7Q0FDWixDQUFDO0FBeURGLE1BQU0sT0FBTyxvQkFBb0I7SUFVL0IsWUFDVSxhQUE0QixFQUM1QixFQUFlLEVBQ2hCLG9CQUEwQztRQUZ6QyxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUM1QixPQUFFLEdBQUYsRUFBRSxDQUFhO1FBQ2hCLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBc0I7UUFaMUMsZUFBVSxHQUFHLEtBQUssQ0FBQztRQUNuQixhQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ2pCLGlCQUFZLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLGVBQVUsR0FBRyxLQUFLLENBQUM7UUFHWCxrQkFBYSxHQUFtQixFQUFFLENBQUM7UUF3QnBELFVBQUssR0FBc0IsRUFBRSxDQUFDO1FBQzlCLFdBQU0sR0FBd0IsRUFBRSxD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c0JBQWhCLEtBQUs7Z0JBQ0csWUFBWTtzQkFBcEIsS0FBSztnQkFDRyxVQUFVO3NCQUFsQixLQUFLO2dCQUNnQyxVQUFVO3NCQUEvQyxTQUFTO3VCQUFDLE9BQU8sRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEVsZW1lbnRSZWYsIGZvcndhcmRSZWYsIElucHV0LCBPbkRlc3Ryb3ksIE9uSW5pdCwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgRm9ybUJ1aWxkZXIsIEZvcm1Db250cm9sLCBGb3JtR3JvdXAsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgRm9ybWx5RmllbGRDb25maWcgfSBmcm9tICdAbmd4LWZvcm1seS9jb3JlJztcbmltcG9ydCB7IG1lcmdlLCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRlYm91bmNlVGltZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IEZpZWxkc1NlcnZpY2UsIEZvcm1seURlc2lnbmVyQ29uZmlnIH0gZnJvbSAnLi4nO1xuaW1wb3J0IHsgY2xvbmVEZWVwLCBpc09iamVjdCwgaXNTdHJpbmcgfSBmcm9tICcuLi91dGlsJztcblxuY29uc3QgRklFTERfRURJVE9SX0NPTlRST0xfVkFMVUVfQUNDRVNTT1I6IGFueSA9IHtcbiAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IEZpZWxkRWRpdG9yQ29tcG9uZW50KSxcbiAgbXVsdGk6IHRydWVcbn07XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Zvcm1seS1kZXNpZ25lci1maWVsZC1lZGl0b3InLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxmb3JtIFtmb3JtR3JvdXBdPVwiZm9ybVwiIG5vdmFsaWRhdGU+XG4gICAgICA8ZGl2IGNsYXNzPVwiY2FyZCBjYXJkLWQtZWRpdG9yXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkLWhlYWRlclwiIFtuZ0NsYXNzXT1cIntzb2xvOiAhaGFzQ29udGVudCAmJiBmaWVsZHMubGVuZ3RoID09PSAwfVwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCI+XG4gICAgICAgICAgICA8bGFiZWwgY2xhc3M9XCJmb3JtLWNvbnRyb2wtbGFiZWxcIj5uYW1lPC9sYWJlbD5cbiAgICAgICAgICAgIDxpbnB1dCBmb3JtQ29udHJvbE5hbWU9XCJrZXlcIiBjbGFzcz1cImZvcm0tY29udHJvbFwiPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgKm5nSWY9XCJmb3JtbHlEZXNpZ25lckNvbmZpZy5zZXR0aW5ncy5zaG93Q2xhc3NOYW1lXCIgY2xhc3M9XCJmb3JtLWdyb3VwXCI+XG4gICAgICAgICAgICA8bGFiZWwgY2xhc3M9XCJmb3JtLWNvbnRyb2wtbGFiZWxcIj5jbGFzc05hbWU8L2xhYmVsPlxuICAgICAgICAgICAgPGlucHV0IGZvcm1Db250cm9sTmFtZT1cImNsYXNzTmFtZVwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCI+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiAqbmdJZj1cImZpZWxkR3JvdXAgJiYgZm9ybWx5RGVzaWduZXJDb25maWcuc2V0dGluZ3Muc2hvd0NsYXNzTmFtZVwiIGNsYXNzPVwiZm9ybS1ncm91cFwiPlxuICAgICAgICAgICAgPGxhYmVsIGNsYXNzPVwiZm9ybS1jb250cm9sLWxhYmVsXCI+ZmllbGRHcm91cENsYXNzTmFtZTwvbGFiZWw+XG4gICAgICAgICAgICA8aW5wdXQgZm9ybUNvbnRyb2xOYW1lPVwiZmllbGRHcm91cENsYXNzTmFtZVwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCI+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPCEtLVxuICAgICAgICAgIDxkaXYgKm5nSWY9XCJmYWxzZVwiIGNsYXNzPVwiZm9ybS1ncm91cFwiXG4gICAgICAgICAgICBbbmdDbGFzc109XCJ7J2hhcy1kYW5nZXInOiBmb3JtLmhhc0Vycm9yKCd0eXBlJykgJiYgKHR5cGUuZGlydHkgfHwgdHlwZS50b3VjaGVkKX1cIj5cbiAgICAgICAgICAgIDxsYWJlbCBjbGFzcz1cImZvcm0tY29udHJvbC1sYWJlbFwiPnR5cGU8L2xhYmVsPlxuICAgICAgICAgICAgPGZvcm1seS1kZXNpZ25lci10eXBlLXNlbGVjdCBmb3JtQ29udHJvbE5hbWU9XCJ0eXBlXCIgW2ZpZWxkR3JvdXBdPVwiZmllbGRHcm91cFwiIFt0eXBlXT1cInR5cGUudmFsdWVcIj48L2Zvcm1seS1kZXNpZ25lci10eXBlLXNlbGVjdD5cbiAgICAgICAgICAgIDxkaXYgKm5nSWY9XCJmb3JtLmhhc0Vycm9yKCd0eXBlJykgJiYgKHR5cGUuZGlydHkgfHwgdHlwZS50b3VjaGVkKVwiIGNsYXNzPVwiZm9ybS1jb250cm9sLWZlZWRiYWNrXCI+XG4gICAgICAgICAgICAgIHR5cGUgcmVxdWlyZWQuXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2ICpuZ0lmPVwiZmFsc2VcIiBjbGFzcz1cImZvcm0tZ3JvdXBcIj5cbiAgICAgICAgICAgIDxsYWJlbCBjbGFzcz1cImZvcm0tY29udHJvbC1sYWJlbFwiPndyYXBwZXJzPC9sYWJlbD5cbiAgICAgICAgICAgIDxmb3JtbHktZGVzaWduZXItd3JhcHBlcnMtcGlja2VyIFtmaWVsZF09XCJmaWVsZFwiXG4gICAgICAgICAgICAgIChzZWxlY3RlZCk9XCJvbldyYXBwZXJzU2VsZWN0ZWQoJGV2ZW50KVwiPlxuICAgICAgICAgICAgPC9mb3JtbHktZGVzaWduZXItd3JhcHBlcnMtcGlja2VyPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIC0tPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiAjYmxvY2sgY2xhc3M9XCJjYXJkLWJvZHlcIj5cbiAgICAgICAgICA8Zm9ybWx5LWZvcm0gKm5nSWY9XCJmaWVsZHMubGVuZ3RoID4gMFwiIFtmb3JtXT1cImZpZWxkRm9ybVwiIFtmaWVsZHNdPVwiZmllbGRzXCIgW21vZGVsXT1cImZpZWxkXCI+XG4gICAgICAgICAgPC9mb3JtbHktZm9ybT5cbiAgICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9mb3JtPlxuICBgLFxuICBzdHlsZXM6IFtgXG4gICAgLmNhcmQtaGVhZGVyLnNvbG8ge1xuICAgICAgYm9yZGVyLWJvdHRvbTogMDtcbiAgICB9XG4gICAgLmNhcmQtaGVhZGVyLnNvbG8gKyAuY2FyZC1ib2R5IHtcbiAgICAgIGRpc3BsYXk6IG5vbmU7XG4gICAgfVxuICBgXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgRklFTERfRURJVE9SX0NPTlRST0xfVkFMVUVfQUNDRVNTT1JcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBGaWVsZEVkaXRvckNvbXBvbmVudCBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBPbkRlc3Ryb3ksIE9uSW5pdCB7XG4gIEBJbnB1dCgpIGZpZWxkR3JvdXAgPSBmYWxzZTtcbiAgQElucHV0KCkgc2hvd1R5cGUgPSBmYWxzZTtcbiAgQElucHV0KCkgc2hvd1dyYXBwZXJzID0gZmFsc2U7XG4gIEBJbnB1dCgpIGhhc0NvbnRlbnQgPSBmYWxzZTtcbiAgQFZpZXdDaGlsZCgnYmxvY2snLCB7IHN0YXRpYzogdHJ1ZSB9KSBibG9ja0VsUmVmPzogRWxlbWVudFJlZjtcblxuICBwcml2YXRlIHJlYWRvbmx5IHN1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbltdID0gW107XG4gIHByaXZhdGUgdmFsdWVDaGFuZ2VzU3Vic2NyaXB0aW9uPzogU3Vic2NyaXB0aW9uO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgZmllbGRzU2VydmljZTogRmllbGRzU2VydmljZSxcbiAgICBwcml2YXRlIGZiOiBGb3JtQnVpbGRlcixcbiAgICBwdWJsaWMgZm9ybWx5RGVzaWduZXJDb25maWc6IEZvcm1seURlc2lnbmVyQ29uZmlnXG4gICkge1xuICAgIHRoaXMuZm9ybSA9IGZiLmdyb3VwKHtcbiAgICAgIGtleTogdGhpcy5rZXkgPSBmYi5jb250cm9sKCcnKSxcbiAgICAgIGNsYXNzTmFtZTogdGhpcy5jbGFzc05hbWUgPSBmYi5jb250cm9sKCcnKSxcbiAgICAgIGZpZWxkR3JvdXBDbGFzc05hbWU6IHRoaXMuZmllbGRHcm91cENsYXNzTmFtZSA9IGZiLmNvbnRyb2woJycpLFxuICAgICAgdHlwZTogdGhpcy50eXBlID0gZmIuY29udHJvbCgnJylcbiAgICB9LCB7IHZhbGlkYXRvcjogKGNvbnRyb2w6IEZvcm1Hcm91cCkgPT4gdGhpcy52YWxpZGF0b3IoY29udHJvbCkgfSk7XG4gICAgdGhpcy5maWVsZEZvcm0gPSBmYi5ncm91cCh7fSk7XG4gIH1cblxuICByZWFkb25seSBmb3JtOiBGb3JtR3JvdXA7XG4gIHJlYWRvbmx5IGtleTogRm9ybUNvbnRyb2w7XG4gIHJlYWRvbmx5IGNsYXNzTmFtZTogRm9ybUNvbnRyb2w7XG4gIHJlYWRvbmx5IGZpZWxkR3JvdXBDbGFzc05hbWU6IEZvcm1Db250cm9sO1xuICByZWFkb25seSB0eXBlOiBGb3JtQ29udHJvbDtcblxuICBmaWVsZEZvcm06IEZvcm1Hcm91cDtcbiAgZmllbGQ6IEZvcm1seUZpZWxkQ29uZmlnID0ge307XG4gIGZpZWxkczogRm9ybWx5RmllbGRDb25maWdbXSA9IFtdO1xuICBmaWVsZEFycmF5ID0gZmFsc2U7XG4gIGludmFsaWQgPSBmYWxzZTtcblxuICBwcm90ZWN0ZWQgb25DaGFuZ2UgPSAoXzogYW55KSA9PiB7IH07XG4gIHByb3RlY3RlZCBvblRvdWNoZWQgPSAoKSA9PiB7IH07XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2godGhpcy50eXBlLnZhbHVlQ2hhbmdlc1xuICAgICAgLnN1YnNjcmliZSgoKSA9PiB0aGlzLm9uVHlwZUNoYW5nZSgpKSk7XG5cbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaCh0aGlzLmZvcm0uc3RhdHVzQ2hhbmdlc1xuICAgICAgLnBpcGUoZGVib3VuY2VUaW1lKDApKVxuICAgICAgLnN1YnNjcmliZSgoKSA9PiB0aGlzLmludmFsaWQgPSB0aGlzLmZvcm0uaW52YWxpZCkpO1xuXG4gICAgdGhpcy5zdWJzY3JpYmVWYWx1ZUNoYW5nZXMoKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMudmFsdWVDaGFuZ2VzU3Vic2NyaXB0aW9uPy51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5zcGxpY2UoMCkuZm9yRWFjaChzdWJzY3JpcHRpb24gPT4gc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCkpO1xuICB9XG5cbiAgd3JpdGVWYWx1ZShvYmo6IGFueSkge1xuICAgIHRoaXMudmFsdWVDaGFuZ2VzU3Vic2NyaXB0aW9uPy51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMudXBkYXRlRmllbGQob2JqKTtcbiAgICB0aGlzLmZvcm0ubWFya0FzUHJpc3RpbmUoKTtcbiAgICB0aGlzLmZvcm0ubWFya0FzVW50b3VjaGVkKCk7XG4gICAgdGhpcy5zdWJzY3JpYmVWYWx1ZUNoYW5nZXMoKTtcbiAgfVxuXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSk6IHZvaWQge1xuICAgIHRoaXMub25DaGFuZ2UgPSBmbjtcbiAgfVxuXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLm9uVG91Y2hlZCA9IGZuO1xuICB9XG5cbiAgc2V0RGlzYWJsZWRTdGF0ZShpc0Rpc2FibGVkOiBib29sZWFuKTogdm9pZCB7XG4gICAgaWYgKGlzRGlzYWJsZWQpIHtcbiAgICAgIHRoaXMuZm9ybS5kaXNhYmxlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZm9ybS5lbmFibGUoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHN1YnNjcmliZVZhbHVlQ2hhbmdlcygpOiB2b2lkIHtcbiAgICB0aGlzLnZhbHVlQ2hhbmdlc1N1YnNjcmlwdGlvbiA9IG1lcmdlKHRoaXMuZmllbGRGb3JtLnZhbHVlQ2hhbmdlcywgdGhpcy5mb3JtLnZhbHVlQ2hhbmdlcylcbiAgICAgIC5waXBlKGRlYm91bmNlVGltZSgwKSlcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy51cGRhdGVWYWx1ZSgpKTtcbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlRmllbGQoZmllbGQ6IEZvcm1seUZpZWxkQ29uZmlnKTogdm9pZCB7XG4gICAgaWYgKCFpc09iamVjdChmaWVsZCkpIHtcbiAgICAgIGZpZWxkID0ge307XG4gICAgfVxuICAgIHRoaXMua2V5LnNldFZhbHVlKGlzU3RyaW5nKGZpZWxkLmtleSkgPyBmaWVsZC5rZXkgOiAnJyk7XG4gICAgdGhpcy5jbGFzc05hbWUuc2V0VmFsdWUoaXNTdHJpbmcoZmllbGQuY2xhc3NOYW1lKSA/IGZpZWxkLmNsYXNzTmFtZSA6ICcnKTtcbiAgICB0aGlzLmZpZWxkR3JvdXBDbGFzc05hbWUuc2V0VmFsdWUoaXNTdHJpbmcoZmllbGQuZmllbGRHcm91cENsYXNzTmFtZSkgPyBmaWVsZC5maWVsZEdyb3VwQ2xhc3NOYW1lIDogJycpO1xuICAgIHRoaXMudHlwZS5zZXRWYWx1ZShpc1N0cmluZyhmaWVsZC50eXBlKSA/IGZpZWxkLnR5cGUgOiAnJyk7XG4gICAgdGhpcy5maWVsZHMgPSB0aGlzLmZpZWxkc1NlcnZpY2UuZ2V0VHlwZUZpZWxkcyh0aGlzLnR5cGUudmFsdWUpO1xuICAgIHRoaXMuZmllbGRGb3JtID0gdGhpcy5mYi5ncm91cCh7fSk7XG4gICAgdGhpcy5maWVsZCA9IGNsb25lRGVlcChmaWVsZCk7XG4gIH1cblxuICBwcml2YXRlIHVwZGF0ZVZhbHVlKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5vbkNoYW5nZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGZpZWxkID0gdGhpcy5maWVsZDtcbiAgICBmaWVsZC5rZXkgPSB0aGlzLmtleS52YWx1ZTtcbiAgICBmaWVsZC5jbGFzc05hbWUgPSB0aGlzLmNsYXNzTmFtZS52YWx1ZTtcbiAgICBmaWVsZC5maWVsZEdyb3VwQ2xhc3NOYW1lID0gdGhpcy5maWVsZEdyb3VwQ2xhc3NOYW1lLnZhbHVlO1xuICAgIGZpZWxkLnR5cGUgPSB0aGlzLnR5cGUudmFsdWU7XG4gICAgdGhpcy5vbkNoYW5nZShmaWVsZCk7XG4gIH1cblxuICBwcml2YXRlIG9uVHlwZUNoYW5nZSgpOiB2b2lkIHtcbiAgICB0aGlzLnZhbHVlQ2hhbmdlc1N1YnNjcmlwdGlvbj8udW5zdWJzY3JpYmUoKTtcbiAgICBjb25zdCB0eXBlID0gdGhpcy50eXBlLnZhbHVlO1xuICAgIHRoaXMuZmllbGRzID0gdGhpcy5maWVsZHNTZXJ2aWNlLmdldFR5cGVGaWVsZHModHlwZSk7XG4gICAgY29uc3QgZGVzaWduZXJUeXBlID0gdGhpcy5mb3JtbHlEZXNpZ25lckNvbmZpZy50eXBlc1t0eXBlXTtcbiAgICB0aGlzLmZpZWxkQXJyYXkgPSBkZXNpZ25lclR5cGU/LmZpZWxkQXJyYXkgIT0gbnVsbDtcbiAgICB0aGlzLmZpZWxkRm9ybSA9IHRoaXMuZmIuZ3JvdXAoe30pO1xuICAgIHRoaXMuZmllbGQgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLmZpZWxkKTtcbiAgICB0aGlzLnN1YnNjcmliZVZhbHVlQ2hhbmdlcygpO1xuICB9XG5cbiAgb25XcmFwcGVyc1NlbGVjdGVkKGZpZWxkOiBGb3JtbHlGaWVsZENvbmZpZyk6IHZvaWQge1xuICAgIHRoaXMudXBkYXRlRmllbGQoZmllbGQpO1xuICB9XG5cbiAgcHJpdmF0ZSB2YWxpZGF0b3IoY29udHJvbDogRm9ybUdyb3VwKTogeyBba2V5OiBzdHJpbmddOiBib29sZWFuIH0gfCBudWxsIHtcbiAgICBpZiAodGhpcy5maWVsZEdyb3VwKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgY29uc3QgdHlwZSA9IGNvbnRyb2wuZ2V0KCd0eXBlJykgYXMgRm9ybUNvbnRyb2w7XG4gICAgY29uc3QgaGFzVHlwZSA9IGlzU3RyaW5nKHR5cGUudmFsdWUpICYmIHR5cGUudmFsdWUudHJpbSgpLmxlbmd0aCA+IDA7XG4gICAgY29uc3QgcmVzdWx0ID0geyB0eXBlOiBmYWxzZSB9O1xuICAgIGlmICh0aGlzLnNob3dUeXBlICYmICFoYXNUeXBlKSB7XG4gICAgICByZXN1bHQudHlwZSA9IHRydWU7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQudHlwZSA/IHJlc3VsdCA6IG51bGw7XG4gIH1cbn1cbiJdfQ==