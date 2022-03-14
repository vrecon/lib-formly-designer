import { OnInit } from '@angular/core';
import { DragDropService, FormlyDesignerConfig } from '../';
import * as i0 from "@angular/core";
export declare class TypesComponent implements OnInit {
    private dragDropService;
    private formlyDesignerConfig;
    types: {
        label: string;
        value: string;
    }[];
    constructor(dragDropService: DragDropService, formlyDesignerConfig: FormlyDesignerConfig);
    ngOnInit(): void;
    onDragStart(event: DragEvent, type: string): void;
    onDragEnd(): void;
    private getTypes;
    static ɵfac: i0.ɵɵFactoryDeclaration<TypesComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TypesComponent, "formly-designer-types", never, {}, {}, never, never>;
}
