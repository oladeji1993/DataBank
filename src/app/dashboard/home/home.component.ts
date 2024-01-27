import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/@shared/services/auth/auth.service';
import { UsersService } from 'src/app/@shared/services/users/users.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(
    private user: UsersService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  personalizedUsers!: MatTableDataSource<any>;
  pageCount: any;
  userDetails: any;

  displayedColumns: string[] = ['Username', 'Email', 'Status', 'Action'];

  ngOnInit(): void {
    this.userDetails = JSON.parse(localStorage.getItem('userDetails') || '{}');
    this.getAllUsers();
  }

  getAllUsers() {
    this.user.getAllUser().subscribe((data: any) => {
      console.log(data);
      console.log(this.userDetails?.id);
      var collatedUser = data.filter((item: any) =>
        this.userDetails?.id.includes(item.adminId)
      );
      console.log(collatedUser);

      this.personalizedUsers = new MatTableDataSource<any>(collatedUser);
      this.pageCount = collatedUser.length;
      this.personalizedUsers.paginator = this.paginator;
    });
  }

  logOut() {
    localStorage.removeItem('userDetails');
    this.router.navigate(['/auth/login']);
  }

  approveUser(userDetails: any) {
    const { email, id, canApprove, password, adminId, role, status, username } =
      userDetails;
    const data = {
      email: email,
      canApprove: true,
      adminId: this.userDetails?.id,
      role: role,
      password: password,
      status: 'Approved',
      username: username,
    };
    this.user.approveUser(data, userDetails.id).subscribe(
      (response: any) => {
        if (response) {
          this.toastr.success('User approved Successfully', 'Success');
          localStorage.setItem('approverAdminId', id);
          this.getAllUsers();
        }
      },
      (err) => {
        this.toastr.error('Approval process failed', 'Failed');
      }
    );
  }

  deleteUser(item: any) {
    this.user.deleteUser(item.id).subscribe(
      (res: any) => {
        if (res) {
          this.toastr.success('User deleted Successfully', 'Success');
          this.getAllUsers();
        }
      },
      (err) => {
        this.toastr.error('Failed to delete user', 'Failed');
      }
    );
  }
}
