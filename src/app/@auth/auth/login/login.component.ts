import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/@shared/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  hide: boolean = true;
  loginForm!: FormGroup;
  loader: boolean = false;
  public submitted = false;

  constructor(
    public fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onLogin() {
    if (this.loginForm.invalid) {
      return;
    } else {
      var validDetails: number;
      var userDetails: any;
      this.auth.login().subscribe(
        (res: any) => {
          res.find((a: any) => {
            if (
              a.email === this.loginForm.value.email &&
              a.password === this.loginForm.value.password &&
              a.status === 'Approved'
            ) {
              userDetails = a;
              validDetails = 2;
            } else if (
              a.email === this.loginForm.value.email &&
              a.password === this.loginForm.value.password &&
              a.status === 'Pending approval'
            ) {
              validDetails = 1;
            }
          });

          if (validDetails == 2) {
            this.toastr.success('Login Successful', 'Success');
            this.router.navigate(['/dashboard']);
            localStorage.setItem('userDetails', JSON.stringify(userDetails));
          } else if (validDetails == 1) {
            this.toastr.error(
              'Reach out to admin for approval',
              'Login Failed'
            );
          } else {
            this.toastr.error('Invalid User email or Password', 'Failed');
          }
        },
        (err) => {
          if (err) {
            this.toastr.error('An error Occurred', 'Failed');
          }
        }
      );
    }
  }
}
