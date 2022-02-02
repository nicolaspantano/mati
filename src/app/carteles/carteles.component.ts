import { Component, OnInit } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ClienteService } from '../servicios/cliente.service';

@Component({
  selector: 'app-carteles',
  templateUrl: './carteles.component.html',
  styleUrls: ['./carteles.component.css']
})
export class CartelesComponent implements OnInit {


  model: NgbDateStruct;
  date;
  fechaElegida = 'Elija una fecha para filtrar';


  clientes = [];
  clientesAMostrar = [];
  constructor(private clientesSvc:ClienteService) {
    this.clientesSvc.TraerTodos().subscribe(res => {
      this.clientes = res;
      this.clientesAMostrar = this.clientes;
    })
   }

  ngOnInit(): void {
  }



  changeCalendar(){
    
    this.clientesAMostrar = [];
    this.fechaElegida = this.model.day + '/' + this.model.month + '/' + this.model.year;
    console.log(this.fechaElegida)
    this.clientes.forEach(element => {
      if(element.fecha == this.fechaElegida){
        this.clientesAMostrar.push(element);
      }
    });
}

}
