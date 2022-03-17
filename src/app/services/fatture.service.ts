import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Cliente } from '../models/cliente';
import { Fattura } from '../models/fattura';
import { ClientiService } from './clienti.service';
import { StatoFattura } from '../models/stato-fattura';

@Injectable({
  providedIn: 'root'
})
export class FattureService {

  constructor(private http: HttpClient, private clientiSrv: ClientiService) { }

  getAllFatture(page: number) {
    return this.http.get<any>(`${environment.apiBaseUrl}/api/fatture?page=${page}&sort=id,ASC`);
  }

  getFattureByCliente(id: number, page: number) {
    return this.http.get<any>(`${environment.apiBaseUrl}/api/fatture/cliente/${id}?page=${page}&sort=id,ASC`);
  }

  getFattureById(id: number) {
    return this.http.get<any>(`${environment.apiBaseUrl}/api/fatture/${id}`);
  }

  getTipiStatoFattura() {
    return this.http.get<any>(`${environment.apiBaseUrl}/api/statifattura`);
  }

  getTipoStatoFatturabyId(id: number) {
    return this.http.get<StatoFattura>(`${environment.apiBaseUrl}/api/statifattura/${id}`);
  }

  deleteFattura(id: number) {
    return this.http.delete(`${environment.apiBaseUrl}/api/fatture/${id}`);
  }

  deleteFattureByCliente(idCliente: number) {
    return this.http.delete(`${environment.apiBaseUrl}/api/fatture/cliente/${idCliente}`);
  }

  async fatturaForm(data: Partial<Fattura>, id: number, idFattura: number) {
    console.log('service',data);

    let cliente = await this.clientiSrv.getClienteById(id).toPromise() as Cliente;
    let getStato = await this.getTipoStatoFatturabyId(Number(data.stato)).toPromise() as StatoFattura;

    const fattData: Fattura | unknown = {
      data: data.data,
      numero: data.numero,
      anno: data.anno,
      importo: data.importo,
      stato: getStato,
      cliente: {
        id: cliente.id,
        ragioneSociale: cliente.ragioneSociale,
        partitaIva: cliente.partitaIva,
        tipoCliente: cliente.tipoCliente,
        email: cliente.email,
        pec: cliente.pec,
        telefono: cliente.telefono,
        nomeContatto: cliente.nomeContatto,
        cognomeContatto: cliente.cognomeContatto,
        telefonoContatto: cliente.telefonoContatto,
        emailContatto: cliente.emailContatto,
        indirizzoSedeOperativa: {
          via: cliente.indirizzoSedeOperativa?.via,
          civico: cliente.indirizzoSedeOperativa?.civico,
          cap: cliente.indirizzoSedeOperativa?.cap,
          localita: cliente.indirizzoSedeOperativa?.localita,
          comune: {
            id: cliente.indirizzoSedeOperativa.comune.id,
            nome: cliente.indirizzoSedeOperativa.comune.nome,
            provincia: {
              id: cliente.indirizzoSedeOperativa.comune.provincia.id,
              nome: cliente.indirizzoSedeOperativa.comune.provincia.nome,
              sigla: cliente.indirizzoSedeOperativa.comune.provincia.sigla
            }
          }
        },
        indirizzoSedeLegale: cliente.indirizzoSedeLegale ? {
          via: cliente.indirizzoSedeLegale?.via ? cliente.indirizzoSedeLegale?.via : null,
          civico: cliente.indirizzoSedeLegale?.civico ? cliente.indirizzoSedeLegale?.civico : null,
          cap: cliente.indirizzoSedeLegale?.cap ? cliente.indirizzoSedeLegale?.cap : null,
          localita: cliente.indirizzoSedeLegale?.localita ? cliente.indirizzoSedeLegale?.localita : null,
          comune: cliente.indirizzoSedeLegale.comune ? {
            id: cliente.indirizzoSedeLegale.comune.id ? cliente.indirizzoSedeLegale.comune.id : null,
            nome: cliente.indirizzoSedeLegale.comune.nome ? cliente.indirizzoSedeLegale.comune.nome : null,
            provincia: cliente.indirizzoSedeLegale.comune.provincia ? {
              id: cliente.indirizzoSedeLegale.comune.provincia.id ? cliente.indirizzoSedeLegale.comune.provincia.id : null,
              nome: cliente.indirizzoSedeLegale.comune.provincia.nome ? cliente.indirizzoSedeLegale.comune.provincia.nome : null,
              sigla: cliente.indirizzoSedeLegale.comune.provincia.sigla ? cliente.indirizzoSedeLegale.comune.provincia.sigla: null
            } : null
          } : null
        } : null
      },
      dataInserimento: "2019-06-01T08:11:01.911+00:00",
      dataUltimoContatto: "2019-06-01T08:11:01.911+00:00",
      fatturatoAnnuale: 1000
    }

    console.log(fattData);

    if(idFattura == 0) {
      return this.http.post<Fattura>(`${environment.apiBaseUrl}/api/fatture`, fattData).subscribe();
    } else {
      return this.http.put<Fattura>(`${environment.apiBaseUrl}/api/fatture/${idFattura}`, fattData).subscribe();
    }
  }
}
