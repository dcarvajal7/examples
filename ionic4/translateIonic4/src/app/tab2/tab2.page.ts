import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  title: string;
  titleAsync: string;

  constructor(private translate: TranslateService) {
    this.title = this.translate.instant('PAGE2.title');

    translate.get('PAGE2.title').subscribe(
      value => {
        this.titleAsync = value;
      }
    )
  }

}
