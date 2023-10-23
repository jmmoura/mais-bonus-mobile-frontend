import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MaskitoElementPredicateAsync, MaskitoOptions } from '@maskito/core';
import { maskitoNumberOptionsGenerator } from '@maskito/kit';

@Component({
  selector: 'app-score-company',
  templateUrl: './score-company.page.html',
  styleUrls: ['./score-company.page.scss'],
})
export class ScoreCompanyPage implements OnInit {
  readonly currencyMask: MaskitoOptions = maskitoNumberOptionsGenerator({
    decimalZeroPadding: true,
    precision: 2,
    thousandSeparator: ".",
    decimalSeparator: ','
  });
  readonly maskPredicate: MaskitoElementPredicateAsync = async (el) => (el as HTMLIonInputElement).getInputElement();

  form: FormGroup;
  messages = this.getValidationMessages();
  cashbackAmount = "0,00";

  constructor(private router: Router, private formBuilder: NonNullableFormBuilder) {
    this.form = this.formBuilder.group({
      customerID: new FormControl("", Validators.required),
      description: new FormControl(""),
      purchaseAmount: new FormControl("", Validators.required),
      cashbackPercent: new FormControl("", Validators.compose([
        Validators.required,
        Validators.min(1),
        Validators.max(100)
      ]))
    });
  }

  ngOnInit() {
  }

  updateCashbackAmount() {
    const purchaseAmount = Number(this.form.get('purchaseAmount')?.value.replaceAll(".", "").replace(",", "."));
    const cashbackPercent = Number(this.form.get('cashbackPercent')?.value.replaceAll(".", "").replace(",", "."));

    const totalAmount = purchaseAmount * cashbackPercent / 100;
    const numberFormat = Intl.NumberFormat("pt-BR", {
      style: "decimal",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
    this.cashbackAmount = numberFormat.format(totalAmount);

  }

  addPurchase() {

  }

  back() {
    this.router.navigate([ '/tabs/cashback' ]);
  }

  private getValidationMessages() {
    return {
      customerID: [
        { type: 'required', message: 'ID do cliente é obrigatório.' },
      ],
      purchaseAmount: [
        { type: 'required', message: 'Valor da compra é obrigatório.' },
      ],
      cashbackPercent: [
        { type: 'required', message: 'Porcentagem de cashback é obrigatório.' },
        { type: 'min', message: 'Porcentagem inválida. Valor mínimo: 1%.' },
        { type: 'max', message: 'Porcentagem inválida. Valor máximo: 100%' },
      ]
    };
  }

}
