import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MaterialModule } from '../../../../material.module';
import { CommonModule } from '@angular/common';
import { AlumnosService } from './services/alumnos';
import { AlumnoResponse } from '../../shared/models/alumno.interface';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DefaultResponse } from '../../shared/models/default.interface';
import Swal from 'sweetalert2';
import { AlumnosDialog } from './components/alumnos-dialog/alumnos-dialog';

@Component({
  selector: 'app-alumnos',
  imports: [MaterialModule, CommonModule],
  templateUrl: './alumnos.html',
  styleUrl: './alumnos.scss'
})
export class Alumnos implements OnInit {
  displayedColumns: string[] = ["numero_control", "nombre", "email", "fecha_registro", "actions"];
  alumnos = new MatTableDataSource<AlumnoResponse>();

  constructor(
    private alumnoSvc: AlumnosService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.listar();
  }

  listar() {
    this.alumnoSvc.getAlumnos()
      .subscribe((alumnos: AlumnoResponse[]) => {
        this.alumnos.data = alumnos;
      });
  }

  onOpenModal(alumno: any = {}) {
    const dialogRef = this.dialog.open(AlumnosDialog, {
      minWidth: '60%',
      data: {
        title: 'Registro de Alumnos',
        alumno
      }
    });
    
    dialogRef.afterClosed().subscribe((result: DefaultResponse) => {
      if (result) {
        this.snackBar.open(result.mensaje, '', {
          duration: 5 * 1000,
          panelClass: ['success-snackbar'],
          horizontalPosition: 'end',
          verticalPosition: 'top'
        });
        this.listar();
      }
    });
  }

  onDelete(id_alumno: number) {
    Swal.fire({
      title: '',
      text: '¿Realmente desea eliminar el registro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'darkBlue',
      cancelButtonColor: 'darkRed',
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        this.alumnoSvc.deleteAlumno(id_alumno).subscribe((res: DefaultResponse) => {
          this.snackBar.open(res.mensaje, '', {
            duration: 5 * 1000,
            panelClass: ['success-snackbar'],
            horizontalPosition: 'end',
            verticalPosition: 'top'
          });
          this.listar();
        });
      }
    });
  }
}
