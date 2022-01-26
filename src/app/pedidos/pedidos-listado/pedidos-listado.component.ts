import { Component, OnInit } from '@angular/core';
import { PedidosService } from 'src/app/servicios/pedidos.service';
import { ZonasService } from 'src/app/servicios/zonas.service';
import  dateFormat, { masks }  from 'dateformat';
import Swal from 'sweetalert2';
import { HojaProduccionService } from 'src/app/hoja-produccion.service';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-pedidos-listado',
  templateUrl: './pedidos-listado.component.html',
  styleUrls: ['./pedidos-listado.component.css']
})
export class PedidosListadoComponent implements OnInit {


  model: NgbDateStruct;
  date;
  fechaElegida='Elija una fecha para filtrar';


  zonas;
  pedidos=[];
  mostrarEntregados=0;
  zonaElegida='default';
  pedidosActual=[];

  constructor(private produccionSvc:HojaProduccionService ,private zonaSvc : ZonasService, private pedidosSvc:PedidosService) { }

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

  cambiarZona(){
    this.pedidosActual = [];
    this.pedidos.forEach(element => {
      if(this.fechaElegida != 'Elija una fecha para filtrar'){
        if(this.zonaElegida == element.zona && this.mostrarEntregados == element.estado && element.fechaEntrega == this.fechaElegida){
          this.pedidosActual.push(element);
        }
      }else{
        if(this.zonaElegida == element.zona && this.mostrarEntregados == element.estado){
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


  cambiarEstado(pedido,estado, index){
    this.pedidosSvc.ActualizarEstado(pedido,estado);
    this.pedidos[index].estado=estado;
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
    console.log(this.fechaElegida)
    if(this.fechaElegida != 'Elija una fecha para filtrar'){
      var pedidosActualAux=[];
      this.pedidosActual.forEach((element,i) => {
        if(element.fechaEntrega==this.fechaElegida){
          pedidosActualAux.push(element);
        }
      })

      this.pedidosActual = pedidosActualAux;

      console.log('pedidosactual despues de los splice',this.pedidosActual)
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

  changeCalendar(){
    /*this.produccionSvc.TraerTodosPorFecha(this.model.day + '/' + this.model.month + '/' + this.model.year).valueChanges().subscribe(res => {
     this.registros = res;
    })*/
    console.log('cambio el calendario');
    this.fechaElegida = this.model.day + '/' + this.model.month + '/' + this.model.year;
    this.pedidosActual = [];
    this.pedidos.forEach(element => {

      if(this.zonaElegida!='default'){
        if(this.zonaElegida == element.zona && this.mostrarEntregados == element.estado &&element.fechaEntrega == this.fechaElegida){
          this.pedidosActual.push(element);
        }
      }
      else{
        if(this.mostrarEntregados == element.estado && element.fechaEntrega == this.fechaElegida){
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
