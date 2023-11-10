import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MaskitoElementPredicateAsync, MaskitoOptions } from '@maskito/core';
import { maskitoNumberOptionsGenerator } from '@maskito/kit';
import { LoadingController } from '@ionic/angular';

import { ScoringService } from '../service/scoring/scoring.service';
import { Score } from '../model/Score';
import { FormUtilsService } from './../shared/form/form-utils.service';

@Component({
  selector: 'app-score-company',
  templateUrl: './score-company.page.html',
  styleUrls: ['./score-company.page.scss'],
})
export class ScoreCompanyPage implements OnInit {

  readonly currencyMask: MaskitoOptions = maskitoNumberOptionsGenerator({
    decimalZeroPadding: true,
    precision: 2,
    thousandSeparator: '.',
    decimalSeparator: ','
  });
  readonly maskPredicate: MaskitoElementPredicateAsync = async (el) => (el as HTMLIonInputElement).getInputElement();

  form: FormGroup;
  messages = this.getValidationMessages();
  cashbackAmount = '0,00';
  isToastOpen: boolean = false;
  toastMessage: string = '';
  toastSuccess: boolean = false;
  loading: any;

  constructor(private router: Router,
    private formBuilder: NonNullableFormBuilder,
    private scoringService: ScoringService,
    private loadingCtrl: LoadingController,
    private formUtilsService: FormUtilsService
  ) {

    this.form = this.formBuilder.group({
      customerPersonalId: new FormControl('', Validators.required),
      description: new FormControl(''),
      purchaseAmount: new FormControl('', Validators.required),
      cashbackPercent: new FormControl('', Validators.compose([
        Validators.required,
        Validators.min(1),
        Validators.max(100)
      ])),
      cashbackAmount: new FormControl({value: '', disabled: true})
    });

  }

  ngOnInit() {
  }

  updateCashbackAmount() {
    const purchaseAmount = this.formUtilsService.convertToNumber(this.form.get('purchaseAmount')?.value);
    const cashbackPercent = this.formUtilsService.convertToNumber(this.form.get('cashbackPercent')?.value);

    const totalAmount = purchaseAmount * cashbackPercent / 100;
    this.cashbackAmount = this.formUtilsService.convertToFormattedString(totalAmount);

  }

  async addPurchase() {

    await this.showLoading();

    const score: Score = {
      description: this.form.get('description')?.value,
      customerPersonalId: this.form.get('customerPersonalId')?.value,
      cashbackAmount: this.formUtilsService.convertToNumber(this.cashbackAmount),
      purchaseAmount: this.formUtilsService.convertToNumber(this.form.get('purchaseAmount')?.value)
    }

    this.scoringService.save(score).subscribe({
      next: () => {
        this.loading.dismiss();
        this.toastSuccess = true;
        this.setToastOpen(true, 'Pontuação salva com sucesso');
      },
      error: () => {
        this.loading.dismiss();
        this.setToastOpen(true, 'Erro ao salvar pontuação. Verifique o ID do cliente');
      }
    });
  }

  setToastOpen(isOpen: boolean, message: string = '') {
    this.isToastOpen = isOpen;
    this.toastMessage = message;
  }

  onToastDidDismiss() {
    if (this.toastSuccess) {
      this.back();
    }
    this.isToastOpen = false;
  }

  async showLoading() {
    this.loading = await this.loadingCtrl.create({
      message: 'Adicionando pontuação',
    });

    this.loading.present();
  }

  back() {
    this.router.navigate([ '/tabs/cashback' ]);
  }

  private getValidationMessages() {
    return {
      customerPersonalId: [
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
