import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ClientiService } from '../services/clienti.service';

@Component({
  template: `
    <div class="container mt-5 text-center p-5">
      <div class="row">
        <div class="col">
          <form>
            <div class="form-group mb-4">
              <label for="ragioneSociale" class="mb-2">Ragione Sociale</label>
              <input type="text" formControlName="ragioneSociale" id="ragioneSociale" class="form-control">
            </div>
            <div class="form-group mb-4">
              <label for="partitaIva" class="mb-2">Partita iva</label>
              <input type="text" formControlName="partitaIva" id="partitaIva" class="form-control">
            </div>
            <div class="form-group mb-4">
              <label for="tipoCliente" class="mb-2">Tipo azienda</label>
              <select formControlName="tipoCliente" class="form-select" aria-label="Default select example">
                <option value="" selected>Seleziona una tipologia</option>
                <option *ngFor="let tipo of tipiCliente" value="{{tipo}}">{{tipo}}</option>
              </select>
            </div>
            <div class="form-group mb-4">
                <label for="email">Email</label>
                <input type="email" formControlName="email" id="email" class="form-control">
            </div>
            <div class="form-group mb-4">
                <label for="pec">PEC</label>
                <input type="email" formControlName="pec" id="pec" class="form-control">
            </div>
            <div class="form-group mb-4">
                <label for="telefono">Telefono</label>
                <input type="text" formControlName="telefono" id="telefono" class="form-control">
            </div>
            <div class="form-group mb-4">
                <label for="nomeContatto">Nome Contatto</label>
                <input type="text" formControlName="nomeContatto" id="nomeContatto" class="form-control">
            </div>
            <div class="form-group mb-4">
                <label for="cognomeContatto">Cognome Contatto</label>
                <input type="text" formControlName="cognomeContatto" id="cognomeContatto" class="form-control">
            </div>
            <div class="form-group mb-4">
                <label for="telefonoContatto">Telefono Contatto</label>
                <input type="text" formControlName="telefonoContatto" id="telefonoContatto" class="form-control">
            </div>
            <div class="form-group mb-4">
                <label for="emailContatto">Telefono Contatto</label>
                <input type="email" formControlName="emailContatto" id="emailContatto" class="form-control">
            </div>
            <div formGroupName="indirizzoSedeOperativa">
              <div class="form-group mb-4">
                  <label for="via">Via</label>
                  <input type="text" formControlName="via" id="via" class="form-control">
              </div>
              <div class="form-group mb-4">
                  <label for="civico">Civico</label>
                  <input type="text" formControlName="civico" id="civico" class="form-control">
              </div>
              <div class="form-group mb-4">
                  <label for="cap">Cap</label>
                  <input type="text" formControlName="cap" id="cap" class="form-control">
              </div>
              <div class="form-group mb-4">
                  <label for="localita">Località</label>
                  <input type="text" formControlName="localita" id="localita" class="form-control">
              </div>
              <!-- <div formGroupName="comune">

              </div> -->
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
  styles: [
  ]
})
export class NuovoClientePage implements OnInit {
  form!: FormGroup;
  tipiCliente!: any;

  constructor(private clientiSrv: ClientiService) { }

  ngOnInit(): void {
    this.clientiSrv.getTipiCliente().subscribe(res => {
      this.tipiCliente = res;
    })
  }

}
