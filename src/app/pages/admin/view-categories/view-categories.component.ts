import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css'],
})
export class ViewCategoriesComponent implements OnInit {
  categories:any = [];

  constructor(private _category: CategoryService) {}

  ngOnInit(): void {
    this._category.categories().subscribe(
      (data: any) => {
        //css
        this.categories = data;
        console.log(this.categories);
      },

      (error) => {
        //
        console.log(error);
        Swal.fire('Error !!', 'Error in loading data', 'error');
      }
    );
  }

  // delete category
  deleteCategory(cid:any){
    Swal.fire({
      icon: 'info',
      title: 'Are you sure ?',
      confirmButtonText: 'Delete',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        //delete...

        this._category.deleteCategory(cid).subscribe(
          (data:any) => {
            this.categories = this.categories.filter((category:any) => category.cId != cid);
            Swal.fire('Success', 'category deleted ', 'success');
          },
          (error:any) => {
            Swal.fire('Error', 'Error in deleting category', 'error');
          }
        );
      }
    });
  }
}
