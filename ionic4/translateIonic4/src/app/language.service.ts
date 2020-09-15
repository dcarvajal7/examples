import { TranslateService } from "@ngx-translate/core";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class LanguageService {

  constructor(
    private translate: TranslateService
  ) { }

  setInitialAppLanguage() {
    let language = this.translate.getBrowserLang();

    if (language) {
      this.translate.use(language);
    }
  }
}
