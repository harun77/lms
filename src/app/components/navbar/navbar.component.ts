import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { User } from '../../models/user';
import { LocalstorageService } from '../../services/localstorage/localstorage.service';

@Component({
  selector: 'lms-navbar',
  imports: [MatMenuModule, MatIconModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  user: User | null;

  navs: any[] = [
    { name: 'My Profile', route: '/my-profile', icon: 'account_circle' },
    { name: 'My Learning', route: '/my-learning', icon: 'school' },
    { name: 'Learning History', route: '/learning-history', icon: 'receipt_long' },
  ];

  constructor(private storage: LocalstorageService) {
  }

  ngOnInit() {
    this.user = this.storage.getUser();
  }

}