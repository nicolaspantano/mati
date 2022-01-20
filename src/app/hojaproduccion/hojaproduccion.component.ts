import { Component, OnInit } from '@angular/core';
import {NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import { HojaProduccionService } from '../hoja-produccion.service';
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
}
