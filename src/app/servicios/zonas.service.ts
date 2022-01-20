import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class ZonasService {

  constructor(private firestore:AngularFirestore) { }

  AgregarUna(zona){
    this.firestore.collection('zonas').add({...zona});
  }

  TraerTodas(){
    return this.firestore.collection('zonas').valueChanges();
  }
}
