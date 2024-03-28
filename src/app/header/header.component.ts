import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor() { }

  isLoggedIn() {
    return false;
  }

  checkScreenSize() {
    return window.innerWidth < 768;
  }

  logout(): void {

  }


}
