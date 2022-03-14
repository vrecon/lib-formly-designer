import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class ParentService {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyZW50LnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3gtZm9ybWx5LWRlc2lnbmVyL3NyYy9saWIvcGFyZW50LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFJM0MsTUFBTSxPQUFPLGFBQWE7SUFEMUI7UUFRVSxjQUFTLEdBQTBCLEVBQUUsQ0FBQztLQWlCL0M7SUFyQkMsSUFBSSxRQUFRLEtBQTRCLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7SUFDaEUsSUFBWSxRQUFRLENBQUMsS0FBNEI7UUFDL0MsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7SUFDekIsQ0FBQztJQUdELFFBQVEsQ0FBQyxLQUFhLEVBQUUsS0FBYztRQUNwQyxNQUFNLFVBQVUsR0FBRyxLQUFLLElBQUksSUFBSSxJQUFJLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUN2RSxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDckQsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUN2QyxRQUFRLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDdEMsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7SUFDM0IsQ0FBQztJQUVELFdBQVcsQ0FBQyxLQUFhO1FBQ3ZCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssS0FBSyxDQUFDLENBQUM7SUFDekQsQ0FBQztJQUVELGFBQWE7UUFDWCxJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztJQUNyQixDQUFDOzswR0F2QlUsYUFBYTs4R0FBYixhQUFhOzJGQUFiLGFBQWE7a0JBRHpCLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQYXJlbnQgfSBmcm9tICcuL3BhcmVudCc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBQYXJlbnRTZXJ2aWNlIHtcbiAgcGFyZW50PzogUGFyZW50O1xuXG4gIGdldCBjaGlsZHJlbigpOiBSZWFkb25seUFycmF5PFBhcmVudD4geyByZXR1cm4gdGhpcy5fY2hpbGRyZW47IH1cbiAgcHJpdmF0ZSBzZXQgY2hpbGRyZW4odmFsdWU6IFJlYWRvbmx5QXJyYXk8UGFyZW50Pikge1xuICAgIHRoaXMuX2NoaWxkcmVuID0gdmFsdWU7XG4gIH1cbiAgcHJpdmF0ZSBfY2hpbGRyZW46IFJlYWRvbmx5QXJyYXk8UGFyZW50PiA9IFtdO1xuXG4gIGFkZENoaWxkKGNoaWxkOiBQYXJlbnQsIGluZGV4PzogbnVtYmVyKTogdm9pZCB7XG4gICAgY29uc3QgY2hpbGRJbmRleCA9IGluZGV4ID09IG51bGwgfHwgaXNOYU4oaW5kZXgpID8gdGhpcy5jaGlsZHJlbi5sZW5ndGggOlxuICAgICAgTWF0aC5taW4odGhpcy5jaGlsZHJlbi5sZW5ndGgsIE1hdGgubWF4KDAsIGluZGV4KSk7XG4gICAgY29uc3QgY2hpbGRyZW4gPSB0aGlzLmNoaWxkcmVuLnNsaWNlKCk7XG4gICAgY2hpbGRyZW4uc3BsaWNlKGNoaWxkSW5kZXgsIDAsIGNoaWxkKTtcbiAgICB0aGlzLmNoaWxkcmVuID0gY2hpbGRyZW47XG4gIH1cblxuICByZW1vdmVDaGlsZChjaGlsZDogUGFyZW50KTogdm9pZCB7XG4gICAgdGhpcy5jaGlsZHJlbiA9IHRoaXMuY2hpbGRyZW4uZmlsdGVyKGMgPT4gYyA9PT0gY2hpbGQpO1xuICB9XG5cbiAgY2xlYXJDaGlsZHJlbigpOiB2b2lkIHtcbiAgICB0aGlzLmNoaWxkcmVuID0gW107XG4gIH1cbn1cbiJdfQ==