import { Pipe } from '@angular/core';
import { decycle } from '../json-helper';
import * as i0 from "@angular/core";
export class DecyclePipe {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjeWNsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2xpYi1mb3JtbHktZGVzaWduZXIvc3JjL2xpYi9waXBlcy9kZWN5Y2xlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBQ3BELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7QUFHekMsTUFBTSxPQUFPLFdBQVc7SUFDcEIsU0FBUyxDQUFDLEtBQVU7UUFDaEIsT0FBTyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDMUIsQ0FBQzs7d0dBSFEsV0FBVztzR0FBWCxXQUFXOzJGQUFYLFdBQVc7a0JBRHZCLElBQUk7bUJBQUMsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgZGVjeWNsZSB9IGZyb20gJy4uL2pzb24taGVscGVyJztcblxuQFBpcGUoeyBuYW1lOiAnZGVjeWNsZScgfSlcbmV4cG9ydCBjbGFzcyBEZWN5Y2xlUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICAgIHRyYW5zZm9ybSh2YWx1ZTogYW55KTogYW55IHtcbiAgICAgICAgcmV0dXJuIGRlY3ljbGUodmFsdWUpO1xuICAgIH1cbn1cbiJdfQ==