import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PedidosListadoComponent } from './pedidos/pedidos-listado/pedidos-listado.component';
import { PedidoAltaComponent } from './pedidos/pedido-alta/pedido-alta.component';
import { ProductoAltaComponent } from './productos/producto-alta/producto-alta.component';
import { ProductosListadoComponent } from './productos/productos-listado/productos-listado.component';
import { ZonaAltaComponent } from './zonas/zona-alta/zona-alta.component';
import { ZonasListadoComponent } from './zonas/zonas-listado/zonas-listado.component';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { FormsModule } from '@angular/forms';
import { CartelesComponent } from './carteles/carteles.component';
import { UnidadDeMedidaComponent } from './unidad-de-medida/unidad-de-medida.component';
import { HojaproduccionComponent } from './hojaproduccion/hojaproduccion.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TablaPedidosComponent } from './tabla-pedidos/tabla-pedidos.component';
import { TablaClientesComponent } from './tabla-clientes/tabla-clientes.component';

@NgModule({
  declarations: [
    AppComponent,
    PedidosListadoComponent,
    PedidoAltaComponent,
    ProductoAltaComponent,
    ProductosListadoComponent,
    ZonaAltaComponent,
    ZonasListadoComponent,
    CartelesComponent,
    UnidadDeMedidaComponent,
    HojaproduccionComponent,
    TablaPedidosComponent,
    TablaClientesComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    NgbModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
