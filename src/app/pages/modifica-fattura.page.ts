import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Fattura } from '../models/fattura';
import { StatoFattura } from '../models/stato-fattura';
import { FattureService } from '../services/fatture.service';

@Component({
  template: `
    <div class="container mt-5 text-center p-5">
      <div class="row">
        <div class="col">
          <form [formGroup]="form" (ngSubmit)="onSubmit(form)">
            <div class="form-group mb-4">
              <label for="data" class="mb-2">Data</label>
              <input type="date" formControlName="data" id="data" class="form-control">
            </div>
            <div class="form-group mb-4">
              <label for="numero">Numero</label>
              <input type="text" formControlName="numero" id="numero" class="form-control">
            </div>
            <div class="form-group mb-4">
              <label for="anno" class="mb-2">Anno</label>
              <input type="text" formControlName="anno" id="anno" class="form-control">
            </div>
            <div class="form-group mb-4">
              <label for="importo" class="mb-2">Importo</label>
              <input type="text" formControlName="importo" id="importo" class="form-control">
            </div>
            <div class="form-group mb-4">
              <label for="stato" class="mb-2">Stato</label>
              <select formControlName="stato" class="form-select" aria-label="Default select example">
                <option value="">Seleziona lo stato della fattura</option>
                <option *ngFor="let stato of statiFattura" value="{{stato.id}}">{{stato.nome}}</option>
              </select>
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
export class ModificaFatturaPage implements OnInit {
  fattura!: Fattura;
  statiFattura!: StatoFattura[];
  idCliente!: number;

  form!: FormGroup;

  constructor(private actRoute: ActivatedRoute, private fattSrv: FattureService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.actRoute.params.subscribe(params => {
      const id = +params['id'];

      this.fattSrv.getFattureById(id).subscribe(res => {
        this.fattura = res;
        this.setDefault();
        this.idCliente = this.fattura.cliente.id;
      })
    })

    this.form = this.fb.group({
      data: this.fb.control(null, Validators.required),
      numero: this.fb.control(null, Validators.required),
      anno: this.fb.control(null, Validators.required),
      importo: this.fb.control(null, Validators.required),
      stato: this.fb.control(null, Validators.required)
    })

    this.fattSrv.getTipiStatoFattura().subscribe(res => {
      this.statiFattura = res.content;
    })
  }

  setDefault() {
    this.form.patchValue({
      data: this.fattura.data ? this.fattura.data.slice(0, 10) : new Date().toISOString().slice(0, 10),
      numero: this.fattura.numero ? this.fattura.numero : null,
      anno: this.fattura.anno ? this.fattura.anno : null,
      importo: this.fattura.importo ? this.fattura.importo : null,
      stato: this.fattura.stato ? this.fattura.stato.id : null
    })
  }

  onSubmit(form: FormGroup) {
    console.log(form.value);
    console.log(this.fattura.stato);


    try {
      this.fattSrv.fatturaForm(form.value, this.idCliente, this.fattura.id);
    } catch (error:any) {
      console.error(error);
    } finally {
      this.router.navigate([`/clienti/${this.idCliente}/fatture`])
    }
  }
}
