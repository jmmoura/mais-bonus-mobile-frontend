import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MaskitoElementPredicateAsync, MaskitoOptions } from '@maskito/core';
import { maskitoNumberOptionsGenerator } from '@maskito/kit';

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

  constructor(private router: Router,
    private formBuilder: NonNullableFormBuilder,
    private activatedRoute: ActivatedRoute
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
    this.router.navigate([ '/customer/redeem/code/get' ])
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
