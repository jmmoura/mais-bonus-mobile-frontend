import { Company } from './../../model/Company';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { MaskitoElementPredicateAsync, MaskitoOptions } from '@maskito/core';
import { maskitoPhoneOptionsGenerator } from '@maskito/phone';
import metadata from 'libphonenumber-js/min/metadata';

import { CustomerService } from './../../service/customer/customer.service';
import { AuthService } from 'src/app/service/authentication/auth.service';
import { FormUtilsService } from './../../shared/form/form-utils.service';
import { CompanyService } from 'src/app/service/company/company.service';
import { Customer } from 'src/app/model/Customer';
import { LoadingController } from '@ionic/angular';

interface UserCompany {
  id: number,
  name: string
}

@Component({
  selector: 'app-tab-user-profile',
  templateUrl: 'user-profile.page.html',
  styleUrls: ['user-profile.page.scss']
})
export class UserProfilePage implements OnInit, OnDestroy {

  readonly cpfMask: MaskitoOptions = this.formUtilsService.getCpfMask();
  readonly cnpjMask: MaskitoOptions = this.formUtilsService.getCnpjMask();
  readonly phoneMask: MaskitoOptions = maskitoPhoneOptionsGenerator({countryIsoCode: "BR", metadata});
  readonly maskPredicate: MaskitoElementPredicateAsync = async (el) => (el as HTMLIonInputElement).getInputElement();

  userDataForm!: FormGroup;
  newPasswordForm!: FormGroup;
  validationMessages = this.formUtilsService.getValidationMessages();
  userType?: string;
  userCompanies?: UserCompany[];
  customer?: Customer;
  company?: Company;
  loading: any;
  toastMessage: string = '';
  isToastOpen: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private formBuilder: NonNullableFormBuilder,
    private formUtilsService: FormUtilsService,
    private customerService: CustomerService,
    private companyService: CompanyService,
    private loadingCtrl: LoadingController
  ) {

    if (this.authService.isCompany()) {
        this.userDataForm = this.initializeCompanyDataValidations();
    } else if (this.authService.isCustomer()) {
        this.userDataForm = this.initializeCustomerDataValidations();
    }

    this.newPasswordForm = this.initializeNewPasswordValidations();

  }

  ngOnInit() {
  }

  @HostListener('unloaded')
  ngOnDestroy() {
    console.log('Items destroyed');
  }

  ionViewDidLeave() {
    this.ngOnDestroy();
  }

  ionViewWillEnter() {
    const companyId = Number(this.authService.getCompanyId());

    if (this.authService.isCompany()) {
      this.companyService.findById(companyId).subscribe(result => {
        this.company = result;
        this.customer = undefined;
        this.userDataForm = this.initializeCompanyDataValidations();
        this.userDataForm.updateValueAndValidity();
      });

    } else if (this.authService.isCustomer()) {
      const customerId = Number(this.authService.getCustomerId());
      this.customerService.findById(customerId).subscribe(result => {
        this.customer = result;
        this.company = undefined;
        this.userDataForm = this.initializeCustomerDataValidations();
      });

      this.companyService.findById(companyId).subscribe(result => {
        this.userCompanies = [{
          id: result.id,
          name: result.name
        }];
        this.userDataForm.controls['companyId'].setValue(this.userCompanies[0]);
        this.userDataForm.updateValueAndValidity();
      });
    }

  }

  async updateCompany() {
    await this.showLoading();

    this.companyService.save(this.userDataForm.value).subscribe({
        next: result => {
          this.company = result;
          this.userDataForm.updateValueAndValidity();
          this.loading.dismiss();
          this.setToastOpen(true, 'Usuário atualizado com sucesso');
        },
        error: () => {
          this.loading.dismiss();
          this.setToastOpen(true, 'Erro ao atualizar usuário');
        }
      });
  }

  async updateCustomer() {
    await this.showLoading();

    this.customerService.save(this.userDataForm.value).subscribe({
      next: result => {
        this.customer = result;
        this.userDataForm.updateValueAndValidity();
        this.loading.dismiss();
        this.setToastOpen(true, 'Usuário atualizado com sucesso');
      },
      error: () => {
        this.loading.dismiss();
        this.setToastOpen(true, 'Erro ao atualizar usuário');
      }
    });
  }

  async updatePassword() {
    await this.showLoading();

    if (this.authService.isCompany()) {
      this.companyService.updatePassword(this.newPasswordForm.value).subscribe({
        next: () => {
          this.loading.dismiss();
          this.setToastOpen(true, 'Senha atualizada com sucesso');
        },
        error: () => {
          this.loading.dismiss();
          this.setToastOpen(true, 'Erro ao atualizar senha');
        }
      });
    } else if (this.authService.isCustomer()) {
      this.customerService.updatePassword(this.newPasswordForm.value).subscribe({
        next: () => {
          this.loading.dismiss();
          this.setToastOpen(true, 'Senha atualizada com sucesso');
        },
        error: () => {
          this.loading.dismiss();
          this.setToastOpen(true, 'Erro ao atualizar senha');
        }
      });
    }

  }

  logout() {
    this.authService.logout();
    this.router.navigate([ '' ]);
  }

  setToastOpen(isOpen: boolean, message: string = '') {
    this.isToastOpen = isOpen;
    this.toastMessage = message;
  }

  async showLoading() {
    this.loading = await this.loadingCtrl.create({
      message: 'Salvando dados do usuário',
    });

    this.loading.present();
  }

  private initializeCompanyDataValidations(): FormGroup<any> {
    return this.formBuilder.group({
      id: new FormControl(this.company?.id),
      name: new FormControl({value: this.company?.name, disabled: true}),
      email: new FormControl(this.company?.email, Validators.compose([
        Validators.required,
        Validators.email
      ])),
      phone: new FormControl(this.company?.phone, Validators.required),
      cnpj: new FormControl({ value: this.company?.cnpj, disabled: true }),
    });
  }

  private initializeCustomerDataValidations(): FormGroup<any> {
    return this.formBuilder.group({
      id: new FormControl(this.customer?.id),
      name: new FormControl({value: this.customer?.name, disabled: true}),
      email: new FormControl(this.customer?.email, Validators.compose([
        Validators.required,
        Validators.email
      ])),
      phone: new FormControl(this.customer?.phone, Validators.required),
      cpf: new FormControl({ value: this.customer?.cpf, disabled: true }),
      companyId: new FormControl({ value: '', disabled: true }),
    });
  }

  private initializeNewPasswordValidations(): FormGroup<any> {
    return this.formBuilder.group({
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$')
      ])),
      repeatPassword: new FormControl('', Validators.required)
    }, {
      validators: (group: AbstractControl) => {
        return group.get('password')?.value === group.get('repeatPassword')?.value ? null : { notSame: true };
      }
    });
  }

}
