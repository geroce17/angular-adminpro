import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from '../../services/usuario.service';
import { FileUploadService } from '../../services/file-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {

  public perfilForm: FormGroup;
  public usuario: Usuario;
  public imagenSubir: File;
  public imgTemp: any = "";

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private fileUpload: FileUploadService) {
    this.usuario = this.usuarioService.usuario;
  }

  ngOnInit(): void {

    this.perfilForm = this.fb.group({
      nombre: [this.usuario.nombre, Validators.required],
      email: [this.usuario.email, [Validators.required, Validators.email]]
    });

  }

  actualizarPerfil() {
    console.log(this.perfilForm.value);
    this.usuarioService.actualizarUsuario(this.perfilForm.value)
      .subscribe((res: any) => {
        const { nombre, email } = res.usuario;
        this.usuario.nombre = nombre;
        this.usuario.email = email;

        Swal.fire('Guardado', 'Los cambios han sido guardados', 'success');
      },
      (error) => {
        console.log(error);
        Swal.fire('Error al guardar', error.error.msg, 'error');
      })
  }

  cambiarImagen(file: File) {
    this.imagenSubir = file;

    if(!file) {
      console.log("Sin imagen: " + this.imgTemp);
      return this.imgTemp = null;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      this.imgTemp = reader.result;
    }
  }

  subirImagen() {
    this.fileUpload.actualizarFoto(this.imagenSubir, 'usuarios', this.usuario.uid)
    .then(img => {
      this.usuario.img = img;
      Swal.fire('Éxito', 'Imagen guardada exitosamente', 'success');
    }).catch(error => {
      Swal.fire('Error', 'No se ha podido subir la imagen', 'success');
    })
  }
}
