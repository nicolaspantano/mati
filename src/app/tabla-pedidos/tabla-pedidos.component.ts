import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { HojaProduccionService } from '../hoja-produccion.service';
import { PedidosService } from '../servicios/pedidos.service';
import { ZonasService } from '../servicios/zonas.service';

@Component({
  selector: 'app-tabla-pedidos',
  templateUrl: './tabla-pedidos.component.html',
  styleUrls: ['./tabla-pedidos.component.css']
})
export class TablaPedidosComponent implements OnInit {

  pedidos=[];
  pedidosActual=[];
  mostrarEntregados=0;
  zonaElegida='default';
  zonas;
  constructor(private produccionSvc:HojaProduccionService, private pedidosSvc:PedidosService,private zonaSvc : ZonasService) { }

  ngOnInit(): void {

    this.zonaSvc.TraerTodas().subscribe(res => {
      this.zonas = res;
    })
    
    this.pedidosSvc.TraerTodos().subscribe(res => {
      this.pedidos = res;
      this.pedidosActual = this.pedidos.filter(p => p.estado==this.mostrarEntregados);
      this.pedidosActual.sort(function (a,b){

        var fechaUnoStr = a.fechaEntrega.split('/');
        var fechaUno = new Date(fechaUnoStr[2],fechaUnoStr[1]-1,fechaUnoStr[0]);

        var fechaDosStr = b.fechaEntrega.split('/');
        var fechaDos = new Date(fechaDosStr[2],fechaDosStr[1]-1,fechaDosStr[0]);

        if(fechaUno>fechaDos){
          return 1;
        }
        return -1;

        
      })

      
    })


  }

  eliminarPedido(id){
   
    Swal.fire({
      title:'Desea eliminar el pedido?',
      confirmButtonText: 'Si',
      cancelButtonText:'No',
      showConfirmButton: true,
      showCancelButton:true
    }).then((res)=>{
      
      if(res.isConfirmed){
        this.pedidosSvc.Eliminar(id).then(()=>{
          this.produccionSvc.Eliminar(id);
        })
      }
    })
  }

  cambiarEstado(pedido,estado, index){
    this.pedidosSvc.ActualizarEstado(pedido,estado);
    this.pedidos[index].estado=estado;
  }

  cambiarZona(){
    this.pedidosActual = [];
    this.pedidos.forEach(element => {
      if(this.zonaElegida == element.zona && this.mostrarEntregados == element.estado){
        this.pedidosActual.push(element);
      }
    });
    this.pedidosActual.sort(function (a,b){

      var fechaUnoStr = a.fechaEntrega.split('/');
      var fechaUno = new Date(fechaUnoStr[2],fechaUnoStr[1]-1,fechaUnoStr[0]);

      var fechaDosStr = b.fechaEntrega.split('/');
      var fechaDos = new Date(fechaDosStr[2],fechaDosStr[1]-1,fechaDosStr[0]);

      if(fechaUno>fechaDos){
        return 1;
      }
      return -1;

      
    })
  }

  cambiarEntregados(){

    this.mostrarEntregados = 1 - this.mostrarEntregados;
    this.pedidosActual = [];
    this.pedidos.forEach(element => {
      
      if(this.zonaElegida!='default'){
        if(this.zonaElegida == element.zona && this.mostrarEntregados == element.estado){
          this.pedidosActual.push(element);
        }
      }
      else{
        if(this.mostrarEntregados == element.estado){
          this.pedidosActual.push(element);
        }
      }
      
    });
    this.pedidosActual.sort(function (a,b){

      var fechaUnoStr = a.fechaEntrega.split('/');
      var fechaUno = new Date(fechaUnoStr[2],fechaUnoStr[1]-1,fechaUnoStr[0]);

      var fechaDosStr = b.fechaEntrega.split('/');
      var fechaDos = new Date(fechaDosStr[2],fechaDosStr[1]-1,fechaDosStr[0]);

      if(fechaUno>fechaDos){
        return 1;
      }
      return -1;

      
    })
  }

}
