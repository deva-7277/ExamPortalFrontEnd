import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { FileHandle } from 'src/_model/file-handle.model';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{
    constructor(
      private userService:UserService,
      private snack:MatSnackBar,
      private sanitizer: DomSanitizer,
    ) {}

    public user = {
      username: '',
      password: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      profile: '',
      userImages: [] as FileHandle[]
    };

    ngOnInit(): void {}

    formSubmit(){
      //alert('submit');
      console.log(this.user);
      if(this.user.username =='' || this.user.username == null){
        //alert('User is required !!');
        this.snack.open('Username is required !!', 'ok', {
          duration:3000,
        })
        return;
      }

      if(this.user.password =='' || this.user.password == null){
        this.snack.open('Password is required !!', 'ok', {
          duration:3000,
        })
        return;
      }

      if(this.user.firstName =='' || this.user.firstName == null){
        this.snack.open('Firstname is required !!', 'ok', {
          duration:3000,
        })
        return;
      }

      if(this.user.lastName =='' || this.user.lastName == null){
        this.snack.open('Lastname is required !!', 'ok', {
          duration:3000,
        })
        return;
      }

      if(this.user.email =='' || this.user.email == null){
        this.snack.open('Email address is required !!', 'ok', {
          duration:3000,
        })
        return;
      }

      if(this.user.phone =='' || this.user.username == null){
        this.snack.open('Phone number is required !!', 'ok', {
          duration:3000,
        })
        return;
      }

      //addUser : userService
      const userFormData = this.prepareFromData(this.user);
      this.userService.addUser(userFormData).subscribe(
        (data:any)=>{
          //function for success
          console.log(data);
          //alert('success');
          Swal.fire('Successfully Registered', 'User id is ' + data.id, 'success');
        },
        (error)=>{
            //error
            console.log(error);
            //alert('something went wrong');
            this.snack.open(error.error.text, 'ok', {
              duration:3000,
            })
        }
      )
    }

    prepareFromData(user: any): FormData{
      const formData = new FormData();
      formData.append(
        'user',
        new Blob([JSON.stringify(user)],{type:'application/json'})
      );
      for(var i=0; i<user.userImages.length; i++){
        formData.append(
          'imageFile',
          user.userImages[i].file,
          user.userImages[i].file.name
        );
      }
      return formData;
    }

    onFileSelected(event:any){
      console.log(event);
      if(event.target.files){
        const file = event.target.files([] as any);
        
        const fileHandle : FileHandle = {
          file : file,
          url: this.sanitizer.bypassSecurityTrustUrl(
            window.URL.createObjectURL(file)
          )
        }

        this.user.userImages.push(fileHandle);
      }
    }
}