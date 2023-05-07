import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css']
})
export class UpdateCategoryComponent implements OnInit{
  
  constructor(
    private _route: ActivatedRoute,
    private _cat: CategoryService,
    private _router: Router
  ) {}

  cid:any = 0;
  category:any;
  categories:any;

  ngOnInit(): void {
    this.cid = this._route.snapshot.params['cid'];
    // alert(this.qId);
    this._cat.getCategory(this.cid).subscribe(
      (data: any) => {
        this.category = data;
        console.log(this.category);
      },
      (error) => {
        console.log(error);
      }
    );

    this._cat.categories().subscribe(
      (data: any) => {
        this.categories = data;
      },
      (error) => {
        alert('error in loading categories');
      }
    );
  }

  //update form submit
  public updateData() {
    //validatate

    this._cat.updateCategory(this.category).subscribe(
      (data:any) => {
        Swal.fire('Success !!', 'category updated', 'success').then((e) => {
          this._router.navigate(['/admin/categories']);
        });
      },
      (error:any) => {
        Swal.fire('Error', 'error in updating category', 'error');
        console.log(error);
      }
    );
  }
}
