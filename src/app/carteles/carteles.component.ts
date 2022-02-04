import { Component, OnInit } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ClienteService } from '../servicios/cliente.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { PedidosService } from '../servicios/pedidos.service';

@Component({
  selector: 'app-carteles',
  templateUrl: './carteles.component.html',
  styleUrls: ['./carteles.component.css']
})
export class CartelesComponent implements OnInit {


  flag = 0;
  model: NgbDateStruct;
  date;
  fechaElegida = 'Elija una fecha para filtrar';


  pedidos = [];
  pedidosAMostrar = [];

  clientes = [];
  clientesAMostrar = [];
  constructor(private clientesSvc:ClienteService, private pedidosSvc:PedidosService) {
    /*this.clientesSvc.TraerTodos().subscribe(res => {
      this.clientes = res;
      this.clientesAMostrar = this.clientes;
    })*/
    
    this.pedidosSvc.TraerTodos().subscribe(res => {
      this.pedidos = res;
      this.pedidos.forEach(element => {
        this.clientes.push({'cliente': element.cliente , 'direccion' : element.direccion, 'fecha' : element.fechaEntrega , 'zona' : element.zona , 'id' : element.id })
      });
    })
   }

  ngOnInit(): void {
  }



  changeCalendar(){
    this.flag = 1;
    this.clientesAMostrar = [];
    this.fechaElegida = this.model.day + '/' + this.model.month + '/' + this.model.year;
    console.log(this.fechaElegida)
    this.clientes.forEach(element => {
      if(element.fecha == this.fechaElegida){
        this.clientesAMostrar.push(element);
      }
    });
}


  Imprimir(){
    var tabla = document.getElementById('carteles');
    var tamañoOriginal = tabla.style.fontSize;
    tabla.style.fontSize = '30px';
    var doc = new jsPDF('p','pt','a4');
    var pageHeight = doc.internal.pageSize.height;

    html2canvas(tabla).then((canvas)=>{
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
      docResult.save(`carteles.pdf`);
      tabla.style.fontSize = tamañoOriginal;
    
  });
  }
}
