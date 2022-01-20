import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZonaAltaComponent } from './zona-alta.component';

describe('ZonaAltaComponent', () => {
  let component: ZonaAltaComponent;
  let fixture: ComponentFixture<ZonaAltaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZonaAltaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZonaAltaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
