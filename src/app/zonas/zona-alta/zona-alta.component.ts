import { Component, OnInit } from '@angular/core';
import { ZonasService } from 'src/app/servicios/zonas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-zona-alta',
  templateUrl: './zona-alta.component.html',
  styleUrls: ['./zona-alta.component.css']
})
export class ZonaAltaComponent implements OnInit {

  zona;
  constructor(private zonaSvc:ZonasService) { }

  ngOnInit(): void {
  }

  Agregar(){
    var zonaObj = {'nombre' : this.zona};
    Swal.fire({
      title:'Zona agregada correctamente',
      icon: 'success',
      confirmButtonText:'Continuar'
    }).then(()=>{
      this.zonaSvc.AgregarUna(zonaObj);
      this.zona='';
    })
  }

}
