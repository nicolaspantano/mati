import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HojaproduccionComponent } from './hojaproduccion.component';

describe('HojaproduccionComponent', () => {
  let component: HojaproduccionComponent;
  let fixture: ComponentFixture<HojaproduccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HojaproduccionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HojaproduccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
