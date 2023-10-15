import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {
  form: FormGroup;
  // username!: string | null;
  // password!: string | null;
  // message!: string | null;
  // hide: boolean;
  messages = {
    userName: [
      { type: 'required', message: 'Usuário é obrigatório.' }
      // { type: 'minlength', message: 'Username must be at least 5 characters long.' },
      // { type: 'maxlength', message: 'Username cannot be more than 25 characters long.' },
      // { type: 'pattern', message: 'Your username must contain only numbers and letters.' },
      // { type: 'validUsername', message: 'Your username has already been taken.' }
    ],
    password: [
      { type: 'required', message: 'Senha é obrigatória.' }
    ]
  }

  constructor(private router: Router, private formBuilder: NonNullableFormBuilder) {
    // this.hide = true;
    this.form = this.formBuilder.group({
      userName: new FormControl("", Validators.compose([
        Validators.required
        // Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl("", Validators.compose([
        Validators.required
        // Validators.minLength(8),
        // Validators.pattern('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$')
      ]))
    });
  }

  ngOnInit() {
  }

  login(): void {

    this.router.navigate([ '/tabs' ]);

    // if (this.storageService.login(this.username, this.password)) {
    //   if (this.storageService.loggedIn.profile === Profile.ADMIN) {
    //     this.router.navigate([ '/admin' ]);
    //   } else if (this.storageService.loggedIn.profile === Profile.RESEARCHER) {
    //     this.router.navigate([ '/researcher' ]);
    //   } else {
    //     this.message = 'Perfil de usuário inválido!';
    //   }
    // } else {
    //   this.message = 'Usúario e/ou senha inválidos!';
    // }
  }

  signUp(): void {
    this.router.navigate([ '/sign-up' ]);
  }

}
