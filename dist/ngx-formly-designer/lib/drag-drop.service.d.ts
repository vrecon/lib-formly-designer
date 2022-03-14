import * as i0 from "@angular/core";
export declare class DragDropService {
    private readonly _dragging;
    private readonly _dropTarget;
    get dragging(): string | null;
    get dragging$(): import("rxjs").Observable<string | null>;
    get dropTarget(): string | null;
    set dropTarget(id: string | null);
    get dropTarget$(): import("rxjs").Observable<string | null>;
    beginDrag(subject: string | null): void;
    endDrag(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<DragDropService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<DragDropService>;
}
