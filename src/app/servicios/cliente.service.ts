import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private firestore:AngularFirestore) { }

  AgregarUno(cliente){
    this.comprobarSiExiste(cliente).subscribe((res)=>{
      if(res.length==0){
        let id = this.firestore.createId();
        cliente.id=id;
        this.firestore.collection('clientes').doc(id).set({...cliente});

      }
    })
  }

  TraerTodos(){
    return this.firestore.collection('clientes').valueChanges();
  }

  comprobarSiExiste(cliente){
    return this.firestore.collection('clientes',(ref)=>ref.where('direccion','==',cliente.direccion)).valueChanges();
  }

  eliminarUno(id){
    this.firestore.collection('clientes').doc(id).delete();
  }

}
