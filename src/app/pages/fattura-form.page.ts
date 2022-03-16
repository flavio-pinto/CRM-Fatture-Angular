import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
                  <option value="" selected>Seleziona lo stato della fattura</option>
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
export class FatturaFormPage implements OnInit {
  idCliente!: number;
  statiFattura!: StatoFattura[];
  form!: FormGroup;

  constructor(private fattSrv: FattureService, private actRoute: ActivatedRoute, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.actRoute.params.subscribe(params => {
      const id = +params['id'];

      this.idCliente = id;
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

  onSubmit(form: FormGroup) {
    console.log(form);

    try {
      this.fattSrv.fatturaForm(form.value, this.idCliente);
    } catch (error:any) {
      console.error(error);
    } finally {
      this.router.navigate([`/clienti/${this.idCliente}/fatture`])
    }
  }

}
