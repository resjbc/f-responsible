import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable()
export class ValidatorsService {

  //สร้าง validate เอง โดยเช็ค รหัสผ่านและยืนยันรหัสผ่านให้เหมือนกัน
  comparePassword(passwordField: string) {
    return function (confirm_password: AbstractControl) {
      if (!confirm_password.parent) return;
      //console.log(!confirm_password.parent);
      const password = confirm_password.parent.get(passwordField);

      const passwordSubscribe = password.valueChanges.subscribe(() => {
        confirm_password.updateValueAndValidity();
      });
      //console.log(confirm_password.value);
      if (confirm_password.value === password.value) {
        passwordSubscribe.unsubscribe();
        return;
      }
      return { compare: true };
    }
  }

  // ตรวจสอบ password pettern เป็น A-z 0-9, 6-15 ตัว
  isPassword(password: AbstractControl) {
    if (password.value == '') return;
    if (/^[A-z0-9]{6,15}$/.test(password.value)) return;
    return { password: true };
  }

  validateIdCard(cid: AbstractControl) {
    if(!cid.value) return false;
    let id = cid.value;
    let sum = 0;
    let total = 0;
    let digi = 13;

    for (let i = 0; i < 12; i++) {
      sum = sum + ((id[i]) * digi);
      digi--;
    }
    total = (11 - (sum % 11)) % 10;

    if (total != id[12]) return { cid: true };
    return false;
  }
}
