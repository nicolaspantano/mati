import { Component, OnInit } from '@angular/core';
import { ProductosService } from 'src/app/servicios/productos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-productos-listado',
  templateUrl: './productos-listado.component.html',
  styleUrls: ['./productos-listado.component.css']
})
export class ProductosListadoComponent implements OnInit {

  productos;
  constructor(private productosSvc:ProductosService) { }

  ngOnInit(): void {
    this.productosSvc.TraerTodos().subscribe(res => {
      this.productos=res;
    })
  }

  eliminarProducto(id){
    Swal.fire({
      title: 'Desea eliminar este producto?',
      confirmButtonText:'Si',
      cancelButtonText: 'No',
      showConfirmButton:true,
      showCancelButton:true
    }).then((res)=>{
      if(res.isConfirmed){
        this.productosSvc.Eliminar(id);
        
      }
    })
  }

  editarProducto(prod){
    Swal.fire({
      title: 'Editar producto',
      confirmButtonText:'Aceptar',
      cancelButtonText:'Cancelar',
      showConfirmButton:true,
      showCancelButton:true,
      input:'text',
      inputPlaceholder:'Nombre del producto',
      inputValue:prod.nombre
    }).then((res)=>{
      if(res.isConfirmed){
        prod.nombre = res.value;
        this.productosSvc.Editar(prod);
      }
    })
  }

}
