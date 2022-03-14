import { Injectable } from '@angular/core';
import { DESIGNER_WRAPPER_NAME, FIELD_DESIGNER_WRAPPER_NAME } from '../formly-designer-config';
import * as i0 from "@angular/core";
/** Creates a wrapper sandwich to augment the form */
export class DesignerExtension {
    postPopulate(field) {
        // Only surround non-editor fields; assumes editor fields have no $designerId
        if (field?.templateOptions?.['$designerId']) {
            field.wrappers = [FIELD_DESIGNER_WRAPPER_NAME, ...(field.wrappers || []), DESIGNER_WRAPPER_NAME];
        }
    }
}
DesignerExtension.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.6", ngImport: i0, type: DesignerExtension, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
DesignerExtension.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.2.6", ngImport: i0, type: DesignerExtension });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.6", ngImport: i0, type: DesignerExtension, decorators: [{
            type: Injectable
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVzaWduZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3gtZm9ybWx5LWRlc2lnbmVyL3NyYy9saWIvZXh0ZW5zaW9ucy9kZXNpZ25lci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSwyQkFBMkIsRUFBRSxNQUFNLDJCQUEyQixDQUFDOztBQUUvRixxREFBcUQ7QUFFckQsTUFBTSxPQUFPLGlCQUFpQjtJQUM1QixZQUFZLENBQUMsS0FBd0I7UUFDbkMsNkVBQTZFO1FBQzdFLElBQUksS0FBSyxFQUFFLGVBQWUsRUFBRSxDQUFDLGFBQWEsQ0FBQyxFQUFFO1lBQzNDLEtBQUssQ0FBQyxRQUFRLEdBQUcsQ0FBQywyQkFBMkIsRUFBRSxHQUFHLENBQUMsS0FBSyxDQUFDLFFBQVEsSUFBSSxFQUFFLENBQUMsRUFBRSxxQkFBcUIsQ0FBQyxDQUFDO1NBQ2xHO0lBQ0gsQ0FBQzs7OEdBTlUsaUJBQWlCO2tIQUFqQixpQkFBaUI7MkZBQWpCLGlCQUFpQjtrQkFEN0IsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1seUV4dGVuc2lvbiwgRm9ybWx5RmllbGRDb25maWcgfSBmcm9tICdAbmd4LWZvcm1seS9jb3JlJztcbmltcG9ydCB7IERFU0lHTkVSX1dSQVBQRVJfTkFNRSwgRklFTERfREVTSUdORVJfV1JBUFBFUl9OQU1FIH0gZnJvbSAnLi4vZm9ybWx5LWRlc2lnbmVyLWNvbmZpZyc7XG5cbi8qKiBDcmVhdGVzIGEgd3JhcHBlciBzYW5kd2ljaCB0byBhdWdtZW50IHRoZSBmb3JtICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRGVzaWduZXJFeHRlbnNpb24gaW1wbGVtZW50cyBGb3JtbHlFeHRlbnNpb24ge1xuICBwb3N0UG9wdWxhdGUoZmllbGQ6IEZvcm1seUZpZWxkQ29uZmlnKSB7XG4gICAgLy8gT25seSBzdXJyb3VuZCBub24tZWRpdG9yIGZpZWxkczsgYXNzdW1lcyBlZGl0b3IgZmllbGRzIGhhdmUgbm8gJGRlc2lnbmVySWRcbiAgICBpZiAoZmllbGQ/LnRlbXBsYXRlT3B0aW9ucz8uWyckZGVzaWduZXJJZCddKSB7XG4gICAgICBmaWVsZC53cmFwcGVycyA9IFtGSUVMRF9ERVNJR05FUl9XUkFQUEVSX05BTUUsIC4uLihmaWVsZC53cmFwcGVycyB8fCBbXSksIERFU0lHTkVSX1dSQVBQRVJfTkFNRV07XG4gICAgfVxuICB9XG59XG4iXX0=