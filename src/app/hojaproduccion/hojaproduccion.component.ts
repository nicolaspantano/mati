import { Component, OnInit } from '@angular/core';
import {NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import jsPDF from 'jspdf';
import { HojaProduccionService } from '../hoja-produccion.service';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-hojaproduccion',
  templateUrl: './hojaproduccion.component.html',
  styleUrls: ['./hojaproduccion.component.css']
})
export class HojaproduccionComponent implements OnInit {

  model: NgbDateStruct;
  date;

  registros = [];
  produccion;
  constructor(private produccionSvc:HojaProduccionService) {
    var fecha= new Date();
   }

  ngOnInit(): void {
  }

  changeCalendar(){
    this.produccionSvc.TraerTodosPorFecha(this.model.day + '/' + this.model.month + '/' + this.model.year).valueChanges().subscribe(res => {
     this.registros = res;
    })
  }


  Imprimir(){
    var tabla = document.getElementById('tabla');
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
      docResult.save(`hojaproduccion.pdf`);
      tabla.style.fontSize = tamañoOriginal;
    
  });
}
}
