import { Component, OnInit } from '@angular/core';
import { fadeIn, fadeOut } from '../shared/animations/animations';
@Component({
  selector: 'landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
  animations: [fadeIn,fadeOut]
})
export class LandingPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
