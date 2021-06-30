import { Component, OnDestroy, OnInit } from '@angular/core';
import { MedicoService } from '../../../services/medico.service';
import { Medico } from '../../../models/medico.model';
import { Subscription } from 'rxjs';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { BusquedasService } from '../../../services/busquedas.service';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit, OnDestroy {

  public cargando: boolean = true;
  public medicos: Medico[] = [];
  public medicosInit: Medico[] = [];
  private imagenSubs: Subscription;

  constructor(private medicoService: MedicoService, private modalImagenService: ModalImagenService,
    private busquedasService: BusquedasService) { }

  ngOnInit(): void {
    this.cargarMedicos();
    this.imagenSubs = this.modalImagenService.nuevaImagen
      .pipe(delay(100)).subscribe(img => {
        this.cargarMedicos();
      });
  }

  ngOnDestroy(): void {
    this.imagenSubs.unsubscribe();
  }

  cargarMedicos() {
    this.medicoService.getMedicos()
      .subscribe(medicos => {
        this.medicos = medicos;
        this.medicosInit = medicos;
        this.cargando = false;
      });
  }

  abrirModal(medico: Medico) {
    this.modalImagenService.abrirModal('medicos', medico._id, medico.img);
  }

  guardarCambios(medico: Medico) {
    console.log(medico);
    this.medicoService.updateMedico(medico._id, medico)
      .subscribe(res => {
        Swal.fire('Actualizado', medico.nombre, 'success');
      })
  }

  buscarMedicos(termino: string) {

    if (termino.length == 0) {
      this.medicos = this.medicosInit;
    }
    else {
      this.busquedasService.buscar('medicos', termino)
        .subscribe(res => {
          this.medicos = res as Medico[];
        });
    }

  }

  eliminarMedico(medico: Medico) {
    Swal.fire({
      title: '¿Seguro que quieres borrar este médico?',
      text: "Este procedimiento es irreversible",
      icon: 'question',
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borralo'
    }).then((result) => {
      if (result.isConfirmed) {

        this.medicoService.deleteMedico(medico._id)
          .subscribe(res => {
            Swal.fire(
              'Medico eliminado',
              `${medico.nombre} fue eliminado correctamente`,
              'success'
            )

            this.cargarMedicos();
          });
      }
    })
  }

}
