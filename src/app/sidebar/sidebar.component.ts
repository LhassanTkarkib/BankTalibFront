// sidebar.component.ts
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit{
  sidebarVisible = true; // Set the initial state to visible

  constructor() { }
  ngOnInit(): void {
    this.sidebarVisible =  !this.checkScreenSize();

  }

  checkScreenSize() {
    return window.innerWidth < 768; // Adjust the breakpoint as needed
  }

  isLoggedIn() {
    return true;
  }



  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }
}
