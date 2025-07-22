import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from '../../../../../../material.module';
import { CommonModule } from '@angular/common';
import { BaseForm } from '../../../../shared/utils/base-form';
import { AlumnosService } from '../../services/alumnos';
import { AlumnoResponse } from '../../../../shared/models/alumno.interface';

enum Action {
  EDIT = 'edit',
  NEW = 'new'
}

@Component({
  selector: 'app-alumnos-dialog',
  imports: [MaterialModule, CommonModule, ReactiveFormsModule],
  templateUrl: './alumnos-dialog.html',
  styleUrl: './alumnos-dialog.scss'
})
export class AlumnosDialog implements OnInit {
  actionTODO = Action.NEW;
  titleButton = "Guardar";
  alumnoForm!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AlumnosDialog>,
    private fb: FormBuilder,
    public baseForm: BaseForm,
    private alumnoSvc: AlumnosService
  ) { }

  ngOnInit(): void {
    this.alumnoForm = this.fb.group({
      id_alumno: [''],
      nombre: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      numero_control: ['', [Validators.required]],
    });
    this.pathData();
  }

  onSave() {
    if (this.alumnoForm.invalid) return;
    const formValues = this.alumnoForm.getRawValue();
    
    if (this.actionTODO == Action.NEW) {
      var newAlumno: AlumnoResponse = {
        id_alumno: 0,
        email: formValues.email ? formValues.email : '',
        nombre: formValues.nombre ? formValues.nombre : '',
        numero_control: formValues.numero_control ? formValues.numero_control : '',
        fecha_registro: new Date()
      };
      this.alumnoSvc.newAlumno(newAlumno).subscribe(result => {
        this.dialogRef.close(result);
      });
    } else {
      var updateUser: AlumnoResponse = {
        id_alumno: formValues.id_alumno ? parseInt(formValues.id_alumno) : 0,
        email: formValues.email ? formValues.email : '',
        nombre: formValues.nombre ? formValues.nombre : '',
        numero_control: formValues.numero_control ? formValues.numero_control : '',
        fecha_registro: new Date()
      };
      this.alumnoSvc.updateAlumno(updateUser).subscribe(result => {
        this.dialogRef.close(result);
      });
    }
  }

  pathData() {
    if (this.data.alumno.id_alumno) {
      this.actionTODO = Action.EDIT;
      this.titleButton = "Editar";
      this.alumnoForm.patchValue({
        id_alumno: this.data.alumno?.id_alumno,
        nombre: this.data.alumno?.nombre,
        email: this.data.alumno?.email,
        numero_control: this.data.alumno?.numero_control
      });
      this.alumnoForm.updateValueAndValidity();
    }
  }

  onClear() {
    this.alumnoForm.reset();
  }
}
