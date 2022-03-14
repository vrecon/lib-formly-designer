import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { timer } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';
import { cloneDeep, isObject } from '../util';
import * as i0 from "@angular/core";
import * as i1 from "../fields.service";
import * as i2 from "@angular/forms";
import * as i3 from "@ngx-formly/core";
const WRAPPER_EDITOR_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => WrapperEditorComponent),
    multi: true
};
export class WrapperEditorComponent {
    constructor(fieldsService, formBuilder) {
        this.fieldsService = fieldsService;
        this.formBuilder = formBuilder;
        this.wrapper = null;
        this.subscriptions = [];
        this.invalid = false;
        this.fields = [];
        this.onChange = (value) => { };
        this.onTouched = () => { };
        this.fieldForm = formBuilder.group({});
    }
    ngOnInit() {
        this.subscriptions.push(this.fieldForm.statusChanges
            .pipe(switchMap(() => timer(0)))
            .subscribe(() => this.invalid = this.fieldForm.invalid));
        this.subscribeValueChanges();
    }
    ngOnDestroy() {
        this.valueChangesSubscription?.unsubscribe();
        this.subscriptions.splice(0).forEach(subscription => subscription.unsubscribe());
    }
    ngOnChanges(changes) {
        if (changes['wrapper']) {
            if (this.valueChangesSubscription) {
                this.valueChangesSubscription.unsubscribe();
            }
            this.fields = this.fieldsService.getWrapperFields(this.wrapper);
            this.fieldForm = this.formBuilder.group({});
            this.field = Object.assign({}, this.field);
            if (this.valueChangesSubscription) {
                this.subscribeValueChanges();
            }
        }
    }
    writeValue(obj) {
        this.valueChangesSubscription?.unsubscribe();
        if (!isObject(obj)) {
            obj = {};
        }
        this.fields = this.fieldsService.getWrapperFields(this.wrapper);
        this.fieldForm = this.formBuilder.group({});
        this.field = cloneDeep(obj);
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
            this.fieldForm.disable();
        }
        else {
            this.fieldForm.enable();
        }
    }
    subscribeValueChanges() {
        this.valueChangesSubscription = this.fieldForm.valueChanges
            .pipe(debounceTime(0))
            .subscribe(() => this.updateValue());
    }
    updateValue() {
        if (!this.onChange) {
            return;
        }
        this.onChange(this.field);
    }
}
WrapperEditorComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.6", ngImport: i0, type: WrapperEditorComponent, deps: [{ token: i1.FieldsService }, { token: i2.FormBuilder }], target: i0.ɵɵFactoryTarget.Component });
WrapperEditorComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.2.6", type: WrapperEditorComponent, selector: "formly-designer-wrapper-editor", inputs: { wrapper: "wrapper" }, providers: [
        WRAPPER_EDITOR_CONTROL_VALUE_ACCESSOR
    ], usesOnChanges: true, ngImport: i0, template: `
    <form [formGroup]="fieldForm" novalidate>
      <div class="card">
        <div class="card-body">
          <formly-form [form]="fieldForm" [fields]="fields" [model]="field">
          </formly-form>
          <ng-content></ng-content>
        </div>
      </div>
    </form>
  `, isInline: true, components: [{ type: i3.FormlyForm, selector: "formly-form", inputs: ["model", "fields", "options", "form"], outputs: ["modelChange"] }], directives: [{ type: i2.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { type: i2.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i2.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.6", ngImport: i0, type: WrapperEditorComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'formly-designer-wrapper-editor',
                    template: `
    <form [formGroup]="fieldForm" novalidate>
      <div class="card">
        <div class="card-body">
          <formly-form [form]="fieldForm" [fields]="fields" [model]="field">
          </formly-form>
          <ng-content></ng-content>
        </div>
      </div>
    </form>
  `,
                    providers: [
                        WRAPPER_EDITOR_CONTROL_VALUE_ACCESSOR
                    ]
                }]
        }], ctorParameters: function () { return [{ type: i1.FieldsService }, { type: i2.FormBuilder }]; }, propDecorators: { wrapper: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3JhcHBlci1lZGl0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3gtZm9ybWx5LWRlc2lnbmVyL3NyYy9saWIvY29tcG9uZW50cy93cmFwcGVyLWVkaXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQStDLE1BQU0sZUFBZSxDQUFDO0FBQzFHLE9BQU8sRUFBZ0QsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVqRyxPQUFPLEVBQWdCLEtBQUssRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMzQyxPQUFPLEVBQUUsWUFBWSxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXpELE9BQU8sRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLE1BQU0sU0FBUyxDQUFDOzs7OztBQUU5QyxNQUFNLHFDQUFxQyxHQUFRO0lBQ2pELE9BQU8sRUFBRSxpQkFBaUI7SUFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxzQkFBc0IsQ0FBQztJQUNyRCxLQUFLLEVBQUUsSUFBSTtDQUNaLENBQUM7QUFtQkYsTUFBTSxPQUFPLHNCQUFzQjtJQU1qQyxZQUNVLGFBQTRCLEVBQzVCLFdBQXdCO1FBRHhCLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQzVCLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBUHpCLFlBQU8sR0FBa0IsSUFBSSxDQUFDO1FBRXRCLGtCQUFhLEdBQW1CLEVBQUUsQ0FBQztRQVVwRCxZQUFPLEdBQUcsS0FBSyxDQUFDO1FBR2hCLFdBQU0sR0FBd0IsRUFBRSxDQUFDO1FBRXZCLGFBQVEsR0FBRyxDQUFDLEtBQVUsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQy9CLGNBQVMsR0FBRyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFUOUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxXQUFXLENB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O0lBRU8sV0FBVztRQUNqQixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNsQixPQUFPO1NBQ1I7UUFFRCxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM1QixDQUFDOzttSEF2RlUsc0JBQXNCO3VHQUF0QixzQkFBc0IseUZBSnRCO1FBQ1QscUNBQXFDO0tBQ3RDLCtDQWJTOzs7Ozs7Ozs7O0dBVVQ7MkZBS1Usc0JBQXNCO2tCQWpCbEMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsZ0NBQWdDO29CQUMxQyxRQUFRLEVBQUU7Ozs7Ozs7Ozs7R0FVVDtvQkFDRCxTQUFTLEVBQUU7d0JBQ1QscUNBQXFDO3FCQUN0QztpQkFDRjs4SEFFVSxPQUFPO3NCQUFmLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIGZvcndhcmRSZWYsIElucHV0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSwgT25Jbml0LCBTaW1wbGVDaGFuZ2VzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgRm9ybUJ1aWxkZXIsIEZvcm1Hcm91cCwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBGb3JtbHlGaWVsZENvbmZpZyB9IGZyb20gJ0BuZ3gtZm9ybWx5L2NvcmUnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uLCB0aW1lciB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZGVib3VuY2VUaW1lLCBzd2l0Y2hNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBGaWVsZHNTZXJ2aWNlIH0gZnJvbSAnLi4vZmllbGRzLnNlcnZpY2UnO1xuaW1wb3J0IHsgY2xvbmVEZWVwLCBpc09iamVjdCB9IGZyb20gJy4uL3V0aWwnO1xuXG5jb25zdCBXUkFQUEVSX0VESVRPUl9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBXcmFwcGVyRWRpdG9yQ29tcG9uZW50KSxcbiAgbXVsdGk6IHRydWVcbn07XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Zvcm1seS1kZXNpZ25lci13cmFwcGVyLWVkaXRvcicsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGZvcm0gW2Zvcm1Hcm91cF09XCJmaWVsZEZvcm1cIiBub3ZhbGlkYXRlPlxuICAgICAgPGRpdiBjbGFzcz1cImNhcmRcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNhcmQtYm9keVwiPlxuICAgICAgICAgIDxmb3JtbHktZm9ybSBbZm9ybV09XCJmaWVsZEZvcm1cIiBbZmllbGRzXT1cImZpZWxkc1wiIFttb2RlbF09XCJmaWVsZFwiPlxuICAgICAgICAgIDwvZm9ybWx5LWZvcm0+XG4gICAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZm9ybT5cbiAgYCxcbiAgcHJvdmlkZXJzOiBbXG4gICAgV1JBUFBFUl9FRElUT1JfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUlxuICBdXG59KVxuZXhwb3J0IGNsYXNzIFdyYXBwZXJFZGl0b3JDb21wb25lbnQgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciwgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIE9uSW5pdCB7XG4gIEBJbnB1dCgpIHdyYXBwZXI6IHN0cmluZyB8IG51bGwgPSBudWxsO1xuXG4gIHByaXZhdGUgcmVhZG9ubHkgc3Vic2NyaXB0aW9uczogU3Vic2NyaXB0aW9uW10gPSBbXTtcbiAgcHJpdmF0ZSB2YWx1ZUNoYW5nZXNTdWJzY3JpcHRpb24/OiBTdWJzY3JpcHRpb247XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBmaWVsZHNTZXJ2aWNlOiBGaWVsZHNTZXJ2aWNlLFxuICAgIHByaXZhdGUgZm9ybUJ1aWxkZXI6IEZvcm1CdWlsZGVyXG4gICkge1xuICAgIHRoaXMuZmllbGRGb3JtID0gZm9ybUJ1aWxkZXIuZ3JvdXAoe30pO1xuICB9XG5cbiAgaW52YWxpZCA9IGZhbHNlO1xuICBmaWVsZEZvcm06IEZvcm1Hcm91cDtcbiAgZmllbGQ/OiBGb3JtbHlGaWVsZENvbmZpZztcbiAgZmllbGRzOiBGb3JtbHlGaWVsZENvbmZpZ1tdID0gW107XG5cbiAgcHJvdGVjdGVkIG9uQ2hhbmdlID0gKHZhbHVlOiBhbnkpID0+IHsgfTtcbiAgcHJvdGVjdGVkIG9uVG91Y2hlZCA9ICgpID0+IHsgfTtcblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaCh0aGlzLmZpZWxkRm9ybS5zdGF0dXNDaGFuZ2VzXG4gICAgICAucGlwZShzd2l0Y2hNYXAoKCkgPT4gdGltZXIoMCkpKVxuICAgICAgLnN1YnNjcmliZSgoKSA9PiB0aGlzLmludmFsaWQgPSB0aGlzLmZpZWxkRm9ybS5pbnZhbGlkKSk7XG5cbiAgICB0aGlzLnN1YnNjcmliZVZhbHVlQ2hhbmdlcygpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy52YWx1ZUNoYW5nZXNTdWJzY3JpcHRpb24/LnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnNwbGljZSgwKS5mb3JFYWNoKHN1YnNjcmlwdGlvbiA9PiBzdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKSk7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgaWYgKGNoYW5nZXNbJ3dyYXBwZXInXSkge1xuICAgICAgaWYgKHRoaXMudmFsdWVDaGFuZ2VzU3Vic2NyaXB0aW9uKSB7XG4gICAgICAgIHRoaXMudmFsdWVDaGFuZ2VzU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICB9XG4gICAgICB0aGlzLmZpZWxkcyA9IHRoaXMuZmllbGRzU2VydmljZS5nZXRXcmFwcGVyRmllbGRzKHRoaXMud3JhcHBlcik7XG4gICAgICB0aGlzLmZpZWxkRm9ybSA9IHRoaXMuZm9ybUJ1aWxkZXIuZ3JvdXAoe30pO1xuICAgICAgdGhpcy5maWVsZCA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuZmllbGQpO1xuICAgICAgaWYgKHRoaXMudmFsdWVDaGFuZ2VzU3Vic2NyaXB0aW9uKSB7XG4gICAgICAgIHRoaXMuc3Vic2NyaWJlVmFsdWVDaGFuZ2VzKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgd3JpdGVWYWx1ZShvYmo6IGFueSkge1xuICAgIHRoaXMudmFsdWVDaGFuZ2VzU3Vic2NyaXB0aW9uPy51bnN1YnNjcmliZSgpO1xuICAgIGlmICghaXNPYmplY3Qob2JqKSkge1xuICAgICAgb2JqID0ge307XG4gICAgfVxuICAgIHRoaXMuZmllbGRzID0gdGhpcy5maWVsZHNTZXJ2aWNlLmdldFdyYXBwZXJGaWVsZHModGhpcy53cmFwcGVyKTtcbiAgICB0aGlzLmZpZWxkRm9ybSA9IHRoaXMuZm9ybUJ1aWxkZXIuZ3JvdXAoe30pO1xuICAgIHRoaXMuZmllbGQgPSBjbG9uZURlZXAob2JqKTtcbiAgICB0aGlzLnN1YnNjcmliZVZhbHVlQ2hhbmdlcygpO1xuICB9XG5cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KSB7XG4gICAgdGhpcy5vbkNoYW5nZSA9IGZuO1xuICB9XG5cbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSkge1xuICAgIHRoaXMub25Ub3VjaGVkID0gZm47XG4gIH1cblxuICBzZXREaXNhYmxlZFN0YXRlKGlzRGlzYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICBpZiAoaXNEaXNhYmxlZCkge1xuICAgICAgdGhpcy5maWVsZEZvcm0uZGlzYWJsZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmZpZWxkRm9ybS5lbmFibGUoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHN1YnNjcmliZVZhbHVlQ2hhbmdlcygpOiB2b2lkIHtcbiAgICB0aGlzLnZhbHVlQ2hhbmdlc1N1YnNjcmlwdGlvbiA9IHRoaXMuZmllbGRGb3JtLnZhbHVlQ2hhbmdlc1xuICAgICAgLnBpcGUoZGVib3VuY2VUaW1lKDApKVxuICAgICAgLnN1YnNjcmliZSgoKSA9PiB0aGlzLnVwZGF0ZVZhbHVlKCkpO1xuICB9XG5cbiAgcHJpdmF0ZSB1cGRhdGVWYWx1ZSgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMub25DaGFuZ2UpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLm9uQ2hhbmdlKHRoaXMuZmllbGQpO1xuICB9XG59XG4iXX0=