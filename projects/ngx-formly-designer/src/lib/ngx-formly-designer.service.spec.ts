import { TestBed } from '@angular/core/testing';

import { NgxFormlyDesignerService } from './ngx-formly-designer.service';

describe('NgxFormlyDesignerService', () => {
  let service: NgxFormlyDesignerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxFormlyDesignerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
