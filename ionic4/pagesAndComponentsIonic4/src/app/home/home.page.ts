import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private router: Router) {}
 
  navigateToPet(){
    this.router.navigate(['/pet']);
  }

  navigateToOwner(){
    this.router.navigate(['/owner']);
  }
}
