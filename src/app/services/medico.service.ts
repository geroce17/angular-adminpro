import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Medico } from '../models/medico.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  constructor(private http: HttpClient) { }

  private get token(): string {
    return localStorage.getItem('token') || '';
  }

  private get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  getMedicos() {
    const url = `${base_url}/medicos`;
    return this.http.get(url, this.headers)
      .pipe(map((res: { ok: boolean, medicos: Medico[] }) => res.medicos));
  }

  getMedicoById(id: string) {
    const url = `${base_url}/medicos/${id}`;
    return this.http.get(url, this.headers)
      .pipe(map((res: { ok: boolean, medico: Medico }) => res.medico));
  }

  createMedico(medico: Medico) {
    const url = `${base_url}/medicos`;
    return this.http.post(url, medico, this.headers);
  }

  updateMedico(_id: string, medico: Medico) {
    const url = `${base_url}/medicos/${_id}`;
    return this.http.put(url, medico, this.headers);
  }

  deleteMedico(_id: string) {
    const url = `${base_url}/medicos/${_id}`;
    return this.http.delete(url, this.headers);
  }

}
