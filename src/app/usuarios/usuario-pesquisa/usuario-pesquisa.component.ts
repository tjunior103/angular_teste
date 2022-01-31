import { Component, OnInit, ViewChild } from '@angular/core';

import { UsuarioFiltro, UsuarioService } from '../usuario.service';

import { Table } from 'primeng/table';
import { LazyLoadEvent } from 'primeng/api';

@Component({
  selector: 'app-usuario-pesquisa',
  templateUrl: './usuario-pesquisa.component.html',
  styleUrls: ['./usuario-pesquisa.component.css']
})
export class UsuarioPesquisaComponent implements OnInit {

  filtro = new UsuarioFiltro();
  totalRegistros = 0;
  usuarios = [];
  @ViewChild('tabela') grid!: Table;

  constructor(
    private usuarioService: UsuarioService,
  ) { }

  ngOnInit(): void {
  }

  pesquisar(pagina = 0) {

    this.filtro.pagina = pagina;
    this.usuarioService.pesquisar(this.filtro)
      .then(resultado => {
        this.usuarios = resultado.usuarios
        this.totalRegistros = resultado.total;
      })

  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event!.first! / event!.rows!;
    this.pesquisar(pagina);
  }
}
