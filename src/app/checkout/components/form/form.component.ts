import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  public form: FormGroup;

  public ngOnInit(): void {
    this.form = new FormGroup({
      customerName: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[A-Za-z]{1,30}$/)
      ]),
      customerPhone: new FormControl(null, [
        Validators.pattern(/^\d{7,12}$/)
      ])
    });
  }

  public handlePhoneKeyDown(event: any): void {
    const restrictedCharacters = ['e', '+', '-', '.'];

    if (restrictedCharacters.includes(event.key)) {
      event.preventDefault();
    }
  }
}
