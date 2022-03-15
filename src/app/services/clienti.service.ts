import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Cliente } from '../models/cliente';
import { Comune } from '../pages/comune';
import { ComuniService } from './comuni.service';

@Injectable({
  providedIn: 'root'
})

export class ClientiService {

  constructor(private http: HttpClient, private comuniSrv: ComuniService) { }

  getClienti(page: number) {
    return this.http.get<any>(`${environment.apiBaseUrl}/api/clienti?page=${page}&sort=id,ASC`)
  }

  getClienteById(id: number) {
    return this.http.get<Cliente>(`${environment.apiBaseUrl}/api/clienti/${id}`);
  }

  getTipiCliente() {
    return this.http.get<any>(`${environment.apiBaseUrl}/api/clienti/tipicliente`);
  }

  /* INIZIO METODO FORM */
  async formCliente(data: Partial<Cliente>, id: number) {
    let comOp = await this.comuniSrv.getComuniById(Number(data.indirizzoSedeOperativa?.comune)).toPromise() as Comune;
    let comLeg = await this.comuniSrv.getComuniById(Number(data.indirizzoSedeLegale?.comune)).toPromise() as Comune;

    console.log(data);


    const clienteData: Cliente | unknown = {
      ragioneSociale: data.ragioneSociale,
      partitaIva: data.partitaIva,
      tipoCliente: data.tipoCliente,
      email: data.email,
      pec: data.pec,
      telefono: data.telefono,
      nomeContatto: data.nomeContatto,
      cognomeContatto: data.cognomeContatto,
      telefonoContatto: data.telefonoContatto,
      emailContatto: data.emailContatto,
      indirizzoSedeOperativa: {
        via: data.indirizzoSedeOperativa?.via,
        civico: data.indirizzoSedeOperativa?.civico,
        cap: data.indirizzoSedeOperativa?.cap,
        localita: data.indirizzoSedeOperativa?.localita,
        comune: {
          id: comOp.id,
          nome: comOp.nome,
          provincia: {
            id: comOp.provincia.id,
            nome: comOp.provincia.nome,
            sigla: comOp.provincia.sigla
          }
        }
      },
      indirizzoSedeLegale: {
        via: data.indirizzoSedeLegale?.via,
        civico: data.indirizzoSedeLegale?.civico,
        cap: data.indirizzoSedeLegale?.cap,
        localita: data.indirizzoSedeLegale?.localita,
        comune: {
          id: comLeg.id,
          nome: comLeg.nome,
          provincia: {
            id: comLeg.provincia.id,
            nome: comLeg.provincia.nome,
            sigla: comLeg.provincia.sigla
          }
        }
      },
      dataInserimento: "2019-06-01T08:11:01.911+00:00",
      dataUltimoContatto: "2019-06-01T08:11:01.911+00:00",
      fatturatoAnnuale: 1000
    }

    if (id === 0) {
      return this.http.post<any>(`${environment.apiBaseUrl}/api/clienti`, clienteData).subscribe();
    } else {
      return this.http.put<any>(`${environment.apiBaseUrl}/api/clienti/${id}`, clienteData).subscribe();
    }
  }
  /* FINE METODO FORM  */

  cancellaCliente(id: number) {
    return this.http.delete(`${environment.apiBaseUrl}/api/clienti/${id}`)
  }
}
