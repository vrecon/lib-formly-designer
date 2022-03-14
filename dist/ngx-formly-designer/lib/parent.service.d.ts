import { Parent } from './parent';
import * as i0 from "@angular/core";
export declare class ParentService {
    parent?: Parent;
    get children(): ReadonlyArray<Parent>;
    private set children(value);
    private _children;
    addChild(child: Parent, index?: number): void;
    removeChild(child: Parent): void;
    clearChildren(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ParentService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ParentService>;
}
