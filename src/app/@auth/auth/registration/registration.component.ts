import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/@shared/services/auth/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent {
  hide: boolean = true;
  RegisterForm!: FormGroup;
  loader: boolean = false;
  public submitted = false;

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.RegisterForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onRegister() {
    if (this.RegisterForm.invalid) {
      return;
    } else {
      this.auth.dataCheck().subscribe((res: any) => {
        const user = res.find((a: any) => {
          return a.email === this.RegisterForm.value.email;
        });

        if (user) {
          this.toastr.error('User email already exit', 'Failed');
        } else {
          var adminId = localStorage.getItem('approverAdminId');
          const { username, email, password } = this.RegisterForm.value;
          const data = {
            username: username,
            email: email,
            password: password,
            status: 'Pending approval',
            adminId: adminId,
            role: 'user',
            canApprove: false,
          };

          this.auth.registerUser(data).subscribe(
            (response: any) => {
              if (response) {
                this.toastr.success(
                  'Registration Successful, Please Login',
                  'Success'
                );
                this.router.navigate(['/auth/login']);
              }
            },
            (err) => {
              if (err) {
                this.toastr.error('An error Occurred', 'Failed');
              }
            }
          );
        }
      });
    }
  }
}
