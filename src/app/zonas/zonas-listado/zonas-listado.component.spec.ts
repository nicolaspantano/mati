import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZonasListadoComponent } from './zonas-listado.component';

describe('ZonasListadoComponent', () => {
  let component: ZonasListadoComponent;
  let fixture: ComponentFixture<ZonasListadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZonasListadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZonasListadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
