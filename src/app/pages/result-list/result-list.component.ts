import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { ResultService } from 'src/app/services/result.service';

@Component({
  selector: 'app-result-list',
  templateUrl: './result-list.component.html',
  styleUrls: ['./result-list.component.css']
})
export class ResultListComponent {
  qId: any;
  results: any;
  user:any =null;

  constructor(private _route: ActivatedRoute, private result : ResultService, private _login : LoginService) {}

  ngOnInit(): void {
    this.user = this._login.getUser();
    this._route.params.subscribe((params)=>{
      this.qId = this._route.snapshot.params['qId'];
      
        console.log("Load all results");
        this.result.getResult(this.user.id, this.qId).subscribe(
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
