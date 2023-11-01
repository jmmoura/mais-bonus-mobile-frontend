import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { RedeemService } from '../service/redeem/redeem.service';

@Component({
  selector: 'app-redeem-company',
  templateUrl: './redeem-company.page.html',
  styleUrls: ['./redeem-company.page.scss'],
})
export class RedeemCompanyPage implements OnInit {

  form: FormGroup;
  messages = this.getValidationMessages();
  loading: any;
  toastMessage: string = '';
  isToastOpen: boolean = false;

  constructor(
    private router: Router,
    private formBuilder: NonNullableFormBuilder,
    private redeemService: RedeemService,
    private alertController: AlertController,
    private loadingCtrl: LoadingController
  ) {
    this.form = this.formBuilder.group({
      code: new FormControl("", Validators.required)
    });
   }

   ngOnInit() {
  }

  redeem() {
    this.showLoading();

    this.redeemService.find(this.form.get('code')?.value).subscribe({
      next: result => {
        const message = `<p>Nome:  ${ result.customer?.name } </p>
                        <p>CPF: ${ result.customer?.cpf } </p>
                        <p>Valor do Resgate: ${ this.formatCurrency(result.amount) } </p>`;
        this.loading.dismiss();
        this.presentAlert(message);
      },
      error: () => {
        this.loading.dismiss();
        this.setToastOpen(true, 'Erro ao resgatar cashback. Verifique o código');
      }
    });
  }

  private formatCurrency(number: number) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      })
      .format(number);
  }

  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Confirmar resgate',
      message: message,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Confirmar',
          role: 'confirm',
          handler: () => this.saveRedeem(),
        },
      ],
    });

    await alert.present();
  }

  saveRedeem() {
    this.showLoading();

    this.redeemService.withdraw(this.form.value).subscribe({
      next: () => {
        this.loading.dismiss();
        this.setToastOpen(true, 'Cashback resgatado com sucesso');
      },
      error: () => {
        this.loading.dismiss();
        this.setToastOpen(true, 'Erro ao resgatar cashback. Verifique o código');
      }
    })
  }

  setToastOpen(isOpen: boolean, message: string = '') {
    this.isToastOpen = isOpen;
    this.toastMessage = message;
  }

  async showLoading() {
    this.loading = await this.loadingCtrl.create({
      message: 'Resgatando cashback',
    });

    this.loading.present();
  }

  back() {
    this.router.navigate([ '/tabs/cashback' ]);
  }

  private getValidationMessages() {
    return {
      code: [
        { type: 'required', message: 'O valor é obrigatório.' }
      ]
    };
  }

}

