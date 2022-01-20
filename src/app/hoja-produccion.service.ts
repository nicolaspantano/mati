import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class HojaProduccionService {

  constructor(private firestore:AngularFirestore) { }

  AgregarUno(fecha, prod,id){

        this.firestore.collection('produccion').add({'fecha' :fecha , 'producto' : prod, 'pedido' : id})
    
  }
  TraerTodos(){

  }

  TraerTodosPorFecha(fecha){
    return this.firestore.collection('produccion', (ref) =>
      ref.where('fecha', '==', fecha)
    );
  }

  Eliminar(id){
    
  // this.firestore.collection('produccion', (ref)=> ref.where('pedido','==',id)).doc().delete();
   this.firestore.collection('produccion', (ref)=> ref.where('pedido','==',id)).get().subscribe((res)=>{
      res.forEach(e => {
        this.firestore.collection('produccion').doc(e.id).delete();
      })
   });
  }
}
