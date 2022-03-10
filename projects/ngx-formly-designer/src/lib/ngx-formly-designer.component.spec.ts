import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxFormlyDesignerComponent } from './ngx-formly-designer.component';

describe('NgxFormlyDesignerComponent', () => {
  let component: NgxFormlyDesignerComponent;
  let fixture: ComponentFixture<NgxFormlyDesignerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxFormlyDesignerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxFormlyDesignerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
