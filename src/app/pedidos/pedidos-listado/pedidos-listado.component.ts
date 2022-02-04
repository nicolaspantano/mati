import { Component, OnInit } from '@angular/core';
import { PedidosService } from 'src/app/servicios/pedidos.service';
import { ZonasService } from 'src/app/servicios/zonas.service';
import dateFormat, { masks } from 'dateformat';
import Swal from 'sweetalert2';
import { HojaProduccionService } from 'src/app/hoja-produccion.service';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-pedidos-listado',
  templateUrl: './pedidos-listado.component.html',
  styleUrls: ['./pedidos-listado.component.css']
})
export class PedidosListadoComponent implements OnInit {


  model: NgbDateStruct;
  date;
  fechaElegida = 'Elija una fecha para filtrar';

  divisor;
  pedidosDivididos =[];


  zonas;
  pedidos = [];
  mostrarEntregados = 0;
  zonaElegida = 'default';
  pedidosActual = [];

  constructor(private produccionSvc: HojaProduccionService, private zonaSvc: ZonasService, private pedidosSvc: PedidosService) { }

  ngOnInit(): void {



    this.zonaSvc.TraerTodas().subscribe(res => {
      this.zonas = res;
    })

    this.pedidosSvc.TraerTodos().subscribe(res => {
      this.pedidos = res;
      this.pedidosActual = this.pedidos.filter(p => p.estado == this.mostrarEntregados);
      this.pedidosActual.sort(function (a, b) {

        var fechaUnoStr = a.fechaEntrega.split('/');
        var fechaUno = new Date(fechaUnoStr[2], fechaUnoStr[1] - 1, fechaUnoStr[0]);

        var fechaDosStr = b.fechaEntrega.split('/');
        var fechaDos = new Date(fechaDosStr[2], fechaDosStr[1] - 1, fechaDosStr[0]);

        if (fechaUno > fechaDos) {
          return 1;
        }
        return -1;


      })

    })
  }

  cambiarZona() {
    this.pedidosActual = [];
    this.pedidos.forEach(element => {
      if (this.fechaElegida != 'Elija una fecha para filtrar') {
        if (this.zonaElegida == element.zona && this.mostrarEntregados == element.estado && element.fechaEntrega == this.fechaElegida) {
          this.pedidosActual.push(element);
        }
      } else {
        if (this.zonaElegida == element.zona && this.mostrarEntregados == element.estado) {
          this.pedidosActual.push(element);
        }
      }

    });
    this.pedidosActual.sort(function (a, b) {

      var fechaUnoStr = a.fechaEntrega.split('/');
      var fechaUno = new Date(fechaUnoStr[2], fechaUnoStr[1] - 1, fechaUnoStr[0]);

      var fechaDosStr = b.fechaEntrega.split('/');
      var fechaDos = new Date(fechaDosStr[2], fechaDosStr[1] - 1, fechaDosStr[0]);

      if (fechaUno > fechaDos) {
        return 1;
      }
      return -1;


    })
  }


  cambiarEstado(pedido, estado, index) {
    this.pedidosSvc.ActualizarEstado(pedido, estado);
    this.pedidos[index].estado = estado;
  }


  cambiarEntregados() {
    this.mostrarEntregados = 1 - this.mostrarEntregados;
    this.pedidosActual = [];
    this.pedidos.forEach(element => {

      if (this.zonaElegida != 'default') {
        if (this.zonaElegida == element.zona && this.mostrarEntregados == element.estado) {
          this.pedidosActual.push(element);
        }
      }
      else {
        if (this.mostrarEntregados == element.estado) {
          this.pedidosActual.push(element);
        }
      }

    });
    console.log(this.fechaElegida)
    if (this.fechaElegida != 'Elija una fecha para filtrar') {
      var pedidosActualAux = [];
      this.pedidosActual.forEach((element, i) => {
        if (element.fechaEntrega == this.fechaElegida) {
          pedidosActualAux.push(element);
        }
      })

      this.pedidosActual = pedidosActualAux;

      console.log('pedidosactual despues de los splice', this.pedidosActual)
      this.pedidosActual.sort(function (a, b) {

        var fechaUnoStr = a.fechaEntrega.split('/');
        var fechaUno = new Date(fechaUnoStr[2], fechaUnoStr[1] - 1, fechaUnoStr[0]);

        var fechaDosStr = b.fechaEntrega.split('/');
        var fechaDos = new Date(fechaDosStr[2], fechaDosStr[1] - 1, fechaDosStr[0]);

        if (fechaUno > fechaDos) {
          return 1;
        }
        return -1;


      })
    }

  }

  eliminarPedido(id) {

    Swal.fire({
      title: 'Desea eliminar el pedido?',
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
      showConfirmButton: true,
      showCancelButton: true
    }).then((res) => {

      if (res.isConfirmed) {
        this.pedidosSvc.Eliminar(id).then(() => {
          this.produccionSvc.Eliminar(id);
        })
      }
    })
  }

  changeCalendar() {
    /*this.produccionSvc.TraerTodosPorFecha(this.model.day + '/' + this.model.month + '/' + this.model.year).valueChanges().subscribe(res => {
     this.registros = res;
    })*/
    console.log('cambio el calendario');
    this.fechaElegida = this.model.day + '/' + this.model.month + '/' + this.model.year;
    this.pedidosActual = [];
    this.pedidos.forEach(element => {

      if (this.zonaElegida != 'default') {
        if (this.zonaElegida == element.zona && this.mostrarEntregados == element.estado && element.fechaEntrega == this.fechaElegida) {
          this.pedidosActual.push(element);
        }
      }
      else {
        if (this.mostrarEntregados == element.estado && element.fechaEntrega == this.fechaElegida) {
          this.pedidosActual.push(element);
        }
      }

    });
    this.pedidosActual.sort(function (a, b) {

      var fechaUnoStr = a.fechaEntrega.split('/');
      var fechaUno = new Date(fechaUnoStr[2], fechaUnoStr[1] - 1, fechaUnoStr[0]);

      var fechaDosStr = b.fechaEntrega.split('/');
      var fechaDos = new Date(fechaDosStr[2], fechaDosStr[1] - 1, fechaDosStr[0]);

      if (fechaUno > fechaDos) {
        return 1;
      }
      return -1;


    })
  }

  imprimirPedidos() {
    alert('El proceso puede tardar unos segundos, no vuelva a apretar el boton')
    var doc = new jsPDF('p','pt','a4');
    
    var pedidosAux = this.pedidosActual.filter(()=>{return true});

    this.divisor = pedidosAux.length / 5;
    this.divisor = parseInt(this.divisor);
    
    if(pedidosAux.length % 5 != 0 ){
      this.divisor = this.divisor +1;
    }
      
 

    this.hacerCanva(pedidosAux,() => {
      while(pedidosAux.length>0){
        this.hacerCanva(pedidosAux);
      }

      

      
    })

  }



    hacerCanva(pedidosAux, _callback?){

      this.pedidosDivididos = pedidosAux.splice(0,5);
      var pedidos = document.getElementById('pedidosDivididos');
      var tamañoOriginal = pedidos.style.fontSize;
      pedidos.style.fontSize = "30px";
      setTimeout(() => {
      console.log('element',pedidos)
      var respuesta = new Promise((resolve,reject) => {
        
        var doc = new jsPDF('p','pt','a4');
        var pageHeight = doc.internal.pageSize.height;
  
        html2canvas(pedidos).then((canvas)=>{
          const img = canvas.toDataURL('image/PNG');
          console.log(canvas);
          console.log(img);
          const bufferX = 15;
          const bufferY = 15;
          const imgProps = (doc as any).getImageProperties(img);
          const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
          const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
          
          doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
          return doc;
  
        }).then((docResult)=>{
          console.log(docResult,'docresult')
          docResult.save(`pedidos.pdf`);
         pedidos.style.fontSize = tamañoOriginal;

          if(_callback){
            _callback();
          }
          else{
            document.getElementById('pedidosDivididos').style.display='none';
          }
        })
      });
      
      respuesta.then(()=>{
        
      })
      }, 2000);
      
    }
    
    

  }


