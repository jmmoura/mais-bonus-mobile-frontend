import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';

import { MaskitoElementPredicateAsync, MaskitoOptions } from '@maskito/core';
import { maskitoPhoneOptionsGenerator } from '@maskito/phone';
import metadata from 'libphonenumber-js/min/metadata';

import { CustomValidator } from './customValidator';
import { FormUtilsService } from '../shared/form/form-utils.service';
import { CompanyService } from '../service/company/company.service';
import { CustomerService } from '../service/customer/customer.service';
import { Company } from '../model/Company';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {

  readonly cpfMask: MaskitoOptions = this.formUtilsService.getCpfMask();
  readonly cnpjMask: MaskitoOptions = this.formUtilsService.getCnpjMask();
  readonly phoneMask: MaskitoOptions = maskitoPhoneOptionsGenerator({countryIsoCode: "BR", metadata});
  readonly maskPredicate: MaskitoElementPredicateAsync = async (el) => (el as HTMLIonInputElement).getInputElement();

  form: FormGroup;
  validationMessages = this.formUtilsService.getValidationMessages();
  companies: Company[] = [];

  constructor(private router: Router,
    private formBuilder: NonNullableFormBuilder,
    private location: Location,
    private formUtilsService: FormUtilsService,
    private companyService: CompanyService,
    private customerService: CustomerService
    ) {

    this.companyService.list().subscribe({next: result => this.companies = result});
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
    if (this.form.valid){
      if (this.form.get('userType')?.value === 'company') {
        this.companyService.save(this.form.value)
          .subscribe({
            next: result => console.log(result),
            error: error => console.error(error)
          });
        } else if (this.form.get('userType')?.value === 'customer') {
          this.customerService.save(this.form.value)
          .subscribe({
            next: result => console.log(result),
            error: error => console.error(error)
          });
      }
    }
    // this.router.navigate(['/tabs']);
  }

  back() {
    this.location.back();
  }

  updateFormControls(): void {
    if (this.form.get('userType')?.value === 'company') {
      this.cnpj?.enable();
      this.cpf?.disable();
      this.form.get('companyId')?.disable();
    } else {
      this.cnpj?.disable();
      this.cpf?.enable();
      this.form.get('companyId')?.enable();
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
      companyId: new FormControl("", Validators.compose([
        Validators.required
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

}
