import { AuthService } from 'src/app/service/authentication/auth.service';
import { FormUtilsService } from './../../shared/form/form-utils.service';
import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { MaskitoElementPredicateAsync, MaskitoOptions } from '@maskito/core';
import { maskitoPhoneOptionsGenerator } from '@maskito/phone';
import metadata from 'libphonenumber-js/min/metadata';

@Component({
  selector: 'app-tab-user-profile',
  templateUrl: 'user-profile.page.html',
  styleUrls: ['user-profile.page.scss']
})
export class UserProfilePage {
  readonly cpfMask: MaskitoOptions = this.formUtilsService.getCpfMask();
  readonly cnpjMask: MaskitoOptions = this.formUtilsService.getCnpjMask();
  readonly phoneMask: MaskitoOptions = maskitoPhoneOptionsGenerator({countryIsoCode: "BR", metadata});
  readonly maskPredicate: MaskitoElementPredicateAsync = async (el) => (el as HTMLIonInputElement).getInputElement();

  userDataForm: FormGroup;
  newPasswordForm: FormGroup;
  validationMessages = this.formUtilsService.getValidationMessages();

  constructor(
    private router: Router,
    private authService: AuthService,
    private formBuilder: NonNullableFormBuilder,
    private formUtilsService: FormUtilsService
    ) {

    this.userDataForm = this.initializeUserDataValidations();
    this.newPasswordForm = this.initializeNewPasswordValidations();

  }

  onSubmit() {
    this.router.navigate(['/tabs']);
  }

  logout() {
    this.authService.logout();
    this.router.navigate([ '' ]);
  }

  private initializeUserDataValidations(): FormGroup<any> {
    return this.formBuilder.group({
      userType: new FormControl("company", Validators.required),
      name: new FormControl({value: 'Josiel', disabled: true}),
      email: new FormControl("", Validators.compose([
        Validators.required,
        Validators.email
      ])),
      phone: new FormControl("", Validators.required),
      cnpj: new FormControl({value: '', disabled: true}),
      cpf: new FormControl({value: '02150304007', disabled: true}),
      companyId: new FormControl("", Validators.compose([
        Validators.required
      ])),
    });
  }

  private initializeNewPasswordValidations(): FormGroup<any> {
    return this.formBuilder.group({
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

}
