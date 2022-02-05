import { ClientstStateService } from './../../../services/clients-state.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from 'src/app/models/client';
import * as moment from 'moment';

@Component({
  selector: 'app-list-client',
  templateUrl: './list-client.component.html',
  styleUrls: ['./list-client.component.scss']
})
export class ListClientComponent implements OnInit {
  clientsObservable: Observable<Array<any>> = new Observable<Array<any>>();
  avgAges = 0;
  devStandar = 0;
  constructor(private readonly clientsStateService: ClientstStateService) { }

  ngOnInit(): void {
    this.clientsObservable = this.clientsStateService.items;
    this.clientsStateService.observableList().subscribe(
      () => {
        this.setAvgAges();
      }
    )
  }
  dateDeath(client: Client): string {
    if (!client.birthdate) {
      return '';
    }
    const years = 60 - Math.ceil(Math.random() * 20);

    return moment(client.birthdate).add('years', years).format('YYYY-MM-DD');
  }
  setAvgAges(): void {
    let avg = 0;
    this.clientsObservable.subscribe(
      (items) => {
        const ages = items.map(client => +client.age)
        avg = ages.reduce(
          (prevClient: number, nextClient: number) =>
          (
            prevClient + nextClient
          )
          , 0);
        this.avgAges = avg / items.length;
        this.setDesvStandar(ages);
      }
    )
  }
  setDesvStandar(ages: Array<number>): void {
    ages = ages.map((age) => {
      return (age - this.avgAges) ** 2
    })
    let sum = ages.reduce((acc, curr) => acc + curr, 0);
    let variance = sum / ages.length
    this.devStandar = Math.sqrt(sum / ages.length)
  }
}
