import * as i0 from '@angular/core';
import { InjectionToken, Injectable, Inject, ViewContainerRef, Component, ViewChild, ElementRef, SkipSelf, Optional, HostListener, EventEmitter, ViewEncapsulation, Output, Input, forwardRef, HostBinding, Pipe, ANALYZE_FOR_ENTRY_COMPONENTS, NgModule } from '@angular/core';
import * as i3 from '@ngx-formly/core';
import { FieldWrapper, FormlyModule, FormlyForm } from '@ngx-formly/core';
import * as i3$1 from '@angular/common';
import { DOCUMENT, CommonModule } from '@angular/common';
import { isString as isString$1 } from 'lodash';
import { BehaviorSubject, fromEvent, timer, NEVER, merge } from 'rxjs';
import { tap, catchError, map, debounceTime, switchMap } from 'rxjs/operators';
import { cloneDeep, get, set, unset } from 'lodash-es';
import * as i2 from '@angular/forms';
import { FormGroup, FormArray, NG_VALUE_ACCESSOR, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import 'jquery';

const FORMLY_DESIGNER_CONFIG_TOKEN = new InjectionToken('FORMLY_DESIGNER_CONFIG_TOKEN');
const DESIGNER_WRAPPER_NAME = '$designer';
const FIELD_DESIGNER_WRAPPER_NAME = '$fieldDesigner';
const DESIGNER_WRAPPER_TYPES = [
    DESIGNER_WRAPPER_NAME,
    FIELD_DESIGNER_WRAPPER_NAME,
];
class FormlyDesignerConfig {
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
FormlyDesignerConfig.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.6", ngImport: i0, type: FormlyDesignerConfig, deps: [{ token: FORMLY_DESIGNER_CONFIG_TOKEN }, { token: i3.FormlyConfig }], target: i0.ɵɵFactoryTarget.Injectable });
FormlyDesignerConfig.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.2.6", ngImport: i0, type: FormlyDesignerConfig });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.6", ngImport: i0, type: FormlyDesignerConfig, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [FORMLY_DESIGNER_CONFIG_TOKEN]
                }] }, { type: i3.FormlyConfig }]; } });

class FormlyDesignerWrapperComponent extends FieldWrapper {
}
FormlyDesignerWrapperComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.6", ngImport: i0, type: FormlyDesignerWrapperComponent, deps: null, target: i0.ɵɵFactoryTarget.Component });
FormlyDesignerWrapperComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.2.6", type: FormlyDesignerWrapperComponent, selector: "formly-designer-wrapper", viewQueries: [{ propertyName: "fieldComponent", first: true, predicate: ["fieldComponent"], descendants: true, read: ViewContainerRef, static: true }], usesInheritance: true, ngImport: i0, template: `
    <ng-template #fieldComponent></ng-template>
  `, isInline: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.6", ngImport: i0, type: FormlyDesignerWrapperComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'formly-designer-wrapper',
                    template: `
    <ng-template #fieldComponent></ng-template>
  `
                }]
        }], propDecorators: { fieldComponent: [{
                type: ViewChild,
                args: ['fieldComponent', { read: ViewContainerRef, static: true }]
            }] } });

var DragDropType;
(function (DragDropType) {
    DragDropType["Type"] = "formly-designer-type";
    DragDropType["Field"] = "formly-designer-field";
})(DragDropType || (DragDropType = {}));

class ParentService {
    constructor() {
        this._children = [];
    }
    get children() { return this._children; }
    set children(value) {
        this._children = value;
    }
    addChild(child, index) {
        const childIndex = index == null || isNaN(index) ? this.children.length :
            Math.min(this.children.length, Math.max(0, index));
        const children = this.children.slice();
        children.splice(childIndex, 0, child);
        this.children = children;
    }
    removeChild(child) {
        this.children = this.children.filter(c => c === child);
    }
    clearChildren() {
        this.children = [];
    }
}
ParentService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.6", ngImport: i0, type: ParentService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
ParentService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.2.6", ngImport: i0, type: ParentService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.6", ngImport: i0, type: ParentService, decorators: [{
            type: Injectable
        }] });

const keyPathMemberName = '_formlyDesignerKeyPath';
// Source: https://github.com/formly-js/ngx-formly/blob/master/src/core/src/lib/utils.ts
function getKeyPath(field) {
    /* We store the keyPath in the field for performance reasons. This function will be called frequently. */
    if (!field[keyPathMemberName] || field[keyPathMemberName].key !== field.key) {
        let keyPath = [];
        if (field.key) {
            /* Also allow for an array key, hence the type check  */
            const pathElements = isArray(field.key) ? field.key : field.key.toString().split('.');
            for (let pathElement of pathElements) {
                if (typeof pathElement === 'string') {
                    /* replace paths of the form names[2] by names.2, cfr. angular formly */
                    pathElement = pathElement.replace(/\[(\w+)\]/g, '.$1');
                    keyPath = keyPath.concat(pathElement.split('.'));
                }
                else {
                    keyPath.push(pathElement);
                }
            }
            for (let i = 0; i < keyPath.length; i++) {
                const pathElement = keyPath[i];
                if (typeof pathElement === 'string' && /^\d+$/.test(pathElement)) {
                    keyPath[i] = parseInt(pathElement, 10);
                }
            }
        }
        field[keyPathMemberName] = {
            key: field.key,
            path: keyPath,
        };
    }
    return field[keyPathMemberName].path.slice();
}
function equalType(a, b) {
    return (!a.fieldArray === !b.fieldArray) && (!a.fieldGroup === !b.fieldGroup);
}
const isArray = Array.isArray;
// https://stackoverflow.com/a/28953167
const isEmpty = (val) => {
    if (val == null) {
        return true;
    }
    else if (typeof val === 'function' || typeof val === 'number' || typeof val === 'boolean' ||
        Object.prototype.toString.call(val) === '[object Date]') {
        return false;
    }
    else if (val.length === 0) { // 0 length array or string
        return true;
    }
    else if (typeof val === 'object') {
        // empty object
        let r = true;
        for (const _ in val)
            r = false;
        return r;
    }
    return false;
};
const isFunction = (val) => typeof val === 'function';
const isObject = (val) => val != null && typeof val === 'object';
const isString = (val) => typeof val === 'string' || val instanceof String;
/** Source:  https://stackoverflow.com/a/8809472 */
const generateUuid = () => {
    let d = new Date().getTime();
    let d2 = (performance?.now && (performance.now() * 1000)) || 0;
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        let r = Math.random() * 16;
        if (d > 0) {
            r = (d + r) % 16 | 0;
            d = Math.floor(d / 16);
        }
        else {
            r = (d2 + r) % 16 | 0;
            d2 = Math.floor(d2 / 16);
        }
        return (c == 'x' ? r : (r & 0x7 | 0x8)).toString(16);
    });
};

class DragDropService {
    constructor() {
        this._dragging = new BehaviorSubject(null);
        this._dropTarget = new BehaviorSubject(null);
    }
    get dragging() { return this._dragging.value; }
    get dragging$() {
        return this._dragging.asObservable();
    }
    get dropTarget() { return this._dropTarget.value; }
    set dropTarget(id) {
        this._dropTarget.next(id);
    }
    get dropTarget$() {
        return this._dropTarget.asObservable();
    }
    beginDrag(subject) {
        if (subject == null) {
            return;
        }
        console.assert(this._dragging.value === null);
        this._dragging.next(subject);
    }
    endDrag() {
        if (this._dragging.value != null) {
            this._dragging.next(null);
        }
    }
}
DragDropService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.6", ngImport: i0, type: DragDropService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
DragDropService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.2.6", ngImport: i0, type: DragDropService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.6", ngImport: i0, type: DragDropService, decorators: [{
            type: Injectable
        }] });

class FieldsService {
    constructor(formlyDesignerConfig) {
        this.formlyDesignerConfig = formlyDesignerConfig;
    }
    getFullKeyPath(field, fields) {
        let keyPath = [];
        if (field && field.key) {
            const parents = new Map();
            this.traverseFields(fields, (f, path, parent) => {
                parent && parents.set(f, parent);
            });
            keyPath = getKeyPath(field);
            let cur = parents.get(field);
            while (cur) {
                keyPath = getKeyPath(cur).concat(keyPath);
                cur = parents.get(cur);
            }
        }
        return keyPath;
    }
    getTypeFields(type) {
        return this.getFields(type, 'type');
    }
    getWrapperFields(wrapper) {
        return wrapper ? this.getFields(wrapper, 'wrapper') : [];
    }
    checkField(field, fields, parent) {
        if (field.key == null || (isString(field.key) && !field.key) || (isArray(field.key) && !field.key.length)) {
            return true;
        }
        const fullPathByField = new Map();
        const newPath = this.getFullKeyPath(parent || {}, fields).concat(getKeyPath(field));
        const length = newPath.length;
        return !this.traverseFields(fields, (f, p) => {
            const path = fullPathByField.get(f) || fullPathByField.set(f, (p || []).concat(getKeyPath(f))).get(f);
            if (path?.length !== length) {
                return;
            }
            for (let i = 0; i < length; i++) {
                if (path[i] !== newPath[i]) {
                    return;
                }
            }
            return !equalType(field, f);
        });
    }
    find(id, fields) {
        if (!id || !isArray(fields)) {
            return;
        }
        const stack = fields.slice();
        while (stack.length) {
            const field = stack.pop();
            if (field.templateOptions?.['$designerId'] === id) {
                return field;
            }
            if (field.fieldArray) {
                stack.push(field.fieldArray);
            }
            else if (field.fieldGroup) {
                stack.push(...field.fieldGroup);
            }
        }
        return;
    }
    /** Find a field by full key path  */
    findField(field, fields, parent) {
        if (!field || !fields) {
            return;
        }
        const fullPathByField = new Map();
        const newPath = this.getFullKeyPath(parent || {}, fields).concat(getKeyPath(field));
        const length = newPath.length;
        return this.traverseFields(fields, (f, p) => {
            const path = fullPathByField.get(f) || fullPathByField.set(f, (p || []).concat(getKeyPath(f))).get(f);
            if (path?.length !== length) {
                return;
            }
            for (let i = 0; i < length; i++) {
                if (path[i] === newPath[i]) {
                    return f;
                }
            }
            return;
        });
    }
    mutateField(field, editorField) {
        field.templateOptions = { ...field.templateOptions };
        if (!editorField && !field.templateOptions['$designerId']) {
            field.templateOptions['$designerId'] = generateUuid();
        }
        if (field.fieldGroup) {
            this.mutateFields(field.fieldGroup, editorField);
        }
        else if (field.fieldArray && field.fieldArray.fieldGroup) {
            if (editorField) {
                this.mutateField(field.fieldArray, editorField);
            }
            else {
                // Treating fieldArrays as fieldGroups
                // Treating fieldArrays as fieldGroups
                field.templateOptions['$fieldArray'] = { type: field.type };
                field.fieldGroup = field.fieldArray.fieldGroup;
                delete field.fieldArray;
                delete field.type;
                this.mutateFields(field.fieldGroup, editorField);
            }
        }
        return field;
    }
    mutateFields(fields, editorFields) {
        fields.forEach(field => this.mutateField(field, editorFields));
    }
    traverseFields(fields, callback, path, parent) {
        path = path || [];
        for (const field of fields) {
            const value = callback(field, path, parent);
            if (value) {
                return value;
            }
            if (field.fieldArray) {
                const arrayValue = this.traverseFields([field.fieldArray], callback, path.concat(getKeyPath(field)), field);
                if (arrayValue) {
                    return arrayValue;
                }
            }
            else if (field.fieldGroup) {
                const groupValue = this.traverseFields(field.fieldGroup, callback, path.concat(getKeyPath(field)), field);
                if (groupValue) {
                    return groupValue;
                }
            }
        }
    }
    getFields(name, type) {
        const fields = this.getDesignerOptions(type)[name]?.fields;
        if (!fields) {
            return [];
        }
        this.mutateFields(cloneDeep(fields), true);
        return fields;
    }
    getDesignerOptions(type) {
        if (type === 'type') {
            return this.formlyDesignerConfig.types;
        }
        if (type === 'wrapper') {
            return this.formlyDesignerConfig.wrappers;
        }
        return {};
    }
}
FieldsService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.6", ngImport: i0, type: FieldsService, deps: [{ token: FormlyDesignerConfig }], target: i0.ɵɵFactoryTarget.Injectable });
FieldsService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.2.6", ngImport: i0, type: FieldsService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.6", ngImport: i0, type: FieldsService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: FormlyDesignerConfig }]; } });

var FieldType;
(function (FieldType) {
    FieldType[FieldType["Plain"] = 0] = "Plain";
    FieldType[FieldType["Designer"] = 1] = "Designer";
})(FieldType || (FieldType = {}));
class FormlyDesignerService {
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
FormlyDesignerService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.6", ngImport: i0, type: FormlyDesignerService, deps: [{ token: FormlyDesignerConfig }, { token: FieldsService }, { token: i3.FormlyConfig }], target: i0.ɵɵFactoryTarget.Injectable });
FormlyDesignerService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.2.6", ngImport: i0, type: FormlyDesignerService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.6", ngImport: i0, type: FormlyDesignerService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: FormlyDesignerConfig }, { type: FieldsService }, { type: i3.FormlyConfig }]; } });

var DropPlacement;
(function (DropPlacement) {
    DropPlacement[DropPlacement["self"] = 0] = "self";
    DropPlacement[DropPlacement["before"] = 1] = "before";
    DropPlacement[DropPlacement["after"] = 2] = "after";
})(DropPlacement || (DropPlacement = {}));
class FormlyDesignerFieldWrapperComponent extends FieldWrapper {
    constructor(changeDetector, dragDropService, fieldsService, formlyDesignerService, zone, parentService, document, parentParentService) {
        super();
        this.changeDetector = changeDetector;
        this.dragDropService = dragDropService;
        this.fieldsService = fieldsService;
        this.formlyDesignerService = formlyDesignerService;
        this.zone = zone;
        this.document = document;
        this.parentParentService = parentParentService;
        this.dropTargetCounter = 0;
        this.subscriptions = [];
        this._title = null;
        this._isDragging = false;
        this._isHovering = false;
        this._dropTargetPlacement = null;
        parentService.parent = this;
        if (parentParentService) {
            parentParentService.addChild(this);
        }
    }
    get title() { return this._title; }
    set title(value) {
        if (value !== this._title) {
            this._title = value;
            this.changeDetector.markForCheck();
        }
    }
    get isDragging() { return this._isDragging; }
    set isDragging(value) {
        if (value !== this._isDragging) {
            this._isDragging = value;
            this.changeDetector.markForCheck();
        }
    }
    get isHovering() { return this._isHovering; }
    set isHovering(value) {
        if (value !== this._isHovering) {
            this._isHovering = value;
            this.changeDetector.markForCheck();
        }
    }
    get parent() { return this.parentParentService?.parent; }
    get dropTargetPlacement() { return this._dropTargetPlacement; }
    set dropTargetPlacement(value) {
        if (value !== this._dropTargetPlacement) {
            this._dropTargetPlacement = value;
            this.changeDetector.markForCheck();
        }
    }
    get designerId() { return this.field.templateOptions?.['$designerId']; }
    get isFieldGroup() { return Array.isArray(this.field.fieldGroup); }
    get isDragSource() {
        return this.dragDropService.dragging === this.designerId;
    }
    get isDropTarget() {
        return this.dragDropService.dropTarget === this.designerId;
    }
    get isDropTargetSelf() {
        return this.isDropTarget && !this.dropTargetPlacement && this.isFieldGroup;
    }
    get isDropTargetBefore() {
        return this.isDropTarget && this.dropTargetPlacement === DropPlacement.before;
    }
    get isDropTargetAfter() {
        return this.isDropTarget && this.dropTargetPlacement === DropPlacement.after;
    }
    get isSubject() {
        return this.formlyDesignerService.selectedDesignerId === this.designerId;
    }
    ngOnInit() {
        if (!this.document?.defaultView) {
            return;
        }
        const content = this.content?.nativeElement;
        if (!content) {
            return;
        }
        this.subscriptions.push(this.dragDropService.dragging$.subscribe(dragging => this.isDragging = dragging != null), fromEvent(this.document.defaultView, 'mouseup').subscribe(this.onWindowMouseUp.bind(this)));
        this.zone.runOutsideAngular(() => {
            this.subscriptions.push(fromEvent(content, 'dragover').subscribe(e => this.onDragOver(e)), fromEvent(content, 'mouseover').subscribe(e => this.onMouseOver(e)));
        });
    }
    ngOnDestroy() {
        this.subscriptions.splice(0).forEach(subscription => subscription.unsubscribe());
        this.parentParentService?.removeChild(this);
    }
    onClick(event) {
        event.stopPropagation();
        this.formlyDesignerService.didClickField(this.field);
    }
    onDragStart(event) {
        if (this.dragDropService.dragging) {
            return;
        }
        event.dataTransfer?.setData(DragDropType.Field, this.designerId ?? '');
        this.dragDropService.beginDrag(this.designerId ?? null);
    }
    onDragEnd() {
        this.dragDropService.endDrag();
    }
    onDragEnter(event) {
        if (!this.shouldHandleDragEvent(event)) {
            return;
        }
        event.preventDefault();
        this.dropTargetCounter++;
    }
    onDragLeave(event) {
        if (!this.shouldHandleDragEvent(event)) {
            return;
        }
        if (this.dropTargetCounter > 0) {
            this.dropTargetCounter--;
            if (this.dropTargetCounter === 0) {
                this.dropTargetPlacement = null;
            }
        }
    }
    onDragOver(event) {
        if (event.defaultPrevented || !this.shouldHandleDragEvent(event)) {
            return;
        }
        this.zone.run(() => {
            this.dropTargetPlacement = this.getDropTargetPlacement(event);
            this.dragDropService.dropTarget = this.field.templateOptions?.['$designerId'] ?? null;
        });
        event.preventDefault();
    }
    shouldHandleDragEvent(event) {
        if (event.dataTransfer?.types.some(t => t === DragDropType.Field)) {
            return this.dragDropService.dragging !== this.designerId;
        }
        return !!event.dataTransfer?.types.some(t => t === DragDropType.Type) &&
            isString$1(this.dragDropService.dragging);
    }
    getDropTargetPlacement(event) {
        const rect = this.content?.nativeElement.getBoundingClientRect();
        if (rect) {
            const threshold = rect.height * .33;
            if (event.clientY < rect.top + threshold) {
                return DropPlacement.before;
            }
            if (event.clientY > rect.bottom - threshold) {
                return DropPlacement.after;
            }
        }
        return DropPlacement.self;
    }
    onDrop(event) {
        if (this.shouldHandleDragEvent(event)) {
            event.stopPropagation();
            if (event.dataTransfer?.types.includes(DragDropType.Field)) {
                const designerId = this.dragDropService.dragging;
                const field = this.fieldsService.find(designerId, this.formlyDesignerService.designerFields);
                if (field) {
                    // Get placement index before the fields refresh caused by removal
                    const index = this.getDropPlacementIndex(field);
                    this.formlyDesignerService.removeField(field);
                    if (this.parent && this.dropTargetPlacement !== DropPlacement.self) {
                        this.parent.addChildField(field, index);
                    }
                    else {
                        this.addChildField(field);
                    }
                }
            }
            else if (event.dataTransfer?.types.includes(DragDropType.Type)) {
                if (this.dragDropService.dragging) {
                    if (this.parent && this.dropTargetPlacement !== DropPlacement.self) {
                        this.parent.addChildType(this.dragDropService.dragging, this.getDropPlacementIndex());
                    }
                    else {
                        this.addChildType(this.dragDropService.dragging);
                    }
                }
            }
        }
        this.dragDropService.endDrag();
        this.resetDrop();
    }
    onMouseOver(event) {
        event.stopPropagation();
        this.zone.run(() => {
            this.isHovering = true;
            this.title = this.dragDropService.dragging == null ?
                `Click to edit ${this.formlyDesignerService.getTypeName(this.field.type)}` :
                null;
        });
    }
    onMouseOut() {
        this.isHovering = false;
    }
    onWindowMouseUp() {
        this.resetDrop();
    }
    async addChildField(field, index) {
        if (!this.isFieldGroup) {
            return;
        }
        if (!this.fieldsService.checkField(field, this.formlyDesignerService.designerFields, this.field)) {
            return;
        }
        const updatedField = cloneDeep(this.field);
        if (!updatedField.fieldGroup) {
            return;
        }
        const fieldIndex = (index == null || isNaN(index)) ? updatedField.fieldGroup.length :
            Math.min(updatedField.fieldGroup.length, Math.max(0, index));
        updatedField.fieldGroup.splice(fieldIndex, 0, field);
        return timer(0)
            .pipe(tap(() => this.formlyDesignerService.updateField(this.field, updatedField)), catchError(() => NEVER), map(() => undefined)).toPromise();
    }
    async addChildType(type, index) {
        const field = this.formlyDesignerService.createField(type);
        await this.addChildField(field, index);
    }
    /**
     * @param dropField - field to ignore for index determination
     */
    getDropPlacementIndex(dropField) {
        if (this.parent && this.dropTargetPlacement !== DropPlacement.self) {
            const parentChildren = dropField ?
                this.parentParentService?.children.filter(fd => fd.designerId !== dropField.templateOptions?.['$designerId']) :
                this.parentParentService?.children;
            const dropIndex = parentChildren?.indexOf(this) ?? 0;
            return this.dropTargetPlacement === DropPlacement.before ? dropIndex : dropIndex + 1;
        }
        return;
    }
    resetDrop() {
        this.dropTargetCounter = 0;
        this.dropTargetPlacement = null;
        if (this.isDropTarget) {
            this.dragDropService.dropTarget = null;
        }
    }
}
FormlyDesignerFieldWrapperComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.6", ngImport: i0, type: FormlyDesignerFieldWrapperComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: DragDropService }, { token: FieldsService }, { token: FormlyDesignerService }, { token: i0.NgZone }, { token: ParentService }, { token: DOCUMENT }, { token: ParentService, optional: true, skipSelf: true }], target: i0.ɵɵFactoryTarget.Component });
FormlyDesignerFieldWrapperComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.2.6", type: FormlyDesignerFieldWrapperComponent, selector: "formly-designer-field-wrapper", host: { listeners: { "click": "onClick($event)" } }, providers: [
        ParentService,
    ], viewQueries: [{ propertyName: "fieldComponent", first: true, predicate: ["fieldComponent"], descendants: true, read: ViewContainerRef, static: true }, { propertyName: "content", first: true, predicate: ["content"], descendants: true, read: ElementRef, static: true }], usesInheritance: true, ngImport: i0, template: `
    <div #content class="designer-content" [title]="title"
      [ngClass]="{
        'designer-subject': isSubject,
        'designer-drag-source': isDragSource,
        'designer-drop-hint': isDragging,
        'designer-drop-target': isDropTargetSelf,
        'designer-hover': isHovering && !isDragging
      }"
      draggable="true" (dragstart)="onDragStart($event)" (dragend)="onDragEnd()"
      (dragenter)="onDragEnter($event)" (dragleave)="onDragLeave($event)" (drop)="onDrop($event)"
      (mouseout)="onMouseOut()">
      <ng-template #fieldComponent></ng-template>
    </div>
    <div *ngIf="isDropTargetBefore" class="designer-drop-target-before"></div>
    <div *ngIf="isDropTargetAfter" class="designer-drop-target-after"></div>
  `, isInline: true, styles: [":host{display:flex;position:relative;justify-content:flex-start;align-content:flex-start;align-items:flex-start;margin:.25rem}.designer-content{border:1px dashed #000;border-radius:5px;min-height:2rem;padding:.25em 1em;width:100%}.designer-content.designer-hover{background-color:#f0f4c3;border-color:#00c853;cursor:pointer}.designer-content.designer-subject{border-color:#00c853;border-style:solid;border-width:2px}.designer-content.designer-drop-hint{background-color:pink;border-color:#bbdefb}.designer-content.designer-drop-target{background-color:#f0f4c3;border-color:#00c853}.designer-drag-source{opacity:.4}.designer-drop-target-before{position:absolute;top:0;left:0;right:0;background-color:#0ff;height:12px;pointer-events:none;z-index:1}.designer-drop-target-after{position:absolute;bottom:0;left:0;right:0;background-color:#ff0;height:12px;pointer-events:none;z-index:1}\n"], directives: [{ type: i3$1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i3$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.6", ngImport: i0, type: FormlyDesignerFieldWrapperComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'formly-designer-field-wrapper',
                    template: `
    <div #content class="designer-content" [title]="title"
      [ngClass]="{
        'designer-subject': isSubject,
        'designer-drag-source': isDragSource,
        'designer-drop-hint': isDragging,
        'designer-drop-target': isDropTargetSelf,
        'designer-hover': isHovering && !isDragging
      }"
      draggable="true" (dragstart)="onDragStart($event)" (dragend)="onDragEnd()"
      (dragenter)="onDragEnter($event)" (dragleave)="onDragLeave($event)" (drop)="onDrop($event)"
      (mouseout)="onMouseOut()">
      <ng-template #fieldComponent></ng-template>
    </div>
    <div *ngIf="isDropTargetBefore" class="designer-drop-target-before"></div>
    <div *ngIf="isDropTargetAfter" class="designer-drop-target-after"></div>
  `,
                    styles: [`
    :host {
      display: flex;
      position: relative;
      justify-content: flex-start;
      align-content: flex-start;
      align-items: flex-start;
      margin: .25rem;
    }
    .designer-content {
      border: 1px dashed #000;
      border-radius: 5px;
      min-height: 2rem;
      padding: .25em 1em;
      width: 100%;
    }
    .designer-content.designer-hover {
      background-color: #f0f4c3;
      border-color: #00c853;
      cursor: pointer;
    }
    .designer-content.designer-subject {
      border-color: #00c853;
      border-style: solid;
      border-width: 2px;
    }
    .designer-content.designer-drop-hint {
      background-color: pink;
      border-color: #bbdefb;
    }
    .designer-content.designer-drop-target {
      background-color: #f0f4c3;
      border-color: #00c853;
    }
    .designer-drag-source {
      opacity: .4;
    }
    .designer-drop-target-before {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      background-color: aqua;
      height: 12px;
      pointer-events: none;
      z-index: 1;
    }
    .designer-drop-target-after {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: yellow;
      height: 12px;
      pointer-events: none;
      z-index: 1;
    }
  `],
                    providers: [
                        ParentService,
                    ],
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: DragDropService }, { type: FieldsService }, { type: FormlyDesignerService }, { type: i0.NgZone }, { type: ParentService }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: ParentService, decorators: [{
                    type: SkipSelf
                }, {
                    type: Optional
                }] }]; }, propDecorators: { fieldComponent: [{
                type: ViewChild,
                args: ['fieldComponent', { read: ViewContainerRef, static: true }]
            }], content: [{
                type: ViewChild,
                args: ['content', { read: ElementRef, static: true }]
            }], onClick: [{
                type: HostListener,
                args: ['click', ['$event']]
            }] } });

/** Creates a wrapper sandwich to augment the form */
class DesignerExtension {
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

const fieldComponents = [];
const wrapperComponents = [
    FormlyDesignerWrapperComponent,
    FormlyDesignerFieldWrapperComponent
];
class Config {
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
Config.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.6", ngImport: i0, type: Config, deps: [{ token: DesignerExtension }], target: i0.ɵɵFactoryTarget.Injectable });
Config.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.2.6", ngImport: i0, type: Config });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.6", ngImport: i0, type: Config, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: DesignerExtension }]; } });

class FormlyDesignerComponent {
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
        if (!isString$1(this.dragDropService.dragging)) {
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
FormlyDesignerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.6", ngImport: i0, type: FormlyDesignerComponent, deps: [{ token: DragDropService }, { token: FieldsService }, { token: i2.FormBuilder }, { token: FormlyDesignerService }, { token: ParentService }], target: i0.ɵɵFactoryTarget.Component });
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
  `, isInline: true, styles: ["formly-designer>form>.content{border:1px dashed #000;border-radius:5px;min-height:2rem;padding:1.5em 1em 0;width:100%}formly-designer>form>.content.drop-hint{background-color:#e3f2fd;border-color:#bbdefb}formly-designer>form>.content.drop-target{background-color:#f0f4c3;border-color:#00c853}formly-designer>form>.content>div{padding:2rem 2rem 4rem;font-size:64pt;pointer-events:none}formly-designer-field-picker .form-group>.input-group>formly-designer-type-select>select{border-radius:.25rem 0 0 .25rem;border-right:0}formly-designer-wrapper-editor .card>.card-body .form-control{width:100%}formly-designer-wrapper-picker .form-group>.input-group>formly-designer-wrapper-select>select{border-radius:.25rem 0 0 .25rem;border-right:0}\n"], components: [{ type: i3.FormlyForm, selector: "formly-form", inputs: ["model", "fields", "options", "form"], outputs: ["modelChange"] }], directives: [{ type: i2.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { type: i2.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i2.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i3$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i3$1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }], pipes: { "async": i3$1.AsyncPipe }, encapsulation: i0.ViewEncapsulation.None });
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
        }], ctorParameters: function () { return [{ type: DragDropService }, { type: FieldsService }, { type: i2.FormBuilder }, { type: FormlyDesignerService }, { type: ParentService }]; }, propDecorators: { formlyFormContainer: [{
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

const FIELD_EDITOR_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => FieldEditorComponent),
    multi: true
};
class FieldEditorComponent {
    constructor(fieldsService, fb, formlyDesignerConfig) {
        this.fieldsService = fieldsService;
        this.fb = fb;
        this.formlyDesignerConfig = formlyDesignerConfig;
        this.fieldGroup = false;
        this.showType = false;
        this.showWrappers = false;
        this.hasContent = false;
        this.subscriptions = [];
        this.field = {};
        this.fields = [];
        this.fieldArray = false;
        this.invalid = false;
        this.onChange = (_) => { };
        this.onTouched = () => { };
        this.form = fb.group({
            key: this.key = fb.control(''),
            className: this.className = fb.control(''),
            fieldGroupClassName: this.fieldGroupClassName = fb.control(''),
            type: this.type = fb.control('')
        }, { validator: (control) => this.validator(control) });
        this.fieldForm = fb.group({});
    }
    ngOnInit() {
        this.subscriptions.push(this.type.valueChanges
            .subscribe(() => this.onTypeChange()));
        this.subscriptions.push(this.form.statusChanges
            .pipe(debounceTime(0))
            .subscribe(() => this.invalid = this.form.invalid));
        this.subscribeValueChanges();
    }
    ngOnDestroy() {
        this.valueChangesSubscription?.unsubscribe();
        this.subscriptions.splice(0).forEach(subscription => subscription.unsubscribe());
    }
    writeValue(obj) {
        this.valueChangesSubscription?.unsubscribe();
        this.updateField(obj);
        this.form.markAsPristine();
        this.form.markAsUntouched();
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
            this.form.disable();
        }
        else {
            this.form.enable();
        }
    }
    subscribeValueChanges() {
        this.valueChangesSubscription = merge(this.fieldForm.valueChanges, this.form.valueChanges)
            .pipe(debounceTime(0))
            .subscribe(() => this.updateValue());
    }
    updateField(field) {
        if (!isObject(field)) {
            field = {};
        }
        this.key.setValue(isString(field.key) ? field.key : '');
        this.className.setValue(isString(field.className) ? field.className : '');
        this.fieldGroupClassName.setValue(isString(field.fieldGroupClassName) ? field.fieldGroupClassName : '');
        this.type.setValue(isString(field.type) ? field.type : '');
        this.fields = this.fieldsService.getTypeFields(this.type.value);
        this.fieldForm = this.fb.group({});
        this.field = cloneDeep(field);
    }
    updateValue() {
        if (!this.onChange) {
            return;
        }
        const field = this.field;
        field.key = this.key.value;
        field.className = this.className.value;
        field.fieldGroupClassName = this.fieldGroupClassName.value;
        field.type = this.type.value;
        this.onChange(field);
    }
    onTypeChange() {
        this.valueChangesSubscription?.unsubscribe();
        const type = this.type.value;
        this.fields = this.fieldsService.getTypeFields(type);
        const designerType = this.formlyDesignerConfig.types[type];
        this.fieldArray = designerType?.fieldArray != null;
        this.fieldForm = this.fb.group({});
        this.field = Object.assign({}, this.field);
        this.subscribeValueChanges();
    }
    onWrappersSelected(field) {
        this.updateField(field);
    }
    validator(control) {
        if (this.fieldGroup) {
            return null;
        }
        const type = control.get('type');
        const hasType = isString(type.value) && type.value.trim().length > 0;
        const result = { type: false };
        if (this.showType && !hasType) {
            result.type = true;
        }
        return result.type ? result : null;
    }
}
FieldEditorComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.6", ngImport: i0, type: FieldEditorComponent, deps: [{ token: FieldsService }, { token: i2.FormBuilder }, { token: FormlyDesignerConfig }], target: i0.ɵɵFactoryTarget.Component });
FieldEditorComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.2.6", type: FieldEditorComponent, selector: "formly-designer-field-editor", inputs: { fieldGroup: "fieldGroup", showType: "showType", showWrappers: "showWrappers", hasContent: "hasContent" }, providers: [
        FIELD_EDITOR_CONTROL_VALUE_ACCESSOR
    ], viewQueries: [{ propertyName: "blockElRef", first: true, predicate: ["block"], descendants: true, static: true }], ngImport: i0, template: `
    <form [formGroup]="form" novalidate>
      <div class="card card-d-editor">
        <div class="card-header" [ngClass]="{solo: !hasContent && fields.length === 0}">
          <div class="form-group">
            <label class="form-control-label">name</label>
            <input formControlName="key" class="form-control">
          </div>
          <div *ngIf="formlyDesignerConfig.settings.showClassName" class="form-group">
            <label class="form-control-label">className</label>
            <input formControlName="className" class="form-control">
          </div>
          <div *ngIf="fieldGroup && formlyDesignerConfig.settings.showClassName" class="form-group">
            <label class="form-control-label">fieldGroupClassName</label>
            <input formControlName="fieldGroupClassName" class="form-control">
          </div>
          <!--
          <div *ngIf="false" class="form-group"
            [ngClass]="{'has-danger': form.hasError('type') && (type.dirty || type.touched)}">
            <label class="form-control-label">type</label>
            <formly-designer-type-select formControlName="type" [fieldGroup]="fieldGroup" [type]="type.value"></formly-designer-type-select>
            <div *ngIf="form.hasError('type') && (type.dirty || type.touched)" class="form-control-feedback">
              type required.
            </div>
          </div>
          <div *ngIf="false" class="form-group">
            <label class="form-control-label">wrappers</label>
            <formly-designer-wrappers-picker [field]="field"
              (selected)="onWrappersSelected($event)">
            </formly-designer-wrappers-picker>
          </div>
          -->
        </div>
        <div #block class="card-body">
          <formly-form *ngIf="fields.length > 0" [form]="fieldForm" [fields]="fields" [model]="field">
          </formly-form>
          <ng-content></ng-content>
        </div>
      </div>
    </form>
  `, isInline: true, styles: [".card-header.solo{border-bottom:0}.card-header.solo+.card-body{display:none}\n"], components: [{ type: i3.FormlyForm, selector: "formly-form", inputs: ["model", "fields", "options", "form"], outputs: ["modelChange"] }], directives: [{ type: i2.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { type: i2.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i2.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i3$1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i2.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i2.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { type: i3$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.6", ngImport: i0, type: FieldEditorComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'formly-designer-field-editor',
                    template: `
    <form [formGroup]="form" novalidate>
      <div class="card card-d-editor">
        <div class="card-header" [ngClass]="{solo: !hasContent && fields.length === 0}">
          <div class="form-group">
            <label class="form-control-label">name</label>
            <input formControlName="key" class="form-control">
          </div>
          <div *ngIf="formlyDesignerConfig.settings.showClassName" class="form-group">
            <label class="form-control-label">className</label>
            <input formControlName="className" class="form-control">
          </div>
          <div *ngIf="fieldGroup && formlyDesignerConfig.settings.showClassName" class="form-group">
            <label class="form-control-label">fieldGroupClassName</label>
            <input formControlName="fieldGroupClassName" class="form-control">
          </div>
          <!--
          <div *ngIf="false" class="form-group"
            [ngClass]="{'has-danger': form.hasError('type') && (type.dirty || type.touched)}">
            <label class="form-control-label">type</label>
            <formly-designer-type-select formControlName="type" [fieldGroup]="fieldGroup" [type]="type.value"></formly-designer-type-select>
            <div *ngIf="form.hasError('type') && (type.dirty || type.touched)" class="form-control-feedback">
              type required.
            </div>
          </div>
          <div *ngIf="false" class="form-group">
            <label class="form-control-label">wrappers</label>
            <formly-designer-wrappers-picker [field]="field"
              (selected)="onWrappersSelected($event)">
            </formly-designer-wrappers-picker>
          </div>
          -->
        </div>
        <div #block class="card-body">
          <formly-form *ngIf="fields.length > 0" [form]="fieldForm" [fields]="fields" [model]="field">
          </formly-form>
          <ng-content></ng-content>
        </div>
      </div>
    </form>
  `,
                    styles: [`
    .card-header.solo {
      border-bottom: 0;
    }
    .card-header.solo + .card-body {
      display: none;
    }
  `],
                    providers: [
                        FIELD_EDITOR_CONTROL_VALUE_ACCESSOR
                    ]
                }]
        }], ctorParameters: function () { return [{ type: FieldsService }, { type: i2.FormBuilder }, { type: FormlyDesignerConfig }]; }, propDecorators: { fieldGroup: [{
                type: Input
            }], showType: [{
                type: Input
            }], showWrappers: [{
                type: Input
            }], hasContent: [{
                type: Input
            }], blockElRef: [{
                type: ViewChild,
                args: ['block', { static: true }]
            }] } });

const TYPE_SELECT_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TypeSelectComponent),
    multi: true
};
class TypeSelectComponent {
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
TypeSelectComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.6", ngImport: i0, type: TypeSelectComponent, deps: [{ token: FormlyDesignerConfig }], target: i0.ɵɵFactoryTarget.Component });
TypeSelectComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.2.6", type: TypeSelectComponent, selector: "formly-designer-type-select", inputs: { type: "type", fieldGroup: "fieldGroup" }, providers: [TYPE_SELECT_CONTROL_VALUE_ACCESSOR], usesOnChanges: true, ngImport: i0, template: `
    <select [formControl]="formControl" class="custom-select">
      <option *ngFor="let type of types" [ngValue]="type.value">{{ type.label }}</option>
    </select>
  `, isInline: true, styles: ["select{width:100%}\n"], directives: [{ type: i2.SelectControlValueAccessor, selector: "select:not([multiple])[formControlName],select:not([multiple])[formControl],select:not([multiple])[ngModel]", inputs: ["compareWith"] }, { type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i2.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { type: i3$1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i2.NgSelectOption, selector: "option", inputs: ["ngValue", "value"] }, { type: i2.ɵNgSelectMultipleOption, selector: "option", inputs: ["ngValue", "value"] }] });
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
        }], ctorParameters: function () { return [{ type: FormlyDesignerConfig }]; }, propDecorators: { type: [{
                type: Input
            }], fieldGroup: [{
                type: Input
            }] } });

class FieldPickerComponent {
    constructor(fb, formlyDesignerConfig, formlyDesignerService) {
        this.formlyDesignerConfig = formlyDesignerConfig;
        this.formlyDesignerService = formlyDesignerService;
        this.selected = new EventEmitter();
        this.fieldEdit = new FormControl({});
        this.fieldGroup = false;
        this.form = fb.group({
            type: this.type = fb.control('', Validators.compose([Validators.required, Validators.pattern(/^\s*\S.*$/)]))
        });
    }
    get typeName() {
        return this.formlyDesignerService.getTypeName(this.type.value);
    }
    get $modal() {
        return $(this.modalRef?.nativeElement);
    }
    add() {
        const type = this.type.value;
        const field = {};
        if (type !== 'formly-group') {
            field.type = type;
        }
        const designerType = this.formlyDesignerConfig.types[type] || {};
        if (designerType.fieldArray) {
            field.fieldArray = { fieldGroup: [] };
        }
        if (this.fieldGroup = (type === 'formly-group' || designerType.fieldGroup != null)) {
            field.fieldGroup = [];
        }
        this.fieldEdit.setValue(field);
        this.$modal.modal('show');
    }
    onApply() {
        this.selected.emit(this.fieldEdit.value);
        this.$modal.modal('hide');
    }
}
FieldPickerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.6", ngImport: i0, type: FieldPickerComponent, deps: [{ token: i2.FormBuilder }, { token: FormlyDesignerConfig }, { token: FormlyDesignerService }], target: i0.ɵɵFactoryTarget.Component });
FieldPickerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.2.6", type: FieldPickerComponent, selector: "formly-designer-field-picker", outputs: { selected: "selected" }, viewQueries: [{ propertyName: "modalRef", first: true, predicate: ["modal"], descendants: true, static: true }], ngImport: i0, template: `
    <form novalidate [formGroup]="form">
      <div class="form-group">
        <div class="input-group">
          <formly-designer-type-select formControlName="type">
          </formly-designer-type-select>
          <button type="button" class="btn btn-secondary" [disabled]="form.invalid" (click)="add()">
            Add
          </button>
        </div>
      </div>
      <div #modal class="modal fade" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Add {{ typeName }}</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Cancel">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <formly-designer-field-editor #editor [fieldGroup]="fieldEdit.value.fieldGroup" [formControl]="fieldEdit">
              </formly-designer-field-editor>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
              <button type="button" class="btn btn-primary" (click)="onApply()"
                [disabled]="editor.invalid">Apply</button>
            </div>
          </div>
        </div>
      </div>
    </form>
  `, isInline: true, styles: [".btn:not(:disabled){cursor:pointer}.input-group>.btn{border-radius:0 .25rem .25rem 0}.input-group,.modal-header{display:flex}.modal-header{justify-content:space-between}formly-designer-type-select{flex-grow:2}\n"], components: [{ type: TypeSelectComponent, selector: "formly-designer-type-select", inputs: ["type", "fieldGroup"] }, { type: FieldEditorComponent, selector: "formly-designer-field-editor", inputs: ["fieldGroup", "showType", "showWrappers", "hasContent"] }], directives: [{ type: i2.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { type: i2.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i2.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i2.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { type: i2.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.6", ngImport: i0, type: FieldPickerComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'formly-designer-field-picker',
                    template: `
    <form novalidate [formGroup]="form">
      <div class="form-group">
        <div class="input-group">
          <formly-designer-type-select formControlName="type">
          </formly-designer-type-select>
          <button type="button" class="btn btn-secondary" [disabled]="form.invalid" (click)="add()">
            Add
          </button>
        </div>
      </div>
      <div #modal class="modal fade" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Add {{ typeName }}</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Cancel">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <formly-designer-field-editor #editor [fieldGroup]="fieldEdit.value.fieldGroup" [formControl]="fieldEdit">
              </formly-designer-field-editor>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
              <button type="button" class="btn btn-primary" (click)="onApply()"
                [disabled]="editor.invalid">Apply</button>
            </div>
          </div>
        </div>
      </div>
    </form>
  `,
                    styles: [`
    .btn:not(:disabled) {
      cursor: pointer;
    }
    .input-group > .btn {
      border-radius: 0 .25rem .25rem 0;
    }
    .input-group, .modal-header {
      display: flex;
    }
    .modal-header {
      justify-content: space-between;
    }
    formly-designer-type-select {
      flex-grow: 2;
    }
  `]
                }]
        }], ctorParameters: function () { return [{ type: i2.FormBuilder }, { type: FormlyDesignerConfig }, { type: FormlyDesignerService }]; }, propDecorators: { modalRef: [{
                type: ViewChild,
                args: ['modal', { static: true }]
            }], selected: [{
                type: Output
            }] } });

class PropertiesComponent {
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
PropertiesComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.6", ngImport: i0, type: PropertiesComponent, deps: [{ token: FieldsService }, { token: FormlyDesignerConfig }, { token: FormlyDesignerService }], target: i0.ɵɵFactoryTarget.Component });
PropertiesComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.2.6", type: PropertiesComponent, selector: "formly-designer-properties", host: { properties: { "class.d-none": "this.hasField" } }, ngImport: i0, template: `
    <formly-designer-field-editor #editor [fieldGroup]="fieldGroup" [hasContent]="true" [showType]="true" [showWrappers]="true" [formControl]="fieldEdit">
      <div class="footer">
        <button (click)="remove()" class="btn btn-secondary mr-1">Remove</button>
        <button (click)="cancel()" class="btn btn-secondary ml-auto mr-1">Cancel</button>
        <button [disabled]="editor.invalid" (click)="accept()" class="btn btn-primary">Apply</button>
      </div>
    </formly-designer-field-editor>
  `, isInline: true, styles: [".footer{display:flex}\n"], components: [{ type: FieldEditorComponent, selector: "formly-designer-field-editor", inputs: ["fieldGroup", "showType", "showWrappers", "hasContent"] }], directives: [{ type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i2.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }] });
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
        }], ctorParameters: function () { return [{ type: FieldsService }, { type: FormlyDesignerConfig }, { type: FormlyDesignerService }]; }, propDecorators: { hasField: [{
                type: HostBinding,
                args: ['class.d-none']
            }] } });

class TypesComponent {
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
TypesComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.6", ngImport: i0, type: TypesComponent, deps: [{ token: DragDropService }, { token: FormlyDesignerConfig }], target: i0.ɵɵFactoryTarget.Component });
TypesComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.2.6", type: TypesComponent, selector: "formly-designer-types", ngImport: i0, template: `
    <div class="d-control" *ngFor="let type of types" draggable="true" (dragstart)="onDragStart($event, type.value)" (dragend)="onDragEnd()">
      {{ type.label }}
    </div>
  `, isInline: true, styles: [":host{display:flex;flex-direction:column}div{margin:2px;padding:.5rem;border-radius:.75rem;background-color:#bbdefb;line-break:anywhere;white-space:pre-line;cursor:grab;-webkit-user-select:none;user-select:none}\n"], directives: [{ type: i3$1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }] });
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
        }], ctorParameters: function () { return [{ type: DragDropService }, { type: FormlyDesignerConfig }]; } });

const WRAPPER_EDITOR_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => WrapperEditorComponent),
    multi: true
};
class WrapperEditorComponent {
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
WrapperEditorComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.6", ngImport: i0, type: WrapperEditorComponent, deps: [{ token: FieldsService }, { token: i2.FormBuilder }], target: i0.ɵɵFactoryTarget.Component });
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
        }], ctorParameters: function () { return [{ type: FieldsService }, { type: i2.FormBuilder }]; }, propDecorators: { wrapper: [{
                type: Input
            }] } });

const WRAPPER_SELECT_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => WrapperSelectComponent),
    multi: true
};
class WrapperSelectComponent {
    constructor(formlyDesignerConfig) {
        this.formlyDesignerConfig = formlyDesignerConfig;
        this.formControl = new FormControl();
        this.wrappers = [];
        this.onChange = (value) => { };
        this.onTouched = () => { };
    }
    ngAfterViewInit() {
        timer(0).subscribe(() => {
            this.wrappers = Object.keys(this.formlyDesignerConfig.wrappers);
            if (this.wrappers.length > 0) {
                this.formControl.setValue(this.wrappers[0]);
            }
        });
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
}
WrapperSelectComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.6", ngImport: i0, type: WrapperSelectComponent, deps: [{ token: FormlyDesignerConfig }], target: i0.ɵɵFactoryTarget.Component });
WrapperSelectComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.2.6", type: WrapperSelectComponent, selector: "formly-designer-wrapper-select", providers: [WRAPPER_SELECT_CONTROL_VALUE_ACCESSOR], ngImport: i0, template: `
    <select [formControl]="formControl" class="custom-select">
      <option *ngFor="let wrapper of wrappers" [ngValue]="wrapper">{{ wrapper }}</option>
    </select>
  `, isInline: true, styles: ["select{width:100%}\n"], directives: [{ type: i2.SelectControlValueAccessor, selector: "select:not([multiple])[formControlName],select:not([multiple])[formControl],select:not([multiple])[ngModel]", inputs: ["compareWith"] }, { type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i2.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { type: i3$1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i2.NgSelectOption, selector: "option", inputs: ["ngValue", "value"] }, { type: i2.ɵNgSelectMultipleOption, selector: "option", inputs: ["ngValue", "value"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.6", ngImport: i0, type: WrapperSelectComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'formly-designer-wrapper-select',
                    template: `
    <select [formControl]="formControl" class="custom-select">
      <option *ngFor="let wrapper of wrappers" [ngValue]="wrapper">{{ wrapper }}</option>
    </select>
  `,
                    styles: [`
    select {
      width: 100%;
    }
  `],
                    providers: [WRAPPER_SELECT_CONTROL_VALUE_ACCESSOR]
                }]
        }], ctorParameters: function () { return [{ type: FormlyDesignerConfig }]; } });

class WrapperPickerComponent {
    constructor(formBuilder, formlyDesignerConfig, formlyDesignerService) {
        this.formlyDesignerConfig = formlyDesignerConfig;
        this.formlyDesignerService = formlyDesignerService;
        this.selected = new EventEmitter();
        this.fieldEdit = new FormControl({});
        this.form = formBuilder.group({
            wrapper: ['', Validators.compose([Validators.required, Validators.pattern(/^\s*\S.*$/)])]
        });
    }
    get wrapper() {
        return this.form.get('wrapper')?.value;
    }
    get $modal() {
        return $(this.modalRef?.nativeElement);
    }
    add() {
        if (!this.wrapper) {
            return;
        }
        if (isObject(this.field)) {
            const field = cloneDeep(this.field);
            if (isArray(field.wrappers) && field.wrappers.length > 0) {
                field.wrappers.splice(field.wrappers.length - 1, 0, this.wrapper);
            }
            else {
                field.wrappers = [this.wrapper];
            }
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
    onApply() {
        this.field = this.formlyDesignerService.createPrunedField(this.fieldEdit.value);
        this.selected.emit(this.fieldEdit.value);
        this.$modal.modal('hide');
    }
}
WrapperPickerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.6", ngImport: i0, type: WrapperPickerComponent, deps: [{ token: i2.FormBuilder }, { token: FormlyDesignerConfig }, { token: FormlyDesignerService }], target: i0.ɵɵFactoryTarget.Component });
WrapperPickerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.2.6", type: WrapperPickerComponent, selector: "formly-designer-wrapper-picker", inputs: { field: "field" }, outputs: { selected: "selected" }, viewQueries: [{ propertyName: "modalRef", first: true, predicate: ["modal"], descendants: true, static: true }], ngImport: i0, template: `
    <form novalidate [formGroup]="form">
      <div class="form-group">
        <div class="input-group">
          <formly-designer-wrapper-select formControlName="wrapper">
          </formly-designer-wrapper-select>
          <button type="button" class="btn btn-secondary" [disabled]="form.invalid" (click)="add()">
            Add
          </button>
        </div>
      </div>
      <div #modal class="modal fade" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Add {{ wrapper }}</h5>
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
    </form>
  `, isInline: true, styles: [":host{width:inherit}.btn:not(:disabled){cursor:pointer}.input-group>.btn{border-radius:0 .25rem .25rem 0}.input-group,.modal-header{display:flex}.modal-header{justify-content:space-between}formly-designer-wrapper-select{flex-grow:2}\n"], components: [{ type: WrapperSelectComponent, selector: "formly-designer-wrapper-select" }, { type: WrapperEditorComponent, selector: "formly-designer-wrapper-editor", inputs: ["wrapper"] }], directives: [{ type: i2.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { type: i2.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i2.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i2.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { type: i2.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.6", ngImport: i0, type: WrapperPickerComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'formly-designer-wrapper-picker',
                    template: `
    <form novalidate [formGroup]="form">
      <div class="form-group">
        <div class="input-group">
          <formly-designer-wrapper-select formControlName="wrapper">
          </formly-designer-wrapper-select>
          <button type="button" class="btn btn-secondary" [disabled]="form.invalid" (click)="add()">
            Add
          </button>
        </div>
      </div>
      <div #modal class="modal fade" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Add {{ wrapper }}</h5>
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
    </form>
  `,
                    styles: [`
    :host {
      width: inherit;
    }
    .btn:not(:disabled) {
      cursor: pointer;
    }
    .input-group > .btn {
      border-radius: 0 .25rem .25rem 0;
    }
    .input-group, .modal-header {
      display: flex;
    }
    .modal-header {
      justify-content: space-between;
    }
    formly-designer-wrapper-select {
      flex-grow: 2;
    }
  `]
                }]
        }], ctorParameters: function () { return [{ type: i2.FormBuilder }, { type: FormlyDesignerConfig }, { type: FormlyDesignerService }]; }, propDecorators: { modalRef: [{
                type: ViewChild,
                args: ['modal', { static: true }]
            }], field: [{
                type: Input
            }], selected: [{
                type: Output
            }] } });

class WrappersPickerComponent {
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
WrappersPickerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.6", ngImport: i0, type: WrappersPickerComponent, deps: [{ token: FormlyDesignerConfig }, { token: FormlyDesignerService }], target: i0.ɵɵFactoryTarget.Component });
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
    `, isInline: true, styles: [".badge{margin-right:.25em}.badge{cursor:pointer}.noselect{-webkit-user-select:none;user-select:none}\n"], components: [{ type: WrapperPickerComponent, selector: "formly-designer-wrapper-picker", inputs: ["field"], outputs: ["selected"] }, { type: WrapperEditorComponent, selector: "formly-designer-wrapper-editor", inputs: ["wrapper"] }], directives: [{ type: i3$1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i2.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }] });
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
        }], ctorParameters: function () { return [{ type: FormlyDesignerConfig }, { type: FormlyDesignerService }]; }, propDecorators: { modalRef: [{
                type: ViewChild,
                args: ['modal', { static: true }]
            }], field: [{
                type: Input
            }], selected: [{
                type: Output
            }] } });

function decycle(value) {
    if (value == null) {
        return value;
    }
    let nextId = 1;
    const objects = new Map();
    return traverse(cloneDeep(value), (_key, v) => {
        if (isObject(v)) {
            if (objects.has(v)) {
                let id = objects.get(v);
                if (!id) {
                    v.$id = id = nextId++;
                    objects.set(v, id);
                }
                return { $ref: id };
            }
            else {
                objects.set(v, 0);
            }
        }
        return;
    });
}
function traverse(obj, replace) {
    if (isArray(obj)) {
        for (let i = 0; i < obj.length; i++) {
            traverseValue.bind(obj, i, obj[i], replace)();
        }
    }
    else if (isObject(obj)) {
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                traverseValue.bind(obj, key, obj[key], replace)();
            }
        }
    }
    return obj;
}
function traverseValue(key, value, replace) {
    const replacement = replace(key, value);
    if (replacement === undefined) {
        traverse(value, replace);
    }
    else if (this) {
        this[key] = replacement;
    }
}

class DecyclePipe {
    transform(value) {
        return decycle(value);
    }
}
DecyclePipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.6", ngImport: i0, type: DecyclePipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
DecyclePipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "12.0.0", version: "13.2.6", ngImport: i0, type: DecyclePipe, name: "decycle" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.6", ngImport: i0, type: DecyclePipe, decorators: [{
            type: Pipe,
            args: [{ name: 'decycle' }]
        }] });

class FormlyDesignerModule {
    constructor(config, formlyConfig) {
        formlyConfig.addConfig(config);
    }
    static forRoot(designerConfig = {}) {
        return {
            ngModule: FormlyDesignerModule,
            providers: [
                { provide: ANALYZE_FOR_ENTRY_COMPONENTS, useValue: [fieldComponents, wrapperComponents], multi: true },
                { provide: FORMLY_DESIGNER_CONFIG_TOKEN, useValue: designerConfig, multi: true }
            ]
        };
    }
}
FormlyDesignerModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.6", ngImport: i0, type: FormlyDesignerModule, deps: [{ token: Config }, { token: i3.FormlyConfig }], target: i0.ɵɵFactoryTarget.NgModule });
FormlyDesignerModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.2.6", ngImport: i0, type: FormlyDesignerModule, declarations: [FieldEditorComponent,
        FieldPickerComponent,
        FormlyDesignerComponent,
        PropertiesComponent,
        TypesComponent,
        TypeSelectComponent,
        WrapperEditorComponent,
        WrapperSelectComponent,
        WrapperPickerComponent,
        WrappersPickerComponent,
        DecyclePipe, FormlyDesignerWrapperComponent, FormlyDesignerFieldWrapperComponent], imports: [CommonModule,
        FormsModule,
        ReactiveFormsModule, i3.FormlyModule], exports: [FieldEditorComponent,
        FormlyDesignerComponent,
        PropertiesComponent,
        TypesComponent,
        WrapperEditorComponent] });
FormlyDesignerModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.2.6", ngImport: i0, type: FormlyDesignerModule, providers: [
        Config,
        DesignerExtension,
        DragDropService,
        FormlyDesignerConfig,
        FieldsService
    ], imports: [[
            CommonModule,
            FormsModule,
            ReactiveFormsModule,
            FormlyModule.forChild()
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.6", ngImport: i0, type: FormlyDesignerModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        FieldEditorComponent,
                        FieldPickerComponent,
                        FormlyDesignerComponent,
                        PropertiesComponent,
                        TypesComponent,
                        TypeSelectComponent,
                        WrapperEditorComponent,
                        WrapperSelectComponent,
                        WrapperPickerComponent,
                        WrappersPickerComponent,
                        DecyclePipe,
                        fieldComponents,
                        wrapperComponents
                    ],
                    imports: [
                        CommonModule,
                        FormsModule,
                        ReactiveFormsModule,
                        FormlyModule.forChild()
                    ],
                    exports: [
                        FieldEditorComponent,
                        FormlyDesignerComponent,
                        PropertiesComponent,
                        TypesComponent,
                        WrapperEditorComponent
                    ],
                    providers: [
                        Config,
                        DesignerExtension,
                        DragDropService,
                        FormlyDesignerConfig,
                        FieldsService
                    ],
                    entryComponents: [FormlyForm]
                }]
        }], ctorParameters: function () { return [{ type: Config }, { type: i3.FormlyConfig }]; } });

/*
 * Public API Surface of ngx-formly-designer
 */

/**
 * Generated bundle index. Do not edit.
 */

export { Config, DESIGNER_WRAPPER_NAME, DESIGNER_WRAPPER_TYPES, FIELD_DESIGNER_WRAPPER_NAME, FORMLY_DESIGNER_CONFIG_TOKEN, FieldEditorComponent, FieldType, FieldsService, FormlyDesignerComponent, FormlyDesignerConfig, FormlyDesignerModule, FormlyDesignerService, PropertiesComponent, TypesComponent, WrapperEditorComponent, decycle, fieldComponents, wrapperComponents };
//# sourceMappingURL=ngx-formly-designer.mjs.map
