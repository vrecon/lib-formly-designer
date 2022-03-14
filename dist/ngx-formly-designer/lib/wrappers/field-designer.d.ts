import { ChangeDetectorRef, ElementRef, NgZone, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
import { FieldWrapper, FormlyFieldConfig } from '@ngx-formly/core';
import { DragDropService, FieldsService, FormlyDesignerService } from '../';
import { Parent } from '../parent';
import { ParentService } from '../parent.service';
import * as i0 from "@angular/core";
export declare enum DropPlacement {
    self = 0,
    before = 1,
    after = 2
}
export declare class FormlyDesignerFieldWrapperComponent extends FieldWrapper implements OnInit, OnDestroy, Parent {
    private changeDetector;
    private dragDropService;
    private fieldsService;
    formlyDesignerService: FormlyDesignerService;
    private zone;
    private document?;
    private parentParentService?;
    fieldComponent: ViewContainerRef;
    content?: ElementRef<HTMLElement>;
    dropTargetCounter: number;
    private subscriptions;
    get title(): string | null;
    set title(value: string | null);
    private _title;
    get isDragging(): boolean;
    set isDragging(value: boolean);
    private _isDragging;
    get isHovering(): boolean;
    set isHovering(value: boolean);
    private _isHovering;
    get parent(): Parent | undefined;
    get dropTargetPlacement(): DropPlacement | null;
    set dropTargetPlacement(value: DropPlacement | null);
    private _dropTargetPlacement;
    get designerId(): string | undefined;
    get isFieldGroup(): boolean;
    get isDragSource(): boolean;
    get isDropTarget(): boolean;
    get isDropTargetSelf(): boolean;
    get isDropTargetBefore(): boolean;
    get isDropTargetAfter(): boolean;
    get isSubject(): boolean;
    constructor(changeDetector: ChangeDetectorRef, dragDropService: DragDropService, fieldsService: FieldsService, formlyDesignerService: FormlyDesignerService, zone: NgZone, parentService: ParentService, document?: any, parentParentService?: ParentService | undefined);
    ngOnInit(): void;
    ngOnDestroy(): void;
    onClick(event: MouseEvent): void;
    onDragStart(event: DragEvent): void;
    onDragEnd(): void;
    onDragEnter(event: DragEvent): void;
    onDragLeave(event: DragEvent): void;
    onDragOver(event: DragEvent): void;
    private shouldHandleDragEvent;
    private getDropTargetPlacement;
    onDrop(event: DragEvent): void;
    onMouseOver(event: MouseEvent): void;
    onMouseOut(): void;
    onWindowMouseUp(): void;
    addChildField(field: FormlyFieldConfig, index?: number): Promise<void>;
    addChildType(type: string, index?: number): Promise<void>;
    /**
     * @param dropField - field to ignore for index determination
     */
    private getDropPlacementIndex;
    private resetDrop;
    static ɵfac: i0.ɵɵFactoryDeclaration<FormlyDesignerFieldWrapperComponent, [null, null, null, null, null, null, null, { optional: true; skipSelf: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<FormlyDesignerFieldWrapperComponent, "formly-designer-field-wrapper", never, {}, {}, never, never>;
}
