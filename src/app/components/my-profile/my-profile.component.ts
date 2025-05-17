import { Component } from '@angular/core';
import { User } from '../../models/user';
import { LocalstorageService } from '../../services/localstorage/localstorage.service';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'lms-my-profile',
  imports: [
    CommonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule
  ],
  templateUrl: './my-profile.component.html',
  styleUrl: './my-profile.component.scss'
})
export class MyProfileComponent {

  user: User;

  editMode: boolean;

  constructor(private storage: LocalstorageService) {
  }

  ngOnInit() {
    this.user = this.storage.getUser()!;
  }

  edit(): void {
    this.editMode = true;
  }

  onSubmit():void {
    this.editMode = false;
    this.storage.updateUser(this.user);
  }

}