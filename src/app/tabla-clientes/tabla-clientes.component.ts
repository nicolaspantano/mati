import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ClienteService } from '../servicios/cliente.service';

@Component({
  selector: 'app-tabla-clientes',
  templateUrl: './tabla-clientes.component.html',
  styleUrls: ['./tabla-clientes.component.css']
})
export class TablaClientesComponent implements OnInit {

  clientes;
  constructor(private clientesSvc:ClienteService) {
    this.clientesSvc.TraerTodos().subscribe(res => {
      this.clientes = res;
    })
   }

  ngOnInit(): void {
  }

  eliminarCliente(cliente){
    Swal.fire({
      title: 'Desea eliminar el cliente?',
      confirmButtonText:'Si',
      cancelButtonText: 'No',
      showConfirmButton:true,
      showCancelButton:true
    }).then((res)=>{
      if(res.isConfirmed){
        this.clientesSvc.eliminarUno(cliente.id);  
      }
    })
  }

}
