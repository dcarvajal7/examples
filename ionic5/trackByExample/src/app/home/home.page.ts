import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  collection: any;

  constructor() {
    this.collection = [{ id: 1 }, { id: 2 }, { id: 3 }];
  }

  getItems() {
    this.collection = [{ id: 1 }, { id: 5 }, { id: 3 }, { id: 4 }];
  }

  trackByFn(index, item) {
    return index; // or item.id
  }

}
