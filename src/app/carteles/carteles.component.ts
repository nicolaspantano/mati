import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../servicios/cliente.service';

@Component({
  selector: 'app-carteles',
  templateUrl: './carteles.component.html',
  styleUrls: ['./carteles.component.css']
})
export class CartelesComponent implements OnInit {

  clientes;
  constructor(private clientesSvc:ClienteService) {
    this.clientesSvc.TraerTodos().subscribe(res => {
      this.clientes = res;
    })
   }

  ngOnInit(): void {
  }

}
