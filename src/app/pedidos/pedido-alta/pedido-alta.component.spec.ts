import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoAltaComponent } from './pedido-alta.component';

describe('PedidoAltaComponent', () => {
  let component: PedidoAltaComponent;
  let fixture: ComponentFixture<PedidoAltaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PedidoAltaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidoAltaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
