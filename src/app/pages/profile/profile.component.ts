import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent implements OnInit {
  user: any = null;
  fulluser: any;
  imageBlob: Blob;

  constructor(
    private login: LoginService,
    private _user: UserService,
    private changeDetectorRef: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.user = this.login.getUser();

    this._user.getUser(this.user.username).subscribe(
      (fullUser: any) => {
        this.fulluser = fullUser;
        this.convertImageToBlob(this.fulluser.image); // Convert image to Blob
        console.log(this.fulluser);
        console.log(this.user);
        this.changeDetectorRef.markForCheck(); // Mark for change detection
      },
      (error: any) => {
        console.error('Error occurred while fetching full user:', error);
      }
    );
  }

  convertImageToBlob(imageData: string) {
    const byteCharacters = atob(imageData);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    this.imageBlob = new Blob([byteArray], { type: 'image/jpeg' });
  }

  getObjectUrl(blob: Blob): string {
    if (blob) {
      return URL.createObjectURL(blob);
    }
    return '';
  }
}
