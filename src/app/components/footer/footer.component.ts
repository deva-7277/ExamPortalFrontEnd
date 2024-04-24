import { Component } from '@angular/core';
import { faCoffee} from '@fortawesome/free-solid-svg-icons'
// import { faCoffee } from '@fortawesome/fontawesome-svg-core'
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  icon = faCoffee;
}
