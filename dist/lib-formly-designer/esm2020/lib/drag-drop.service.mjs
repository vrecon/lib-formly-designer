import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as i0 from "@angular/core";
export class DragDropService {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhZy1kcm9wLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9saWItZm9ybWx5LWRlc2lnbmVyL3NyYy9saWIvZHJhZy1kcm9wLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sTUFBTSxDQUFDOztBQUd2QyxNQUFNLE9BQU8sZUFBZTtJQUQ1QjtRQUVtQixjQUFTLEdBQUcsSUFBSSxlQUFlLENBQWdCLElBQUksQ0FBQyxDQUFDO1FBQ3JELGdCQUFXLEdBQUcsSUFBSSxlQUFlLENBQWdCLElBQUksQ0FBQyxDQUFDO0tBK0J6RTtJQTdCQyxJQUFJLFFBQVEsS0FBSyxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUUvQyxJQUFJLFNBQVM7UUFDWCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDdkMsQ0FBQztJQUVELElBQUksVUFBVSxLQUFvQixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUVsRSxJQUFJLFVBQVUsQ0FBQyxFQUFpQjtRQUM5QixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBRUQsSUFBSSxXQUFXO1FBQ2IsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3pDLENBQUM7SUFFRCxTQUFTLENBQUMsT0FBc0I7UUFDOUIsSUFBSSxPQUFPLElBQUksSUFBSSxFQUFFO1lBQ25CLE9BQU87U0FDUjtRQUNELE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEtBQUssSUFBSSxDQUFDLENBQUM7UUFDOUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQUVELE9BQU87UUFDTCxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxJQUFJLElBQUksRUFBRTtZQUNoQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUMzQjtJQUNILENBQUM7OzRHQWhDVSxlQUFlO2dIQUFmLGVBQWU7MkZBQWYsZUFBZTtrQkFEM0IsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRHJhZ0Ryb3BTZXJ2aWNlIHtcbiAgcHJpdmF0ZSByZWFkb25seSBfZHJhZ2dpbmcgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZyB8IG51bGw+KG51bGwpO1xuICBwcml2YXRlIHJlYWRvbmx5IF9kcm9wVGFyZ2V0ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmcgfCBudWxsPihudWxsKTtcblxuICBnZXQgZHJhZ2dpbmcoKSB7IHJldHVybiB0aGlzLl9kcmFnZ2luZy52YWx1ZTsgfVxuXG4gIGdldCBkcmFnZ2luZyQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2RyYWdnaW5nLmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgZ2V0IGRyb3BUYXJnZXQoKTogc3RyaW5nIHwgbnVsbCB7IHJldHVybiB0aGlzLl9kcm9wVGFyZ2V0LnZhbHVlOyB9XG5cbiAgc2V0IGRyb3BUYXJnZXQoaWQ6IHN0cmluZyB8IG51bGwpIHtcbiAgICB0aGlzLl9kcm9wVGFyZ2V0Lm5leHQoaWQpO1xuICB9XG5cbiAgZ2V0IGRyb3BUYXJnZXQkKCkge1xuICAgIHJldHVybiB0aGlzLl9kcm9wVGFyZ2V0LmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgYmVnaW5EcmFnKHN1YmplY3Q6IHN0cmluZyB8IG51bGwpOiB2b2lkIHtcbiAgICBpZiAoc3ViamVjdCA9PSBudWxsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnNvbGUuYXNzZXJ0KHRoaXMuX2RyYWdnaW5nLnZhbHVlID09PSBudWxsKTtcbiAgICB0aGlzLl9kcmFnZ2luZy5uZXh0KHN1YmplY3QpO1xuICB9XG5cbiAgZW5kRHJhZygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fZHJhZ2dpbmcudmFsdWUgIT0gbnVsbCkge1xuICAgICAgdGhpcy5fZHJhZ2dpbmcubmV4dChudWxsKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==