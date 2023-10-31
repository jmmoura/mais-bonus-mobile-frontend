import { Injectable } from '@angular/core';
import { MaskitoOptions } from '@maskito/core';

@Injectable({
  providedIn: 'root'
})
export class FormUtilsService {

  constructor() { }

  getValidationMessages() {
    return {
      name: [
        { type: 'required', message: 'Nome é obrigatório.' }
      ],
      email: [
        { type: 'required', message: 'E-mail é obrigatório.' },
        { type: 'email', message: 'Formato de e-mail inválido.' }
      ],
      phone: [
        { type: 'required', message: 'Telefone é obrigatório.' }
      ],
      cnpj: [
        { type: 'required', message: 'CNPJ é obrigatório.' },
        { type: 'invalidCnpj', message: 'Formato de CNPJ inválido.' }
      ],
      cpf: [
        { type: 'required', message: 'CPF é obrigatório.' },
        { type: 'invalidCpf', message: 'Formato de CPF inválido.' }
      ],
      companyId: [
        { type: 'required', message: 'Empresa é obrigatório.' },
      ],
      password: [
        { type: 'required', message: 'Senha é obrigatória.' },
        { type: 'minLength(8)', message: 'Senha deve ter no mínimo 8 caracteres.' },
        { type: 'pattern', message: 'Senha deve conter pelo menos 1 letra maiúscula, 1 letra minúscula e 1 número.' }
      ],
      repeatPassword: [
        { type: 'required', message: 'Repetir senha é obrigatório.' },
        { type: 'notSame', message: 'As senhas devem ser iguais.' }
      ]
    };
  }

  getCnpjMask(): MaskitoOptions {
    return {
      mask: [
        ...Array(2).fill(/\d/),
        '.',
        ...Array(3).fill(/\d/),
        '.',
        ...Array(3).fill(/\d/),
        '/',
        ...Array(4).fill(/\d/),
        '-',
        ...Array(2).fill(/\d/)
      ]
    };
  }

  getCpfMask(): MaskitoOptions {
    return {
      mask: [
        ...Array(3).fill(/\d/),
        '.',
        ...Array(3).fill(/\d/),
        '.',
        ...Array(3).fill(/\d/),
        '-',
        ...Array(2).fill(/\d/)
      ]
    };
  }

}
