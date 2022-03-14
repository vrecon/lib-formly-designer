import { Component, HostBinding } from '@angular/core';
import { FormControl } from '@angular/forms';
import { cloneDeep } from '../util';
import { timer } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "../";
import * as i2 from "./field-editor";
import * as i3 from "@angular/forms";
export class PropertiesComponent {
    constructor(fieldsService, formlyDesignerConfig, formlyDesignerService) {
        this.fieldsService = fieldsService;
        this.formlyDesignerConfig = formlyDesignerConfig;
        this.formlyDesignerService = formlyDesignerService;
        this.subscriptions = [];
        this.fieldGroup = false;
        this.fieldEdit = new FormControl({});
        this.field = null;
    }
    get hasField() { return this.field == null; }
    ngOnInit() {
        this.subscriptions.push(this.formlyDesignerService.designerFields$.subscribe(fields => {
            const designerId = this.field?.templateOptions?.['$designerId'];
            this.setField(this.fieldsService.find(designerId, fields) ?? null);
        }), this.formlyDesignerService.selectedField$.subscribe(field => {
            this.setField(field);
        }));
    }
    ngOnDestroy() {
        this.subscriptions.splice(0).forEach(subscription => subscription.unsubscribe());
    }
    remove() {
        if (this.field) {
            this.formlyDesignerService.removeField(this.field);
        }
    }
    accept() {
        if (!this.fieldsService.checkField(this.fieldEdit.value, this.formlyDesignerService.designerFields)) {
            return;
        }
        timer(0).subscribe(() => {
            this.formlyDesignerService.updateField(this.field, this.fieldEdit.value);
        });
    }
    cancel() {
        this.setField(null);
    }
    setField(field) {
        if (field !== this.field) {
            this.field = field;
            this.fieldGroup = field?.type === 'formly-group' ||
                (field?.type && this.formlyDesignerConfig.types[field.type]?.fieldGroup) != null;
            this.fieldEdit.setValue(field ? cloneDeep(field) : {});
        }
    }
}
PropertiesComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.6", ngImport: i0, type: PropertiesComponent, deps: [{ token: i1.FieldsService }, { token: i1.FormlyDesignerConfig }, { token: i1.FormlyDesignerService }], target: i0.ɵɵFactoryTarget.Component });
PropertiesComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.2.6", type: PropertiesComponent, selector: "formly-designer-properties", host: { properties: { "class.d-none": "this.hasField" } }, ngImport: i0, template: `
    <formly-designer-field-editor #editor [fieldGroup]="fieldGroup" [hasContent]="true" [showType]="true" [showWrappers]="true" [formControl]="fieldEdit">
      <div class="footer">
        <button (click)="remove()" class="btn btn-secondary mr-1">Remove</button>
        <button (click)="cancel()" class="btn btn-secondary ml-auto mr-1">Cancel</button>
        <button [disabled]="editor.invalid" (click)="accept()" class="btn btn-primary">Apply</button>
      </div>
    </formly-designer-field-editor>
  `, isInline: true, styles: [".footer{display:flex}\n"], components: [{ type: i2.FieldEditorComponent, selector: "formly-designer-field-editor", inputs: ["fieldGroup", "showType", "showWrappers", "hasContent"] }], directives: [{ type: i3.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i3.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.6", ngImport: i0, type: PropertiesComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'formly-designer-properties',
                    template: `
    <formly-designer-field-editor #editor [fieldGroup]="fieldGroup" [hasContent]="true" [showType]="true" [showWrappers]="true" [formControl]="fieldEdit">
      <div class="footer">
        <button (click)="remove()" class="btn btn-secondary mr-1">Remove</button>
        <button (click)="cancel()" class="btn btn-secondary ml-auto mr-1">Cancel</button>
        <button [disabled]="editor.invalid" (click)="accept()" class="btn btn-primary">Apply</button>
      </div>
    </formly-designer-field-editor>
  `,
                    styles: [`
    .footer {
      display: flex;
    }
  `]
                }]
        }], ctorParameters: function () { return [{ type: i1.FieldsService }, { type: i1.FormlyDesignerConfig }, { type: i1.FormlyDesignerService }]; }, propDecorators: { hasField: [{
                type: HostBinding,
                args: ['class.d-none']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvcGVydGllcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25neC1mb3JtbHktZGVzaWduZXIvc3JjL2xpYi9jb21wb25lbnRzL3Byb3BlcnRpZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQXFCLE1BQU0sZUFBZSxDQUFDO0FBQzFFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUc3QyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sU0FBUyxDQUFDO0FBQ3BDLE9BQU8sRUFBZ0IsS0FBSyxFQUFFLE1BQU0sTUFBTSxDQUFDOzs7OztBQW1CM0MsTUFBTSxPQUFPLG1CQUFtQjtJQVU5QixZQUNVLGFBQTRCLEVBQzVCLG9CQUEwQyxFQUMxQyxxQkFBNEM7UUFGNUMsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFDNUIseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFzQjtRQUMxQywwQkFBcUIsR0FBckIscUJBQXFCLENBQXVCO1FBWnJDLGtCQUFhLEdBQW1CLEVBQUUsQ0FBQztRQUVwRCxlQUFVLEdBQUcsS0FBSyxDQUFDO1FBQ25CLGNBQVMsR0FBRyxJQUFJLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUN4QixVQUFLLEdBQTZCLElBQUksQ0FBQztJQVMzQyxDQUFDO0lBUEwsSUFDSSxRQUFRLEtBQUssT0FBTyxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7SUFRN0MsUUFBUTtRQUNOLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUNyQixJQUFJLENBQUMscUJBQXFCLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUM1RCxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsS0FBSyxFQUFFLGVBQWUsRUFBRSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQ2hFLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLE1BQU0sQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDO1FBQ3JFLENBQUMsQ0FBQyxFQUNGLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQzFELElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDdkIsQ0FBQyxDQUFDLENBQ0gsQ0FBQztJQUNKLENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7SUFDbkYsQ0FBQztJQUVELE1BQU07UUFDSixJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDZCxJQUFJLENBQUMscUJBQXFCLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNwRDtJQUNILENBQUM7SUFFRCxNQUFNO1FBQ0osSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxjQUFjLENBQUMsRUFBRTtZQUNuRyxPQUFPO1NBQ1I7UUFDRCxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRTtZQUN0QixJQUFJLENBQUMscUJBQXFCLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMzRSxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxNQUFNO1FBQ0osSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN0QixDQUFDO0lBRU8sUUFBUSxDQUFDLEtBQStCO1FBQzlDLElBQUksS0FBSyxLQUFLLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDeEIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7WUFDbkIsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLEVBQUUsSUFBSSxLQUFLLGNBQWM7Z0JBQzlDLENBQUMsS0FBSyxFQUFFLElBQUksSUFBSSxJQUFJLENBQUMsb0JBQW9CLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxVQUFVLENBQUMsSUFBSSxJQUFJLENBQUM7WUFDbkYsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQ3hEO0lBQ0gsQ0FBQzs7Z0hBMURVLG1CQUFtQjtvR0FBbkIsbUJBQW1CLDZIQWZwQjs7Ozs7Ozs7R0FRVDsyRkFPVSxtQkFBbUI7a0JBakIvQixTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSw0QkFBNEI7b0JBQ3RDLFFBQVEsRUFBRTs7Ozs7Ozs7R0FRVDtvQkFDRCxNQUFNLEVBQUUsQ0FBQzs7OztHQUlSLENBQUM7aUJBQ0g7MktBU0ssUUFBUTtzQkFEWCxXQUFXO3VCQUFDLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEhvc3RCaW5kaW5nLCBPbkRlc3Ryb3ksIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUNvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBGb3JtbHlGaWVsZENvbmZpZyB9IGZyb20gJ0BuZ3gtZm9ybWx5L2NvcmUnO1xuaW1wb3J0IHsgRmllbGRzU2VydmljZSwgRm9ybWx5RGVzaWduZXJDb25maWcsIEZvcm1seURlc2lnbmVyU2VydmljZSB9IGZyb20gJy4uLyc7XG5pbXBvcnQgeyBjbG9uZURlZXAgfSBmcm9tICcuLi91dGlsJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiwgdGltZXIgfSBmcm9tICdyeGpzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZm9ybWx5LWRlc2lnbmVyLXByb3BlcnRpZXMnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxmb3JtbHktZGVzaWduZXItZmllbGQtZWRpdG9yICNlZGl0b3IgW2ZpZWxkR3JvdXBdPVwiZmllbGRHcm91cFwiIFtoYXNDb250ZW50XT1cInRydWVcIiBbc2hvd1R5cGVdPVwidHJ1ZVwiIFtzaG93V3JhcHBlcnNdPVwidHJ1ZVwiIFtmb3JtQ29udHJvbF09XCJmaWVsZEVkaXRcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJmb290ZXJcIj5cbiAgICAgICAgPGJ1dHRvbiAoY2xpY2spPVwicmVtb3ZlKClcIiBjbGFzcz1cImJ0biBidG4tc2Vjb25kYXJ5IG1yLTFcIj5SZW1vdmU8L2J1dHRvbj5cbiAgICAgICAgPGJ1dHRvbiAoY2xpY2spPVwiY2FuY2VsKClcIiBjbGFzcz1cImJ0biBidG4tc2Vjb25kYXJ5IG1sLWF1dG8gbXItMVwiPkNhbmNlbDwvYnV0dG9uPlxuICAgICAgICA8YnV0dG9uIFtkaXNhYmxlZF09XCJlZGl0b3IuaW52YWxpZFwiIChjbGljayk9XCJhY2NlcHQoKVwiIGNsYXNzPVwiYnRuIGJ0bi1wcmltYXJ5XCI+QXBwbHk8L2J1dHRvbj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZm9ybWx5LWRlc2lnbmVyLWZpZWxkLWVkaXRvcj5cbiAgYCxcbiAgc3R5bGVzOiBbYFxuICAgIC5mb290ZXIge1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICB9XG4gIGBdXG59KVxuZXhwb3J0IGNsYXNzIFByb3BlcnRpZXNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIHByaXZhdGUgcmVhZG9ubHkgc3Vic2NyaXB0aW9uczogU3Vic2NyaXB0aW9uW10gPSBbXTtcblxuICBmaWVsZEdyb3VwID0gZmFsc2U7XG4gIGZpZWxkRWRpdCA9IG5ldyBGb3JtQ29udHJvbCh7fSk7XG4gIHByaXZhdGUgZmllbGQ6IEZvcm1seUZpZWxkQ29uZmlnIHwgbnVsbCA9IG51bGw7XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5kLW5vbmUnKVxuICBnZXQgaGFzRmllbGQoKSB7IHJldHVybiB0aGlzLmZpZWxkID09IG51bGw7IH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGZpZWxkc1NlcnZpY2U6IEZpZWxkc1NlcnZpY2UsXG4gICAgcHJpdmF0ZSBmb3JtbHlEZXNpZ25lckNvbmZpZzogRm9ybWx5RGVzaWduZXJDb25maWcsXG4gICAgcHJpdmF0ZSBmb3JtbHlEZXNpZ25lclNlcnZpY2U6IEZvcm1seURlc2lnbmVyU2VydmljZVxuICApIHsgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKFxuICAgICAgdGhpcy5mb3JtbHlEZXNpZ25lclNlcnZpY2UuZGVzaWduZXJGaWVsZHMkLnN1YnNjcmliZShmaWVsZHMgPT4ge1xuICAgICAgICBjb25zdCBkZXNpZ25lcklkID0gdGhpcy5maWVsZD8udGVtcGxhdGVPcHRpb25zPy5bJyRkZXNpZ25lcklkJ107XG4gICAgICAgIHRoaXMuc2V0RmllbGQodGhpcy5maWVsZHNTZXJ2aWNlLmZpbmQoZGVzaWduZXJJZCwgZmllbGRzKSA/PyBudWxsKTtcbiAgICAgIH0pLFxuICAgICAgdGhpcy5mb3JtbHlEZXNpZ25lclNlcnZpY2Uuc2VsZWN0ZWRGaWVsZCQuc3Vic2NyaWJlKGZpZWxkID0+IHtcbiAgICAgICAgdGhpcy5zZXRGaWVsZChmaWVsZCk7XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuc3BsaWNlKDApLmZvckVhY2goc3Vic2NyaXB0aW9uID0+IHN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpKTtcbiAgfVxuXG4gIHJlbW92ZSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5maWVsZCkge1xuICAgICAgdGhpcy5mb3JtbHlEZXNpZ25lclNlcnZpY2UucmVtb3ZlRmllbGQodGhpcy5maWVsZCk7XG4gICAgfVxuICB9XG5cbiAgYWNjZXB0KCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5maWVsZHNTZXJ2aWNlLmNoZWNrRmllbGQodGhpcy5maWVsZEVkaXQudmFsdWUsIHRoaXMuZm9ybWx5RGVzaWduZXJTZXJ2aWNlLmRlc2lnbmVyRmllbGRzKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aW1lcigwKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgdGhpcy5mb3JtbHlEZXNpZ25lclNlcnZpY2UudXBkYXRlRmllbGQodGhpcy5maWVsZCwgdGhpcy5maWVsZEVkaXQudmFsdWUpO1xuICAgIH0pO1xuICB9XG5cbiAgY2FuY2VsKCk6IHZvaWQge1xuICAgIHRoaXMuc2V0RmllbGQobnVsbCk7XG4gIH1cblxuICBwcml2YXRlIHNldEZpZWxkKGZpZWxkOiBGb3JtbHlGaWVsZENvbmZpZyB8IG51bGwpOiB2b2lkIHtcbiAgICBpZiAoZmllbGQgIT09IHRoaXMuZmllbGQpIHtcbiAgICAgIHRoaXMuZmllbGQgPSBmaWVsZDtcbiAgICAgIHRoaXMuZmllbGRHcm91cCA9IGZpZWxkPy50eXBlID09PSAnZm9ybWx5LWdyb3VwJyB8fFxuICAgICAgICAoZmllbGQ/LnR5cGUgJiYgdGhpcy5mb3JtbHlEZXNpZ25lckNvbmZpZy50eXBlc1tmaWVsZC50eXBlXT8uZmllbGRHcm91cCkgIT0gbnVsbDtcbiAgICAgIHRoaXMuZmllbGRFZGl0LnNldFZhbHVlKGZpZWxkID8gY2xvbmVEZWVwKGZpZWxkKSA6IHt9KTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==