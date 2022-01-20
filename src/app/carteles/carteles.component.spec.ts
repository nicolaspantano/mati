import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartelesComponent } from './carteles.component';

describe('CartelesComponent', () => {
  let component: CartelesComponent;
  let fixture: ComponentFixture<CartelesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartelesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartelesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
