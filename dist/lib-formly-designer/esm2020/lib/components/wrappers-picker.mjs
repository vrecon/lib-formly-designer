import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { cloneDeep, isArray, isObject } from '../util';
import * as i0 from "@angular/core";
import * as i1 from "../formly-designer-config";
import * as i2 from "../formly-designer.service";
import * as i3 from "./wrapper-picker";
import * as i4 from "./wrapper-editor";
import * as i5 from "@angular/common";
import * as i6 from "@angular/forms";
export class WrappersPickerComponent {
    constructor(formlyDesignerConfig, formlyDesignerService) {
        this.formlyDesignerConfig = formlyDesignerConfig;
        this.formlyDesignerService = formlyDesignerService;
        this.selected = new EventEmitter();
        this.wrapper = null;
        this.fieldEdit = new FormControl({});
        this.wrappers = [];
    }
    ngOnChanges(changes) {
        if (changes['field']) {
            this.wrappers = this.formlyDesignerService.getWrappers(changes['field'].currentValue);
        }
    }
    get $modal() {
        return $(this.modalRef?.nativeElement);
    }
    onWrapperSelected(field) {
        this.selected.emit(field);
    }
    edit(index) {
        this.wrapper = this.wrappers[index];
        if (isObject(this.field)) {
            const field = cloneDeep(this.field);
            if (isArray(field?.wrappers)) {
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
    }
    remove(index) {
        const fieldWrappersIndex = this.field?.wrappers?.indexOf(this.wrappers[index]) ?? -1;
        if (fieldWrappersIndex < 0) {
            return;
        }
        const field = cloneDeep(this.field);
        field.wrappers.splice(fieldWrappersIndex, 1);
        this.field = this.formlyDesignerService.createPrunedField(field);
        this.selected.emit(this.field);
    }
    onApply() {
        this.field = this.formlyDesignerService.createPrunedField(this.fieldEdit.value);
        this.selected.emit(this.field);
        this.$modal.modal('hide');
    }
}
WrappersPickerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.6", ngImport: i0, type: WrappersPickerComponent, deps: [{ token: i1.FormlyDesignerConfig }, { token: i2.FormlyDesignerService }], target: i0.ɵɵFactoryTarget.Component });
WrappersPickerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.2.6", type: WrappersPickerComponent, selector: "formly-designer-wrappers-picker", inputs: { field: "field" }, outputs: { selected: "selected" }, viewQueries: [{ propertyName: "modalRef", first: true, predicate: ["modal"], descendants: true, static: true }], usesOnChanges: true, ngImport: i0, template: `
    <div class="form-group">
      <div class="input-group">
        <formly-designer-wrapper-picker [field]="field" (selected)="onWrapperSelected($event)">
        </formly-designer-wrapper-picker>
      </div>
      <div *ngFor="let wrapper of wrappers; let i = index" class="badge badge-default noselect" (click)="edit(i)">
        {{ wrapper }}&nbsp;&nbsp;<i class="fa fa-times" aria-hidden="true" (click)="remove(i)"></i>
      </div>
    </div>
    <div #modal class="modal fade" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Edit {{ wrapper }}</h5>
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
    `, isInline: true, styles: [".badge{margin-right:.25em}.badge{cursor:pointer}.noselect{-webkit-user-select:none;user-select:none}\n"], components: [{ type: i3.WrapperPickerComponent, selector: "formly-designer-wrapper-picker", inputs: ["field"], outputs: ["selected"] }, { type: i4.WrapperEditorComponent, selector: "formly-designer-wrapper-editor", inputs: ["wrapper"] }], directives: [{ type: i5.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i6.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i6.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.6", ngImport: i0, type: WrappersPickerComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'formly-designer-wrappers-picker',
                    template: `
    <div class="form-group">
      <div class="input-group">
        <formly-designer-wrapper-picker [field]="field" (selected)="onWrapperSelected($event)">
        </formly-designer-wrapper-picker>
      </div>
      <div *ngFor="let wrapper of wrappers; let i = index" class="badge badge-default noselect" (click)="edit(i)">
        {{ wrapper }}&nbsp;&nbsp;<i class="fa fa-times" aria-hidden="true" (click)="remove(i)"></i>
      </div>
    </div>
    <div #modal class="modal fade" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Edit {{ wrapper }}</h5>
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
    `,
                    styles: [`
    .badge {
      margin-right: .25em;
    }
    .badge {
      cursor: pointer;
    }
    .noselect {
      -webkit-user-select: none;
      -khtml-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
    }
  `]
                }]
        }], ctorParameters: function () { return [{ type: i1.FormlyDesignerConfig }, { type: i2.FormlyDesignerService }]; }, propDecorators: { modalRef: [{
                type: ViewChild,
                args: ['modal', { static: true }]
            }], field: [{
                type: Input
            }], selected: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3JhcHBlcnMtcGlja2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbGliLWZvcm1seS1kZXNpZ25lci9zcmMvbGliL2NvbXBvbmVudHMvd3JhcHBlcnMtcGlja2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQWMsWUFBWSxFQUFFLEtBQUssRUFBYSxNQUFNLEVBQWlCLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN4SCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFJN0MsT0FBTyxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sU0FBUyxDQUFDOzs7Ozs7OztBQW9EdkQsTUFBTSxPQUFPLHVCQUF1QjtJQVVsQyxZQUNVLG9CQUEwQyxFQUMxQyxxQkFBNEM7UUFENUMseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFzQjtRQUMxQywwQkFBcUIsR0FBckIscUJBQXFCLENBQXVCO1FBVDVDLGFBQVEsR0FBRyxJQUFJLFlBQVksRUFBcUIsQ0FBQztRQUUzRCxZQUFPLEdBQWtCLElBQUksQ0FBQztRQUM5QixjQUFTLEdBQUcsSUFBSSxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUM7UUFFaEMsYUFBUSxHQUFhLEVBQUUsQ0FBQztJQUtwQixDQUFDO0lBRUwsV0FBVyxDQUFDLE9BQXNCO1FBQ2hDLElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ3BCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUM7U0FDdkY7SUFDSCxDQUFDO0lBRUQsSUFBWSxNQUFNO1FBQ2hCLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsYUFBYSxDQUFRLENBQUM7SUFDaEQsQ0FBQztJQUVELGlCQUFpQixDQUFDLEtBQXdCO1FBQ3hDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFFRCxJQUFJLENBQUMsS0FBYTtRQUNoQixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDcEMsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ3hCLE1BQU0sS0FBSyxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDcEMsSUFBSSxPQUFPLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxFQUFFO2dCQUM1QixJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFFL0IsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxDQUFDO2dCQUN2RSxJQUFJLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtvQkFDeEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7aUJBQzNCO3FCQUFNO29CQUNMLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztpQkFDaEI7YUFDRjtTQUNGO0lBQ0gsQ0FBQztJQUVELE1BQU0sQ0FBQyxLQUFhO1FBQ2xCLE1BQU0sa0JBQWtCLEdBQUcsSUFBSSxDQUFDLEtBQUssRUFBRSxRQUFRLEVBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNyRixJQUFJLGtCQUFrQixHQUFHLENBQUMsRUFBRTtZQUMxQixPQUFPO1NBQ1I7UUFFRCxNQUFNLEtBQUssR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBc0IsQ0FBQztRQUN4RCxLQUFLLENBQUMsUUFBcUIsQ0FBQyxNQUFNLENBQUMsa0JBQWtCLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDM0QsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMscUJBQXFCLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDakUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFFRCxPQUFPO1FBQ0wsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMscUJBQXFCLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNoRixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDL0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDNUIsQ0FBQzs7b0hBOURVLHVCQUF1Qjt3R0FBdkIsdUJBQXVCLDRRQWhEeEI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7S0ErQlA7MkZBaUJRLHVCQUF1QjtrQkFsRG5DLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLGlDQUFpQztvQkFDM0MsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tBK0JQO29CQUNILE1BQU0sRUFBRSxDQUFDOzs7Ozs7Ozs7Ozs7OztHQWNSLENBQUM7aUJBQ0g7K0lBRXVDLFFBQVE7c0JBQTdDLFNBQVM7dUJBQUMsT0FBTyxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtnQkFDM0IsS0FBSztzQkFBYixLQUFLO2dCQUNJLFFBQVE7c0JBQWpCLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uQ2hhbmdlcywgT3V0cHV0LCBTaW1wbGVDaGFuZ2VzLCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1Db250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgRm9ybWx5RmllbGRDb25maWcgfSBmcm9tICdAbmd4LWZvcm1seS9jb3JlJztcbmltcG9ydCB7IEZvcm1seURlc2lnbmVyQ29uZmlnIH0gZnJvbSAnLi4vZm9ybWx5LWRlc2lnbmVyLWNvbmZpZyc7XG5pbXBvcnQgeyBGb3JtbHlEZXNpZ25lclNlcnZpY2UgfSBmcm9tICcuLi9mb3JtbHktZGVzaWduZXIuc2VydmljZSc7XG5pbXBvcnQgeyBjbG9uZURlZXAsIGlzQXJyYXksIGlzT2JqZWN0IH0gZnJvbSAnLi4vdXRpbCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Zvcm1seS1kZXNpZ25lci13cmFwcGVycy1waWNrZXInLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXBcIj5cbiAgICAgICAgPGZvcm1seS1kZXNpZ25lci13cmFwcGVyLXBpY2tlciBbZmllbGRdPVwiZmllbGRcIiAoc2VsZWN0ZWQpPVwib25XcmFwcGVyU2VsZWN0ZWQoJGV2ZW50KVwiPlxuICAgICAgICA8L2Zvcm1seS1kZXNpZ25lci13cmFwcGVyLXBpY2tlcj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiAqbmdGb3I9XCJsZXQgd3JhcHBlciBvZiB3cmFwcGVyczsgbGV0IGkgPSBpbmRleFwiIGNsYXNzPVwiYmFkZ2UgYmFkZ2UtZGVmYXVsdCBub3NlbGVjdFwiIChjbGljayk9XCJlZGl0KGkpXCI+XG4gICAgICAgIHt7IHdyYXBwZXIgfX0mbmJzcDsmbmJzcDs8aSBjbGFzcz1cImZhIGZhLXRpbWVzXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCIgKGNsaWNrKT1cInJlbW92ZShpKVwiPjwvaT5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICAgIDxkaXYgI21vZGFsIGNsYXNzPVwibW9kYWwgZmFkZVwiIHRhYmluZGV4PVwiLTFcIiByb2xlPVwiZGlhbG9nXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwibW9kYWwtZGlhbG9nIG1vZGFsLWxnXCIgcm9sZT1cImRvY3VtZW50XCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJtb2RhbC1jb250ZW50XCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGFsLWhlYWRlclwiPlxuICAgICAgICAgICAgPGg1IGNsYXNzPVwibW9kYWwtdGl0bGVcIj5FZGl0IHt7IHdyYXBwZXIgfX08L2g1PlxuICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJjbG9zZVwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCIgYXJpYS1sYWJlbD1cIkNhbmNlbFwiPlxuICAgICAgICAgICAgICA8c3BhbiBhcmlhLWhpZGRlbj1cInRydWVcIj4mdGltZXM7PC9zcGFuPlxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGFsLWJvZHlcIj5cbiAgICAgICAgICAgIDxmb3JtbHktZGVzaWduZXItd3JhcHBlci1lZGl0b3IgI2VkaXRvciBbZm9ybUNvbnRyb2xdPVwiZmllbGRFZGl0XCIgW3dyYXBwZXJdPVwid3JhcHBlclwiPlxuICAgICAgICAgICAgPC9mb3JtbHktZGVzaWduZXItd3JhcHBlci1lZGl0b3I+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGFsLWZvb3RlclwiPlxuICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLXNlY29uZGFyeVwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCI+Q2FuY2VsPC9idXR0b24+XG4gICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tcHJpbWFyeVwiIChjbGljayk9XCJvbkFwcGx5KClcIlxuICAgICAgICAgICAgICBbZGlzYWJsZWRdPVwiZWRpdG9yLmludmFsaWRcIj5BcHBseTwvYnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICAgIGAsXG4gIHN0eWxlczogW2BcbiAgICAuYmFkZ2Uge1xuICAgICAgbWFyZ2luLXJpZ2h0OiAuMjVlbTtcbiAgICB9XG4gICAgLmJhZGdlIHtcbiAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICB9XG4gICAgLm5vc2VsZWN0IHtcbiAgICAgIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgICAta2h0bWwtdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgICAtbW96LXVzZXItc2VsZWN0OiBub25lO1xuICAgICAgLW1zLXVzZXItc2VsZWN0OiBub25lO1xuICAgICAgdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgfVxuICBgXVxufSlcbmV4cG9ydCBjbGFzcyBXcmFwcGVyc1BpY2tlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG4gIEBWaWV3Q2hpbGQoJ21vZGFsJywgeyBzdGF0aWM6IHRydWUgfSkgbW9kYWxSZWY/OiBFbGVtZW50UmVmO1xuICBASW5wdXQoKSBmaWVsZD86IEZvcm1seUZpZWxkQ29uZmlnO1xuICBAT3V0cHV0KCkgc2VsZWN0ZWQgPSBuZXcgRXZlbnRFbWl0dGVyPEZvcm1seUZpZWxkQ29uZmlnPigpO1xuXG4gIHdyYXBwZXI6IHN0cmluZyB8IG51bGwgPSBudWxsO1xuICBmaWVsZEVkaXQgPSBuZXcgRm9ybUNvbnRyb2woe30pO1xuXG4gIHdyYXBwZXJzOiBzdHJpbmdbXSA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgZm9ybWx5RGVzaWduZXJDb25maWc6IEZvcm1seURlc2lnbmVyQ29uZmlnLFxuICAgIHByaXZhdGUgZm9ybWx5RGVzaWduZXJTZXJ2aWNlOiBGb3JtbHlEZXNpZ25lclNlcnZpY2VcbiAgKSB7IH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgaWYgKGNoYW5nZXNbJ2ZpZWxkJ10pIHtcbiAgICAgIHRoaXMud3JhcHBlcnMgPSB0aGlzLmZvcm1seURlc2lnbmVyU2VydmljZS5nZXRXcmFwcGVycyhjaGFuZ2VzWydmaWVsZCddLmN1cnJlbnRWYWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBnZXQgJG1vZGFsKCk6IEpRdWVyeSAmIHsgbW9kYWw6IChjb21tYW5kOiBzdHJpbmcpID0+IHZvaWQgfSB7XG4gICAgcmV0dXJuICQodGhpcy5tb2RhbFJlZj8ubmF0aXZlRWxlbWVudCkgYXMgYW55O1xuICB9XG5cbiAgb25XcmFwcGVyU2VsZWN0ZWQoZmllbGQ6IEZvcm1seUZpZWxkQ29uZmlnKTogdm9pZCB7XG4gICAgdGhpcy5zZWxlY3RlZC5lbWl0KGZpZWxkKTtcbiAgfVxuXG4gIGVkaXQoaW5kZXg6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMud3JhcHBlciA9IHRoaXMud3JhcHBlcnNbaW5kZXhdO1xuICAgIGlmIChpc09iamVjdCh0aGlzLmZpZWxkKSkge1xuICAgICAgY29uc3QgZmllbGQgPSBjbG9uZURlZXAodGhpcy5maWVsZCk7XG4gICAgICBpZiAoaXNBcnJheShmaWVsZD8ud3JhcHBlcnMpKSB7XG4gICAgICAgIHRoaXMuZmllbGRFZGl0LnNldFZhbHVlKGZpZWxkKTtcblxuICAgICAgICBjb25zdCBmaWVsZHMgPSB0aGlzLmZvcm1seURlc2lnbmVyQ29uZmlnLndyYXBwZXJzW3RoaXMud3JhcHBlcl0uZmllbGRzO1xuICAgICAgICBpZiAoaXNBcnJheShmaWVsZHMpICYmIGZpZWxkcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgdGhpcy4kbW9kYWwubW9kYWwoJ3Nob3cnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLm9uQXBwbHkoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJlbW92ZShpbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgY29uc3QgZmllbGRXcmFwcGVyc0luZGV4ID0gdGhpcy5maWVsZD8ud3JhcHBlcnM/LmluZGV4T2YodGhpcy53cmFwcGVyc1tpbmRleF0pID8/IC0xO1xuICAgIGlmIChmaWVsZFdyYXBwZXJzSW5kZXggPCAwKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgZmllbGQgPSBjbG9uZURlZXAodGhpcy5maWVsZCkgYXMgRm9ybWx5RmllbGRDb25maWc7XG4gICAgKGZpZWxkLndyYXBwZXJzIGFzIHN0cmluZ1tdKS5zcGxpY2UoZmllbGRXcmFwcGVyc0luZGV4LCAxKTtcbiAgICB0aGlzLmZpZWxkID0gdGhpcy5mb3JtbHlEZXNpZ25lclNlcnZpY2UuY3JlYXRlUHJ1bmVkRmllbGQoZmllbGQpO1xuICAgIHRoaXMuc2VsZWN0ZWQuZW1pdCh0aGlzLmZpZWxkKTtcbiAgfVxuXG4gIG9uQXBwbHkoKTogdm9pZCB7XG4gICAgdGhpcy5maWVsZCA9IHRoaXMuZm9ybWx5RGVzaWduZXJTZXJ2aWNlLmNyZWF0ZVBydW5lZEZpZWxkKHRoaXMuZmllbGRFZGl0LnZhbHVlKTtcbiAgICB0aGlzLnNlbGVjdGVkLmVtaXQodGhpcy5maWVsZCk7XG4gICAgdGhpcy4kbW9kYWwubW9kYWwoJ2hpZGUnKTtcbiAgfVxufVxuIl19