import { TestBed } from '@angular/core/testing';

import { NgbpickerService } from './ngbpicker.service';

describe('NgbpickerService', () => {
  let service: NgbpickerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgbpickerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
