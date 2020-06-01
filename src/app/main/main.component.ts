import { Component, OnInit } from '@angular/core';
import { NgxHoneyAuthService } from '@think4code/ngx-honey-auth';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(private service: NgxHoneyAuthService) { }

  ngOnInit(): void {
  }

  logout() {
    this.service.logout(false);
  }
}
