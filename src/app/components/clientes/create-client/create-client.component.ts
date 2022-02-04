import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Client } from 'src/app/models/client';
import { ClientstStateService } from 'src/app/services/clients-state.service';
import Swal from 'sweetalert2';
import * as moment from 'moment';

@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.scss']
})
export class CreateClientComponent implements OnInit {
  formCreateClient: FormGroup = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    age: new FormControl('', [Validators.required, Validators.min(0)]),
    birthdate: new FormControl('', Validators.required),
  })
  constructor(private readonly clientStateService: ClientstStateService,
    private readonly route: Router) { }

  ngOnInit(): void {
  }
  validateFormControl(field: string): boolean {
    const formControl = this.formCreateClient.get(field);
    if (formControl) {
      return formControl.hasError('required') || formControl.hasError('min');
    }
    return false;
  }
  saveNewClient(): void {
    const { firstName, lastName, age, birthdate } = this.formCreateClient.value;
    const newBirthdate: string = moment(birthdate).format('YYYY-MM-DD');
    const newClient: Client = {
      id: 0,
      firstName,
      lastName,
      age,
      birthdate: newBirthdate
    };
    console.log(newClient);
    this.clientStateService.create(newClient)
      .subscribe({
        next: () => {
          Swal.fire({
            title: 'Correcto',
            text: 'Se pudo guardar correctamente',
            icon: 'success'
          });
          this.route.navigateByUrl('/clientes/list');
        },
        error: () => {
          Swal.fire({
            title: '¡Atención!',
            text: 'No se pudo guardar correctamente',
            icon: 'info'
          });
        }
      }
      );
  }
}
