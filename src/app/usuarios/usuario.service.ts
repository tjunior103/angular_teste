import { Injectable } from '@angular/core';
/* import { DatePipe } from '@angular/common'; */
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';


export class UsuarioFiltro {
  nome?: string;
  login?: string;
  email?: string;

  pagina = 0;
  itensPorPagina = 5;
}

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    private http: HttpClient,

     ) { }

  usuariosUrl = 'http://localhost:8080/users';

  pesquisar(filtro: UsuarioFiltro): Promise<any> {

    const headers = new HttpHeaders();

    let params = new HttpParams()
      .set('page', filtro.pagina.toString())
      .set('size', filtro.itensPorPagina.toString());

    if (filtro.nome) {
      params = params.set('name', filtro.nome);
    }
    if (filtro.login) {
      params = params.set('username', filtro.login);
    }
    if (filtro.email) {
      params = params.set('email', filtro.email);
    }

    return this.http.get(`${this.usuariosUrl}?`, { headers, params })
      .toPromise()
      .then((response: any) => {
        const usuarios = response['content'];
        const resultado = {
          usuarios,
          total: response['totalElements']
        };
        return resultado;
      });
  }

}
