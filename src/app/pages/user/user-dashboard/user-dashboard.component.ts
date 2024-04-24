import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router  } from '@angular/router';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  showUserResult: boolean;

  constructor(private router: Router) {}

  ngOnInit(): void {
    
  }

  isUserDashboardRoute(): boolean {
    return this.router.url.length <= 15;
  }
}
