import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from '../models/cliente';
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
                  <option value="">Seleziona una provincia</option>
                  <option *ngFor="let provincia of provinceOp" [attr.selected]="provincia.id === cliente.indirizzoSedeOperativa.comune.provincia.id ? true : null" value="{{provincia.nome}}">{{provincia.nome}}</option>
                </select>
              </div>
              <div class="form-group mb-4">
                <label for="comune">Comune</label>
                <select formControlName="comune" class="form-select" aria-label="Default select example">
                  <option value="">Seleziona un comune</option>
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
                  <option value="">Seleziona una provincia</option>
                  <option *ngFor="let provincia of provinceLeg" [attr.selected]="provincia.id === cliente.indirizzoSedeLegale.comune.provincia.id ? true : null" value="{{provincia.nome}}">{{provincia.nome}}</option>
                </select>
              </div>
              <div class="form-group mb-4">
                <label for="comune">Comune</label>
                <select formControlName="comune" class="form-select" aria-label="Default select example">
                  <option value="">Seleziona un comune</option>
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
export class ModificaClientePage implements OnInit {
  cliente!: Cliente;

  form!: FormGroup;
  tipiCliente!: any;
  provinceOp!: Provincia[];
  provinceLeg!: Provincia[];
  provinciaSelezionataOp!: string;
  provinciaSelezionataLeg!: string;
  comuniOp!: Comune[];
  comuniLeg!: Comune[];

  constructor(private clientiSrv: ClientiService, private comuniSrv: ComuniService, private actRoute: ActivatedRoute, private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.actRoute.params.subscribe(params => {
      const id = +params['id'];

      this.clientiSrv.getClienteById(id).subscribe(res => {
        this.cliente = res;
        this.setDefault();
        this.provinciaSelezionataOp = this.cliente.indirizzoSedeOperativa.comune.provincia.nome;
        this.provinciaSelezionataLeg = this.cliente.indirizzoSedeLegale.comune.provincia.nome;
        this.getComuniOpByProvincia(this.provinciaSelezionataOp);
        this.getComuniLegByProvincia(this.provinciaSelezionataLeg);
      });
    })

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
  /* fine ngOnInit */

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
    console.log(this.cliente);
    console.log(this.form);

    try {
      this.clientiSrv.formCliente(form.value, this.cliente.id);
    } catch (error:any) {
      console.error(error);
    } finally {
      this.router.navigate(["/clienti"])
    }
  }

  setDefault() {
    this.form.patchValue({
      ragioneSociale: this.cliente.ragioneSociale,
      partitaIva: this.cliente.partitaIva,
      tipoCliente: this.cliente.tipoCliente,
      email: this.cliente.email,
      pec: this.cliente.pec,
      telefono: this.cliente.telefono,
      nomeContatto: this.cliente.nomeContatto,
      cognomeContatto: this.cliente.cognomeContatto,
      telefonoContatto: this.cliente.telefonoContatto,
      emailContatto: this.cliente.emailContatto,
      indirizzoSedeOperativa: {
        via: this.cliente.indirizzoSedeOperativa.via,
        civico: this.cliente.indirizzoSedeOperativa.civico,
        cap: this.cliente.indirizzoSedeOperativa.cap,
        localita: this.cliente.indirizzoSedeOperativa.localita,
        comune: this.cliente.indirizzoSedeOperativa.comune.id
      },
      indirizzoSedeLegale: this.cliente.indirizzoSedeLegale ? {
        via: this.cliente.indirizzoSedeLegale.via ? this.cliente.indirizzoSedeLegale.via : '',
        civico: this.cliente.indirizzoSedeLegale.civico? this.cliente.indirizzoSedeLegale.civico : '',
        cap: this.cliente.indirizzoSedeLegale.cap ? this.cliente.indirizzoSedeLegale.cap : '',
        localita: this.cliente.indirizzoSedeLegale.localita ? this.cliente.indirizzoSedeLegale.localita : '',
        comune: this.cliente.indirizzoSedeLegale.comune ? this.cliente.indirizzoSedeLegale.comune.id : ''
      } : {
        via: '',
        civico: '',
        cap: '',
        localita: '',
        comune: ''
      }
    });
  }

}
