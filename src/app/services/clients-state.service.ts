import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database'
import { defer, from, Observable } from 'rxjs';
import { Client } from '../models/client';
@Injectable({
  providedIn: 'root'
})
export class ClientstStateService {

  items: Observable<Array<any>> = new Observable<Array<any>>();
  constructor(private readonly database: AngularFireDatabase) {
    this.items = this.database.list('clients').valueChanges();
  }
  observableList(): Observable<any> {
    return this.database.list('clients').snapshotChanges();
  }
  create(client: Client): Observable<any> {
    const tableConnection = this.database.list('clients');
    return defer(() => from(tableConnection.push(client)));
  }
  update(key: string, newClient: Client): Observable<any> {
    const tableConnection = this.database.list('clients');
    return defer(() => from(tableConnection.set(key, newClient)));
  }
  remove(key: string): Observable<any> {
    const tableConnection = this.database.list('clients');
    return defer(() => from(tableConnection.remove(key)));
  }
}
