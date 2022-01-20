import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ProductosService } from '../servicios/productos.service';

@Component({
  selector: 'app-unidad-de-medida',
  templateUrl: './unidad-de-medida.component.html',
  styleUrls: ['./unidad-de-medida.component.css']
})
export class UnidadDeMedidaComponent implements OnInit {

  unidadDeMedida;
  constructor(private prodSvc:ProductosService) { }

  ngOnInit(): void {
  }


  Agregar(){
    var unidadDeMedidaObj = {'nombre' : this.unidadDeMedida};
    Swal.fire({
      title:'Zona agregada correctamente',
      icon: 'success',
      confirmButtonText:'Continuar'
    }).then(()=>{
      this.prodSvc.AgregarUnidadDeMedida(unidadDeMedidaObj);
      this.unidadDeMedida='';
    })
  }
}
