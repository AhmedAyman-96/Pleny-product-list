import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  public title = 'Pleny';
  public isAuthenticated = false;
  constructor(private autheService: AuthService) {
    autheService.authStatus$.subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
    })
  }
}
