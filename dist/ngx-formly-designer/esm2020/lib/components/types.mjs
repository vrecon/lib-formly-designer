import { Component } from '@angular/core';
import { DragDropType } from '../models';
import * as i0 from "@angular/core";
import * as i1 from "../";
import * as i2 from "@angular/common";
export class TypesComponent {
    constructor(dragDropService, formlyDesignerConfig) {
        this.dragDropService = dragDropService;
        this.formlyDesignerConfig = formlyDesignerConfig;
        this.types = [];
    }
    ngOnInit() {
        this.types = this.getTypes();
    }
    onDragStart(event, type) {
        event.dataTransfer?.setData(DragDropType.Type, type);
        this.dragDropService.beginDrag(type);
    }
    onDragEnd() {
        this.dragDropService.endDrag();
    }
    getTypes() {
        const types = [];
        const entries = Object.entries(this.formlyDesignerConfig.types);
        entries.forEach(([key, value]) => {
            if (!value.fieldGroup) {
                types.push({ label: key, value: key });
            }
        });
        /*  types.push({ label: 'fieldGroup', value: 'formly-group' });
          entries.forEach(([key, value]) => {
            if (value.fieldGroup) {
              types.push({ label: key, value: key });
            }
          });
      
         */
        return types;
    }
}
TypesComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.6", ngImport: i0, type: TypesComponent, deps: [{ token: i1.DragDropService }, { token: i1.FormlyDesignerConfig }], target: i0.ɵɵFactoryTarget.Component });
TypesComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.2.6", type: TypesComponent, selector: "formly-designer-types", ngImport: i0, template: `
    <div class="d-control" *ngFor="let type of types" draggable="true" (dragstart)="onDragStart($event, type.value)" (dragend)="onDragEnd()">
      {{ type.label }}
    </div>
  `, isInline: true, styles: [":host{display:flex;flex-direction:column}div{margin:2px;padding:.5rem;border-radius:.75rem;background-color:#bbdefb;line-break:anywhere;white-space:pre-line;cursor:grab;-webkit-user-select:none;user-select:none}\n"], directives: [{ type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.6", ngImport: i0, type: TypesComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'formly-designer-types',
                    template: `
    <div class="d-control" *ngFor="let type of types" draggable="true" (dragstart)="onDragStart($event, type.value)" (dragend)="onDragEnd()">
      {{ type.label }}
    </div>
  `,
                    styles: [`
    :host {
      display: flex;
      flex-direction: column;
    }
    div {
      margin: 2px;
      padding: .5rem;
      border-radius: .75rem;
      background-color: #bbdefb;
      line-break: anywhere;
      white-space: pre-line;
      cursor: grab;
      user-select: none;
    }
  `]
                }]
        }], ctorParameters: function () { return [{ type: i1.DragDropService }, { type: i1.FormlyDesignerConfig }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3gtZm9ybWx5LWRlc2lnbmVyL3NyYy9saWIvY29tcG9uZW50cy90eXBlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBRWxELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxXQUFXLENBQUM7Ozs7QUEwQnpDLE1BQU0sT0FBTyxjQUFjO0lBR3pCLFlBQ1UsZUFBZ0MsRUFDaEMsb0JBQTBDO1FBRDFDLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUNoQyx5QkFBb0IsR0FBcEIsb0JBQW9CLENBQXNCO1FBSnBELFVBQUssR0FBdUMsRUFBRSxDQUFDO0lBSzNDLENBQUM7SUFFTCxRQUFRO1FBQ04sSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDL0IsQ0FBQztJQUVELFdBQVcsQ0FBQyxLQUFnQixFQUFFLElBQVk7UUFDeEMsS0FBSyxDQUFDLFlBQVksRUFBRSxPQUFPLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNyRCxJQUFJLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBRUQsU0FBUztRQUNQLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDakMsQ0FBQztJQUVPLFFBQVE7UUFDZCxNQUFNLEtBQUssR0FBdUMsRUFBRSxDQUFDO1FBQ3JELE1BQU0sT0FBTyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2hFLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFO1lBQy9CLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFFO2dCQUNyQixLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQzthQUN4QztRQUNILENBQUMsQ0FBQyxDQUFDO1FBQ0w7Ozs7Ozs7V0FPRztRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQzs7MkdBdENVLGNBQWM7K0ZBQWQsY0FBYyw2REF0QmY7Ozs7R0FJVDsyRkFrQlUsY0FBYztrQkF4QjFCLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLHVCQUF1QjtvQkFDakMsUUFBUSxFQUFFOzs7O0dBSVQ7b0JBQ0QsTUFBTSxFQUFFLENBQUM7Ozs7Ozs7Ozs7Ozs7OztHQWVSLENBQUM7aUJBQ0giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRHJhZ0Ryb3BTZXJ2aWNlLCBGb3JtbHlEZXNpZ25lckNvbmZpZyB9IGZyb20gJy4uLyc7XG5pbXBvcnQgeyBEcmFnRHJvcFR5cGUgfSBmcm9tICcuLi9tb2RlbHMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdmb3JtbHktZGVzaWduZXItdHlwZXMnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgY2xhc3M9XCJkLWNvbnRyb2xcIiAqbmdGb3I9XCJsZXQgdHlwZSBvZiB0eXBlc1wiIGRyYWdnYWJsZT1cInRydWVcIiAoZHJhZ3N0YXJ0KT1cIm9uRHJhZ1N0YXJ0KCRldmVudCwgdHlwZS52YWx1ZSlcIiAoZHJhZ2VuZCk9XCJvbkRyYWdFbmQoKVwiPlxuICAgICAge3sgdHlwZS5sYWJlbCB9fVxuICAgIDwvZGl2PlxuICBgLFxuICBzdHlsZXM6IFtgXG4gICAgOmhvc3Qge1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgfVxuICAgIGRpdiB7XG4gICAgICBtYXJnaW46IDJweDtcbiAgICAgIHBhZGRpbmc6IC41cmVtO1xuICAgICAgYm9yZGVyLXJhZGl1czogLjc1cmVtO1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2JiZGVmYjtcbiAgICAgIGxpbmUtYnJlYWs6IGFueXdoZXJlO1xuICAgICAgd2hpdGUtc3BhY2U6IHByZS1saW5lO1xuICAgICAgY3Vyc29yOiBncmFiO1xuICAgICAgdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgfVxuICBgXVxufSlcbmV4cG9ydCBjbGFzcyBUeXBlc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIHR5cGVzOiB7IGxhYmVsOiBzdHJpbmc7IHZhbHVlOiBzdHJpbmcgfVtdID0gW107XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBkcmFnRHJvcFNlcnZpY2U6IERyYWdEcm9wU2VydmljZSxcbiAgICBwcml2YXRlIGZvcm1seURlc2lnbmVyQ29uZmlnOiBGb3JtbHlEZXNpZ25lckNvbmZpZ1xuICApIHsgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMudHlwZXMgPSB0aGlzLmdldFR5cGVzKCk7XG4gIH1cblxuICBvbkRyYWdTdGFydChldmVudDogRHJhZ0V2ZW50LCB0eXBlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBldmVudC5kYXRhVHJhbnNmZXI/LnNldERhdGEoRHJhZ0Ryb3BUeXBlLlR5cGUsIHR5cGUpO1xuICAgIHRoaXMuZHJhZ0Ryb3BTZXJ2aWNlLmJlZ2luRHJhZyh0eXBlKTtcbiAgfVxuXG4gIG9uRHJhZ0VuZCgpOiB2b2lkIHtcbiAgICB0aGlzLmRyYWdEcm9wU2VydmljZS5lbmREcmFnKCk7XG4gIH1cblxuICBwcml2YXRlIGdldFR5cGVzKCk6IHsgbGFiZWw6IHN0cmluZywgdmFsdWU6IHN0cmluZyB9W10ge1xuICAgIGNvbnN0IHR5cGVzOiB7IGxhYmVsOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcgfVtdID0gW107XG4gICAgY29uc3QgZW50cmllcyA9IE9iamVjdC5lbnRyaWVzKHRoaXMuZm9ybWx5RGVzaWduZXJDb25maWcudHlwZXMpO1xuICAgIGVudHJpZXMuZm9yRWFjaCgoW2tleSwgdmFsdWVdKSA9PiB7XG4gICAgICBpZiAoIXZhbHVlLmZpZWxkR3JvdXApIHtcbiAgICAgICAgdHlwZXMucHVzaCh7IGxhYmVsOiBrZXksIHZhbHVlOiBrZXkgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gIC8qICB0eXBlcy5wdXNoKHsgbGFiZWw6ICdmaWVsZEdyb3VwJywgdmFsdWU6ICdmb3JtbHktZ3JvdXAnIH0pO1xuICAgIGVudHJpZXMuZm9yRWFjaCgoW2tleSwgdmFsdWVdKSA9PiB7XG4gICAgICBpZiAodmFsdWUuZmllbGRHcm91cCkge1xuICAgICAgICB0eXBlcy5wdXNoKHsgbGFiZWw6IGtleSwgdmFsdWU6IGtleSB9KTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgKi9cbiAgICByZXR1cm4gdHlwZXM7XG4gIH1cblxufVxuIl19