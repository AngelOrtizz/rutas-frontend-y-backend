import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumnosDialog } from './alumnos-dialog';

describe('AlumnosDialog', () => {
  let component: AlumnosDialog;
  let fixture: ComponentFixture<AlumnosDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlumnosDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlumnosDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
