import { Injectable } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { DESIGNER_WRAPPER_TYPES } from './formly-designer-config';
import { cloneDeep, get, isArray, isEmpty, isFunction, isString, set, unset } from './util';
import * as i0 from "@angular/core";
import * as i1 from "./formly-designer-config";
import * as i2 from "./fields.service";
import * as i3 from "@ngx-formly/core";
export var FieldType;
(function (FieldType) {
    FieldType[FieldType["Plain"] = 0] = "Plain";
    FieldType[FieldType["Designer"] = 1] = "Designer";
})(FieldType || (FieldType = {}));
export class FormlyDesignerService {
    constructor(designerConfig, fieldsService, formlyConfig) {
        this.designerConfig = designerConfig;
        this.fieldsService = fieldsService;
        this.formlyConfig = formlyConfig;
        this._disabled = new BehaviorSubject(false);
        this._designerFields = new BehaviorSubject([]);
        this._fields = new BehaviorSubject([]);
        this._selectedField = new BehaviorSubject(null);
        this._model = new BehaviorSubject({});
    }
    get disabled() {
        return this._disabled.value;
    }
    set disabled(value) {
        this._disabled.next(!!value);
    }
    get disabled$() {
        return this._disabled.asObservable();
    }
    get selectedField$() {
        return this._selectedField.asObservable();
    }
    get selectedDesignerId() {
        return this._selectedField.getValue()?.templateOptions?.['$designerId'];
    }
    get designerFields() {
        return this._designerFields.value;
    }
    set designerFields(value) {
        // Prune the fields because ngx-formly pollutes them with internal state
        // causing incorrect behavior when re-applied.
        const fields = isArray(value) ? cloneDeep(value) : [];
        const designerFields = this.createPrunedFields(fields, FieldType.Designer);
        this._designerFields.next(designerFields);
        this._fields.next(this.createPrunedFields(cloneDeep(designerFields), FieldType.Plain));
    }
    get designerFields$() {
        return this._designerFields.asObservable();
    }
    get fields() {
        return this._fields.value;
    }
    set fields(value) {
        // Prune the fields because ngx-formly pollutes them with internal state
        // causing incorrect behavior when re-applied.
        const fields = cloneDeep(value);
        const designerFields = this.createPrunedFields(fields, FieldType.Designer);
        this.fieldsService.mutateFields(designerFields, false);
        this._selectedField.next(null);
        this._designerFields.next(designerFields);
        this._fields.next(this.createPrunedFields(cloneDeep(designerFields), FieldType.Plain));
    }
    get fields$() {
        return this._fields.asObservable();
    }
    get model() {
        return this._model.value;
    }
    set model(value) {
        this._model.next(value == null ? {} : value);
    }
    get model$() {
        return this._model.asObservable();
    }
    addField(field, index) {
        this.fieldsService.mutateField(field, false);
        const fields = cloneDeep(this.designerFields);
        const fieldIndex = (index == null || isNaN(index)) ? this.fields.length :
            Math.min(this.fields.length, Math.max(0, index));
        fields.splice(fieldIndex, 0, field);
        this.updateFields(fields);
    }
    createField(type) {
        const field = {};
        if (type !== 'formly-group') {
            field.type = type;
        }
        const designerType = this.designerConfig.types[type];
        if (designerType?.fieldArray) {
            field.fieldArray = { fieldGroup: [] };
        }
        if (type === 'formly-group' || designerType?.fieldGroup) {
            field.fieldGroup = [];
        }
        return field;
    }
    didClickField(value) {
        this._selectedField.next(value);
    }
    removeField(field) {
        this.unsetField(field);
        const designerId = field.templateOptions?.['$designerId'];
        if (this.replaceField(designerId, null, this.designerFields)) {
            this.removeControl(field.formControl);
        }
        this.updateFields();
    }
    updateField(original, modified) {
        const pruned = this.fieldsService.mutateField(this.createPrunedField(modified), false);
        const designerId = original?.templateOptions?.['$designerId'];
        if (this.replaceField(designerId, pruned, this.designerFields)) {
            if (original && original.formControl !== pruned.formControl) {
                this.unsetField(original);
                this.removeControl(original.formControl);
            }
            this.updateFields();
        }
    }
    getWrappers(field) {
        if (!field || !isArray(field.wrappers)) {
            return [];
        }
        const clonedField = cloneDeep(field);
        let wrappers = clonedField.wrappers = (clonedField.wrappers || []);
        const filterWrapper = this.designerConfig.settings.filterWrapper ?? ((wrapper, _) => wrapper !== 'form-field');
        if (filterWrapper && isFunction(filterWrapper)) {
            wrappers = wrappers.filter(w => filterWrapper(w, clonedField));
        }
        // Determine wrappers part of the formly configuration (static and dynamic) to exclude them from the result
        const staticWrappers = (field.type && this.formlyConfig.getType(field.type).wrappers) || [];
        const typeWrappers = staticWrappers
            .concat(this.formlyConfig.templateManipulators.preWrapper.map(m => m(clonedField)))
            .concat(this.formlyConfig.templateManipulators.postWrapper.map(m => m(clonedField)))
            .concat(DESIGNER_WRAPPER_TYPES);
        // Remove wrappers part of the formly configuration from the result
        if (typeWrappers.length > 0) {
            for (let i = wrappers.length - 1; i >= 0; i--) {
                for (let j = typeWrappers.length - 1; j >= 0; j--) {
                    if (wrappers[i] === typeWrappers[j]) {
                        typeWrappers.splice(j, 1);
                        wrappers.splice(i, 1);
                        break;
                    }
                }
            }
        }
        return wrappers;
    }
    /** Prunes field of unrecognized properties */
    createPrunedField(field, fieldType = FieldType.Designer) {
        const designerType = this.getDesignerType(field);
        const pruned = isEmpty(field.key) ? {} : { key: field.key };
        if (designerType) {
            pruned.type = designerType.name;
            if (fieldType === FieldType.Designer && field.templateOptions?.['$designerId']) {
                pruned.templateOptions = { $designerId: field.templateOptions['$designerId'] };
            }
            this.applyProperties(field, pruned, designerType.fields);
            if (designerType.fieldArray) {
                pruned.fieldArray = {
                    fieldGroup: this.createPrunedFields(field.fieldGroup, fieldType)
                };
            }
        }
        if (isArray(field.fieldGroup) && !isArray(pruned.fieldArray)) {
            pruned.fieldGroup = this.createPrunedFields(field.fieldGroup, fieldType);
            let fieldGroupClassName;
            if (isString(field.fieldGroupClassName) &&
                (fieldGroupClassName = field.fieldGroupClassName.trim()).length > 0) {
                pruned.fieldGroupClassName = fieldGroupClassName;
            }
        }
        let className;
        if (isString(field.className) && (className = field.className.trim()).length > 0) {
            pruned.className = className;
        }
        const wrappers = this.getWrappers(field);
        if (wrappers.length > 0) {
            pruned.wrappers = wrappers;
            const designerWrapperFields = wrappers.map(wrapper => this.designerConfig.wrappers[wrapper])
                .filter(designerOption => designerOption && isArray(designerOption.fields))
                .reduce((previous, current) => previous.concat(current.fields || []), []);
            this.applyProperties(field, pruned, designerWrapperFields);
        }
        return pruned;
    }
    /** Prunes fields of unrecognized properties */
    createPrunedFields(fields, fieldType = FieldType.Designer) {
        const prunedFields = [];
        if (isArray(fields)) {
            fields.forEach(field => {
                const pruned = this.createPrunedField(field, fieldType);
                if (field.fieldArray) {
                    pruned.fieldArray = this.createPrunedField(field.fieldArray, fieldType);
                }
                else if (field.fieldGroup && !pruned.fieldArray) {
                    pruned.fieldGroup = this.createPrunedFields(field.fieldGroup, fieldType);
                }
                if (Object.keys(pruned).length > 0) {
                    prunedFields.push(pruned);
                }
            });
        }
        return prunedFields;
    }
    getTypeName(type) {
        if (type === 'formly-group') {
            return 'fieldGroup';
        }
        return type ?? '';
    }
    applyProperties(field, designed, designerFields) {
        if (isArray(designerFields)) {
            designerFields.forEach(designerField => {
                const key = designerField.key;
                if (key == null) {
                    return;
                }
                const value = get(field, key);
                if (value != null && (!isString(value) || value.length > 0) && value !== designerField.defaultValue) {
                    set(designed, key, value);
                }
            });
        }
    }
    getDesignerType(field) {
        const type = field?.templateOptions?.['$fieldArray']?.type ?? field.type;
        const designerType = this.designerConfig.types[type];
        if (designerType) {
            return designerType;
        }
        if (field.type === 'formly-group' || (!field.type && isArray(field.fieldGroup))) {
            return { name: field.type, fieldGroup: true, fields: [] };
        }
        return;
    }
    replaceField(id, field, fields) {
        if (!id || !isArray(fields)) {
            return false;
        }
        for (let i = 0, l = fields.length; i < l; i++) {
            const otherField = fields[i];
            if (otherField.templateOptions?.['$designerId'] === id) {
                if (field == null) {
                    fields.splice(i, 1);
                }
                else {
                    fields[i] = field;
                }
                return true;
            }
            if (otherField.fieldGroup && this.replaceField(id, field, otherField.fieldGroup)) {
                return true;
            }
            if (otherField.fieldArray && this.replaceFieldArray(id, field, otherField)) {
                return true;
            }
        }
        return false;
    }
    replaceFieldArray(id, field, parent) {
        if (!id) {
            return false;
        }
        const fieldArray = parent.fieldArray;
        if (!fieldArray) {
            return false;
        }
        if (fieldArray.templateOptions?.['$designerId'] === id) {
            if (field) {
                parent.fieldArray = field;
                return true;
            }
            return false;
        }
        if (fieldArray.fieldGroup && this.replaceField(id, field, fieldArray.fieldGroup)) {
            return true;
        }
        return fieldArray.fieldArray != null && this.replaceFieldArray(id, field, fieldArray);
    }
    buildPath(key, path, arrayNext = false) {
        return path ? key + (arrayNext ? path : '.' + path) : key;
    }
    path(control, includeSelf = true) {
        let path = '';
        let arrayNext = false;
        let root = includeSelf ? control : control?.parent;
        for (let child = root, parent = root?.parent; !!parent; child = parent, parent = parent.parent) {
            if (parent instanceof FormGroup) {
                for (const key in parent.controls) {
                    if (parent.controls[key] === child) {
                        path = this.buildPath(key, path, arrayNext);
                        arrayNext = false;
                        break;
                    }
                }
            }
            else if (parent instanceof FormArray) {
                for (let i = 0; i < parent.length; i++) {
                    if (parent.at(i) === child) {
                        path = this.buildPath('[' + i + ']', path, arrayNext);
                        arrayNext = true;
                        break;
                    }
                }
            }
        }
        return path;
    }
    unsetField(field) {
        if (field.fieldArray) {
            this.unsetField(field.fieldArray);
        }
        if (field.fieldGroup) {
            field.fieldGroup.forEach(f => this.unsetField(f));
        }
        if (field.formControl) {
            const path = this.path(field.formControl);
            unset(this.model, path);
        }
    }
    removeControl(control) {
        const parent = control?.parent;
        if (parent instanceof FormGroup) {
            for (const key in parent.controls) {
                if (parent.controls[key] === control) {
                    parent.removeControl(key);
                    return;
                }
            }
        }
        else if (parent instanceof FormArray) {
            for (let i = 0; i < parent.length; i++) {
                if (parent.at(i) === control) {
                    parent.removeAt(i);
                    return;
                }
            }
        }
    }
    updateFields(fields, model) {
        this.designerFields = fields ?? cloneDeep(this.designerFields);
        // Update the selected field to use the updated instance, if any
        this._selectedField.next(this.fieldsService.find(this.selectedDesignerId, this.designerFields) ?? null);
        this.model = model ?? cloneDeep(this.model);
    }
}
FormlyDesignerService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.6", ngImport: i0, type: FormlyDesignerService, deps: [{ token: i1.FormlyDesignerConfig }, { token: i2.FieldsService }, { token: i3.FormlyConfig }], target: i0.ɵɵFactoryTarget.Injectable });
FormlyDesignerService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.2.6", ngImport: i0, type: FormlyDesignerService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.6", ngImport: i0, type: FormlyDesignerService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.FormlyDesignerConfig }, { type: i2.FieldsService }, { type: i3.FormlyConfig }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybWx5LWRlc2lnbmVyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3gtZm9ybWx5LWRlc2lnbmVyL3NyYy9saWIvZm9ybWx5LWRlc2lnbmVyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQW1CLFNBQVMsRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUV2RSxPQUFPLEVBQUUsZUFBZSxFQUFjLE1BQU0sTUFBTSxDQUFDO0FBRW5ELE9BQU8sRUFBc0Isc0JBQXNCLEVBQXdCLE1BQU0sMEJBQTBCLENBQUM7QUFDNUcsT0FBTyxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsTUFBTSxRQUFRLENBQUM7Ozs7O0FBRTVGLE1BQU0sQ0FBTixJQUFZLFNBR1g7QUFIRCxXQUFZLFNBQVM7SUFDbkIsMkNBQUssQ0FBQTtJQUNMLGlEQUFRLENBQUE7QUFDVixDQUFDLEVBSFcsU0FBUyxLQUFULFNBQVMsUUFHcEI7QUFHRCxNQUFNLE9BQU8scUJBQXFCO0lBQ2hDLFlBQ1UsY0FBb0MsRUFDcEMsYUFBNEIsRUFDNUIsWUFBMEI7UUFGMUIsbUJBQWMsR0FBZCxjQUFjLENBQXNCO1FBQ3BDLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQzVCLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBR25CLGNBQVMsR0FBRyxJQUFJLGVBQWUsQ0FBVSxLQUFLLENBQUMsQ0FBQztRQUNoRCxvQkFBZSxHQUFHLElBQUksZUFBZSxDQUFzQixFQUFFLENBQUMsQ0FBQztRQUMvRCxZQUFPLEdBQUcsSUFBSSxlQUFlLENBQXNCLEVBQUUsQ0FBQyxDQUFDO1FBQ3ZELG1CQUFjLEdBQUcsSUFBSSxlQUFlLENB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RUFBRTtvQkFDcEMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDMUIsT0FBTztpQkFDUjthQUNGO1NBQ0Y7YUFBTSxJQUFJLE1BQU0sWUFBWSxTQUFTLEVBQUU7WUFDdEMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ3RDLElBQUksTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxPQUFPLEVBQUU7b0JBQzVCLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ25CLE9BQU87aUJBQ1I7YUFDRjtTQUNGO0lBQ0gsQ0FBQztJQUVPLFlBQVksQ0FBQyxNQUE0QixFQUFFLEtBQVc7UUFDNUQsSUFBSSxDQUFDLGNBQWMsR0FBRyxNQUFNLElBQUksU0FBUyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUMvRCxnRUFBZ0U7UUFDaEUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGtCQUFrQixFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQztRQUN4RyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssSUFBSSxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzlDLENBQUM7O2tIQXhYVSxxQkFBcUI7c0hBQXJCLHFCQUFxQjsyRkFBckIscUJBQXFCO2tCQURqQyxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWJzdHJhY3RDb250cm9sLCBGb3JtQXJyYXksIEZvcm1Hcm91cCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEZvcm1seUNvbmZpZywgRm9ybWx5RmllbGRDb25maWcgfSBmcm9tICdAbmd4LWZvcm1seS9jb3JlJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgRmllbGRzU2VydmljZSB9IGZyb20gJy4vZmllbGRzLnNlcnZpY2UnO1xuaW1wb3J0IHsgRGVzaWduZXJUeXBlT3B0aW9uLCBERVNJR05FUl9XUkFQUEVSX1RZUEVTLCBGb3JtbHlEZXNpZ25lckNvbmZpZyB9IGZyb20gJy4vZm9ybWx5LWRlc2lnbmVyLWNvbmZpZyc7XG5pbXBvcnQgeyBjbG9uZURlZXAsIGdldCwgaXNBcnJheSwgaXNFbXB0eSwgaXNGdW5jdGlvbiwgaXNTdHJpbmcsIHNldCwgdW5zZXQgfSBmcm9tICcuL3V0aWwnO1xuXG5leHBvcnQgZW51bSBGaWVsZFR5cGUge1xuICBQbGFpbixcbiAgRGVzaWduZXIsXG59XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBGb3JtbHlEZXNpZ25lclNlcnZpY2Uge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGRlc2lnbmVyQ29uZmlnOiBGb3JtbHlEZXNpZ25lckNvbmZpZyxcbiAgICBwcml2YXRlIGZpZWxkc1NlcnZpY2U6IEZpZWxkc1NlcnZpY2UsXG4gICAgcHJpdmF0ZSBmb3JtbHlDb25maWc6IEZvcm1seUNvbmZpZyxcbiAgKSB7IH1cblxuICBwcml2YXRlIHJlYWRvbmx5IF9kaXNhYmxlZCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBwcml2YXRlIHJlYWRvbmx5IF9kZXNpZ25lckZpZWxkcyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Rm9ybWx5RmllbGRDb25maWdbXT4oW10pO1xuICBwcml2YXRlIHJlYWRvbmx5IF9maWVsZHMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PEZvcm1seUZpZWxkQ29uZmlnW10+KFtdKTtcbiAgcHJpdmF0ZSByZWFkb25seSBfc2VsZWN0ZWRGaWVsZCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Rm9ybWx5RmllbGRDb25maWcgfCBudWxsPihudWxsKTtcbiAgcHJpdmF0ZSByZWFkb25seSBfbW9kZWwgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGFueT4oe30pO1xuXG4gIGdldCBkaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fZGlzYWJsZWQudmFsdWU7XG4gIH1cblxuICBzZXQgZGlzYWJsZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9kaXNhYmxlZC5uZXh0KCEhdmFsdWUpO1xuICB9XG5cbiAgZ2V0IGRpc2FibGVkJCgpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gdGhpcy5fZGlzYWJsZWQuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICBnZXQgc2VsZWN0ZWRGaWVsZCQoKTogT2JzZXJ2YWJsZTxGb3JtbHlGaWVsZENvbmZpZyB8IG51bGw+IHtcbiAgICByZXR1cm4gdGhpcy5fc2VsZWN0ZWRGaWVsZC5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIGdldCBzZWxlY3RlZERlc2lnbmVySWQoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fc2VsZWN0ZWRGaWVsZC5nZXRWYWx1ZSgpPy50ZW1wbGF0ZU9wdGlvbnM/LlsnJGRlc2lnbmVySWQnXTtcbiAgfVxuXG4gIGdldCBkZXNpZ25lckZpZWxkcygpOiBGb3JtbHlGaWVsZENvbmZpZ1tdIHtcbiAgICByZXR1cm4gdGhpcy5fZGVzaWduZXJGaWVsZHMudmFsdWU7XG4gIH1cblxuICBzZXQgZGVzaWduZXJGaWVsZHModmFsdWU6IEZvcm1seUZpZWxkQ29uZmlnW10pIHtcbiAgICAvLyBQcnVuZSB0aGUgZmllbGRzIGJlY2F1c2Ugbmd4LWZvcm1seSBwb2xsdXRlcyB0aGVtIHdpdGggaW50ZXJuYWwgc3RhdGVcbiAgICAvLyBjYXVzaW5nIGluY29ycmVjdCBiZWhhdmlvciB3aGVuIHJlLWFwcGxpZWQuXG4gICAgY29uc3QgZmllbGRzID0gaXNBcnJheSh2YWx1ZSkgPyBjbG9uZURlZXAodmFsdWUpIDogW107XG4gICAgY29uc3QgZGVzaWduZXJGaWVsZHMgPSB0aGlzLmNyZWF0ZVBydW5lZEZpZWxkcyhmaWVsZHMsIEZpZWxkVHlwZS5EZXNpZ25lcik7XG4gICAgdGhpcy5fZGVzaWduZXJGaWVsZHMubmV4dChkZXNpZ25lckZpZWxkcyk7XG4gICAgdGhpcy5fZmllbGRzLm5leHQodGhpcy5jcmVhdGVQcnVuZWRGaWVsZHMoY2xvbmVEZWVwKGRlc2lnbmVyRmllbGRzKSwgRmllbGRUeXBlLlBsYWluKSk7XG4gIH1cblxuICBnZXQgZGVzaWduZXJGaWVsZHMkKCk6IE9ic2VydmFibGU8Rm9ybWx5RmllbGRDb25maWdbXT4ge1xuICAgIHJldHVybiB0aGlzLl9kZXNpZ25lckZpZWxkcy5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIGdldCBmaWVsZHMoKTogRm9ybWx5RmllbGRDb25maWdbXSB7XG4gICAgcmV0dXJuIHRoaXMuX2ZpZWxkcy52YWx1ZTtcbiAgfVxuXG4gIHNldCBmaWVsZHModmFsdWU6IEZvcm1seUZpZWxkQ29uZmlnW10pIHtcbiAgICAvLyBQcnVuZSB0aGUgZmllbGRzIGJlY2F1c2Ugbmd4LWZvcm1seSBwb2xsdXRlcyB0aGVtIHdpdGggaW50ZXJuYWwgc3RhdGVcbiAgICAvLyBjYXVzaW5nIGluY29ycmVjdCBiZWhhdmlvciB3aGVuIHJlLWFwcGxpZWQuXG4gICAgY29uc3QgZmllbGRzID0gY2xvbmVEZWVwKHZhbHVlKTtcbiAgICBjb25zdCBkZXNpZ25lckZpZWxkcyA9IHRoaXMuY3JlYXRlUHJ1bmVkRmllbGRzKGZpZWxkcywgRmllbGRUeXBlLkRlc2lnbmVyKTtcbiAgICB0aGlzLmZpZWxkc1NlcnZpY2UubXV0YXRlRmllbGRzKGRlc2lnbmVyRmllbGRzLCBmYWxzZSk7XG4gICAgdGhpcy5fc2VsZWN0ZWRGaWVsZC5uZXh0KG51bGwpO1xuICAgIHRoaXMuX2Rlc2lnbmVyRmllbGRzLm5leHQoZGVzaWduZXJGaWVsZHMpO1xuICAgIHRoaXMuX2ZpZWxkcy5uZXh0KHRoaXMuY3JlYXRlUHJ1bmVkRmllbGRzKGNsb25lRGVlcChkZXNpZ25lckZpZWxkcyksIEZpZWxkVHlwZS5QbGFpbikpO1xuICB9XG5cbiAgZ2V0IGZpZWxkcyQoKTogT2JzZXJ2YWJsZTxGb3JtbHlGaWVsZENvbmZpZ1tdPiB7XG4gICAgcmV0dXJuIHRoaXMuX2ZpZWxkcy5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIGdldCBtb2RlbCgpOiB1bmtub3duIHtcbiAgICByZXR1cm4gdGhpcy5fbW9kZWwudmFsdWU7XG4gIH1cblxuICBzZXQgbW9kZWwodmFsdWU6IHVua25vd24pIHtcbiAgICB0aGlzLl9tb2RlbC5uZXh0KHZhbHVlID09IG51bGwgPyB7fSA6IHZhbHVlKTtcbiAgfVxuXG4gIGdldCBtb2RlbCQoKTogT2JzZXJ2YWJsZTx1bmtub3duPiB7XG4gICAgcmV0dXJuIHRoaXMuX21vZGVsLmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgYWRkRmllbGQoZmllbGQ6IEZvcm1seUZpZWxkQ29uZmlnLCBpbmRleD86IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuZmllbGRzU2VydmljZS5tdXRhdGVGaWVsZChmaWVsZCwgZmFsc2UpO1xuXG4gICAgY29uc3QgZmllbGRzID0gY2xvbmVEZWVwKHRoaXMuZGVzaWduZXJGaWVsZHMpO1xuICAgIGNvbnN0IGZpZWxkSW5kZXggPSAoaW5kZXggPT0gbnVsbCB8fCBpc05hTihpbmRleCkpID8gdGhpcy5maWVsZHMubGVuZ3RoIDpcbiAgICAgIE1hdGgubWluKHRoaXMuZmllbGRzLmxlbmd0aCwgTWF0aC5tYXgoMCwgaW5kZXgpKTtcblxuICAgIGZpZWxkcy5zcGxpY2UoZmllbGRJbmRleCwgMCwgZmllbGQpO1xuXG4gICAgdGhpcy51cGRhdGVGaWVsZHMoZmllbGRzKTtcbiAgfVxuXG4gIGNyZWF0ZUZpZWxkKHR5cGU6IHN0cmluZyk6IEZvcm1seUZpZWxkQ29uZmlnIHtcbiAgICBjb25zdCBmaWVsZCA9IHt9IGFzIEZvcm1seUZpZWxkQ29uZmlnO1xuICAgIGlmICh0eXBlICE9PSAnZm9ybWx5LWdyb3VwJykge1xuICAgICAgZmllbGQudHlwZSA9IHR5cGU7XG4gICAgfVxuICAgIGNvbnN0IGRlc2lnbmVyVHlwZSA9IHRoaXMuZGVzaWduZXJDb25maWcudHlwZXNbdHlwZV07XG4gICAgaWYgKGRlc2lnbmVyVHlwZT8uZmllbGRBcnJheSkge1xuICAgICAgZmllbGQuZmllbGRBcnJheSA9IHsgZmllbGRHcm91cDogW10gfTtcbiAgICB9XG4gICAgaWYgKHR5cGUgPT09ICdmb3JtbHktZ3JvdXAnIHx8IGRlc2lnbmVyVHlwZT8uZmllbGRHcm91cCkge1xuICAgICAgZmllbGQuZmllbGRHcm91cCA9IFtdO1xuICAgIH1cbiAgICByZXR1cm4gZmllbGQ7XG4gIH1cblxuICBkaWRDbGlja0ZpZWxkKHZhbHVlOiBGb3JtbHlGaWVsZENvbmZpZyk6IHZvaWQge1xuICAgIHRoaXMuX3NlbGVjdGVkRmllbGQubmV4dCh2YWx1ZSk7XG4gIH1cblxuICByZW1vdmVGaWVsZChmaWVsZDogRm9ybWx5RmllbGRDb25maWcpOiB2b2lkIHtcbiAgICB0aGlzLnVuc2V0RmllbGQoZmllbGQpO1xuICAgIGNvbnN0IGRlc2lnbmVySWQgPSBmaWVsZC50ZW1wbGF0ZU9wdGlvbnM/LlsnJGRlc2lnbmVySWQnXTtcbiAgICBpZiAodGhpcy5yZXBsYWNlRmllbGQoZGVzaWduZXJJZCwgbnVsbCwgdGhpcy5kZXNpZ25lckZpZWxkcykpIHtcbiAgICAgIHRoaXMucmVtb3ZlQ29udHJvbChmaWVsZC5mb3JtQ29udHJvbCk7XG4gICAgfVxuICAgIHRoaXMudXBkYXRlRmllbGRzKCk7XG4gIH1cblxuICB1cGRhdGVGaWVsZChvcmlnaW5hbDogRm9ybWx5RmllbGRDb25maWcgfCBudWxsLCBtb2RpZmllZDogRm9ybWx5RmllbGRDb25maWcpOiB2b2lkIHtcbiAgICBjb25zdCBwcnVuZWQgPSB0aGlzLmZpZWxkc1NlcnZpY2UubXV0YXRlRmllbGQodGhpcy5jcmVhdGVQcnVuZWRGaWVsZChtb2RpZmllZCksIGZhbHNlKTtcbiAgICBjb25zdCBkZXNpZ25lcklkID0gb3JpZ2luYWw/LnRlbXBsYXRlT3B0aW9ucz8uWyckZGVzaWduZXJJZCddO1xuICAgIGlmICh0aGlzLnJlcGxhY2VGaWVsZChkZXNpZ25lcklkLCBwcnVuZWQsIHRoaXMuZGVzaWduZXJGaWVsZHMpKSB7XG4gICAgICBpZiAob3JpZ2luYWwgJiYgb3JpZ2luYWwuZm9ybUNvbnRyb2wgIT09IHBydW5lZC5mb3JtQ29udHJvbCkge1xuICAgICAgICB0aGlzLnVuc2V0RmllbGQob3JpZ2luYWwpO1xuICAgICAgICB0aGlzLnJlbW92ZUNvbnRyb2wob3JpZ2luYWwuZm9ybUNvbnRyb2wpO1xuICAgICAgfVxuICAgICAgdGhpcy51cGRhdGVGaWVsZHMoKTtcbiAgICB9XG4gIH1cblxuICBnZXRXcmFwcGVycyhmaWVsZDogRm9ybWx5RmllbGRDb25maWcpOiBzdHJpbmdbXSB7XG4gICAgaWYgKCFmaWVsZCB8fCAhaXNBcnJheShmaWVsZC53cmFwcGVycykpIHtcbiAgICAgIHJldHVybiBbXTtcbiAgICB9XG5cbiAgICBjb25zdCBjbG9uZWRGaWVsZCA9IGNsb25lRGVlcChmaWVsZCk7XG4gICAgbGV0IHdyYXBwZXJzID0gY2xvbmVkRmllbGQud3JhcHBlcnMgPSAoY2xvbmVkRmllbGQud3JhcHBlcnMgfHwgW10pO1xuICAgIGNvbnN0IGZpbHRlcldyYXBwZXIgPSB0aGlzLmRlc2lnbmVyQ29uZmlnLnNldHRpbmdzLmZpbHRlcldyYXBwZXIgPz8gKCh3cmFwcGVyLCBfKSA9PiB3cmFwcGVyICE9PSAnZm9ybS1maWVsZCcpO1xuICAgIGlmIChmaWx0ZXJXcmFwcGVyICYmIGlzRnVuY3Rpb24oZmlsdGVyV3JhcHBlcikpIHtcbiAgICAgIHdyYXBwZXJzID0gd3JhcHBlcnMuZmlsdGVyKHcgPT4gZmlsdGVyV3JhcHBlcih3LCBjbG9uZWRGaWVsZCkpO1xuICAgIH1cblxuICAgIC8vIERldGVybWluZSB3cmFwcGVycyBwYXJ0IG9mIHRoZSBmb3JtbHkgY29uZmlndXJhdGlvbiAoc3RhdGljIGFuZCBkeW5hbWljKSB0byBleGNsdWRlIHRoZW0gZnJvbSB0aGUgcmVzdWx0XG4gICAgY29uc3Qgc3RhdGljV3JhcHBlcnMgPSAoZmllbGQudHlwZSAmJiB0aGlzLmZvcm1seUNvbmZpZy5nZXRUeXBlKGZpZWxkLnR5cGUpLndyYXBwZXJzKSB8fCBbXTtcbiAgICBjb25zdCB0eXBlV3JhcHBlcnMgPSBzdGF0aWNXcmFwcGVyc1xuICAgICAgLmNvbmNhdCh0aGlzLmZvcm1seUNvbmZpZy50ZW1wbGF0ZU1hbmlwdWxhdG9ycy5wcmVXcmFwcGVyLm1hcChtID0+IG0oY2xvbmVkRmllbGQpKSlcbiAgICAgIC5jb25jYXQodGhpcy5mb3JtbHlDb25maWcudGVtcGxhdGVNYW5pcHVsYXRvcnMucG9zdFdyYXBwZXIubWFwKG0gPT4gbShjbG9uZWRGaWVsZCkpKVxuICAgICAgLmNvbmNhdChERVNJR05FUl9XUkFQUEVSX1RZUEVTKTtcblxuICAgIC8vIFJlbW92ZSB3cmFwcGVycyBwYXJ0IG9mIHRoZSBmb3JtbHkgY29uZmlndXJhdGlvbiBmcm9tIHRoZSByZXN1bHRcbiAgICBpZiAodHlwZVdyYXBwZXJzLmxlbmd0aCA+IDApIHtcbiAgICAgIGZvciAobGV0IGkgPSB3cmFwcGVycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICBmb3IgKGxldCBqID0gdHlwZVdyYXBwZXJzLmxlbmd0aCAtIDE7IGogPj0gMDsgai0tKSB7XG4gICAgICAgICAgaWYgKHdyYXBwZXJzW2ldID09PSB0eXBlV3JhcHBlcnNbal0pIHtcbiAgICAgICAgICAgIHR5cGVXcmFwcGVycy5zcGxpY2UoaiwgMSk7XG4gICAgICAgICAgICB3cmFwcGVycy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHdyYXBwZXJzO1xuICB9XG5cbiAgLyoqIFBydW5lcyBmaWVsZCBvZiB1bnJlY29nbml6ZWQgcHJvcGVydGllcyAqL1xuICBjcmVhdGVQcnVuZWRGaWVsZChmaWVsZDogRm9ybWx5RmllbGRDb25maWcsIGZpZWxkVHlwZSA9IEZpZWxkVHlwZS5EZXNpZ25lcik6IEZvcm1seUZpZWxkQ29uZmlnIHtcbiAgICBjb25zdCBkZXNpZ25lclR5cGUgPSB0aGlzLmdldERlc2lnbmVyVHlwZShmaWVsZCk7XG4gICAgY29uc3QgcHJ1bmVkOiBGb3JtbHlGaWVsZENvbmZpZyA9IGlzRW1wdHkoZmllbGQua2V5KSA/IHt9IDogeyBrZXk6IGZpZWxkLmtleSB9O1xuXG4gICAgaWYgKGRlc2lnbmVyVHlwZSkge1xuICAgICAgcHJ1bmVkLnR5cGUgPSBkZXNpZ25lclR5cGUubmFtZTtcbiAgICAgIGlmIChmaWVsZFR5cGUgPT09IEZpZWxkVHlwZS5EZXNpZ25lciAmJiBmaWVsZC50ZW1wbGF0ZU9wdGlvbnM/LlsnJGRlc2lnbmVySWQnXSkge1xuICAgICAgICBwcnVuZWQudGVtcGxhdGVPcHRpb25zID0geyAkZGVzaWduZXJJZDogZmllbGQudGVtcGxhdGVPcHRpb25zWyckZGVzaWduZXJJZCddIH07XG4gICAgICB9XG4gICAgICB0aGlzLmFwcGx5UHJvcGVydGllcyhmaWVsZCwgcHJ1bmVkLCBkZXNpZ25lclR5cGUuZmllbGRzKTtcbiAgICAgIGlmIChkZXNpZ25lclR5cGUuZmllbGRBcnJheSkge1xuICAgICAgICBwcnVuZWQuZmllbGRBcnJheSA9IHtcbiAgICAgICAgICBmaWVsZEdyb3VwOiB0aGlzLmNyZWF0ZVBydW5lZEZpZWxkcyhmaWVsZC5maWVsZEdyb3VwLCBmaWVsZFR5cGUpXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGlzQXJyYXkoZmllbGQuZmllbGRHcm91cCkgJiYgIWlzQXJyYXkocHJ1bmVkLmZpZWxkQXJyYXkpKSB7XG4gICAgICBwcnVuZWQuZmllbGRHcm91cCA9IHRoaXMuY3JlYXRlUHJ1bmVkRmllbGRzKGZpZWxkLmZpZWxkR3JvdXAsIGZpZWxkVHlwZSk7XG5cbiAgICAgIGxldCBmaWVsZEdyb3VwQ2xhc3NOYW1lOiBzdHJpbmc7XG4gICAgICBpZiAoaXNTdHJpbmcoZmllbGQuZmllbGRHcm91cENsYXNzTmFtZSkgJiZcbiAgICAgICAgKGZpZWxkR3JvdXBDbGFzc05hbWUgPSAoZmllbGQuZmllbGRHcm91cENsYXNzTmFtZSBhcyBzdHJpbmcpLnRyaW0oKSkubGVuZ3RoID4gMCkge1xuICAgICAgICBwcnVuZWQuZmllbGRHcm91cENsYXNzTmFtZSA9IGZpZWxkR3JvdXBDbGFzc05hbWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGV0IGNsYXNzTmFtZTogc3RyaW5nO1xuICAgIGlmIChpc1N0cmluZyhmaWVsZC5jbGFzc05hbWUpICYmIChjbGFzc05hbWUgPSAoZmllbGQuY2xhc3NOYW1lIGFzIHN0cmluZykudHJpbSgpKS5sZW5ndGggPiAwKSB7XG4gICAgICBwcnVuZWQuY2xhc3NOYW1lID0gY2xhc3NOYW1lO1xuICAgIH1cblxuICAgIGNvbnN0IHdyYXBwZXJzID0gdGhpcy5nZXRXcmFwcGVycyhmaWVsZCk7XG4gICAgaWYgKHdyYXBwZXJzLmxlbmd0aCA+IDApIHtcbiAgICAgIHBydW5lZC53cmFwcGVycyA9IHdyYXBwZXJzO1xuICAgICAgY29uc3QgZGVzaWduZXJXcmFwcGVyRmllbGRzID0gd3JhcHBlcnMubWFwKHdyYXBwZXIgPT4gdGhpcy5kZXNpZ25lckNvbmZpZy53cmFwcGVyc1t3cmFwcGVyXSlcbiAgICAgICAgLmZpbHRlcihkZXNpZ25lck9wdGlvbiA9PiBkZXNpZ25lck9wdGlvbiAmJiBpc0FycmF5KGRlc2lnbmVyT3B0aW9uLmZpZWxkcykpXG4gICAgICAgIC5yZWR1Y2U8Rm9ybWx5RmllbGRDb25maWdbXT4oKHByZXZpb3VzLCBjdXJyZW50KSA9PiBwcmV2aW91cy5jb25jYXQoY3VycmVudC5maWVsZHMgfHwgW10pLCBbXSk7XG4gICAgICB0aGlzLmFwcGx5UHJvcGVydGllcyhmaWVsZCwgcHJ1bmVkLCBkZXNpZ25lcldyYXBwZXJGaWVsZHMpO1xuICAgIH1cbiAgICByZXR1cm4gcHJ1bmVkO1xuICB9XG5cbiAgLyoqIFBydW5lcyBmaWVsZHMgb2YgdW5yZWNvZ25pemVkIHByb3BlcnRpZXMgKi9cbiAgY3JlYXRlUHJ1bmVkRmllbGRzKGZpZWxkczogRm9ybWx5RmllbGRDb25maWdbXSB8IHVuZGVmaW5lZCwgZmllbGRUeXBlID0gRmllbGRUeXBlLkRlc2lnbmVyKTogRm9ybWx5RmllbGRDb25maWdbXSB7XG4gICAgY29uc3QgcHJ1bmVkRmllbGRzOiBGb3JtbHlGaWVsZENvbmZpZ1tdID0gW107XG4gICAgaWYgKGlzQXJyYXkoZmllbGRzKSkge1xuICAgICAgZmllbGRzLmZvckVhY2goZmllbGQgPT4ge1xuICAgICAgICBjb25zdCBwcnVuZWQgPSB0aGlzLmNyZWF0ZVBydW5lZEZpZWxkKGZpZWxkLCBmaWVsZFR5cGUpO1xuICAgICAgICBpZiAoZmllbGQuZmllbGRBcnJheSkge1xuICAgICAgICAgIHBydW5lZC5maWVsZEFycmF5ID0gdGhpcy5jcmVhdGVQcnVuZWRGaWVsZChmaWVsZC5maWVsZEFycmF5LCBmaWVsZFR5cGUpO1xuICAgICAgICB9IGVsc2UgaWYgKGZpZWxkLmZpZWxkR3JvdXAgJiYgIXBydW5lZC5maWVsZEFycmF5KSB7XG4gICAgICAgICAgcHJ1bmVkLmZpZWxkR3JvdXAgPSB0aGlzLmNyZWF0ZVBydW5lZEZpZWxkcyhmaWVsZC5maWVsZEdyb3VwLCBmaWVsZFR5cGUpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChPYmplY3Qua2V5cyhwcnVuZWQpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICBwcnVuZWRGaWVsZHMucHVzaChwcnVuZWQpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIHBydW5lZEZpZWxkcztcbiAgfVxuXG4gIGdldFR5cGVOYW1lKHR5cGU6IHN0cmluZyB8IG51bGwgfCB1bmRlZmluZWQpOiBzdHJpbmcge1xuICAgIGlmICh0eXBlID09PSAnZm9ybWx5LWdyb3VwJykge1xuICAgICAgcmV0dXJuICdmaWVsZEdyb3VwJztcbiAgICB9XG4gICAgcmV0dXJuIHR5cGUgPz8gJyc7XG4gIH1cblxuICBwcml2YXRlIGFwcGx5UHJvcGVydGllcyhmaWVsZDogRm9ybWx5RmllbGRDb25maWcsIGRlc2lnbmVkOiBGb3JtbHlGaWVsZENvbmZpZywgZGVzaWduZXJGaWVsZHM6IEZvcm1seUZpZWxkQ29uZmlnW10gfCB1bmRlZmluZWQpOiB2b2lkIHtcbiAgICBpZiAoaXNBcnJheShkZXNpZ25lckZpZWxkcykpIHtcbiAgICAgIGRlc2lnbmVyRmllbGRzLmZvckVhY2goZGVzaWduZXJGaWVsZCA9PiB7XG4gICAgICAgIGNvbnN0IGtleSA9IGRlc2lnbmVyRmllbGQua2V5O1xuICAgICAgICBpZiAoa2V5ID09IG51bGwpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdmFsdWUgPSBnZXQoZmllbGQsIGtleSk7XG4gICAgICAgIGlmICh2YWx1ZSAhPSBudWxsICYmICghaXNTdHJpbmcodmFsdWUpIHx8IHZhbHVlLmxlbmd0aCA+IDApICYmIHZhbHVlICE9PSBkZXNpZ25lckZpZWxkLmRlZmF1bHRWYWx1ZSkge1xuICAgICAgICAgIHNldChkZXNpZ25lZCwga2V5LCB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZ2V0RGVzaWduZXJUeXBlKGZpZWxkOiBGb3JtbHlGaWVsZENvbmZpZyk6IERlc2lnbmVyVHlwZU9wdGlvbiB8IHVuZGVmaW5lZCB7XG4gICAgY29uc3QgdHlwZSA9IGZpZWxkPy50ZW1wbGF0ZU9wdGlvbnM/LlsnJGZpZWxkQXJyYXknXT8udHlwZSA/PyBmaWVsZC50eXBlO1xuICAgIGNvbnN0IGRlc2lnbmVyVHlwZSA9IHRoaXMuZGVzaWduZXJDb25maWcudHlwZXNbdHlwZV07XG4gICAgaWYgKGRlc2lnbmVyVHlwZSkge1xuICAgICAgcmV0dXJuIGRlc2lnbmVyVHlwZTtcbiAgICB9XG4gICAgaWYgKGZpZWxkLnR5cGUgPT09ICdmb3JtbHktZ3JvdXAnIHx8ICghZmllbGQudHlwZSAmJiBpc0FycmF5KGZpZWxkLmZpZWxkR3JvdXApKSkge1xuICAgICAgcmV0dXJuIHsgbmFtZTogZmllbGQudHlwZSBhcyBzdHJpbmcsIGZpZWxkR3JvdXA6IHRydWUsIGZpZWxkczogW10gfTtcbiAgICB9XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgcHJpdmF0ZSByZXBsYWNlRmllbGQoaWQ6IHN0cmluZywgZmllbGQ6IEZvcm1seUZpZWxkQ29uZmlnIHwgbnVsbCwgZmllbGRzOiBGb3JtbHlGaWVsZENvbmZpZ1tdKTogYm9vbGVhbiB7XG4gICAgaWYgKCFpZCB8fCAhaXNBcnJheShmaWVsZHMpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGZvciAobGV0IGkgPSAwLCBsID0gZmllbGRzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgY29uc3Qgb3RoZXJGaWVsZCA9IGZpZWxkc1tpXTtcbiAgICAgIGlmIChvdGhlckZpZWxkLnRlbXBsYXRlT3B0aW9ucz8uWyckZGVzaWduZXJJZCddID09PSBpZCkge1xuICAgICAgICBpZiAoZmllbGQgPT0gbnVsbCkge1xuICAgICAgICAgIGZpZWxkcy5zcGxpY2UoaSwgMSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZmllbGRzW2ldID0gZmllbGQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICBpZiAob3RoZXJGaWVsZC5maWVsZEdyb3VwICYmIHRoaXMucmVwbGFjZUZpZWxkKGlkLCBmaWVsZCwgb3RoZXJGaWVsZC5maWVsZEdyb3VwKSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGlmIChvdGhlckZpZWxkLmZpZWxkQXJyYXkgJiYgdGhpcy5yZXBsYWNlRmllbGRBcnJheShpZCwgZmllbGQsIG90aGVyRmllbGQpKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBwcml2YXRlIHJlcGxhY2VGaWVsZEFycmF5KGlkOiBzdHJpbmcgfCBudWxsLCBmaWVsZDogRm9ybWx5RmllbGRDb25maWcgfCBudWxsLCBwYXJlbnQ6IEZvcm1seUZpZWxkQ29uZmlnKTogYm9vbGVhbiB7XG4gICAgaWYgKCFpZCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBjb25zdCBmaWVsZEFycmF5ID0gcGFyZW50LmZpZWxkQXJyYXk7XG4gICAgaWYgKCFmaWVsZEFycmF5KSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmIChmaWVsZEFycmF5LnRlbXBsYXRlT3B0aW9ucz8uWyckZGVzaWduZXJJZCddID09PSBpZCkge1xuICAgICAgaWYgKGZpZWxkKSB7XG4gICAgICAgIHBhcmVudC5maWVsZEFycmF5ID0gZmllbGQ7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAoZmllbGRBcnJheS5maWVsZEdyb3VwICYmIHRoaXMucmVwbGFjZUZpZWxkKGlkLCBmaWVsZCwgZmllbGRBcnJheS5maWVsZEdyb3VwKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmaWVsZEFycmF5LmZpZWxkQXJyYXkgIT0gbnVsbCAmJiB0aGlzLnJlcGxhY2VGaWVsZEFycmF5KGlkLCBmaWVsZCwgZmllbGRBcnJheSk7XG4gIH1cblxuICBwcml2YXRlIGJ1aWxkUGF0aChrZXk6IHN0cmluZywgcGF0aDogc3RyaW5nLCBhcnJheU5leHQ6IGJvb2xlYW4gPSBmYWxzZSkge1xuICAgIHJldHVybiBwYXRoID8ga2V5ICsgKGFycmF5TmV4dCA/IHBhdGggOiAnLicgKyBwYXRoKSA6IGtleTtcbiAgfVxuXG4gIHByaXZhdGUgcGF0aChjb250cm9sOiBBYnN0cmFjdENvbnRyb2wsIGluY2x1ZGVTZWxmOiBib29sZWFuID0gdHJ1ZSk6IHN0cmluZyB7XG4gICAgbGV0IHBhdGggPSAnJztcbiAgICBsZXQgYXJyYXlOZXh0ID0gZmFsc2U7XG4gICAgbGV0IHJvb3QgPSBpbmNsdWRlU2VsZiA/IGNvbnRyb2wgOiBjb250cm9sPy5wYXJlbnQ7XG4gICAgZm9yIChsZXQgY2hpbGQgPSByb290LCBwYXJlbnQgPSByb290Py5wYXJlbnQ7ICEhcGFyZW50OyBjaGlsZCA9IHBhcmVudCwgcGFyZW50ID0gcGFyZW50LnBhcmVudCkge1xuICAgICAgaWYgKHBhcmVudCBpbnN0YW5jZW9mIEZvcm1Hcm91cCkge1xuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBwYXJlbnQuY29udHJvbHMpIHtcbiAgICAgICAgICBpZiAocGFyZW50LmNvbnRyb2xzW2tleV0gPT09IGNoaWxkKSB7XG4gICAgICAgICAgICBwYXRoID0gdGhpcy5idWlsZFBhdGgoa2V5LCBwYXRoLCBhcnJheU5leHQpO1xuICAgICAgICAgICAgYXJyYXlOZXh0ID0gZmFsc2U7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAocGFyZW50IGluc3RhbmNlb2YgRm9ybUFycmF5KSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGFyZW50Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgaWYgKHBhcmVudC5hdChpKSA9PT0gY2hpbGQpIHtcbiAgICAgICAgICAgIHBhdGggPSB0aGlzLmJ1aWxkUGF0aCgnWycgKyBpICsgJ10nLCBwYXRoLCBhcnJheU5leHQpO1xuICAgICAgICAgICAgYXJyYXlOZXh0ID0gdHJ1ZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcGF0aDtcbiAgfVxuXG4gIHByaXZhdGUgdW5zZXRGaWVsZChmaWVsZDogRm9ybWx5RmllbGRDb25maWcpOiB2b2lkIHtcbiAgICBpZiAoZmllbGQuZmllbGRBcnJheSkge1xuICAgICAgdGhpcy51bnNldEZpZWxkKGZpZWxkLmZpZWxkQXJyYXkpO1xuICAgIH1cbiAgICBpZiAoZmllbGQuZmllbGRHcm91cCkge1xuICAgICAgZmllbGQuZmllbGRHcm91cC5mb3JFYWNoKGYgPT4gdGhpcy51bnNldEZpZWxkKGYpKTtcbiAgICB9XG4gICAgaWYgKGZpZWxkLmZvcm1Db250cm9sKSB7XG4gICAgICBjb25zdCBwYXRoID0gdGhpcy5wYXRoKGZpZWxkLmZvcm1Db250cm9sKTtcbiAgICAgIHVuc2V0KHRoaXMubW9kZWwsIHBhdGgpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgcmVtb3ZlQ29udHJvbChjb250cm9sOiBBYnN0cmFjdENvbnRyb2wgfCB1bmRlZmluZWQpOiB2b2lkIHtcbiAgICBjb25zdCBwYXJlbnQgPSBjb250cm9sPy5wYXJlbnQ7XG4gICAgaWYgKHBhcmVudCBpbnN0YW5jZW9mIEZvcm1Hcm91cCkge1xuICAgICAgZm9yIChjb25zdCBrZXkgaW4gcGFyZW50LmNvbnRyb2xzKSB7XG4gICAgICAgIGlmIChwYXJlbnQuY29udHJvbHNba2V5XSA9PT0gY29udHJvbCkge1xuICAgICAgICAgIHBhcmVudC5yZW1vdmVDb250cm9sKGtleSk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChwYXJlbnQgaW5zdGFuY2VvZiBGb3JtQXJyYXkpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGFyZW50Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChwYXJlbnQuYXQoaSkgPT09IGNvbnRyb2wpIHtcbiAgICAgICAgICBwYXJlbnQucmVtb3ZlQXQoaSk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSB1cGRhdGVGaWVsZHMoZmllbGRzPzogRm9ybWx5RmllbGRDb25maWdbXSwgbW9kZWw/OiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLmRlc2lnbmVyRmllbGRzID0gZmllbGRzID8/IGNsb25lRGVlcCh0aGlzLmRlc2lnbmVyRmllbGRzKTtcbiAgICAvLyBVcGRhdGUgdGhlIHNlbGVjdGVkIGZpZWxkIHRvIHVzZSB0aGUgdXBkYXRlZCBpbnN0YW5jZSwgaWYgYW55XG4gICAgdGhpcy5fc2VsZWN0ZWRGaWVsZC5uZXh0KHRoaXMuZmllbGRzU2VydmljZS5maW5kKHRoaXMuc2VsZWN0ZWREZXNpZ25lcklkLCB0aGlzLmRlc2lnbmVyRmllbGRzKSA/PyBudWxsKTtcbiAgICB0aGlzLm1vZGVsID0gbW9kZWwgPz8gY2xvbmVEZWVwKHRoaXMubW9kZWwpO1xuICB9XG59XG4iXX0=