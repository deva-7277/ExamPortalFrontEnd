import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { ResultService } from 'src/app/services/result.service';

@Component({
  selector: 'app-user-result',
  templateUrl: './user-result.component.html',
  styleUrls: ['./user-result.component.css']
})
export class UserResultComponent {
  qId: any;
  results: any;
  user:any =null;

  constructor(private _route: ActivatedRoute, private result : ResultService, private _login : LoginService) {}

  ngOnInit(): void {
    this.user = this._login.getUser();
    this._route.params.subscribe((params)=>{
     
        console.log("Load all results");
        this.result.getUserAllResults(this.user.id).subscribe(
          (data:any) =>{
            this.results = data;
            console.log(this.results);
          },
          (error) => {
            alert('error in loading result data');
          }
        );
      
    })
    
  }

}

