import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoAltaComponent } from './producto-alta.component';

describe('ProductoAltaComponent', () => {
  let component: ProductoAltaComponent;
  let fixture: ComponentFixture<ProductoAltaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductoAltaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductoAltaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
