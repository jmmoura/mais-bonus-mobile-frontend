import { AbstractControl } from "@angular/forms";

interface CpfValidationError {
  invalidCpf: boolean;
}

interface CnpjValidationError {
  invalidCnpj: boolean;
}

export class CustomValidator {

  static isValidCpf(control: AbstractControl): CpfValidationError | null {
    const invalidCpf = { invalidCpf: true };

    const cpfArray = control.value.match(/\d+/g);
    if (!cpfArray) {
      return invalidCpf;
    }

    const cpf = cpfArray.join('');

    const areAllDigitsTheSame = /\b(\d)\1{10}\b/.test(cpf);
    if (cpf.length != 11 || areAllDigitsTheSame) {
      return invalidCpf;
    }

    if (!isCpfCheckNumbersValid(cpf)) {
      return invalidCpf;
    }

    return null;
  }

  static isValidCnpj(control: AbstractControl): CnpjValidationError | null {
    const invalidCnpj = { invalidCnpj: true };

    const cnpjArray = control.value.match(/\d+/g);
    if (!cnpjArray) {
      return invalidCnpj;
    }

    const cnpj = cnpjArray.join('');

    const areAllDigitsTheSame = /\b(\d)\1{13}\b/.test(cnpj);
    if (cnpj.length != 14 || areAllDigitsTheSame) {
      return invalidCnpj;
    }

    if (!isCnpjCheckNumbersValid(cnpj)) {
      return invalidCnpj;
    }

    return null;
  }
}

function isCpfCheckNumbersValid(cpf: string, digitIndex: number = 10): boolean {
  let sum = 0;
  for (let i = 0; i < digitIndex - 1; i++) {
    sum += parseInt(cpf[i])  * (digitIndex - i);
  }

  const remainder = sum % 11;
  const checkNumber = parseInt(cpf[digitIndex - 1]);
  if (remainder < 2) {
    if (checkNumber != 0) return false;
  } else if (checkNumber != 11 - remainder) {
    return false;
  }

  if (digitIndex == 11) return true;

  return isCpfCheckNumbersValid(cpf, 11);
}

function isCnpjCheckNumbersValid(cnpj: string, digitIndex: number = 13): boolean {
  let sum = 0;
  const cnpjInverted = cnpj.substring(0, digitIndex - 1).split('').reverse().join('');
  for (let i = 0; i < 8; i++) {
    sum += parseInt(cnpjInverted[i])  * (i + 2);
  }

  for (let i = 8; i < digitIndex - 1; i++) {
    sum += parseInt(cnpjInverted[i])  * (i - 6);
  }

  const remainder = sum % 11;
  const checkNumber = parseInt(cnpj[digitIndex - 1]);
  if (remainder < 2) {
    if (checkNumber != 0) return false;
  } else if (checkNumber != 11 - remainder) {
    return false;
  }

  if (digitIndex == 14) return true;

  return isCnpjCheckNumbersValid(cnpj, 14);
}
