import { TestBed } from '@angular/core/testing';

import { HojaProduccionService } from './hoja-produccion.service';

describe('HojaProduccionService', () => {
  let service: HojaProduccionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HojaProduccionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
