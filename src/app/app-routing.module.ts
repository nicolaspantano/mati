import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartelesComponent } from './carteles/carteles.component';
import { HojaproduccionComponent } from './hojaproduccion/hojaproduccion.component';
import { PedidoAltaComponent } from './pedidos/pedido-alta/pedido-alta.component';
import { PedidosListadoComponent } from './pedidos/pedidos-listado/pedidos-listado.component';
import { ProductoAltaComponent } from './productos/producto-alta/producto-alta.component';
import { ProductosListadoComponent } from './productos/productos-listado/productos-listado.component';
import { TablaClientesComponent } from './tabla-clientes/tabla-clientes.component';
import { TablaPedidosComponent } from './tabla-pedidos/tabla-pedidos.component';
import { UnidadDeMedidaComponent } from './unidad-de-medida/unidad-de-medida.component';
import { ZonaAltaComponent } from './zonas/zona-alta/zona-alta.component';
import { ZonasListadoComponent } from './zonas/zonas-listado/zonas-listado.component';

const routes: Routes = [
  {path:'',redirectTo:'pedidos-listado',pathMatch:'full'},
  {path:'pedidos-listado',component:PedidosListadoComponent},
  {path:'pedidos-alta',component:PedidoAltaComponent},
  {path:'zonas-listado',component:ZonasListadoComponent},
  {path:'zonas-alta',component:ZonaAltaComponent},
  {path:'productos-listado',component:ProductosListadoComponent},
  {path:'productos-alta',component:ProductoAltaComponent},
  {path:'nueva-unidad-de-medida',component:UnidadDeMedidaComponent},
  {path:'hoja-produccion',component:HojaproduccionComponent},
  {path:'carteles',component:CartelesComponent},
  {path:'tabla-pedidos',component: TablaPedidosComponent},
  {path:'tabla-clientes',component:TablaClientesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
