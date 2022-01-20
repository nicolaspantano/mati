import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor(private firestore: AngularFirestore) { }

  AgregarUno(producto) {
    var id = this.firestore.createId();
    producto.id = id;
    this.firestore.collection('productos').doc(id).set({ ...producto });

  }

  TraerTodos() {
    return this.firestore.collection('productos').valueChanges();
  }

  Editar(producto){
    this.firestore.collection('productos').doc(producto.id).set({...producto})
  }

  Eliminar(id){
    this.firestore.collection('productos').doc(id).delete();
  }

  AgregarUnidadDeMedida(unidadDeMedida){
    this.firestore.collection('medidas').add({...unidadDeMedida});
  }

  TraerUnidadesDeMedida(){
    return this.firestore.collection('medidas').valueChanges();

  }

}
