import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { MaskitoElementPredicateAsync, MaskitoOptions } from '@maskito/core';
import { maskitoNumberOptionsGenerator } from '@maskito/kit';
import { LoadingController } from '@ionic/angular';

import { RedeemService } from '../service/redeem/redeem.service';
import { Redeem } from '../model/Redeem';

@Component({
  selector: 'app-redeem',
  templateUrl: './redeem.page.html',
  styleUrls: ['./redeem.page.scss'],
})
export class RedeemPage implements OnInit {
  readonly currencyMask: MaskitoOptions = maskitoNumberOptionsGenerator({
    decimalZeroPadding: true,
    precision: 2,
    thousandSeparator: ".",
    decimalSeparator: ','
  });
  readonly maskPredicate: MaskitoElementPredicateAsync = async (el) => (el as HTMLIonInputElement).getInputElement();

  balance: number;
  form: FormGroup;
  messages = this.getValidationMessages()
  loading: any;
  isToastOpen: boolean = false;

  constructor(
    private router: Router,
    private formBuilder: NonNullableFormBuilder,
    private activatedRoute: ActivatedRoute,
    private redeemService: RedeemService,
    private loadingCtrl: LoadingController
  ) {

    this.balance = 0;
    this.activatedRoute.params.subscribe(params => {
      this.balance = params['balance'];
      this.form.controls['amount'].setValue(this.balance);
    });

    this.form = this.formBuilder.group({
      amount: new FormControl("", Validators.required)
    }, {
      validators: (group: AbstractControl) => {
        const inputAmount = Number(group.get('amount')?.value.replaceAll(".", "").replace(",", "."));
        return inputAmount <= this.balance && inputAmount > 0 ? null : { amountInvalid: true };
      }
    });

  }

  ngOnInit() {
  }

  redeem() {
    this.showLoading();

    const redeem: Redeem = {
      amount: Number.parseFloat(this.form.get('amount')?.value),
      companyId: Number.parseInt(localStorage.getItem('companyId') || '0')
    }

    this.redeemService.save(redeem).subscribe({
      next: result => {
        this.loading.dismiss();
        this.router.navigate([ '/customer/redeem/get/code', result.code ]);
      },
      error: () => {
        this.loading.dismiss();
        this.setToastOpen(true);
      }
    });

  }

  setToastOpen(isOpen: boolean) {
    this.isToastOpen = isOpen;
  }

  async showLoading() {
    this.loading = await this.loadingCtrl.create({
      message: 'Adicionando resgate',
    });

    this.loading.present();
  }

  back() {
    this.router.navigate([ '/tabs/wallet' ]);
  }

  private getValidationMessages() {
    return {
      amount: [
        { type: 'required', message: 'O valor é obrigatório.' },
        { type: 'amountInvalid', message: 'O valor deve ser maior que zero e menor que o saldo.' }
      ]
    };
  }

}
