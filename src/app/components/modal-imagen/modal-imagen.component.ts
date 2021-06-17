import { Component, OnInit } from '@angular/core';
import { ModalImagenService } from '../../services/modal-imagen.service';
import { FileUploadService } from '../../services/file-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styleUrls: ['./modal-imagen.component.css']
})
export class ModalImagenComponent implements OnInit {


  public imagenSubir: File;
  public imgTemp: any = "";

  constructor(public modalImagenService: ModalImagenService,
    private fileUpload: FileUploadService) { }

  ngOnInit(): void {
  }

  cerrarModal() {
    this.modalImagenService.cerrarModal();
    this.imgTemp = "";
  }

  cambiarImagen(file: File) {
    this.imagenSubir = file;

    if (!file) {
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

    const id = this.modalImagenService.id;
    const tipo = this.modalImagenService.tipo;

    this.fileUpload.actualizarFoto(this.imagenSubir, tipo, id)
      .then(img => {
        this.cerrarModal();
        Swal.fire('Éxito', 'Imagen guardada exitosamente', 'success');
        this.modalImagenService.nuevaImagen.emit(img);
      }).catch(error => {
        Swal.fire('Error', 'No se ha podido subir la imagen', 'success');
      })
  }


}
