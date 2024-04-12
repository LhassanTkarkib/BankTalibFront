import { Component } from '@angular/core';
import {AuthService} from "../Services/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  showNotifications = false;

  constructor(private authService: AuthService) { }
  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  checkScreenSize() {
    return window.innerWidth < 768;
  }

  toggleNotifications() {
    this.showNotifications = !this.showNotifications;
  }
  logout(): void {
    this.authService.logOutUser();
  }
}
