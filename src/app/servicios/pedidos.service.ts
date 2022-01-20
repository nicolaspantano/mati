import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  constructor(private firestore:AngularFirestore) { }

  AgregarUno(pedido){
    var id = this.firestore.createId();
    pedido.id = id;
    this.firestore.collection('pedidos').doc(id).set({...pedido});
    return id;
  }

  TraerTodos(){
    return this.firestore.collection('pedidos').valueChanges();
  }

  ActualizarEstado(id,estado){
    this.firestore.collection('pedidos').doc(id).update({'estado' : estado});
}


  SetByid(pedido){
    return this.firestore.collection('pedidos').doc(pedido.id).set({...pedido})
  }

  Eliminar(id){
    return this.firestore.collection('pedidos').doc(id).delete();
  }
}