import { Component, OnDestroy, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { delay } from 'rxjs/operators';
import { Subscription, Observable } from 'rxjs';

import { HospitalService } from '../../../services/hospital.service';
import { Hospital } from '../../../models/hospital.model';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { BusquedasService } from '../../../services/busquedas.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styleUrls: ['./hospitales.component.css']
})
export class HospitalesComponent implements OnInit, OnDestroy {

  public hospitales: Hospital[] = [];
  public hospitalesInit: Hospital[] = [];

  public cargando: boolean = true;
  private imagenSubs: Subscription;

  constructor(private hospitalService: HospitalService,
    private modalImagenService: ModalImagenService,
    private busquedasService: BusquedasService) { }

  ngOnDestroy(): void {
    this.imagenSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarHospitales();

    this.imagenSubs = this.modalImagenService.nuevaImagen
      .pipe(delay(100)).subscribe(img => {
        this.cargarHospitales();
      });
  }

  cargarHospitales() {
    this.cargando = true;
    this.hospitalService.cargarHospitales()
      .subscribe(hospitales => {
        this.cargando = false;
        this.hospitales = hospitales;
        this.hospitalesInit = hospitales;
      })

  }

  buscarHospitales(termino: string) {

    if (termino.length == 0) {
      this.hospitales = this.hospitalesInit;
    }
    else {
      this.busquedasService.buscar('hospitales', termino)
        .subscribe(res => {
          this.hospitales = res as Hospital[];
        });
    }

  }

  guardarCambios(hospital: Hospital) {
    console.log(hospital);
    this.hospitalService.actualizarHospital(hospital._id, hospital.nombre)
      .subscribe(res => {
        Swal.fire('Actualizado', hospital.nombre, 'success');
      })
  }

  eliminarHospital(hospital: Hospital) {
    console.log(hospital);
    this.hospitalService.borrarHospital(hospital._id)
      .subscribe(res => {
        Swal.fire('Hospital eliminado', hospital.nombre, 'success');
        this.cargarHospitales();
      })
  }

  async abrirSwal() {
    const { value = '' } = await Swal.fire<string>({
      title: 'Nuevo hospital',
      text: 'Ingrese el nombre del hospital',
      input: 'text',
      inputPlaceholder: 'Nombre de hospital',
      showCancelButton: true,
    })

    if (value.trim().length > 0) {
      this.hospitalService.crearHospital(value)
        .subscribe((res: any) => {
          Swal.fire('Creado', value, 'success');
          this.hospitales.push(res.hospital)
        })
    }

  }

  abrirModal(hospital: Hospital) {
    this.modalImagenService.abrirModal('hospitales', hospital._id, hospital.img);
  }

}
