import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  selectedImage: File | null = null;
  imageUrl: string;

  constructor(private http: HttpClient) {}

  onSubmit(signupForm: any) {
    if (signupForm.invalid) {
      return;
    }

    let user = signupForm.value;

    const formData = new FormData();
    formData.append('username', user.username);
    formData.append('password', user.password);
    formData.append('firstName', user.firstName);
    formData.append('lastName', user.lastName);
    formData.append('email', user.email);
    formData.append('phone', user.phone);

    if (this.selectedImage) {
      formData.append('imageFile', this.selectedImage, this.selectedImage.name);
    }

    this.http.post('http://localhost:8080/user/', formData).subscribe(
      response => {
        console.log('User registration successful:', response);
        user = null
        // Perform any additional actions after successful registration
      },
      error => {
        console.error('Error occurred during user registration:', error);
        // Handle the error appropriately
      }
    );
  }

  onFileSelected(event: any) {
    this.selectedImage = event.target.files[0];

    // Create a URL for displaying the image preview
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imageUrl = e.target.result;
    };
    reader.readAsDataURL(this.selectedImage);
  }

  clearImage() {
    this.selectedImage = null;
    this.imageUrl = null;
  }
}
