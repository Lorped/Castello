import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { SignupService } from '../services/signup.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  accetta = '';

  registrationForm: FormGroup;

  hide = true;

  constructor( private signupService: SignupService , private router: Router  ) { }

  ngOnInit() {


    this.registrationForm = new FormGroup ({
      regname: new FormControl('', [
        Validators.required,
        Validators.pattern('^[A-Za-zàèìòù \']+$')
      ]),

      regemail: new FormControl('', [
        Validators.required,
        Validators.email
      ], [
        this.validateEmailNotTaken.bind(this)
      ]),

      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('^.*((\\d.*[a-zA-Z])|([a-zA-Z].*\\d)).*$')
      ]),

      password2: new FormControl('', [
        Validators.required
      ]),

      check: new FormControl('', [
        Validators.required
      ])
    });


    this.password2.addValidators( () => {
     if (!this.password2.value) return null;

     return this.password.value === this.password2.value ? null: {mismatch : true};
    });

  }

  get regname() {
      return this.registrationForm.get('regname');
  }
  get regemail() {
      return this.registrationForm.get('regemail');
  }
  get password() {
      return this.registrationForm.get('password');
  }
  get password2() {
      return this.registrationForm.get('password2');
  }
  get check() {
      return this.registrationForm.get('check');
  }

  validateEmailNotTaken(control: AbstractControl) {
    return this.signupService.checkEmail(control.value)
    .map(res => {
      return res === 'OK' ? null : { emailTaken: true };
    });
  }

  doRegister() {
    const myobj = {
      'regname': this.regname.value,
      'regemail': this.regemail.value,
      'passwd': this.password.value
    };

    this.signupService.sendregistra(myobj)
    .subscribe( res => {
      this.router.navigate(['']);
    });
  }

}
