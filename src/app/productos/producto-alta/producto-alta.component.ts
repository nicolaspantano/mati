import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/clases/producto';
import { ProductosService } from 'src/app/servicios/productos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-producto-alta',
  templateUrl: './producto-alta.component.html',
  styleUrls: ['./producto-alta.component.css']
})
export class ProductoAltaComponent implements OnInit {

  producto;
  constructor(private productoSvc:ProductosService) { 
    this.producto = new Producto();
  }

  ngOnInit(): void {
  }

  Agregar(){
    Swal.fire({
      title: 'Producto agregado correctamente',
      icon: 'success',
      confirmButtonText: 'Continuar'
    }).then(()=>{
      this.productoSvc.AgregarUno(this.producto);
      this.producto=new Producto();
    })
  }
}
