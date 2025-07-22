import { NgModule } from "@angular/core";
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';

const myModules: any = [
  MatButtonModule,
  MatCardModule,
  MatInputModule,
  MatIconModule,
  MatGridListModule,
  MatSnackBarModule,
  MatToolbarModule,
  MatTableModule,
  MatDialogModule
];

@NgModule({
  imports: [...myModules],
  exports: [...myModules]
})
export class MaterialModule { }