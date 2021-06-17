import { Component, OnDestroy, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from '../../../services/usuario.service';
import { BusquedasService } from '../../../services/busquedas.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { delay } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit, OnDestroy {

  public totalUsuarios: number = 0;
  public usuarios: Usuario[] = [];
  public usuariosTemp: Usuario[] = [];
  public desde: number = 0;
  public cargando: boolean = true;

  public imagenSubs: Subscription;

  constructor(private usuarioService: UsuarioService,
    private busquedaService: BusquedasService,
    private modalImagenService: ModalImagenService) { }

  ngOnInit(): void {
    this.cargarUsuarios();
    this.imagenSubs = this.modalImagenService.nuevaImagen
      .pipe(delay(100)).subscribe(img => {
        this.cargarUsuarios();
      });
  }

  ngOnDestroy(): void {
    this.imagenSubs.unsubscribe();
  }

  cargarUsuarios() {
    this.cargando = true;
    this.usuarioService.cargarUsuarios(this.desde)
      .subscribe(({ total, usuarios }) => {
        this.totalUsuarios = total;
        if (usuarios.length != 0) {
          this.usuarios = usuarios;
          this.usuariosTemp = this.usuarios;
          this.cargando = false;
        }
      });
  }

  cambiarPagina(valor: number) {
    this.desde += valor;
    if (this.desde < 0) {
      this.desde = 0;
    }
    else if (this.desde > this.totalUsuarios) {
      this.desde -= valor;
    }

    this.cargarUsuarios();
  }

  buscar(termino: string) {
    if (termino.length == 0) {
      this.usuarios = this.usuariosTemp;
    }

    this.busquedaService.buscar('usuarios', termino)
      .subscribe(resultados => {
        this.usuarios = resultados;
      });
  }

  eliminarUsuario(usuario: Usuario) {

    if (usuario.uid === this.usuarioService.idUsuario) {
      return Swal.fire('Error', 'No puedes eliminarte a ti mismo ¿Estas demente?', 'error');
    }

    Swal.fire({
      title: '¿Seguro que quieres borrar este usuario?',
      text: "Este procedimiento es irreversible",
      icon: 'question',
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borralo'
    }).then((result) => {
      if (result.isConfirmed) {

        this.usuarioService.eliminarUsuario(usuario)
          .subscribe(res => {
            Swal.fire(
              'Usuario eliminado',
              `${usuario.nombre} fue eliminado correctamente`,
              'success'
            )

            this.cargarUsuarios();
          });


      }
    })
  }

  cambiarRole(usuario: Usuario) {
    this.usuarioService.guardarUsuario(usuario)
      .subscribe(res => {
        console.log(res);
      });
  }

  abrirModal(usuario: Usuario) {
    this.modalImagenService.abrirModal('usuarios', usuario.uid, usuario.img);
  }

}
