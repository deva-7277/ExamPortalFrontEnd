import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { LoginService } from 'src/app/services/login.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {
  user: any

  constructor(private _route: ActivatedRoute, private _user: UserService, private _login : LoginService){}
  ngOnInit(): void {
    this._login.getCurrentUser().subscribe(
      (data:any)=>{
        this.user = data;
        console.log(this.user);
      }
    )
  }
}
