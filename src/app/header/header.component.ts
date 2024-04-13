import {Component, OnInit} from '@angular/core';
import {AuthService} from "../Services/auth.service";
import {ApiService} from "../Services/api.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  showNotifications = false;
  MyNotifications: any[] = [];
  notificationCount: number = 0;



  constructor(
    private authService: AuthService,
    private apiService: ApiService
  ) {
  }

  ngOnInit(): void {
    this.getNotifications();
  }

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

  getNotifications() {
    this.toggleNotifications();
    this.apiService.getNotifications().subscribe(
      (response) => {
        this.MyNotifications = response;
        this.notificationCount = this.MyNotifications.length;
        console.log('Notifications:', response);
      },
      (error) => {
        console.error('Error fetching notifications:', error);
      }
    );
  }
}
