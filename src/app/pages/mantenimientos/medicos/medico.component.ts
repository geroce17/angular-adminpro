import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HospitalService } from '../../../services/hospital.service';
import { Hospital } from '../../../models/hospital.model';
import { MedicoService } from '../../../services/medico.service';
import { Medico } from '../../../models/medico.model';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [
  ]
})
export class MedicoComponent implements OnInit {

  public medicoForm: FormGroup;
  public hospitales: Hospital[] = [];

  public hospitalSeleccionado: Hospital;
  public medicoSeleccionado: Medico;

  constructor(private fb: FormBuilder,
    private hospitalService: HospitalService,
    private medicoService: MedicoService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(({ id }) => {
      this.cargarMedico(id);
    });

    // this.medicoService.getMedicoById()

    this.medicoForm = this.fb.group({
      nombre: ['', Validators.required],
      hospital: ['', Validators.required]
    })

    this.cargarHospitales();

    this.medicoForm.get('hospital').valueChanges
      .subscribe(hospitalId => {
        this.hospitalSeleccionado = this.hospitales.find(h => h._id === hospitalId);

      });
  }

  cargarMedico(id: string) {
    if (id === 'nuevo') {
      return;
    }
    else {
      this.medicoService.getMedicoById(id)
        .pipe(
          delay(100)
        )
        .subscribe(medico => {
          if (!medico) {
            return this.router.navigateByUrl(`/dashboard/medicos`);
          }
          const { nombre, hospital: { _id } } = medico;
          this.medicoSeleccionado = medico;
          this.medicoForm.setValue({ nombre: nombre, hospital: _id });
        });
    }
  }

  guardarMedico() {

    const { nombre } = this.medicoForm.value;

    if (this.medicoSeleccionado) {
      this.medicoService.updateMedico(this.medicoSeleccionado._id, this.medicoForm.value)
        .subscribe(res => {
          Swal.fire('Actualizado', `Médico ${nombre} se ha actualizado`, 'success')
        })
    }
    else {
      const { nombre } = this.medicoForm.value;
      this.medicoService.createMedico(this.medicoForm.value)
        .subscribe((res: any) => {
          Swal.fire('Creado', `Médico ${nombre} creado correctamente`, 'success');
          this.router.navigateByUrl(`/dashboard/medico/${res.medico._id}`);
        });
    }
  }

  cargarHospitales() {
    this.hospitalService.cargarHospitales()
      .subscribe(hospitales => {

        this.hospitales = hospitales;

      })
  }

}
