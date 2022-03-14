import { Component, forwardRef, Input } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { timer } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "../";
import * as i2 from "@angular/forms";
import * as i3 from "@angular/common";
const TYPE_SELECT_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TypeSelectComponent),
    multi: true
};
export class TypeSelectComponent {
    constructor(formlyDesignerConfig) {
        this.formlyDesignerConfig = formlyDesignerConfig;
        this.formControl = new FormControl();
        this.types = [];
        this.onChange = (value) => { };
        this.onTouched = () => { };
    }
    ngAfterViewInit() {
        this.updateTypes();
    }
    ngOnChanges(change) {
        if (change['fieldGroup']) {
            this.updateTypes();
        }
    }
    ngOnInit() {
        this.valueChangesSubscription = this.formControl.valueChanges.subscribe(value => {
            if (this.onChange) {
                this.onChange(value);
            }
        });
    }
    ngOnDestroy() {
        this.valueChangesSubscription?.unsubscribe();
    }
    writeValue(obj) {
        this.formControl.setValue(obj);
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    setDisabledState(isDisabled) {
        if (isDisabled) {
            this.formControl.disable();
        }
        else {
            this.formControl.enable();
        }
    }
    updateTypes() {
        timer(0).subscribe(() => {
            this.types = this.getTypes();
            const type = this.fieldGroup && (this.type == null || this.type === '') ? 'formly-group' : this.type;
            if (this.types.some(option => option.value === type)) {
                this.formControl.setValue(type);
            }
            else if (this.types.length > 0) {
                this.formControl.setValue(this.types[0].value);
            }
        });
    }
    getTypes() {
        const types = [];
        const entries = Object.entries(this.formlyDesignerConfig.types);
        if (this.fieldGroup !== true) {
            entries.forEach(([key, value]) => {
                if (!value.fieldGroup) {
                    types.push({ label: key, value: key });
                }
            });
        }
        if (this.fieldGroup !== false) {
            types.push({ label: 'fieldGroup', value: 'formly-group' });
        }
        if (this.fieldGroup !== false) {
            entries.forEach(([key, value]) => {
                if (value.fieldGroup) {
                    types.push({ label: key, value: key });
                }
            });
        }
        return types;
    }
}
TypeSelectComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.6", ngImport: i0, type: TypeSelectComponent, deps: [{ token: i1.FormlyDesignerConfig }], target: i0.ɵɵFactoryTarget.Component });
TypeSelectComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.2.6", type: TypeSelectComponent, selector: "formly-designer-type-select", inputs: { type: "type", fieldGroup: "fieldGroup" }, providers: [TYPE_SELECT_CONTROL_VALUE_ACCESSOR], usesOnChanges: true, ngImport: i0, template: `
    <select [formControl]="formControl" class="custom-select">
      <option *ngFor="let type of types" [ngValue]="type.value">{{ type.label }}</option>
    </select>
  `, isInline: true, styles: ["select{width:100%}\n"], directives: [{ type: i2.SelectControlValueAccessor, selector: "select:not([multiple])[formControlName],select:not([multiple])[formControl],select:not([multiple])[ngModel]", inputs: ["compareWith"] }, { type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i2.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { type: i3.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i2.NgSelectOption, selector: "option", inputs: ["ngValue", "value"] }, { type: i2.ɵNgSelectMultipleOption, selector: "option", inputs: ["ngValue", "value"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.6", ngImport: i0, type: TypeSelectComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'formly-designer-type-select',
                    template: `
    <select [formControl]="formControl" class="custom-select">
      <option *ngFor="let type of types" [ngValue]="type.value">{{ type.label }}</option>
    </select>
  `,
                    styles: [`
    select {
      width: 100%;
    }
  `],
                    providers: [TYPE_SELECT_CONTROL_VALUE_ACCESSOR]
                }]
        }], ctorParameters: function () { return [{ type: i1.FormlyDesignerConfig }]; }, propDecorators: { type: [{
                type: Input
            }], fieldGroup: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZS1zZWxlY3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9saWItZm9ybWx5LWRlc2lnbmVyL3NyYy9saWIvY29tcG9uZW50cy90eXBlLXNlbGVjdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQWlCLFNBQVMsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUErQyxNQUFNLGVBQWUsQ0FBQztBQUN6SCxPQUFPLEVBQXdCLFdBQVcsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3RGLE9BQU8sRUFBZ0IsS0FBSyxFQUFFLE1BQU0sTUFBTSxDQUFDOzs7OztBQUczQyxNQUFNLGtDQUFrQyxHQUFRO0lBQzlDLE9BQU8sRUFBRSxpQkFBaUI7SUFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQztJQUNsRCxLQUFLLEVBQUUsSUFBSTtDQUNaLENBQUM7QUFnQkYsTUFBTSxPQUFPLG1CQUFtQjtJQVE5QixZQUNVLG9CQUEwQztRQUExQyx5QkFBb0IsR0FBcEIsb0JBQW9CLENBQXNCO1FBSnBELGdCQUFXLEdBQUcsSUFBSSxXQUFXLEVBQUUsQ0FBQztRQUNoQyxVQUFLLEdBQXVDLEVBQUUsQ0FBQztRQU1yQyxhQUFRLEdBQUcsQ0FBQyxLQUFVLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUMvQixjQUFTLEdBQUcsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBSDVCLENBQUM7SUFLTCxlQUFlO1FBQ2IsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUFFRCxXQUFXLENBQUMsTUFBcUI7UUFDL0IsSUFBSSxNQUFNLENBQUMsWUFBWSxDQUFDLEVBQUU7WUFDeEIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQ3BCO0lBQ0gsQ0FBQztJQUVELFFBQVE7UUFDTixJQUFJLENBQUMsd0JBQXdCLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQzlFLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtnQkFDakIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUN0QjtRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsd0JBQXdCLEVBQUUsV0FBVyxFQUFFLENBQUM7SUFDL0MsQ0FBQztJQUVELFVBQVUsQ0FBQyxHQUFRO1FBQ2pCLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFFRCxnQkFBZ0IsQ0FBQyxFQUFPO1FBQ3RCLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUFFRCxpQkFBaUIsQ0FBQyxFQUFPO1FBQ3ZCLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO0lBQ3RCLENBQUM7SUFFRCxnQkFBZ0IsQ0FBQyxVQUFtQjtRQUNsQyxJQUFJLFVBQVUsRUFBRTtZQUNkLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDNUI7YUFBTTtZQUNMLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLENBQUM7U0FDM0I7SUFDSCxDQUFDO0lBRU8sV0FBVztRQUNqQixLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRTtZQUN0QixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUM3QixNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsVUFBVSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQ3JHLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsS0FBSyxLQUFLLElBQUksQ0FBQyxFQUFFO2dCQUNwRCxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUNqQztpQkFBTSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtnQkFDaEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUNoRDtRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVPLFFBQVE7UUFDZCxNQUFNLEtBQUssR0FBdUMsRUFBRSxDQUFDO1FBQ3JELE1BQU0sT0FBTyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2hFLElBQUksSUFBSSxDQUFDLFVBQVUsS0FBSyxJQUFJLEVBQUU7WUFDNUIsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUU7Z0JBQy9CLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFFO29CQUNyQixLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztpQkFDeEM7WUFDSCxDQUFDLENBQUMsQ0FBQztTQUNKO1FBQ0QsSUFBSSxJQUFJLENBQUMsVUFBVSxLQUFLLEtBQUssRUFBRTtZQUM3QixLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsY0FBYyxFQUFFLENBQUMsQ0FBQztTQUM1RDtRQUNELElBQUksSUFBSSxDQUFDLFVBQVUsS0FBSyxLQUFLLEVBQUU7WUFDN0IsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUU7Z0JBQy9CLElBQUksS0FBSyxDQUFDLFVBQVUsRUFBRTtvQkFDcEIsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7aUJBQ3hDO1lBQ0gsQ0FBQyxDQUFDLENBQUM7U0FDSjtRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQzs7Z0hBMUZVLG1CQUFtQjtvR0FBbkIsbUJBQW1CLDBHQUZuQixDQUFDLGtDQUFrQyxDQUFDLCtDQVZyQzs7OztHQUlUOzJGQVFVLG1CQUFtQjtrQkFkL0IsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsNkJBQTZCO29CQUN2QyxRQUFRLEVBQUU7Ozs7R0FJVDtvQkFDRCxNQUFNLEVBQUUsQ0FBQzs7OztHQUlSLENBQUM7b0JBQ0YsU0FBUyxFQUFFLENBQUMsa0NBQWtDLENBQUM7aUJBQ2hEOzJHQUlVLElBQUk7c0JBQVosS0FBSztnQkFDRyxVQUFVO3NCQUFsQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWZ0ZXJWaWV3SW5pdCwgQ29tcG9uZW50LCBmb3J3YXJkUmVmLCBJbnB1dCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIE9uSW5pdCwgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIEZvcm1Db250cm9sLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiwgdGltZXIgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEZvcm1seURlc2lnbmVyQ29uZmlnIH0gZnJvbSAnLi4vJztcblxuY29uc3QgVFlQRV9TRUxFQ1RfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUjogYW55ID0ge1xuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gVHlwZVNlbGVjdENvbXBvbmVudCksXG4gIG11bHRpOiB0cnVlXG59O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdmb3JtbHktZGVzaWduZXItdHlwZS1zZWxlY3QnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxzZWxlY3QgW2Zvcm1Db250cm9sXT1cImZvcm1Db250cm9sXCIgY2xhc3M9XCJjdXN0b20tc2VsZWN0XCI+XG4gICAgICA8b3B0aW9uICpuZ0Zvcj1cImxldCB0eXBlIG9mIHR5cGVzXCIgW25nVmFsdWVdPVwidHlwZS52YWx1ZVwiPnt7IHR5cGUubGFiZWwgfX08L29wdGlvbj5cbiAgICA8L3NlbGVjdD5cbiAgYCxcbiAgc3R5bGVzOiBbYFxuICAgIHNlbGVjdCB7XG4gICAgICB3aWR0aDogMTAwJTtcbiAgICB9XG4gIGBdLFxuICBwcm92aWRlcnM6IFtUWVBFX1NFTEVDVF9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SXVxufSlcbmV4cG9ydCBjbGFzcyBUeXBlU2VsZWN0Q29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE9uQ2hhbmdlcywgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBwcml2YXRlIHZhbHVlQ2hhbmdlc1N1YnNjcmlwdGlvbj86IFN1YnNjcmlwdGlvbjtcblxuICBASW5wdXQoKSB0eXBlPzogc3RyaW5nO1xuICBASW5wdXQoKSBmaWVsZEdyb3VwPzogYm9vbGVhbjtcbiAgZm9ybUNvbnRyb2wgPSBuZXcgRm9ybUNvbnRyb2woKTtcbiAgdHlwZXM6IHsgbGFiZWw6IHN0cmluZzsgdmFsdWU6IHN0cmluZyB9W10gPSBbXTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGZvcm1seURlc2lnbmVyQ29uZmlnOiBGb3JtbHlEZXNpZ25lckNvbmZpZ1xuICApIHsgfVxuXG4gIHByb3RlY3RlZCBvbkNoYW5nZSA9ICh2YWx1ZTogYW55KSA9PiB7IH07XG4gIHByb3RlY3RlZCBvblRvdWNoZWQgPSAoKSA9PiB7IH07XG5cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIHRoaXMudXBkYXRlVHlwZXMoKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZTogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIGlmIChjaGFuZ2VbJ2ZpZWxkR3JvdXAnXSkge1xuICAgICAgdGhpcy51cGRhdGVUeXBlcygpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMudmFsdWVDaGFuZ2VzU3Vic2NyaXB0aW9uID0gdGhpcy5mb3JtQ29udHJvbC52YWx1ZUNoYW5nZXMuc3Vic2NyaWJlKHZhbHVlID0+IHtcbiAgICAgIGlmICh0aGlzLm9uQ2hhbmdlKSB7XG4gICAgICAgIHRoaXMub25DaGFuZ2UodmFsdWUpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy52YWx1ZUNoYW5nZXNTdWJzY3JpcHRpb24/LnVuc3Vic2NyaWJlKCk7XG4gIH1cblxuICB3cml0ZVZhbHVlKG9iajogYW55KSB7XG4gICAgdGhpcy5mb3JtQ29udHJvbC5zZXRWYWx1ZShvYmopO1xuICB9XG5cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KSB7XG4gICAgdGhpcy5vbkNoYW5nZSA9IGZuO1xuICB9XG5cbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSkge1xuICAgIHRoaXMub25Ub3VjaGVkID0gZm47XG4gIH1cblxuICBzZXREaXNhYmxlZFN0YXRlKGlzRGlzYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICBpZiAoaXNEaXNhYmxlZCkge1xuICAgICAgdGhpcy5mb3JtQ29udHJvbC5kaXNhYmxlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZm9ybUNvbnRyb2wuZW5hYmxlKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSB1cGRhdGVUeXBlcygpOiB2b2lkIHtcbiAgICB0aW1lcigwKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgdGhpcy50eXBlcyA9IHRoaXMuZ2V0VHlwZXMoKTtcbiAgICAgIGNvbnN0IHR5cGUgPSB0aGlzLmZpZWxkR3JvdXAgJiYgKHRoaXMudHlwZSA9PSBudWxsIHx8IHRoaXMudHlwZSA9PT0gJycpID8gJ2Zvcm1seS1ncm91cCcgOiB0aGlzLnR5cGU7XG4gICAgICBpZiAodGhpcy50eXBlcy5zb21lKG9wdGlvbiA9PiBvcHRpb24udmFsdWUgPT09IHR5cGUpKSB7XG4gICAgICAgIHRoaXMuZm9ybUNvbnRyb2wuc2V0VmFsdWUodHlwZSk7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMudHlwZXMubGVuZ3RoID4gMCkge1xuICAgICAgICB0aGlzLmZvcm1Db250cm9sLnNldFZhbHVlKHRoaXMudHlwZXNbMF0udmFsdWUpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRUeXBlcygpOiB7IGxhYmVsOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcgfVtdIHtcbiAgICBjb25zdCB0eXBlczogeyBsYWJlbDogc3RyaW5nLCB2YWx1ZTogc3RyaW5nIH1bXSA9IFtdO1xuICAgIGNvbnN0IGVudHJpZXMgPSBPYmplY3QuZW50cmllcyh0aGlzLmZvcm1seURlc2lnbmVyQ29uZmlnLnR5cGVzKTtcbiAgICBpZiAodGhpcy5maWVsZEdyb3VwICE9PSB0cnVlKSB7XG4gICAgICBlbnRyaWVzLmZvckVhY2goKFtrZXksIHZhbHVlXSkgPT4ge1xuICAgICAgICBpZiAoIXZhbHVlLmZpZWxkR3JvdXApIHtcbiAgICAgICAgICB0eXBlcy5wdXNoKHsgbGFiZWw6IGtleSwgdmFsdWU6IGtleSB9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICAgIGlmICh0aGlzLmZpZWxkR3JvdXAgIT09IGZhbHNlKSB7XG4gICAgICB0eXBlcy5wdXNoKHsgbGFiZWw6ICdmaWVsZEdyb3VwJywgdmFsdWU6ICdmb3JtbHktZ3JvdXAnIH0pO1xuICAgIH1cbiAgICBpZiAodGhpcy5maWVsZEdyb3VwICE9PSBmYWxzZSkge1xuICAgICAgZW50cmllcy5mb3JFYWNoKChba2V5LCB2YWx1ZV0pID0+IHtcbiAgICAgICAgaWYgKHZhbHVlLmZpZWxkR3JvdXApIHtcbiAgICAgICAgICB0eXBlcy5wdXNoKHsgbGFiZWw6IGtleSwgdmFsdWU6IGtleSB9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiB0eXBlcztcbiAgfVxufVxuIl19