import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { ResultService } from 'src/app/services/result.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent {
    rId:any;
    singleResult:any;
    user:any = null;

    constructor(private _route: ActivatedRoute, private result : ResultService, private _login : LoginService) {}

    ngOnInit(): void {
      this._route.params.subscribe((params)=>{
        this.rId = this._route.snapshot.params['rId'];
        this.user = this._login.getUser;
        console.log("Single result loaded for id "+this.rId);
        this.result.getSingleResult(this.rId).subscribe(
          (data:any) =>{
              console.log(data);
              this.singleResult = data;
          },
          (error)=>{
            console.log(error);
          }
        )        
    });
  }

  printPage(){
    window.print();
  }

}
