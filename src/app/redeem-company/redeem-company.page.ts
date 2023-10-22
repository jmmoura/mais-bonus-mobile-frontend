import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-redeem-company',
  templateUrl: './redeem-company.page.html',
  styleUrls: ['./redeem-company.page.scss'],
})
export class RedeemCompanyPage implements OnInit {
  form: FormGroup;
  messages = this.getValidationMessages()

  constructor(private router: Router, private formBuilder: NonNullableFormBuilder) {
    this.form = this.formBuilder.group({
      redeemCode: new FormControl("", Validators.required)
    });
   }

  ngOnInit() {
  }

  redeem() {

  }

  back() {
    this.router.navigate([ '/tabs/cashback' ]);
  }

  private getValidationMessages() {
    return {
      redeemCode: [
        { type: 'required', message: 'O valor é obrigatório.' }
      ]
    };
  }

}
