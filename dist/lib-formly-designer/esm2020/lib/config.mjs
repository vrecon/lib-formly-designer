import { Injectable } from '@angular/core';
import { DESIGNER_WRAPPER_NAME, FIELD_DESIGNER_WRAPPER_NAME } from './formly-designer-config';
import { FormlyDesignerWrapperComponent } from './wrappers/designer';
import { FormlyDesignerFieldWrapperComponent } from './wrappers/field-designer';
import * as i0 from "@angular/core";
import * as i1 from "./extensions/designer";
export const fieldComponents = [];
export const wrapperComponents = [
    FormlyDesignerWrapperComponent,
    FormlyDesignerFieldWrapperComponent
];
export class Config {
    constructor(designerExtension) {
        this.wrappers = [
            { name: DESIGNER_WRAPPER_NAME, component: FormlyDesignerWrapperComponent },
            { name: FIELD_DESIGNER_WRAPPER_NAME, component: FormlyDesignerFieldWrapperComponent },
        ];
        this.extensions = [
            { name: 'designer', extension: designerExtension }
        ];
    }
}
Config.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.6", ngImport: i0, type: Config, deps: [{ token: i1.DesignerExtension }], target: i0.ɵɵFactoryTarget.Injectable });
Config.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.2.6", ngImport: i0, type: Config });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.6", ngImport: i0, type: Config, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.DesignerExtension }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbGliLWZvcm1seS1kZXNpZ25lci9zcmMvbGliL2NvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRzNDLE9BQU8sRUFDTCxxQkFBcUIsRUFDckIsMkJBQTJCLEVBQzVCLE1BQU0sMEJBQTBCLENBQUM7QUFDbEMsT0FBTyxFQUFFLDhCQUE4QixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDckUsT0FBTyxFQUFFLG1DQUFtQyxFQUFFLE1BQU0sMkJBQTJCLENBQUM7OztBQUVoRixNQUFNLENBQUMsTUFBTSxlQUFlLEdBQUcsRUFBRSxDQUFDO0FBRWxDLE1BQU0sQ0FBQyxNQUFNLGlCQUFpQixHQUFHO0lBQy9CLDhCQUE4QjtJQUM5QixtQ0FBbUM7Q0FDcEMsQ0FBQztBQUdGLE1BQU0sT0FBTyxNQUFNO0lBR2pCLFlBQ0UsaUJBQW9DO1FBRXBDLElBQUksQ0FBQyxRQUFRLEdBQUc7WUFDZCxFQUFFLElBQUksRUFBRSxxQkFBcUIsRUFBRSxTQUFTLEVBQUUsOEJBQThCLEVBQUU7WUFDMUUsRUFBRSxJQUFJLEVBQUUsMkJBQTJCLEVBQUUsU0FBUyxFQUFFLG1DQUFtQyxFQUFFO1NBQ3RGLENBQUM7UUFDRixJQUFJLENBQUMsVUFBVSxHQUFHO1lBQ2hCLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsaUJBQWlCLEVBQUU7U0FDbkQsQ0FBQztJQUNKLENBQUM7O21HQWJVLE1BQU07dUdBQU4sTUFBTTsyRkFBTixNQUFNO2tCQURsQixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29uZmlnT3B0aW9uIH0gZnJvbSAnQG5neC1mb3JtbHkvY29yZSc7XG5pbXBvcnQgeyBEZXNpZ25lckV4dGVuc2lvbiB9IGZyb20gJy4vZXh0ZW5zaW9ucy9kZXNpZ25lcic7XG5pbXBvcnQge1xuICBERVNJR05FUl9XUkFQUEVSX05BTUUsXG4gIEZJRUxEX0RFU0lHTkVSX1dSQVBQRVJfTkFNRVxufSBmcm9tICcuL2Zvcm1seS1kZXNpZ25lci1jb25maWcnO1xuaW1wb3J0IHsgRm9ybWx5RGVzaWduZXJXcmFwcGVyQ29tcG9uZW50IH0gZnJvbSAnLi93cmFwcGVycy9kZXNpZ25lcic7XG5pbXBvcnQgeyBGb3JtbHlEZXNpZ25lckZpZWxkV3JhcHBlckNvbXBvbmVudCB9IGZyb20gJy4vd3JhcHBlcnMvZmllbGQtZGVzaWduZXInO1xuXG5leHBvcnQgY29uc3QgZmllbGRDb21wb25lbnRzID0gW107XG5cbmV4cG9ydCBjb25zdCB3cmFwcGVyQ29tcG9uZW50cyA9IFtcbiAgRm9ybWx5RGVzaWduZXJXcmFwcGVyQ29tcG9uZW50LFxuICBGb3JtbHlEZXNpZ25lckZpZWxkV3JhcHBlckNvbXBvbmVudFxuXTtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIENvbmZpZyBpbXBsZW1lbnRzIENvbmZpZ09wdGlvbiB7XG4gIHdyYXBwZXJzOiB7IG5hbWU6IHN0cmluZzsgY29tcG9uZW50OiBhbnk7IH1bXTtcbiAgZXh0ZW5zaW9uczogeyBuYW1lOiBzdHJpbmc7IGV4dGVuc2lvbjogYW55OyB9W107XG4gIGNvbnN0cnVjdG9yKFxuICAgIGRlc2lnbmVyRXh0ZW5zaW9uOiBEZXNpZ25lckV4dGVuc2lvblxuICApIHtcbiAgICB0aGlzLndyYXBwZXJzID0gW1xuICAgICAgeyBuYW1lOiBERVNJR05FUl9XUkFQUEVSX05BTUUsIGNvbXBvbmVudDogRm9ybWx5RGVzaWduZXJXcmFwcGVyQ29tcG9uZW50IH0sXG4gICAgICB7IG5hbWU6IEZJRUxEX0RFU0lHTkVSX1dSQVBQRVJfTkFNRSwgY29tcG9uZW50OiBGb3JtbHlEZXNpZ25lckZpZWxkV3JhcHBlckNvbXBvbmVudCB9LFxuICAgIF07XG4gICAgdGhpcy5leHRlbnNpb25zID0gW1xuICAgICAgeyBuYW1lOiAnZGVzaWduZXInLCBleHRlbnNpb246IGRlc2lnbmVyRXh0ZW5zaW9uIH1cbiAgICBdO1xuICB9XG59XG4iXX0=