import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../service/authentication/auth.service';
import { Authentication } from '../model/Authentication';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {

  form: FormGroup;
  isToastOpen: boolean = false;
  loading: any;
  messages = this.getValidationMessages();

  constructor(
    private router: Router,
    private formBuilder: NonNullableFormBuilder,
    private authService: AuthService,
    private loadingCtrl: LoadingController
  ) {

    this.form = this.formBuilder.group({
      username: new FormControl("", Validators.compose([
        Validators.required
      ])),
      password: new FormControl("", Validators.compose([
        Validators.required
      ]))
    });
  }

  ngOnInit() {
  }

  login(): void {

    this.showLoading();

    this.authService.login(this.form.value)
      .subscribe({
        next: result => {
          this.setSession(result);
          this.loading.dismiss();

          if (result.role.toUpperCase() === 'COMPANY') {
            this.router.navigate([ '/tabs/cashback' ]);
          } else if (result.role.toUpperCase() === 'CUSTOMER') {
            this.router.navigate([ '/tabs/wallet' ]);
          }

        },
        error: () => {
          this.loading.dismiss();
          this.setToastOpen(true);
        }
      });

  }

  private setSession(authResult: Authentication) {
    localStorage.setItem('userRole', authResult.role);
    localStorage.setItem('companyId', authResult.companyId.toString());
    localStorage.setItem('customerPersonalId', authResult.customerPersonalId);

    // const expiresAt = moment().add(authResult.expiresIn,'second');
    localStorage.setItem('token', authResult.token);
    // localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
}

  signUp(): void {
    this.router.navigate([ '/sign-up' ]);
  }

  setToastOpen(isOpen: boolean) {
    this.isToastOpen = isOpen;
  }

  async showLoading() {
    this.loading = await this.loadingCtrl.create({
      message: 'Realizando login',
    });

    this.loading.present();
  }

  private getValidationMessages() {
    return {
      username: [
        { type: 'required', message: 'Usuário é obrigatório.' }
      ],
      password: [
        { type: 'required', message: 'Senha é obrigatória.' }
      ]
    };
  }

}
