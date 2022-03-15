import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Provincia } from '../models/provincia';
import { ClientiService } from '../services/clienti.service';
import { ComuniService } from '../services/comuni.service';
import { Comune } from './comune';

@Component({
  template: `
    <div class="container mt-5 text-center p-5">
      <div class="row">
        <div class="col-6 offset-3 border border-3 p-5">
          <form [formGroup]="form" (ngSubmit)="onSubmit(form)">
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
              <label for="emailContatto">Email Contatto</label>
              <input type="email" formControlName="emailContatto" id="emailContatto" class="form-control">
            </div>

            <!-- FORMGROUP SEDE OPERATIVA -->
            <div formGroupName="indirizzoSedeOperativa">
              <h3 class="m-4">Sede Operativa</h3>
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
              <div class="form-group mb-4">
                <label for="provincia">Provincia</label>
                <select [(ngModel)]="provinciaSelezionataOp" [ngModelOptions]="{standalone: true}" (change)="getComuniOpByProvincia(provinciaSelezionataOp)" class="form-select" aria-label="Default select example">
                  <option value="" selected>Seleziona una provincia</option>
                  <option *ngFor="let provincia of provinceOp" value="{{provincia.nome}}">{{provincia.nome}}</option>
                </select>
              </div>
              <div class="form-group mb-4">
                <label for="comune">Comune</label>
                <select formControlName="comune" class="form-select" aria-label="Default select example">
                  <option value="" selected>Seleziona un comune</option>
                  <option *ngFor="let comune of comuniOp" value="{{comune.id}}">{{comune.nome}}</option>
                </select>
              </div>
            </div>

            <!-- FORMGROUP SEDE LEGALE -->
            <div formGroupName="indirizzoSedeLegale">
              <h3 class="m-4">Sede Legale</h3>
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
              <div class="form-group mb-4">
                <label for="provincia">Provincia</label>
                <select [(ngModel)]="provinciaSelezionataLeg" [ngModelOptions]="{standalone: true}" (change)="getComuniLegByProvincia(provinciaSelezionataLeg)" class="form-select" aria-label="Default select example">
                  <option value="" selected>Seleziona una provincia</option>
                  <option *ngFor="let provincia of provinceLeg" value="{{provincia.nome}}">{{provincia.nome}}</option>
                </select>
              </div>
              <div class="form-group mb-4">
                <label for="comune">Comune</label>
                <select formControlName="comune" class="form-select" aria-label="Default select example">
                  <option value="" selected>Seleziona un comune</option>
                  <option *ngFor="let comune of comuniLeg" value="{{comune.id}}">{{comune.nome}}</option>
                </select>
              </div>
            </div>
            <button type="submit" class="btn btn-primary">Invia</button>
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
  provinceOp!: Provincia[];
  provinceLeg!: Provincia[];
  provinciaSelezionataOp!: string;
  provinciaSelezionataLeg!: string;
  comuniOp!: Comune[];
  comuniLeg!: Comune[];
  comOp!: Comune;
  comLeg!: Comune;

  constructor(private clientiSrv: ClientiService, private comuniSrv: ComuniService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      ragioneSociale: this.fb.control(null, Validators.required),
      partitaIva: this.fb.control(null, Validators.required),
      tipoCliente: this.fb.control(null, Validators.required),
      email: this.fb.control(null, [Validators.required, Validators.email]),
      pec: this.fb.control(null, [Validators.required, Validators.email]),
      telefono: this.fb.control(null, Validators.required),
      nomeContatto: this.fb.control(null, Validators.required),
      cognomeContatto: this.fb.control(null, Validators.required),
      telefonoContatto: this.fb.control(null, Validators.required),
      emailContatto: this.fb.control(null, [Validators.required, Validators.email]),
      indirizzoSedeOperativa: this.fb.group({
        via: this.fb.control(null, Validators.required),
        civico: this.fb.control(null, Validators.required),
        cap: this.fb.control(null, Validators.required),
        localita: this.fb.control(null, Validators.required),
        comune: this.fb.control(null, Validators.required)
      }),
      indirizzoSedeLegale: this.fb.group({
        via: this.fb.control(null, Validators.required),
        civico: this.fb.control(null, Validators.required),
        cap: this.fb.control(null, Validators.required),
        localita: this.fb.control(null, Validators.required),
        comune: this.fb.control(null, Validators.required)
      })
    })

    this.clientiSrv.getTipiCliente().subscribe(res => {
      this.tipiCliente = res;
    })

    this.comuniSrv.getProvince().subscribe(res => {
      this.provinceOp = res.content;
      this.provinceLeg = res.content;
    })
  }

  getComuniOpByProvincia(provincia: string) {
    this.comuniSrv.getComuni().subscribe(res => {
      this.comuniOp = res.content.filter((el: any) => el.provincia.nome == provincia);
    })
  }

  getComuniLegByProvincia(provincia: string) {
    this.comuniSrv.getComuni().subscribe(res => {
      this.comuniLeg = res.content.filter((el: any) => el.provincia.nome == provincia);
    })
  }

  onSubmit(form: FormGroup) {
    try {
      this.clientiSrv.formCliente(form.value, 0);
    } catch (error:any) {
      console.error(error);
    } finally {
      this.router.navigate(["/clienti"])
    }
  }
}
