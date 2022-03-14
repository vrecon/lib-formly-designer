import { Component, EventEmitter, Input, Output, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { isString } from 'lodash';
import { merge, NEVER, timer } from 'rxjs';
import { catchError, debounceTime, map, tap } from 'rxjs/operators';
import { FieldType } from './';
import { ParentService } from './parent.service';
import * as i0 from "@angular/core";
import * as i1 from "./";
import * as i2 from "@angular/forms";
import * as i3 from "./parent.service";
import * as i4 from "@ngx-formly/core";
import * as i5 from "@angular/common";
export class FormlyDesignerComponent {
    constructor(dragDropService, fieldsService, formBuilder, formlyDesignerService, parentService) {
        this.dragDropService = dragDropService;
        this.fieldsService = fieldsService;
        this.formBuilder = formBuilder;
        this.formlyDesignerService = formlyDesignerService;
        this.parentService = parentService;
        this.fieldsChange = new EventEmitter();
        this.modelChange = new EventEmitter();
        this.types = [];
        this.wrappers = [];
        this.properties = [];
        this.debugFields = [];
        this.dropTargetCounter = 0;
        this.options = {};
        this.subscriptions = [];
        parentService.parent = this;
        // Editor forms will be restricted to a single field depth; all designer keys should be
        // complex (e.g. "templateOptions.some.property")
        this.form = this.formBuilder.group({});
        this.isDragging$ = this.dragDropService.dragging$.pipe(map(dragging => dragging != null));
    }
    get designerId() { return ''; }
    get disabled() {
        return this.formlyDesignerService.disabled;
    }
    set disabled(value) {
        this.formlyDesignerService.disabled = value;
    }
    get fields() {
        return this.formlyDesignerService.fields;
    }
    set fields(value) {
        this.formlyDesignerService.fields = value;
    }
    get model() {
        return this.formlyDesignerService.model;
    }
    set model(value) {
        this.formlyDesignerService.model = value;
    }
    ngOnInit() {
        this.subscriptions.push(this.formlyDesignerService.designerFields$
            .subscribe(fields => {
            // Clear the existing children before the form reset
            this.parentService.clearChildren();
            this.options = {};
            this.form = this.formBuilder.group({});
            this.fieldsChange.emit(this.formlyDesignerService.createPrunedFields(fields, FieldType.Plain));
        }), merge(this.formlyDesignerService.model$, this.form.valueChanges)
            .pipe(debounceTime(50))
            .subscribe(() => this.modelChange.emit(this.formlyDesignerService.model)));
    }
    ngOnDestroy() {
        this.subscriptions.splice(0).forEach(subscription => subscription.unsubscribe());
    }
    onFieldSelected(field) {
        timer(0).pipe(tap(() => {
            if (this.fieldsService.checkField(field, this.formlyDesignerService.designerFields)) {
                this.formlyDesignerService.addField(field);
            }
        }), catchError(() => NEVER)).subscribe();
    }
    onDragEnter(event) {
        event.preventDefault();
        this.dropTargetCounter++;
    }
    onDragLeave() {
        if (this.dropTargetCounter > 0) {
            this.dropTargetCounter--;
        }
    }
    onDragOver(event) {
        event.preventDefault();
    }
    onDrop(event) {
        if (this.fields.length) {
            return;
        }
        if (!isString(this.dragDropService.dragging)) {
            return;
        }
        this.addChildType(this.dragDropService.dragging);
        event.preventDefault();
    }
    addChildField(field, index) {
        this.formlyDesignerService.addField(field, index);
    }
    addChildType(type, index) {
        const field = this.formlyDesignerService.createField(type);
        this.addChildField(field, index);
    }
}
FormlyDesignerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.6", ngImport: i0, type: FormlyDesignerComponent, deps: [{ token: i1.DragDropService }, { token: i1.FieldsService }, { token: i2.FormBuilder }, { token: i1.FormlyDesignerService }, { token: i3.ParentService }], target: i0.ɵɵFactoryTarget.Component });
FormlyDesignerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.2.6", type: FormlyDesignerComponent, selector: "formly-designer", inputs: { disabled: "disabled", fields: "fields", model: "model" }, outputs: { fieldsChange: "fieldsChange", modelChange: "modelChange" }, providers: [
        ParentService,
    ], viewQueries: [{ propertyName: "formlyFormContainer", first: true, predicate: ["formlyFormContainer"], descendants: true, read: ViewContainerRef, static: true }], ngImport: i0, template: `
    <form novalidate [formGroup]="form">
      <formly-form *ngIf="fields.length > 0; else placeholder" [options]="options" [model]="model" [form]="form" [fields]="(formlyDesignerService.designerFields$ | async) ?? []">
      </formly-form>
      <ng-template #placeholder>
        <div class="content d-flex justify-content-center align-items-center"
          [ngClass]="{ 'drop-hint': isDragging$ | async, 'drop-target': dropTargetCounter > 0 }"
          (dragenter)="onDragEnter($event)" (dragleave)="onDragLeave()" (dragover)="onDragOver($event)" (drop)="onDrop($event)">
          <div>+</div>
        </div>
      </ng-template>
    </form>
    <!--<div>
      Designer Fields:
      <pre>{{ formlyDesignerService.designerFields$ | async | decycle | json }}</pre>
    </div>-->
  `, isInline: true, styles: ["formly-designer>form>.content{border:1px dashed #000;border-radius:5px;min-height:2rem;padding:1.5em 1em 0;width:100%}formly-designer>form>.content.drop-hint{background-color:#e3f2fd;border-color:#bbdefb}formly-designer>form>.content.drop-target{background-color:#f0f4c3;border-color:#00c853}formly-designer>form>.content>div{padding:2rem 2rem 4rem;font-size:64pt;pointer-events:none}formly-designer-field-picker .form-group>.input-group>formly-designer-type-select>select{border-radius:.25rem 0 0 .25rem;border-right:0}formly-designer-wrapper-editor .card>.card-body .form-control{width:100%}formly-designer-wrapper-picker .form-group>.input-group>formly-designer-wrapper-select>select{border-radius:.25rem 0 0 .25rem;border-right:0}\n"], components: [{ type: i4.FormlyForm, selector: "formly-form", inputs: ["model", "fields", "options", "form"], outputs: ["modelChange"] }], directives: [{ type: i2.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { type: i2.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i2.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i5.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i5.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }], pipes: { "async": i5.AsyncPipe }, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.6", ngImport: i0, type: FormlyDesignerComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'formly-designer',
                    template: `
    <form novalidate [formGroup]="form">
      <formly-form *ngIf="fields.length > 0; else placeholder" [options]="options" [model]="model" [form]="form" [fields]="(formlyDesignerService.designerFields$ | async) ?? []">
      </formly-form>
      <ng-template #placeholder>
        <div class="content d-flex justify-content-center align-items-center"
          [ngClass]="{ 'drop-hint': isDragging$ | async, 'drop-target': dropTargetCounter > 0 }"
          (dragenter)="onDragEnter($event)" (dragleave)="onDragLeave()" (dragover)="onDragOver($event)" (drop)="onDrop($event)">
          <div>+</div>
        </div>
      </ng-template>
    </form>
    <!--<div>
      Designer Fields:
      <pre>{{ formlyDesignerService.designerFields$ | async | decycle | json }}</pre>
    </div>-->
  `,
                    styles: [`
    formly-designer > form > .content {
      border: 1px dashed #000;
      border-radius: 5px;
      min-height: 2rem;
      padding: 1.5em 1em 0 1em;
      width: 100%;
    }
    formly-designer > form > .content.drop-hint {
      background-color: #e3f2fd;
      border-color: #bbdefb;
    }
    formly-designer > form > .content.drop-target {
      background-color: #f0f4c3;
      border-color: #00c853;
    }
    formly-designer > form > .content > div {
      padding: 2rem;
      padding-bottom: 4rem;
      font-size: 64pt;
      pointer-events: none;
    }
    formly-designer-field-picker .form-group > .input-group > formly-designer-type-select > select {
      border-radius: .25rem 0 0 .25rem;
      border-right: 0;
    }
    formly-designer-wrapper-editor .card > .card-body .form-control {
      width: 100%;
    }
    formly-designer-wrapper-picker .form-group > .input-group > formly-designer-wrapper-select > select {
      border-radius: .25rem 0 0 .25rem;
      border-right: 0;
    }
  `],
                    providers: [
                        ParentService,
                    ],
                    encapsulation: ViewEncapsulation.None
                }]
        }], ctorParameters: function () { return [{ type: i1.DragDropService }, { type: i1.FieldsService }, { type: i2.FormBuilder }, { type: i1.FormlyDesignerService }, { type: i3.ParentService }]; }, propDecorators: { formlyFormContainer: [{
                type: ViewChild,
                args: ['formlyFormContainer', { read: ViewContainerRef, static: true }]
            }], fieldsChange: [{
                type: Output
            }], modelChange: [{
                type: Output
            }], disabled: [{
                type: Input
            }], fields: [{
                type: Input
            }], model: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybWx5LWRlc2lnbmVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL2xpYi1mb3JtbHktZGVzaWduZXIvc3JjL2xpYi9mb3JtbHktZGVzaWduZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsWUFBWSxFQUNaLEtBQUssRUFHTCxNQUFNLEVBQ04sU0FBUyxFQUNULGdCQUFnQixFQUNoQixpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFHdkIsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLFFBQVEsQ0FBQztBQUNsQyxPQUFPLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBNEIsS0FBSyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNwRSxPQUFPLEVBQWtDLFNBQVMsRUFBeUIsTUFBTSxJQUFJLENBQUM7QUFDdEYsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtCQUFrQixDQUFDOzs7Ozs7O0FBNERqRCxNQUFNLE9BQU8sdUJBQXVCO0lBbUJsQyxZQUNVLGVBQWdDLEVBQ2hDLGFBQTRCLEVBQzVCLFdBQXdCLEVBQ3pCLHFCQUE0QyxFQUMzQyxhQUE0QjtRQUo1QixvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDaEMsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFDNUIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDekIsMEJBQXFCLEdBQXJCLHFCQUFxQixDQUF1QjtRQUMzQyxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQXRCNUIsaUJBQVksR0FBRyxJQUFJLFlBQVksRUFBdUIsQ0FBQztRQUN2RCxnQkFBVyxHQUFHLElBQUksWUFBWSxFQUFPLENBQUM7UUFFaEQsVUFBSyxHQUFhLEVBQUUsQ0FBQztRQUNyQixhQUFR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QUFXLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDM0QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDbkMsQ0FBQzs7b0hBOUhVLHVCQUF1Qjt3R0FBdkIsdUJBQXVCLHFMQUx2QjtRQUNULGFBQWE7S0FDZCxpSUFJeUMsZ0JBQWdCLDJDQXpEaEQ7Ozs7Ozs7Ozs7Ozs7Ozs7R0FnQlQ7MkZBd0NVLHVCQUF1QjtrQkExRG5DLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLGlCQUFpQjtvQkFDM0IsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7O0dBZ0JUO29CQUNELE1BQU0sRUFBRSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpQ1IsQ0FBQztvQkFDRixTQUFTLEVBQUU7d0JBQ1QsYUFBYTtxQkFDZDtvQkFDRCxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtpQkFDdEM7NE5BRTZFLG1CQUFtQjtzQkFBOUYsU0FBUzt1QkFBQyxxQkFBcUIsRUFBRSxFQUFFLElBQUksRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO2dCQUNoRSxZQUFZO3NCQUFyQixNQUFNO2dCQUNHLFdBQVc7c0JBQXBCLE1BQU07Z0JBZ0NILFFBQVE7c0JBRFgsS0FBSztnQkFVRixNQUFNO3NCQURULEtBQUs7Z0JBVUYsS0FBSztzQkFEUixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBFdmVudEVtaXR0ZXIsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgT3V0cHV0LFxuICBWaWV3Q2hpbGQsXG4gIFZpZXdDb250YWluZXJSZWYsXG4gIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUJ1aWxkZXIsIEZvcm1Hcm91cCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEZvcm1seUZpZWxkQ29uZmlnIH0gZnJvbSAnQG5neC1mb3JtbHkvY29yZSc7XG5pbXBvcnQgeyBpc1N0cmluZyB9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgeyBtZXJnZSwgTkVWRVIsIE9ic2VydmFibGUsIFN1YnNjcmlwdGlvbiwgdGltZXIgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGNhdGNoRXJyb3IsIGRlYm91bmNlVGltZSwgbWFwLCB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBEcmFnRHJvcFNlcnZpY2UsIEZpZWxkc1NlcnZpY2UsIEZpZWxkVHlwZSwgRm9ybWx5RGVzaWduZXJTZXJ2aWNlIH0gZnJvbSAnLi8nO1xuaW1wb3J0IHsgUGFyZW50U2VydmljZSB9IGZyb20gJy4vcGFyZW50LnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdmb3JtbHktZGVzaWduZXInLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxmb3JtIG5vdmFsaWRhdGUgW2Zvcm1Hcm91cF09XCJmb3JtXCI+XG4gICAgICA8Zm9ybWx5LWZvcm0gKm5nSWY9XCJmaWVsZHMubGVuZ3RoID4gMDsgZWxzZSBwbGFjZWhvbGRlclwiIFtvcHRpb25zXT1cIm9wdGlvbnNcIiBbbW9kZWxdPVwibW9kZWxcIiBbZm9ybV09XCJmb3JtXCIgW2ZpZWxkc109XCIoZm9ybWx5RGVzaWduZXJTZXJ2aWNlLmRlc2lnbmVyRmllbGRzJCB8IGFzeW5jKSA/PyBbXVwiPlxuICAgICAgPC9mb3JtbHktZm9ybT5cbiAgICAgIDxuZy10ZW1wbGF0ZSAjcGxhY2Vob2xkZXI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb250ZW50IGQtZmxleCBqdXN0aWZ5LWNvbnRlbnQtY2VudGVyIGFsaWduLWl0ZW1zLWNlbnRlclwiXG4gICAgICAgICAgW25nQ2xhc3NdPVwieyAnZHJvcC1oaW50JzogaXNEcmFnZ2luZyQgfCBhc3luYywgJ2Ryb3AtdGFyZ2V0JzogZHJvcFRhcmdldENvdW50ZXIgPiAwIH1cIlxuICAgICAgICAgIChkcmFnZW50ZXIpPVwib25EcmFnRW50ZXIoJGV2ZW50KVwiIChkcmFnbGVhdmUpPVwib25EcmFnTGVhdmUoKVwiIChkcmFnb3Zlcik9XCJvbkRyYWdPdmVyKCRldmVudClcIiAoZHJvcCk9XCJvbkRyb3AoJGV2ZW50KVwiPlxuICAgICAgICAgIDxkaXY+KzwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgPC9mb3JtPlxuICAgIDwhLS08ZGl2PlxuICAgICAgRGVzaWduZXIgRmllbGRzOlxuICAgICAgPHByZT57eyBmb3JtbHlEZXNpZ25lclNlcnZpY2UuZGVzaWduZXJGaWVsZHMkIHwgYXN5bmMgfCBkZWN5Y2xlIHwganNvbiB9fTwvcHJlPlxuICAgIDwvZGl2Pi0tPlxuICBgLFxuICBzdHlsZXM6IFtgXG4gICAgZm9ybWx5LWRlc2lnbmVyID4gZm9ybSA+IC5jb250ZW50IHtcbiAgICAgIGJvcmRlcjogMXB4IGRhc2hlZCAjMDAwO1xuICAgICAgYm9yZGVyLXJhZGl1czogNXB4O1xuICAgICAgbWluLWhlaWdodDogMnJlbTtcbiAgICAgIHBhZGRpbmc6IDEuNWVtIDFlbSAwIDFlbTtcbiAgICAgIHdpZHRoOiAxMDAlO1xuICAgIH1cbiAgICBmb3JtbHktZGVzaWduZXIgPiBmb3JtID4gLmNvbnRlbnQuZHJvcC1oaW50IHtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICNlM2YyZmQ7XG4gICAgICBib3JkZXItY29sb3I6ICNiYmRlZmI7XG4gICAgfVxuICAgIGZvcm1seS1kZXNpZ25lciA+IGZvcm0gPiAuY29udGVudC5kcm9wLXRhcmdldCB7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjBmNGMzO1xuICAgICAgYm9yZGVyLWNvbG9yOiAjMDBjODUzO1xuICAgIH1cbiAgICBmb3JtbHktZGVzaWduZXIgPiBmb3JtID4gLmNvbnRlbnQgPiBkaXYge1xuICAgICAgcGFkZGluZzogMnJlbTtcbiAgICAgIHBhZGRpbmctYm90dG9tOiA0cmVtO1xuICAgICAgZm9udC1zaXplOiA2NHB0O1xuICAgICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG4gICAgfVxuICAgIGZvcm1seS1kZXNpZ25lci1maWVsZC1waWNrZXIgLmZvcm0tZ3JvdXAgPiAuaW5wdXQtZ3JvdXAgPiBmb3JtbHktZGVzaWduZXItdHlwZS1zZWxlY3QgPiBzZWxlY3Qge1xuICAgICAgYm9yZGVyLXJhZGl1czogLjI1cmVtIDAgMCAuMjVyZW07XG4gICAgICBib3JkZXItcmlnaHQ6IDA7XG4gICAgfVxuICAgIGZvcm1seS1kZXNpZ25lci13cmFwcGVyLWVkaXRvciAuY2FyZCA+IC5jYXJkLWJvZHkgLmZvcm0tY29udHJvbCB7XG4gICAgICB3aWR0aDogMTAwJTtcbiAgICB9XG4gICAgZm9ybWx5LWRlc2lnbmVyLXdyYXBwZXItcGlja2VyIC5mb3JtLWdyb3VwID4gLmlucHV0LWdyb3VwID4gZm9ybWx5LWRlc2lnbmVyLXdyYXBwZXItc2VsZWN0ID4gc2VsZWN0IHtcbiAgICAgIGJvcmRlci1yYWRpdXM6IC4yNXJlbSAwIDAgLjI1cmVtO1xuICAgICAgYm9yZGVyLXJpZ2h0OiAwO1xuICAgIH1cbiAgYF0sXG4gIHByb3ZpZGVyczogW1xuICAgIFBhcmVudFNlcnZpY2UsXG4gIF0sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmVcbn0pXG5leHBvcnQgY2xhc3MgRm9ybWx5RGVzaWduZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkRlc3Ryb3ksIE9uSW5pdCB7XG4gIEBWaWV3Q2hpbGQoJ2Zvcm1seUZvcm1Db250YWluZXInLCB7IHJlYWQ6IFZpZXdDb250YWluZXJSZWYsIHN0YXRpYzogdHJ1ZSB9KSBmb3JtbHlGb3JtQ29udGFpbmVyPzogVmlld0NvbnRhaW5lclJlZjtcbiAgQE91dHB1dCgpIGZpZWxkc0NoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8Rm9ybWx5RmllbGRDb25maWdbXT4oKTtcbiAgQE91dHB1dCgpIG1vZGVsQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgdHlwZXM6IHN0cmluZ1tdID0gW107XG4gIHdyYXBwZXJzOiBzdHJpbmdbXSA9IFtdO1xuICBwcm9wZXJ0aWVzOiBzdHJpbmdbXSA9IFtdO1xuICBkZWJ1Z0ZpZWxkczogRm9ybWx5RmllbGRDb25maWdbXSA9IFtdO1xuICBpc0RyYWdnaW5nJDogT2JzZXJ2YWJsZTxib29sZWFuPjtcbiAgZHJvcFRhcmdldENvdW50ZXIgPSAwO1xuXG4gIGZvcm06IEZvcm1Hcm91cDtcbiAgb3B0aW9uczogYW55ID0ge307XG5cbiAgZ2V0IGRlc2lnbmVySWQoKTogc3RyaW5nIHsgcmV0dXJuICcnOyB9XG5cbiAgcHJpdmF0ZSByZWFkb25seSBzdWJzY3JpcHRpb25zOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgZHJhZ0Ryb3BTZXJ2aWNlOiBEcmFnRHJvcFNlcnZpY2UsXG4gICAgcHJpdmF0ZSBmaWVsZHNTZXJ2aWNlOiBGaWVsZHNTZXJ2aWNlLFxuICAgIHByaXZhdGUgZm9ybUJ1aWxkZXI6IEZvcm1CdWlsZGVyLFxuICAgIHB1YmxpYyBmb3JtbHlEZXNpZ25lclNlcnZpY2U6IEZvcm1seURlc2lnbmVyU2VydmljZSxcbiAgICBwcml2YXRlIHBhcmVudFNlcnZpY2U6IFBhcmVudFNlcnZpY2UsXG4gICkge1xuICAgIHBhcmVudFNlcnZpY2UucGFyZW50ID0gdGhpcztcblxuICAgIC8vIEVkaXRvciBmb3JtcyB3aWxsIGJlIHJlc3RyaWN0ZWQgdG8gYSBzaW5nbGUgZmllbGQgZGVwdGg7IGFsbCBkZXNpZ25lciBrZXlzIHNob3VsZCBiZVxuICAgIC8vIGNvbXBsZXggKGUuZy4gXCJ0ZW1wbGF0ZU9wdGlvbnMuc29tZS5wcm9wZXJ0eVwiKVxuICAgIHRoaXMuZm9ybSA9IHRoaXMuZm9ybUJ1aWxkZXIuZ3JvdXAoe30pO1xuICAgIHRoaXMuaXNEcmFnZ2luZyQgPSB0aGlzLmRyYWdEcm9wU2VydmljZS5kcmFnZ2luZyQucGlwZShtYXAoZHJhZ2dpbmcgPT4gZHJhZ2dpbmcgIT0gbnVsbCkpO1xuICB9XG5cbiAgQElucHV0KClcbiAgZ2V0IGRpc2FibGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmZvcm1seURlc2lnbmVyU2VydmljZS5kaXNhYmxlZDtcbiAgfVxuXG4gIHNldCBkaXNhYmxlZCh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuZm9ybWx5RGVzaWduZXJTZXJ2aWNlLmRpc2FibGVkID0gdmFsdWU7XG4gIH1cblxuICBASW5wdXQoKVxuICBnZXQgZmllbGRzKCk6IEZvcm1seUZpZWxkQ29uZmlnW10ge1xuICAgIHJldHVybiB0aGlzLmZvcm1seURlc2lnbmVyU2VydmljZS5maWVsZHM7XG4gIH1cblxuICBzZXQgZmllbGRzKHZhbHVlOiBGb3JtbHlGaWVsZENvbmZpZ1tdKSB7XG4gICAgdGhpcy5mb3JtbHlEZXNpZ25lclNlcnZpY2UuZmllbGRzID0gdmFsdWU7XG4gIH1cblxuICBASW5wdXQoKVxuICBnZXQgbW9kZWwoKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5mb3JtbHlEZXNpZ25lclNlcnZpY2UubW9kZWw7XG4gIH1cblxuICBzZXQgbW9kZWwodmFsdWU6IGFueSkge1xuICAgIHRoaXMuZm9ybWx5RGVzaWduZXJTZXJ2aWNlLm1vZGVsID0gdmFsdWU7XG4gIH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChcbiAgICAgIHRoaXMuZm9ybWx5RGVzaWduZXJTZXJ2aWNlLmRlc2lnbmVyRmllbGRzJFxuICAgICAgICAuc3Vic2NyaWJlKGZpZWxkcyA9PiB7XG4gICAgICAgICAgLy8gQ2xlYXIgdGhlIGV4aXN0aW5nIGNoaWxkcmVuIGJlZm9yZSB0aGUgZm9ybSByZXNldFxuICAgICAgICAgIHRoaXMucGFyZW50U2VydmljZS5jbGVhckNoaWxkcmVuKCk7XG5cbiAgICAgICAgICB0aGlzLm9wdGlvbnMgPSB7fTtcbiAgICAgICAgICB0aGlzLmZvcm0gPSB0aGlzLmZvcm1CdWlsZGVyLmdyb3VwKHt9KTtcbiAgICAgICAgICB0aGlzLmZpZWxkc0NoYW5nZS5lbWl0KHRoaXMuZm9ybWx5RGVzaWduZXJTZXJ2aWNlLmNyZWF0ZVBydW5lZEZpZWxkcyhmaWVsZHMsIEZpZWxkVHlwZS5QbGFpbikpO1xuICAgICAgICB9KSxcblxuICAgICAgbWVyZ2UodGhpcy5mb3JtbHlEZXNpZ25lclNlcnZpY2UubW9kZWwkLCB0aGlzLmZvcm0udmFsdWVDaGFuZ2VzKVxuICAgICAgICAucGlwZShkZWJvdW5jZVRpbWUoNTApKVxuICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMubW9kZWxDaGFuZ2UuZW1pdCh0aGlzLmZvcm1seURlc2lnbmVyU2VydmljZS5tb2RlbCkpLFxuICAgICk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuc3BsaWNlKDApLmZvckVhY2goc3Vic2NyaXB0aW9uID0+IHN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpKTtcbiAgfVxuXG4gIG9uRmllbGRTZWxlY3RlZChmaWVsZDogRm9ybWx5RmllbGRDb25maWcpOiB2b2lkIHtcbiAgICB0aW1lcigwKS5waXBlKFxuICAgICAgdGFwKCgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMuZmllbGRzU2VydmljZS5jaGVja0ZpZWxkKGZpZWxkLCB0aGlzLmZvcm1seURlc2lnbmVyU2VydmljZS5kZXNpZ25lckZpZWxkcykpIHtcbiAgICAgICAgICB0aGlzLmZvcm1seURlc2lnbmVyU2VydmljZS5hZGRGaWVsZChmaWVsZCk7XG4gICAgICAgIH1cbiAgICAgIH0pLFxuICAgICAgY2F0Y2hFcnJvcigoKSA9PiBORVZFUikpLnN1YnNjcmliZSgpO1xuICB9XG5cbiAgb25EcmFnRW50ZXIoZXZlbnQ6IERyYWdFdmVudCk6IHZvaWQge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgdGhpcy5kcm9wVGFyZ2V0Q291bnRlcisrO1xuICB9XG5cbiAgb25EcmFnTGVhdmUoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuZHJvcFRhcmdldENvdW50ZXIgPiAwKSB7XG4gICAgICB0aGlzLmRyb3BUYXJnZXRDb3VudGVyLS07XG4gICAgfVxuICB9XG5cbiAgb25EcmFnT3ZlcihldmVudDogRHJhZ0V2ZW50KTogdm9pZCB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgfVxuXG4gIG9uRHJvcChldmVudDogRHJhZ0V2ZW50KTogdm9pZCB7XG4gICAgaWYgKHRoaXMuZmllbGRzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoIWlzU3RyaW5nKHRoaXMuZHJhZ0Ryb3BTZXJ2aWNlLmRyYWdnaW5nKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLmFkZENoaWxkVHlwZSh0aGlzLmRyYWdEcm9wU2VydmljZS5kcmFnZ2luZyk7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgfVxuXG4gIGFkZENoaWxkRmllbGQoZmllbGQ6IEZvcm1seUZpZWxkQ29uZmlnLCBpbmRleD86IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuZm9ybWx5RGVzaWduZXJTZXJ2aWNlLmFkZEZpZWxkKGZpZWxkLCBpbmRleCk7XG4gIH1cblxuICBhZGRDaGlsZFR5cGUodHlwZTogc3RyaW5nLCBpbmRleD86IG51bWJlcik6IHZvaWQge1xuICAgIGNvbnN0IGZpZWxkID0gdGhpcy5mb3JtbHlEZXNpZ25lclNlcnZpY2UuY3JlYXRlRmllbGQodHlwZSk7XG4gICAgdGhpcy5hZGRDaGlsZEZpZWxkKGZpZWxkLCBpbmRleCk7XG4gIH1cbn1cbiJdfQ==