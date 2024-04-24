import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import { UserService } from 'src/app/services/user.service';
import { LoginService } from 'src/app/services/login.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sidebar-user',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  user: any;
  categories: any;

  constructor(
    private _cat: CategoryService,
    private _snack: MatSnackBar,
    private _route: ActivatedRoute,
    private _user: UserService,
    private _login: LoginService
  ) {}

  ngOnInit(): void {
    this._login.getCurrentUser().subscribe(
      (data: any) => {
        this.user = data;
        console.log(this.user);
        this.loadCategories();
      },
      (error) => {
        console.error('Error occurred while fetching user:', error);
      }
    );
  }

  loadCategories() {
    if (this.user && this.user.username) {
      this._cat.categories().subscribe(
        (data: any) => {
          this.categories = data;
        },
        (error) => {
          this._snack.open('Error in loading categories from server', '', {
            duration: 3000,
          });
        }
      );
    }
  }
}
