import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MaterialModule } from '../../../../material.module';

@Component({
  selector: 'app-home',
  imports: [MaterialModule],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
  constructor(private router: Router) { }

  onNavigate() {
    this.router.navigate(['/alumnos']);
  }
}
