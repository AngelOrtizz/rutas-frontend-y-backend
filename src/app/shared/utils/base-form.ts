import { Injectable } from "@angular/core";
import { AbstractControl } from "@angular/forms";

@Injectable({ providedIn: 'root' })
export class BaseForm {
  constructor() { }

  isValidField(form: AbstractControl | null): boolean {
    var flag = false;
    if (form != null) {
      flag = (form.touched || form.dirty) && !form.valid;
    }
    return flag;
  }

  getErrorMessage(form: AbstractControl | null): string {
    let message = '';
    if (form) {
      const { errors } = form;
      if (errors) {
        const messages: any = {
          required: 'Campo requerido',
          email: 'Formato inválido',
          pattern: 'Formato inválido',
          minError: 'El rango no es correcto',
          min: 'El rango no es correcto',
          max: 'El rango no es correcto'
        };
        const errorKey = Object.keys(errors).find(Boolean);
        if (errorKey) {
          message = messages[errorKey];
        }
      }
    }
    return message;
  }
}