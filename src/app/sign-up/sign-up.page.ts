import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';

import { MaskitoElementPredicateAsync, MaskitoOptions } from '@maskito/core';
import { maskitoPhoneOptionsGenerator } from '@maskito/phone';
import metadata from 'libphonenumber-js/min/metadata';

import { CustomValidator } from './customValidator';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
  readonly cpfMask: MaskitoOptions = this.getCpfMask();
  readonly cnpjMask: MaskitoOptions = this.getCnpjMask();
  readonly phoneMask: MaskitoOptions = maskitoPhoneOptionsGenerator({countryIsoCode: "BR", metadata});
  readonly maskPredicate: MaskitoElementPredicateAsync = async (el) => (el as HTMLIonInputElement).getInputElement();

  form: FormGroup;
  validationMessages = this.getValidationMessages();

  constructor(private router: Router,
    private formBuilder: NonNullableFormBuilder,
    private location: Location
    ) {

    this.form = this.initializeValidations();
    this.updateFormControls();

  }

  get cnpj(): AbstractControl | null {
    return this.form.get('cnpj');
  }

  get cpf(): AbstractControl | null {
    return this.form.get('cpf');
  }

  ngOnInit() {
  }

  onSubmit() {
    this.router.navigate(['/tabs']);
  }

  back() {
    this.location.back();
  }

  updateFormControls(): void {
    if (this.form.get('userType')?.value === 'company') {
      this.cnpj?.enable();
      this.cpf?.disable();
    } else {
      this.cnpj?.disable();
      this.cpf?.enable();
    }
  }

  private initializeValidations(): FormGroup<any> {
    return this.formBuilder.group({
      userType: new FormControl("customer", Validators.required),
      name: new FormControl("", Validators.required),
      email: new FormControl("", Validators.compose([
        Validators.required,
        Validators.email
      ])),
      phone: new FormControl("", Validators.required),
      cnpj: new FormControl("", Validators.compose([
        Validators.required,
        CustomValidator.isValidCnpj
      ])),
      cpf: new FormControl("", Validators.compose([
        Validators.required,
        CustomValidator.isValidCpf
      ])),
      password: new FormControl("", Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$')
      ])),
      repeatPassword: new FormControl("", Validators.required)
    }, {
      validators: (group: AbstractControl) => {
        return group.get('password')?.value === group.get('repeatPassword')?.value ? null : { notSame: true };
      }
    });
  }

  private getValidationMessages() {
    return {
      name: [
        { type: 'required', message: 'Nome é obrigatório.' }
      ],
      email: [
        { type: 'required', message: 'E-mail é obrigatório.' },
        { type: 'email', message: 'Formato de e-mail inválido.' }
      ],
      phone: [
        { type: 'required', message: 'Telefone é obrigatório.' }
      ],
      cnpj: [
        { type: 'required', message: 'CNPJ é obrigatório.' },
        { type: 'invalidCnpj', message: 'Formato de CNPJ inválido.' }
      ],
      cpf: [
        { type: 'required', message: 'CPF é obrigatório.' },
        { type: 'invalidCpf', message: 'Formato de CPF inválido.' }
      ],
      password: [
        { type: 'required', message: 'Senha é obrigatória.' },
        { type: 'minLength(8)', message: 'Senha deve ter no mínimo 8 caracteres.' },
        { type: 'pattern', message: 'Senha deve conter pelo menos 1 letra maiúscula, 1 letra minúscula e 1 número.' }
      ],
      repeatPassword: [
        { type: 'required', message: 'Repetir senha é obrigatório.' },
        { type: 'notSame', message: 'As senhas devem ser iguais.' }
      ]
    };
  }

  private getCnpjMask(): MaskitoOptions {
    return {
      mask: [
        ...Array(2).fill(/\d/),
        '.',
        ...Array(3).fill(/\d/),
        '.',
        ...Array(3).fill(/\d/),
        '/',
        ...Array(4).fill(/\d/),
        '-',
        ...Array(2).fill(/\d/)
      ]
    };
  }

  private getCpfMask(): MaskitoOptions {
    return {
      mask: [
        ...Array(3).fill(/\d/),
        '.',
        ...Array(3).fill(/\d/),
        '.',
        ...Array(3).fill(/\d/),
        '-',
        ...Array(2).fill(/\d/)
      ]
    };
  }
}
