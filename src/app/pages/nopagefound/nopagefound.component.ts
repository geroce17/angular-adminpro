import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nopagefound',
  templateUrl: './nopagefound.component.html',
  styleUrls: [
    './error-pages.component.css'
  ]
})
export class NopagefoundComponent {

  year =  new Date().getFullYear();

}
