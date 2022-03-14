import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, HostListener, Inject, Optional, SkipSelf, ViewChild, ViewContainerRef } from '@angular/core';
import { FieldWrapper } from '@ngx-formly/core';
import { isString } from 'lodash';
import { fromEvent, NEVER, timer } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { DragDropType } from '../models';
import { ParentService } from '../parent.service';
import { cloneDeep } from '../util';
import * as i0 from "@angular/core";
import * as i1 from "../";
import * as i2 from "../parent.service";
import * as i3 from "@angular/common";
export var DropPlacement;
(function (DropPlacement) {
    DropPlacement[DropPlacement["self"] = 0] = "self";
    DropPlacement[DropPlacement["before"] = 1] = "before";
    DropPlacement[DropPlacement["after"] = 2] = "after";
})(DropPlacement || (DropPlacement = {}));
export class FormlyDesignerFieldWrapperComponent extends FieldWrapper {
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
            isString(this.dragDropService.dragging);
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
FormlyDesignerFieldWrapperComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.6", ngImport: i0, type: FormlyDesignerFieldWrapperComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: i1.DragDropService }, { token: i1.FieldsService }, { token: i1.FormlyDesignerService }, { token: i0.NgZone }, { token: i2.ParentService }, { token: DOCUMENT }, { token: i2.ParentService, optional: true, skipSelf: true }], target: i0.ɵɵFactoryTarget.Component });
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
  `, isInline: true, styles: [":host{display:flex;position:relative;justify-content:flex-start;align-content:flex-start;align-items:flex-start;margin:.25rem}.designer-content{border:1px dashed #000;border-radius:5px;min-height:2rem;padding:.25em 1em;width:100%}.designer-content.designer-hover{background-color:#f0f4c3;border-color:#00c853;cursor:pointer}.designer-content.designer-subject{border-color:#00c853;border-style:solid;border-width:2px}.designer-content.designer-drop-hint{background-color:pink;border-color:#bbdefb}.designer-content.designer-drop-target{background-color:#f0f4c3;border-color:#00c853}.designer-drag-source{opacity:.4}.designer-drop-target-before{position:absolute;top:0;left:0;right:0;background-color:#0ff;height:12px;pointer-events:none;z-index:1}.designer-drop-target-after{position:absolute;bottom:0;left:0;right:0;background-color:#ff0;height:12px;pointer-events:none;z-index:1}\n"], directives: [{ type: i3.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
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
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i1.DragDropService }, { type: i1.FieldsService }, { type: i1.FormlyDesignerService }, { type: i0.NgZone }, { type: i2.ParentService }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: i2.ParentService, decorators: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmllbGQtZGVzaWduZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9saWItZm9ybWx5LWRlc2lnbmVyL3NyYy9saWIvd3JhcHBlcnMvZmllbGQtZGVzaWduZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzNDLE9BQU8sRUFFTCxTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixNQUFNLEVBSU4sUUFBUSxFQUNSLFFBQVEsRUFDUixTQUFTLEVBQ1QsZ0JBQWdCLEVBQ2pCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxZQUFZLEVBQXFCLE1BQU0sa0JBQWtCLENBQUM7QUFDbkUsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLFFBQVEsQ0FBQztBQUNsQyxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBZ0IsS0FBSyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzdELE9BQU8sRUFBRSxVQUFVLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXRELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFFekMsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxTQUFTLENBQUM7Ozs7O0FBRXBDLE1BQU0sQ0FBTixJQUFZLGFBSVg7QUFKRCxXQUFZLGFBQWE7SUFDdkIsaURBQUksQ0FBQTtJQUNKLHFEQUFNLENBQUE7SUFDTixtREFBSyxDQUFBO0FBQ1AsQ0FBQyxFQUpXLGFBQWEsS0FBYixhQUFhLFFBSXhCO0FBbUZELE1BQU0sT0FBTyxtQ0FBb0MsU0FBUSxZQUFZO0lBeUVuRSxZQUNVLGNBQWlDLEVBQ2pDLGVBQWdDLEVBQ2hDLGFBQTRCLEVBQzdCLHFCQUE0QyxFQUMzQyxJQUFZLEVBQ3BCLGFB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RUFBRSxJQUFJLEVBQUU7Z0JBQ1gsT0FBTztzQkFBaEUsU0FBUzt1QkFBQyxTQUFTLEVBQUUsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7Z0JBa0h4RCxPQUFPO3NCQUROLFlBQVk7dUJBQUMsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRE9DVU1FTlQgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgSG9zdExpc3RlbmVyLFxuICBJbmplY3QsXG4gIE5nWm9uZSxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIE9wdGlvbmFsLFxuICBTa2lwU2VsZixcbiAgVmlld0NoaWxkLFxuICBWaWV3Q29udGFpbmVyUmVmXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRmllbGRXcmFwcGVyLCBGb3JtbHlGaWVsZENvbmZpZyB9IGZyb20gJ0BuZ3gtZm9ybWx5L2NvcmUnO1xuaW1wb3J0IHsgaXNTdHJpbmcgfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgZnJvbUV2ZW50LCBORVZFUiwgU3Vic2NyaXB0aW9uLCB0aW1lciB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgY2F0Y2hFcnJvciwgbWFwLCB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBEcmFnRHJvcFNlcnZpY2UsIEZpZWxkc1NlcnZpY2UsIEZvcm1seURlc2lnbmVyU2VydmljZSB9IGZyb20gJy4uLyc7XG5pbXBvcnQgeyBEcmFnRHJvcFR5cGUgfSBmcm9tICcuLi9tb2RlbHMnO1xuaW1wb3J0IHsgUGFyZW50IH0gZnJvbSAnLi4vcGFyZW50JztcbmltcG9ydCB7IFBhcmVudFNlcnZpY2UgfSBmcm9tICcuLi9wYXJlbnQuc2VydmljZSc7XG5pbXBvcnQgeyBjbG9uZURlZXAgfSBmcm9tICcuLi91dGlsJztcblxuZXhwb3J0IGVudW0gRHJvcFBsYWNlbWVudCB7XG4gIHNlbGYsXG4gIGJlZm9yZSxcbiAgYWZ0ZXIsXG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Zvcm1seS1kZXNpZ25lci1maWVsZC13cmFwcGVyJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2ICNjb250ZW50IGNsYXNzPVwiZGVzaWduZXItY29udGVudFwiIFt0aXRsZV09XCJ0aXRsZVwiXG4gICAgICBbbmdDbGFzc109XCJ7XG4gICAgICAgICdkZXNpZ25lci1zdWJqZWN0JzogaXNTdWJqZWN0LFxuICAgICAgICAnZGVzaWduZXItZHJhZy1zb3VyY2UnOiBpc0RyYWdTb3VyY2UsXG4gICAgICAgICdkZXNpZ25lci1kcm9wLWhpbnQnOiBpc0RyYWdnaW5nLFxuICAgICAgICAnZGVzaWduZXItZHJvcC10YXJnZXQnOiBpc0Ryb3BUYXJnZXRTZWxmLFxuICAgICAgICAnZGVzaWduZXItaG92ZXInOiBpc0hvdmVyaW5nICYmICFpc0RyYWdnaW5nXG4gICAgICB9XCJcbiAgICAgIGRyYWdnYWJsZT1cInRydWVcIiAoZHJhZ3N0YXJ0KT1cIm9uRHJhZ1N0YXJ0KCRldmVudClcIiAoZHJhZ2VuZCk9XCJvbkRyYWdFbmQoKVwiXG4gICAgICAoZHJhZ2VudGVyKT1cIm9uRHJhZ0VudGVyKCRldmVudClcIiAoZHJhZ2xlYXZlKT1cIm9uRHJhZ0xlYXZlKCRldmVudClcIiAoZHJvcCk9XCJvbkRyb3AoJGV2ZW50KVwiXG4gICAgICAobW91c2VvdXQpPVwib25Nb3VzZU91dCgpXCI+XG4gICAgICA8bmctdGVtcGxhdGUgI2ZpZWxkQ29tcG9uZW50PjwvbmctdGVtcGxhdGU+XG4gICAgPC9kaXY+XG4gICAgPGRpdiAqbmdJZj1cImlzRHJvcFRhcmdldEJlZm9yZVwiIGNsYXNzPVwiZGVzaWduZXItZHJvcC10YXJnZXQtYmVmb3JlXCI+PC9kaXY+XG4gICAgPGRpdiAqbmdJZj1cImlzRHJvcFRhcmdldEFmdGVyXCIgY2xhc3M9XCJkZXNpZ25lci1kcm9wLXRhcmdldC1hZnRlclwiPjwvZGl2PlxuICBgLFxuICBzdHlsZXM6IFtgXG4gICAgOmhvc3Qge1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcbiAgICAgIGFsaWduLWNvbnRlbnQ6IGZsZXgtc3RhcnQ7XG4gICAgICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcbiAgICAgIG1hcmdpbjogLjI1cmVtO1xuICAgIH1cbiAgICAuZGVzaWduZXItY29udGVudCB7XG4gICAgICBib3JkZXI6IDFweCBkYXNoZWQgIzAwMDtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDVweDtcbiAgICAgIG1pbi1oZWlnaHQ6IDJyZW07XG4gICAgICBwYWRkaW5nOiAuMjVlbSAxZW07XG4gICAgICB3aWR0aDogMTAwJTtcbiAgICB9XG4gICAgLmRlc2lnbmVyLWNvbnRlbnQuZGVzaWduZXItaG92ZXIge1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2YwZjRjMztcbiAgICAgIGJvcmRlci1jb2xvcjogIzAwYzg1MztcbiAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICB9XG4gICAgLmRlc2lnbmVyLWNvbnRlbnQuZGVzaWduZXItc3ViamVjdCB7XG4gICAgICBib3JkZXItY29sb3I6ICMwMGM4NTM7XG4gICAgICBib3JkZXItc3R5bGU6IHNvbGlkO1xuICAgICAgYm9yZGVyLXdpZHRoOiAycHg7XG4gICAgfVxuICAgIC5kZXNpZ25lci1jb250ZW50LmRlc2lnbmVyLWRyb3AtaGludCB7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiBwaW5rO1xuICAgICAgYm9yZGVyLWNvbG9yOiAjYmJkZWZiO1xuICAgIH1cbiAgICAuZGVzaWduZXItY29udGVudC5kZXNpZ25lci1kcm9wLXRhcmdldCB7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjBmNGMzO1xuICAgICAgYm9yZGVyLWNvbG9yOiAjMDBjODUzO1xuICAgIH1cbiAgICAuZGVzaWduZXItZHJhZy1zb3VyY2Uge1xuICAgICAgb3BhY2l0eTogLjQ7XG4gICAgfVxuICAgIC5kZXNpZ25lci1kcm9wLXRhcmdldC1iZWZvcmUge1xuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgdG9wOiAwO1xuICAgICAgbGVmdDogMDtcbiAgICAgIHJpZ2h0OiAwO1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogYXF1YTtcbiAgICAgIGhlaWdodDogMTJweDtcbiAgICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xuICAgICAgei1pbmRleDogMTtcbiAgICB9XG4gICAgLmRlc2lnbmVyLWRyb3AtdGFyZ2V0LWFmdGVyIHtcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgIGJvdHRvbTogMDtcbiAgICAgIGxlZnQ6IDA7XG4gICAgICByaWdodDogMDtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6IHllbGxvdztcbiAgICAgIGhlaWdodDogMTJweDtcbiAgICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xuICAgICAgei1pbmRleDogMTtcbiAgICB9XG4gIGBdLFxuICBwcm92aWRlcnM6IFtcbiAgICBQYXJlbnRTZXJ2aWNlLFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBGb3JtbHlEZXNpZ25lckZpZWxkV3JhcHBlckNvbXBvbmVudCBleHRlbmRzIEZpZWxkV3JhcHBlciBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95LCBQYXJlbnQge1xuICBAVmlld0NoaWxkKCdmaWVsZENvbXBvbmVudCcsIHsgcmVhZDogVmlld0NvbnRhaW5lclJlZiwgc3RhdGljOiB0cnVlIH0pIG92ZXJyaWRlIGZpZWxkQ29tcG9uZW50ITogVmlld0NvbnRhaW5lclJlZjtcbiAgQFZpZXdDaGlsZCgnY29udGVudCcsIHsgcmVhZDogRWxlbWVudFJlZiwgc3RhdGljOiB0cnVlIH0pIGNvbnRlbnQ/OiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PjtcblxuICBkcm9wVGFyZ2V0Q291bnRlciA9IDA7XG4gIHByaXZhdGUgc3Vic2NyaXB0aW9uczogU3Vic2NyaXB0aW9uW10gPSBbXTtcblxuICBnZXQgdGl0bGUoKTogc3RyaW5nIHwgbnVsbCB7IHJldHVybiB0aGlzLl90aXRsZTsgfVxuICBzZXQgdGl0bGUodmFsdWU6IHN0cmluZyB8IG51bGwpIHtcbiAgICBpZiAodmFsdWUgIT09IHRoaXMuX3RpdGxlKSB7XG4gICAgICB0aGlzLl90aXRsZSA9IHZhbHVlO1xuICAgICAgdGhpcy5jaGFuZ2VEZXRlY3Rvci5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG4gIH1cbiAgcHJpdmF0ZSBfdGl0bGU6IHN0cmluZyB8IG51bGwgPSBudWxsO1xuXG4gIGdldCBpc0RyYWdnaW5nKCkgeyByZXR1cm4gdGhpcy5faXNEcmFnZ2luZzsgfVxuICBzZXQgaXNEcmFnZ2luZyh2YWx1ZTogYm9vbGVhbikge1xuICAgIGlmICh2YWx1ZSAhPT0gdGhpcy5faXNEcmFnZ2luZykge1xuICAgICAgdGhpcy5faXNEcmFnZ2luZyA9IHZhbHVlO1xuICAgICAgdGhpcy5jaGFuZ2VEZXRlY3Rvci5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG4gIH1cbiAgcHJpdmF0ZSBfaXNEcmFnZ2luZyA9IGZhbHNlO1xuXG4gIGdldCBpc0hvdmVyaW5nKCkgeyByZXR1cm4gdGhpcy5faXNIb3ZlcmluZzsgfVxuICBzZXQgaXNIb3ZlcmluZyh2YWx1ZTogYm9vbGVhbikge1xuICAgIGlmICh2YWx1ZSAhPT0gdGhpcy5faXNIb3ZlcmluZykge1xuICAgICAgdGhpcy5faXNIb3ZlcmluZyA9IHZhbHVlO1xuICAgICAgdGhpcy5jaGFuZ2VEZXRlY3Rvci5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG4gIH1cbiAgcHJpdmF0ZSBfaXNIb3ZlcmluZyA9IGZhbHNlO1xuXG4gIGdldCBwYXJlbnQoKTogUGFyZW50IHwgdW5kZWZpbmVkIHsgcmV0dXJuIHRoaXMucGFyZW50UGFyZW50U2VydmljZT8ucGFyZW50OyB9XG5cbiAgZ2V0IGRyb3BUYXJnZXRQbGFjZW1lbnQoKTogRHJvcFBsYWNlbWVudCB8IG51bGwgeyByZXR1cm4gdGhpcy5fZHJvcFRhcmdldFBsYWNlbWVudDsgfVxuICBzZXQgZHJvcFRhcmdldFBsYWNlbWVudCh2YWx1ZTogRHJvcFBsYWNlbWVudCB8IG51bGwpIHtcbiAgICBpZiAodmFsdWUgIT09IHRoaXMuX2Ryb3BUYXJnZXRQbGFjZW1lbnQpIHtcbiAgICAgIHRoaXMuX2Ryb3BUYXJnZXRQbGFjZW1lbnQgPSB2YWx1ZTtcbiAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3IubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuICB9XG4gIHByaXZhdGUgX2Ryb3BUYXJnZXRQbGFjZW1lbnQ6IERyb3BQbGFjZW1lbnQgfCBudWxsID0gbnVsbDtcblxuICBnZXQgZGVzaWduZXJJZCgpOiBzdHJpbmcgfCB1bmRlZmluZWQgeyByZXR1cm4gdGhpcy5maWVsZC50ZW1wbGF0ZU9wdGlvbnM/LlsnJGRlc2lnbmVySWQnXTsgfVxuXG4gIGdldCBpc0ZpZWxkR3JvdXAoKTogYm9vbGVhbiB7IHJldHVybiBBcnJheS5pc0FycmF5KHRoaXMuZmllbGQuZmllbGRHcm91cCk7IH1cblxuICBnZXQgaXNEcmFnU291cmNlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmRyYWdEcm9wU2VydmljZS5kcmFnZ2luZyA9PT0gdGhpcy5kZXNpZ25lcklkO1xuICB9XG5cbiAgZ2V0IGlzRHJvcFRhcmdldCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5kcmFnRHJvcFNlcnZpY2UuZHJvcFRhcmdldCA9PT0gdGhpcy5kZXNpZ25lcklkO1xuICB9XG5cbiAgZ2V0IGlzRHJvcFRhcmdldFNlbGYoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuaXNEcm9wVGFyZ2V0ICYmICF0aGlzLmRyb3BUYXJnZXRQbGFjZW1lbnQgJiYgdGhpcy5pc0ZpZWxkR3JvdXA7XG4gIH1cblxuICBnZXQgaXNEcm9wVGFyZ2V0QmVmb3JlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmlzRHJvcFRhcmdldCAmJiB0aGlzLmRyb3BUYXJnZXRQbGFjZW1lbnQgPT09IERyb3BQbGFjZW1lbnQuYmVmb3JlO1xuICB9XG5cbiAgZ2V0IGlzRHJvcFRhcmdldEFmdGVyKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmlzRHJvcFRhcmdldCAmJiB0aGlzLmRyb3BUYXJnZXRQbGFjZW1lbnQgPT09IERyb3BQbGFjZW1lbnQuYWZ0ZXI7XG4gIH1cblxuICBnZXQgaXNTdWJqZWN0KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmZvcm1seURlc2lnbmVyU2VydmljZS5zZWxlY3RlZERlc2lnbmVySWQgPT09IHRoaXMuZGVzaWduZXJJZDtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgY2hhbmdlRGV0ZWN0b3I6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIHByaXZhdGUgZHJhZ0Ryb3BTZXJ2aWNlOiBEcmFnRHJvcFNlcnZpY2UsXG4gICAgcHJpdmF0ZSBmaWVsZHNTZXJ2aWNlOiBGaWVsZHNTZXJ2aWNlLFxuICAgIHB1YmxpYyBmb3JtbHlEZXNpZ25lclNlcnZpY2U6IEZvcm1seURlc2lnbmVyU2VydmljZSxcbiAgICBwcml2YXRlIHpvbmU6IE5nWm9uZSxcbiAgICBwYXJlbnRTZXJ2aWNlOiBQYXJlbnRTZXJ2aWNlLFxuICAgIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgZG9jdW1lbnQ/OiBhbnksXG4gICAgQFNraXBTZWxmKCkgQE9wdGlvbmFsKCkgcHJpdmF0ZSBwYXJlbnRQYXJlbnRTZXJ2aWNlPzogUGFyZW50U2VydmljZSxcbiAgKSB7XG4gICAgc3VwZXIoKTtcbiAgICBwYXJlbnRTZXJ2aWNlLnBhcmVudCA9IHRoaXM7XG4gICAgaWYgKHBhcmVudFBhcmVudFNlcnZpY2UpIHtcbiAgICAgIHBhcmVudFBhcmVudFNlcnZpY2UuYWRkQ2hpbGQodGhpcyk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmRvY3VtZW50Py5kZWZhdWx0Vmlldykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBjb250ZW50ID0gdGhpcy5jb250ZW50Py5uYXRpdmVFbGVtZW50O1xuICAgIGlmICghY29udGVudCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChcbiAgICAgIHRoaXMuZHJhZ0Ryb3BTZXJ2aWNlLmRyYWdnaW5nJC5zdWJzY3JpYmUoZHJhZ2dpbmcgPT4gdGhpcy5pc0RyYWdnaW5nID0gZHJhZ2dpbmcgIT0gbnVsbCksXG4gICAgICBmcm9tRXZlbnQodGhpcy5kb2N1bWVudC5kZWZhdWx0VmlldywgJ21vdXNldXAnKS5zdWJzY3JpYmUodGhpcy5vbldpbmRvd01vdXNlVXAuYmluZCh0aGlzKSksXG4gICAgKTtcbiAgICB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goXG4gICAgICAgIGZyb21FdmVudChjb250ZW50LCAnZHJhZ292ZXInKS5zdWJzY3JpYmUoZSA9PiB0aGlzLm9uRHJhZ092ZXIoZSBhcyBEcmFnRXZlbnQpKSxcbiAgICAgICAgZnJvbUV2ZW50KGNvbnRlbnQsICdtb3VzZW92ZXInKS5zdWJzY3JpYmUoZSA9PiB0aGlzLm9uTW91c2VPdmVyKGUgYXMgTW91c2VFdmVudCkpLFxuICAgICAgKTtcbiAgICB9KTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5zcGxpY2UoMCkuZm9yRWFjaChzdWJzY3JpcHRpb24gPT4gc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCkpO1xuICAgIHRoaXMucGFyZW50UGFyZW50U2VydmljZT8ucmVtb3ZlQ2hpbGQodGhpcyk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdjbGljaycsIFsnJGV2ZW50J10pXG4gIG9uQ2xpY2soZXZlbnQ6IE1vdXNlRXZlbnQpOiB2b2lkIHtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB0aGlzLmZvcm1seURlc2lnbmVyU2VydmljZS5kaWRDbGlja0ZpZWxkKHRoaXMuZmllbGQpO1xuICB9XG5cbiAgb25EcmFnU3RhcnQoZXZlbnQ6IERyYWdFdmVudCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmRyYWdEcm9wU2VydmljZS5kcmFnZ2luZykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBldmVudC5kYXRhVHJhbnNmZXI/LnNldERhdGEoRHJhZ0Ryb3BUeXBlLkZpZWxkLCB0aGlzLmRlc2lnbmVySWQgPz8gJycpO1xuICAgIHRoaXMuZHJhZ0Ryb3BTZXJ2aWNlLmJlZ2luRHJhZyh0aGlzLmRlc2lnbmVySWQgPz8gbnVsbCk7XG4gIH1cblxuICBvbkRyYWdFbmQoKTogdm9pZCB7XG4gICAgdGhpcy5kcmFnRHJvcFNlcnZpY2UuZW5kRHJhZygpO1xuICB9XG5cbiAgb25EcmFnRW50ZXIoZXZlbnQ6IERyYWdFdmVudCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5zaG91bGRIYW5kbGVEcmFnRXZlbnQoZXZlbnQpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgdGhpcy5kcm9wVGFyZ2V0Q291bnRlcisrO1xuICB9XG5cbiAgb25EcmFnTGVhdmUoZXZlbnQ6IERyYWdFdmVudCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5zaG91bGRIYW5kbGVEcmFnRXZlbnQoZXZlbnQpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICh0aGlzLmRyb3BUYXJnZXRDb3VudGVyID4gMCkge1xuICAgICAgdGhpcy5kcm9wVGFyZ2V0Q291bnRlci0tO1xuICAgICAgaWYgKHRoaXMuZHJvcFRhcmdldENvdW50ZXIgPT09IDApIHtcbiAgICAgICAgdGhpcy5kcm9wVGFyZ2V0UGxhY2VtZW50ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBvbkRyYWdPdmVyKGV2ZW50OiBEcmFnRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAoZXZlbnQuZGVmYXVsdFByZXZlbnRlZCB8fCAhdGhpcy5zaG91bGRIYW5kbGVEcmFnRXZlbnQoZXZlbnQpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xuICAgICAgdGhpcy5kcm9wVGFyZ2V0UGxhY2VtZW50ID0gdGhpcy5nZXREcm9wVGFyZ2V0UGxhY2VtZW50KGV2ZW50KTtcbiAgICAgIHRoaXMuZHJhZ0Ryb3BTZXJ2aWNlLmRyb3BUYXJnZXQgPSB0aGlzLmZpZWxkLnRlbXBsYXRlT3B0aW9ucz8uWyckZGVzaWduZXJJZCddID8/IG51bGw7XG4gICAgfSk7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgfVxuXG4gIHByaXZhdGUgc2hvdWxkSGFuZGxlRHJhZ0V2ZW50KGV2ZW50OiBEcmFnRXZlbnQpOiBib29sZWFuIHtcbiAgICBpZiAoZXZlbnQuZGF0YVRyYW5zZmVyPy50eXBlcy5zb21lKHQgPT4gdCA9PT0gRHJhZ0Ryb3BUeXBlLkZpZWxkKSkge1xuICAgICAgcmV0dXJuIHRoaXMuZHJhZ0Ryb3BTZXJ2aWNlLmRyYWdnaW5nICE9PSB0aGlzLmRlc2lnbmVySWQ7XG4gICAgfVxuICAgIHJldHVybiAhIWV2ZW50LmRhdGFUcmFuc2Zlcj8udHlwZXMuc29tZSh0ID0+IHQgPT09IERyYWdEcm9wVHlwZS5UeXBlKSAmJlxuICAgICAgaXNTdHJpbmcodGhpcy5kcmFnRHJvcFNlcnZpY2UuZHJhZ2dpbmcpO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXREcm9wVGFyZ2V0UGxhY2VtZW50KGV2ZW50OiBEcmFnRXZlbnQpOiBEcm9wUGxhY2VtZW50IHtcbiAgICBjb25zdCByZWN0ID0gdGhpcy5jb250ZW50Py5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGlmIChyZWN0KSB7XG4gICAgICBjb25zdCB0aHJlc2hvbGQgPSByZWN0LmhlaWdodCAqIC4zMztcbiAgICAgIGlmIChldmVudC5jbGllbnRZIDwgcmVjdC50b3AgKyB0aHJlc2hvbGQpIHtcbiAgICAgICAgcmV0dXJuIERyb3BQbGFjZW1lbnQuYmVmb3JlO1xuICAgICAgfVxuICAgICAgaWYgKGV2ZW50LmNsaWVudFkgPiByZWN0LmJvdHRvbSAtIHRocmVzaG9sZCkge1xuICAgICAgICByZXR1cm4gRHJvcFBsYWNlbWVudC5hZnRlcjtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIERyb3BQbGFjZW1lbnQuc2VsZjtcbiAgfVxuXG4gIG9uRHJvcChldmVudDogRHJhZ0V2ZW50KTogdm9pZCB7XG4gICAgaWYgKHRoaXMuc2hvdWxkSGFuZGxlRHJhZ0V2ZW50KGV2ZW50KSkge1xuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICBpZiAoZXZlbnQuZGF0YVRyYW5zZmVyPy50eXBlcy5pbmNsdWRlcyhEcmFnRHJvcFR5cGUuRmllbGQpKSB7XG4gICAgICAgIGNvbnN0IGRlc2lnbmVySWQgPSB0aGlzLmRyYWdEcm9wU2VydmljZS5kcmFnZ2luZztcbiAgICAgICAgY29uc3QgZmllbGQgPSB0aGlzLmZpZWxkc1NlcnZpY2UuZmluZChkZXNpZ25lcklkLCB0aGlzLmZvcm1seURlc2lnbmVyU2VydmljZS5kZXNpZ25lckZpZWxkcyk7XG4gICAgICAgIGlmIChmaWVsZCkge1xuICAgICAgICAgIC8vIEdldCBwbGFjZW1lbnQgaW5kZXggYmVmb3JlIHRoZSBmaWVsZHMgcmVmcmVzaCBjYXVzZWQgYnkgcmVtb3ZhbFxuICAgICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5nZXREcm9wUGxhY2VtZW50SW5kZXgoZmllbGQpO1xuICAgICAgICAgIHRoaXMuZm9ybWx5RGVzaWduZXJTZXJ2aWNlLnJlbW92ZUZpZWxkKGZpZWxkKTtcbiAgICAgICAgICBpZiAodGhpcy5wYXJlbnQgJiYgdGhpcy5kcm9wVGFyZ2V0UGxhY2VtZW50ICE9PSBEcm9wUGxhY2VtZW50LnNlbGYpIHtcbiAgICAgICAgICAgIHRoaXMucGFyZW50LmFkZENoaWxkRmllbGQoZmllbGQsIGluZGV4KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5hZGRDaGlsZEZpZWxkKGZpZWxkKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoZXZlbnQuZGF0YVRyYW5zZmVyPy50eXBlcy5pbmNsdWRlcyhEcmFnRHJvcFR5cGUuVHlwZSkpIHtcbiAgICAgICAgaWYgKHRoaXMuZHJhZ0Ryb3BTZXJ2aWNlLmRyYWdnaW5nKSB7XG4gICAgICAgICAgaWYgKHRoaXMucGFyZW50ICYmIHRoaXMuZHJvcFRhcmdldFBsYWNlbWVudCAhPT0gRHJvcFBsYWNlbWVudC5zZWxmKSB7XG4gICAgICAgICAgICB0aGlzLnBhcmVudC5hZGRDaGlsZFR5cGUodGhpcy5kcmFnRHJvcFNlcnZpY2UuZHJhZ2dpbmcsIHRoaXMuZ2V0RHJvcFBsYWNlbWVudEluZGV4KCkpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmFkZENoaWxkVHlwZSh0aGlzLmRyYWdEcm9wU2VydmljZS5kcmFnZ2luZyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuZHJhZ0Ryb3BTZXJ2aWNlLmVuZERyYWcoKTtcbiAgICB0aGlzLnJlc2V0RHJvcCgpO1xuICB9XG5cbiAgb25Nb3VzZU92ZXIoZXZlbnQ6IE1vdXNlRXZlbnQpOiB2b2lkIHtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB0aGlzLnpvbmUucnVuKCgpID0+IHtcbiAgICAgIHRoaXMuaXNIb3ZlcmluZyA9IHRydWU7XG4gICAgICB0aGlzLnRpdGxlID0gdGhpcy5kcmFnRHJvcFNlcnZpY2UuZHJhZ2dpbmcgPT0gbnVsbCA/XG4gICAgICAgIGBDbGljayB0byBlZGl0ICR7dGhpcy5mb3JtbHlEZXNpZ25lclNlcnZpY2UuZ2V0VHlwZU5hbWUodGhpcy5maWVsZC50eXBlKX1gIDpcbiAgICAgICAgbnVsbDtcbiAgICB9KTtcbiAgfVxuXG4gIG9uTW91c2VPdXQoKTogdm9pZCB7XG4gICAgdGhpcy5pc0hvdmVyaW5nID0gZmFsc2U7XG4gIH1cblxuICBvbldpbmRvd01vdXNlVXAoKTogdm9pZCB7XG4gICAgdGhpcy5yZXNldERyb3AoKTtcbiAgfVxuXG4gIGFzeW5jIGFkZENoaWxkRmllbGQoZmllbGQ6IEZvcm1seUZpZWxkQ29uZmlnLCBpbmRleD86IG51bWJlcik6IFByb21pc2U8dm9pZD4ge1xuICAgIGlmICghdGhpcy5pc0ZpZWxkR3JvdXApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKCF0aGlzLmZpZWxkc1NlcnZpY2UuY2hlY2tGaWVsZChmaWVsZCwgdGhpcy5mb3JtbHlEZXNpZ25lclNlcnZpY2UuZGVzaWduZXJGaWVsZHMsIHRoaXMuZmllbGQpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IHVwZGF0ZWRGaWVsZCA9IGNsb25lRGVlcCh0aGlzLmZpZWxkKTtcbiAgICBpZiAoIXVwZGF0ZWRGaWVsZC5maWVsZEdyb3VwKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IGZpZWxkSW5kZXggPSAoaW5kZXggPT0gbnVsbCB8fCBpc05hTihpbmRleCkpID8gdXBkYXRlZEZpZWxkLmZpZWxkR3JvdXAubGVuZ3RoIDpcbiAgICAgIE1hdGgubWluKHVwZGF0ZWRGaWVsZC5maWVsZEdyb3VwLmxlbmd0aCwgTWF0aC5tYXgoMCwgaW5kZXgpKTtcbiAgICB1cGRhdGVkRmllbGQuZmllbGRHcm91cC5zcGxpY2UoZmllbGRJbmRleCwgMCwgZmllbGQpO1xuICAgIHJldHVybiB0aW1lcigwKVxuICAgICAgLnBpcGUoXG4gICAgICAgIHRhcCgoKSA9PiB0aGlzLmZvcm1seURlc2lnbmVyU2VydmljZS51cGRhdGVGaWVsZCh0aGlzLmZpZWxkLCB1cGRhdGVkRmllbGQpKSxcbiAgICAgICAgY2F0Y2hFcnJvcigoKSA9PiBORVZFUiksXG4gICAgICAgIG1hcCgoKSA9PiB1bmRlZmluZWQpXG4gICAgICApLnRvUHJvbWlzZSgpO1xuICB9XG5cbiAgYXN5bmMgYWRkQ2hpbGRUeXBlKHR5cGU6IHN0cmluZywgaW5kZXg/OiBudW1iZXIpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBmaWVsZCA9IHRoaXMuZm9ybWx5RGVzaWduZXJTZXJ2aWNlLmNyZWF0ZUZpZWxkKHR5cGUpO1xuICAgIGF3YWl0IHRoaXMuYWRkQ2hpbGRGaWVsZChmaWVsZCwgaW5kZXgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSBkcm9wRmllbGQgLSBmaWVsZCB0byBpZ25vcmUgZm9yIGluZGV4IGRldGVybWluYXRpb25cbiAgICovXG4gIHByaXZhdGUgZ2V0RHJvcFBsYWNlbWVudEluZGV4KGRyb3BGaWVsZD86IEZvcm1seUZpZWxkQ29uZmlnKTogbnVtYmVyIHwgdW5kZWZpbmVkIHtcbiAgICBpZiAodGhpcy5wYXJlbnQgJiYgdGhpcy5kcm9wVGFyZ2V0UGxhY2VtZW50ICE9PSBEcm9wUGxhY2VtZW50LnNlbGYpIHtcbiAgICAgIGNvbnN0IHBhcmVudENoaWxkcmVuID0gZHJvcEZpZWxkID9cbiAgICAgICAgdGhpcy5wYXJlbnRQYXJlbnRTZXJ2aWNlPy5jaGlsZHJlbi5maWx0ZXIoZmQgPT4gZmQuZGVzaWduZXJJZCAhPT0gZHJvcEZpZWxkLnRlbXBsYXRlT3B0aW9ucz8uWyckZGVzaWduZXJJZCddKSA6XG4gICAgICAgIHRoaXMucGFyZW50UGFyZW50U2VydmljZT8uY2hpbGRyZW47XG4gICAgICBjb25zdCBkcm9wSW5kZXggPSBwYXJlbnRDaGlsZHJlbj8uaW5kZXhPZih0aGlzKSA/PyAwO1xuICAgICAgcmV0dXJuIHRoaXMuZHJvcFRhcmdldFBsYWNlbWVudCA9PT0gRHJvcFBsYWNlbWVudC5iZWZvcmUgPyBkcm9wSW5kZXggOiBkcm9wSW5kZXggKyAxO1xuICAgIH1cbiAgICByZXR1cm47XG4gIH1cblxuICBwcml2YXRlIHJlc2V0RHJvcCgpOiB2b2lkIHtcbiAgICB0aGlzLmRyb3BUYXJnZXRDb3VudGVyID0gMDtcbiAgICB0aGlzLmRyb3BUYXJnZXRQbGFjZW1lbnQgPSBudWxsO1xuICAgIGlmICh0aGlzLmlzRHJvcFRhcmdldCkge1xuICAgICAgdGhpcy5kcmFnRHJvcFNlcnZpY2UuZHJvcFRhcmdldCA9IG51bGw7XG4gICAgfVxuICB9XG59XG4iXX0=