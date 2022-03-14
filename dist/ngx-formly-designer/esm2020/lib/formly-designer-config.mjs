import { Inject, Injectable, InjectionToken } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@ngx-formly/core";
export const FORMLY_DESIGNER_CONFIG_TOKEN = new InjectionToken('FORMLY_DESIGNER_CONFIG_TOKEN');
export const DESIGNER_WRAPPER_NAME = '$designer';
export const FIELD_DESIGNER_WRAPPER_NAME = '$fieldDesigner';
export const DESIGNER_WRAPPER_TYPES = [
    DESIGNER_WRAPPER_NAME,
    FIELD_DESIGNER_WRAPPER_NAME,
];
export class FormlyDesignerConfig {
    constructor(configs = [], formlyConfig) {
        this.formlyConfig = formlyConfig;
        this.types = {};
        this.wrappers = {};
        this.settings = { showClassName: true };
        configs.forEach(config => this.addConfig(config));
    }
    addConfig(config) {
        if (config.settings) {
            this.setSettings(config.settings);
        }
        if (config.types) {
            this.setType(config.types);
        }
        if (config.wrappers) {
            this.setWrapper(config.wrappers);
        }
    }
    setSettings(settings) {
        if (settings.showClassName !== undefined) {
            this.settings.showClassName = !!settings.showClassName;
        }
    }
    setType(options) {
        if (Array.isArray(options)) {
            options.forEach((option) => {
                this.setType(option);
            });
        }
        else {
            // Throw if type isn't part of the formly config
            this.formlyConfig.getType(options.name);
            if (!this.types[options.name]) {
                this.types[options.name] = {};
            }
            const type = this.types[options.name];
            type.name = options.name;
            type.fieldArray = !!options.fieldArray;
            type.fieldGroup = !!options.fieldGroup;
            type.fields = options.fields;
        }
    }
    setWrapper(options) {
        if (Array.isArray(options)) {
            options.forEach((option) => {
                this.setWrapper(option);
            });
        }
        else {
            // Throw if wrapper isn't part of the formly config
            this.formlyConfig.getWrapper(options.name);
            if (!this.wrappers[options.name]) {
                this.wrappers[options.name] = {};
            }
            const wrapper = this.wrappers[options.name];
            wrapper.name = options.name;
            wrapper.fields = options.fields;
        }
    }
}
FormlyDesignerConfig.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.6", ngImport: i0, type: FormlyDesignerConfig, deps: [{ token: FORMLY_DESIGNER_CONFIG_TOKEN }, { token: i1.FormlyConfig }], target: i0.ɵɵFactoryTarget.Injectable });
FormlyDesignerConfig.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.2.6", ngImport: i0, type: FormlyDesignerConfig });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.6", ngImport: i0, type: FormlyDesignerConfig, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [FORMLY_DESIGNER_CONFIG_TOKEN]
                }] }, { type: i1.FormlyConfig }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybWx5LWRlc2lnbmVyLWNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL25neC1mb3JtbHktZGVzaWduZXIvc3JjL2xpYi9mb3JtbHktZGVzaWduZXItY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLGNBQWMsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7O0FBR25FLE1BQU0sQ0FBQyxNQUFNLDRCQUE0QixHQUFHLElBQUksY0FBYyxDQUFTLDhCQUE4QixDQUFDLENBQUM7QUFFdkcsTUFBTSxDQUFDLE1BQU0scUJBQXFCLEdBQUcsV0FBVyxDQUFDO0FBQ2pELE1BQU0sQ0FBQyxNQUFNLDJCQUEyQixHQUFHLGdCQUFnQixDQUFDO0FBQzVELE1BQU0sQ0FBQyxNQUFNLHNCQUFzQixHQUFHO0lBQ3BDLHFCQUFxQjtJQUNyQiwyQkFBMkI7Q0FDNUIsQ0FBQztBQUdGLE1BQU0sT0FBTyxvQkFBb0I7SUFDL0IsWUFDd0MsVUFBa0MsRUFBRSxFQUNsRSxZQUEwQjtRQUExQixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUtwQyxVQUFLLEdBQTJDLEVBQUUsQ0FBQztRQUNuRCxhQUFRLEdBQXVDLEVBQUUsQ0FBQztRQUNsRCxhQUFRLEdBQXFCLEVBQUUsYUFBYSxFQUFFLElBQUksRUFBRSxDQUFDO1FBTG5ELE9BQU8sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDcEQsQ0FBQztJQU1ELFNBQVMsQ0FBQyxNQUE0QjtRQUNwQyxJQUFJLE1BQU0sQ0FBQyxRQUFRLEVBQUU7WUFDbkIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDbkM7UUFDRCxJQUFJLE1BQU0sQ0FBQyxLQUFLLEVBQUU7WUFDaEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDNUI7UUFDRCxJQUFJLE1BQU0sQ0FBQyxRQUFRLEVBQUU7WUFDbkIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDbEM7SUFDSCxDQUFDO0lBRUQsV0FBVyxDQUFDLFFBQTBCO1FBQ3BDLElBQUksUUFBUSxDQUFDLGFBQWEsS0FBSyxTQUFTLEVBQUU7WUFDeEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUM7U0FDeEQ7SUFDSCxDQUFDO0lBRUQsT0FBTyxDQUFDLE9BQWtEO1FBQ3hELElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUMxQixPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUU7Z0JBQ3pCLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDdkIsQ0FBQyxDQUFDLENBQUM7U0FDSjthQUFNO1lBQ0wsZ0RBQWdEO1lBQ2hELElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUV4QyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQzdCLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUF1QixFQUFFLENBQUM7YUFDbkQ7WUFFRCxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN0QyxJQUFJLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUM7WUFDekIsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQztZQUN2QyxJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDO1lBQ3ZDLElBQUksQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQztTQUM5QjtJQUNILENBQUM7SUFFRCxVQUFVLENBQUMsT0FBMEM7UUFDbkQsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQzFCLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRTtnQkFDekIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUMxQixDQUFDLENBQUMsQ0FBQztTQUNKO2FBQU07WUFDTCxtREFBbUQ7WUFDbkQsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBRTNDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDaEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQW1CLEVBQUUsQ0FBQzthQUNsRDtZQUVELE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzVDLE9BQU8sQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQztZQUM1QixPQUFPLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUM7U0FDakM7SUFDSCxDQUFDOztpSEFwRVUsb0JBQW9CLGtCQUVyQiw0QkFBNEI7cUhBRjNCLG9CQUFvQjsyRkFBcEIsb0JBQW9CO2tCQURoQyxVQUFVOzswQkFHTixNQUFNOzJCQUFDLDRCQUE0QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSwgSW5qZWN0aW9uVG9rZW4gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1seUNvbmZpZywgRm9ybWx5RmllbGRDb25maWcgfSBmcm9tICdAbmd4LWZvcm1seS9jb3JlJztcblxuZXhwb3J0IGNvbnN0IEZPUk1MWV9ERVNJR05FUl9DT05GSUdfVE9LRU4gPSBuZXcgSW5qZWN0aW9uVG9rZW48c3RyaW5nPignRk9STUxZX0RFU0lHTkVSX0NPTkZJR19UT0tFTicpO1xuXG5leHBvcnQgY29uc3QgREVTSUdORVJfV1JBUFBFUl9OQU1FID0gJyRkZXNpZ25lcic7XG5leHBvcnQgY29uc3QgRklFTERfREVTSUdORVJfV1JBUFBFUl9OQU1FID0gJyRmaWVsZERlc2lnbmVyJztcbmV4cG9ydCBjb25zdCBERVNJR05FUl9XUkFQUEVSX1RZUEVTID0gW1xuICBERVNJR05FUl9XUkFQUEVSX05BTUUsXG4gIEZJRUxEX0RFU0lHTkVSX1dSQVBQRVJfTkFNRSxcbl07XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBGb3JtbHlEZXNpZ25lckNvbmZpZyB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoRk9STUxZX0RFU0lHTkVSX0NPTkZJR19UT0tFTikgY29uZmlnczogRGVzaWduZXJDb25maWdPcHRpb25bXSA9IFtdLFxuICAgIHByaXZhdGUgZm9ybWx5Q29uZmlnOiBGb3JtbHlDb25maWdcbiAgKSB7XG4gICAgY29uZmlncy5mb3JFYWNoKGNvbmZpZyA9PiB0aGlzLmFkZENvbmZpZyhjb25maWcpKTtcbiAgfVxuXG4gIHR5cGVzOiB7IFtuYW1lOiBzdHJpbmddOiBEZXNpZ25lclR5cGVPcHRpb24gfSA9IHt9O1xuICB3cmFwcGVyczogeyBbbmFtZTogc3RyaW5nXTogRGVzaWduZXJPcHRpb24gfSA9IHt9O1xuICBzZXR0aW5nczogRGVzaWduZXJTZXR0aW5ncyA9IHsgc2hvd0NsYXNzTmFtZTogdHJ1ZSB9O1xuXG4gIGFkZENvbmZpZyhjb25maWc6IERlc2lnbmVyQ29uZmlnT3B0aW9uKTogdm9pZCB7XG4gICAgaWYgKGNvbmZpZy5zZXR0aW5ncykge1xuICAgICAgdGhpcy5zZXRTZXR0aW5ncyhjb25maWcuc2V0dGluZ3MpO1xuICAgIH1cbiAgICBpZiAoY29uZmlnLnR5cGVzKSB7XG4gICAgICB0aGlzLnNldFR5cGUoY29uZmlnLnR5cGVzKTtcbiAgICB9XG4gICAgaWYgKGNvbmZpZy53cmFwcGVycykge1xuICAgICAgdGhpcy5zZXRXcmFwcGVyKGNvbmZpZy53cmFwcGVycyk7XG4gICAgfVxuICB9XG5cbiAgc2V0U2V0dGluZ3Moc2V0dGluZ3M6IERlc2lnbmVyU2V0dGluZ3MpOiB2b2lkIHtcbiAgICBpZiAoc2V0dGluZ3Muc2hvd0NsYXNzTmFtZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLnNldHRpbmdzLnNob3dDbGFzc05hbWUgPSAhIXNldHRpbmdzLnNob3dDbGFzc05hbWU7XG4gICAgfVxuICB9XG5cbiAgc2V0VHlwZShvcHRpb25zOiBEZXNpZ25lclR5cGVPcHRpb24gfCBEZXNpZ25lclR5cGVPcHRpb25bXSk6IHZvaWQge1xuICAgIGlmIChBcnJheS5pc0FycmF5KG9wdGlvbnMpKSB7XG4gICAgICBvcHRpb25zLmZvckVhY2goKG9wdGlvbikgPT4ge1xuICAgICAgICB0aGlzLnNldFR5cGUob3B0aW9uKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBUaHJvdyBpZiB0eXBlIGlzbid0IHBhcnQgb2YgdGhlIGZvcm1seSBjb25maWdcbiAgICAgIHRoaXMuZm9ybWx5Q29uZmlnLmdldFR5cGUob3B0aW9ucy5uYW1lKTtcblxuICAgICAgaWYgKCF0aGlzLnR5cGVzW29wdGlvbnMubmFtZV0pIHtcbiAgICAgICAgdGhpcy50eXBlc1tvcHRpb25zLm5hbWVdID0gPERlc2lnbmVyVHlwZU9wdGlvbj57fTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgdHlwZSA9IHRoaXMudHlwZXNbb3B0aW9ucy5uYW1lXTtcbiAgICAgIHR5cGUubmFtZSA9IG9wdGlvbnMubmFtZTtcbiAgICAgIHR5cGUuZmllbGRBcnJheSA9ICEhb3B0aW9ucy5maWVsZEFycmF5O1xuICAgICAgdHlwZS5maWVsZEdyb3VwID0gISFvcHRpb25zLmZpZWxkR3JvdXA7XG4gICAgICB0eXBlLmZpZWxkcyA9IG9wdGlvbnMuZmllbGRzO1xuICAgIH1cbiAgfVxuXG4gIHNldFdyYXBwZXIob3B0aW9uczogRGVzaWduZXJPcHRpb24gfCBEZXNpZ25lck9wdGlvbltdKTogdm9pZCB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkob3B0aW9ucykpIHtcbiAgICAgIG9wdGlvbnMuZm9yRWFjaCgob3B0aW9uKSA9PiB7XG4gICAgICAgIHRoaXMuc2V0V3JhcHBlcihvcHRpb24pO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFRocm93IGlmIHdyYXBwZXIgaXNuJ3QgcGFydCBvZiB0aGUgZm9ybWx5IGNvbmZpZ1xuICAgICAgdGhpcy5mb3JtbHlDb25maWcuZ2V0V3JhcHBlcihvcHRpb25zLm5hbWUpO1xuXG4gICAgICBpZiAoIXRoaXMud3JhcHBlcnNbb3B0aW9ucy5uYW1lXSkge1xuICAgICAgICB0aGlzLndyYXBwZXJzW29wdGlvbnMubmFtZV0gPSA8RGVzaWduZXJPcHRpb24+e307XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHdyYXBwZXIgPSB0aGlzLndyYXBwZXJzW29wdGlvbnMubmFtZV07XG4gICAgICB3cmFwcGVyLm5hbWUgPSBvcHRpb25zLm5hbWU7XG4gICAgICB3cmFwcGVyLmZpZWxkcyA9IG9wdGlvbnMuZmllbGRzO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIERlc2lnbmVyT3B0aW9uIHtcbiAgbmFtZTogc3RyaW5nO1xuICBmaWVsZHM/OiBGb3JtbHlGaWVsZENvbmZpZ1tdO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIERlc2lnbmVyVHlwZU9wdGlvbiBleHRlbmRzIERlc2lnbmVyT3B0aW9uIHtcbiAgZmllbGRBcnJheT86IGJvb2xlYW47XG4gIGZpZWxkR3JvdXA/OiBib29sZWFuO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIERlc2lnbmVyU2V0dGluZ3Mge1xuICBzaG93Q2xhc3NOYW1lPzogYm9vbGVhbjtcbiAgZmlsdGVyV3JhcHBlcj86ICh3cmFwcGVyOiBzdHJpbmcsIGZpZWxkOiBGb3JtbHlGaWVsZENvbmZpZykgPT4gYm9vbGVhbjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBEZXNpZ25lckNvbmZpZ09wdGlvbiB7XG4gIHNldHRpbmdzPzogRGVzaWduZXJTZXR0aW5ncztcbiAgdHlwZXM/OiBEZXNpZ25lclR5cGVPcHRpb25bXTtcbiAgd3JhcHBlcnM/OiBEZXNpZ25lck9wdGlvbltdO1xufVxuIl19