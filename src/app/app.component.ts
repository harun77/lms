import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LocalstorageService } from './services/localstorage/localstorage.service';
import { NavbarComponent } from './components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  constructor(private storage: LocalstorageService) {
    storage.initData();
  }

}