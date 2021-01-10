# Internacionalización de aplicaciones Ionic 4 #

<p align="center">
  <img src="https://github.com/dcarvajal7/examples/blob/master/ionic4/translateIonic4/translate.png" width="800">
</p>

## Introducción ##
Uno de las principales características para abrir mercado y tener un amplio rango de potenciales usuarios, es la internacionalización. Es decir, preparar nuestra aplicación en diferentes idiomas enfocados al público de cada país, si hacemos esto, el idioma no será una barrera para usar la aplicación, por lo que si interesa su contenido, usabilidad o servicios, podrán utilizarla sin problemas.

Obviamente si nuestra aplicación no esta enfocada su uso en un determinado país, no es conveniente dedicar el esfuerzo necesario a traducirla si realmente no va a ser llamativa (por ejemplo una aplicación con información sobre las obras de teatro disponibles en Madrid, claro que, ya está en nuestra visión de proyecto, el hecho de ampliar geográficamente o no nuestra aplicación).

Ngx-translate es una librería de angular que nos va a permitir gestionar nuestras traducciones y aplicarlas en base a una configuración, basado en la librería i18n. Se integra perfectamente con Ionic y con las compilaciones enfocadas a dispositivos Android e iOS.

Podemos utilizarla en base al idioma definido en los ajustes del dispositivo o cambiar de idioma en la propia aplicación.

<p align="center">
  <img src="https://github.com/dcarvajal7/examples/blob/master/ionic4/assets/diagrama.png" width="600">
</p>


## Instalación y uso ##
Lo primero como siempre, es crear una aplicación desde 0 que nos sirva de ejemplo para este articulo, si queréis más información sobre cómo crear aplicaciones desde 0, no debéis perderos este artículo. Además, si aún no sabéis crear páginas o componentes en Ionic 4, os dejo también, otro artículo con todo detallado.

```
ionic start translateIonic4 tabs

cd translateIonic4

ionic serve --lab
```

A continuación, vamos a preparar los ficheros de traducciones que van a estar en formato jSON, que es un formato de texto muy sencillo diseñado para el intercambio de información. Debemos crear en ‘src/assets/i18n’ tantos ficheros como idiomas queramos disponer con los nombres de la siguiente forma:

```
en.json (Inglés)
{
    "PAGE2": {
        "title": "Hello world"
    }
}
es.json (Español)
{
    "PAGE2": {
        "title": "Hola mundo"
    }
}
fr.json (Francés)
{
    "PAGE2": {
        "title": "Salut monde"
    }
}
```

<p align="center">
  <img src="https://github.com/dcarvajal7/examples/blob/master/ionic4/assets/Captura-de-pantalla-2019-11-17-a-las-18.30.40.png" width="600">
</p>

Como veis, incluso se pueden anidar traducciones, algo altamente recomendable para tener organizado nuestras traducciones por módulo. Cómo hemos creado la aplicación con el ‘starter’ Tab, vamos a aplicar nuestra traducción en la página 2, por tanto lo modulamos también en nuestras traducciones.


Para poder internacionalizar nuestra aplicación debemos instalar el plugin ngx-translate:

```
npm install --save @ngx-translate/core

npm install @ngx-translate/http-loader --save
```
Http-loader, se utiliza para cargar la información de los jSON creados anteriormente, para ello, añadimos lo siguiente a nuestro app.module.ts:

```
export function newTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}
```

Sin olvidar, importar el módulo en la zona adecuada, realizando la llamada a esta función definida antes (newTranslateLoader):

```
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: newTranslateLoader,
        deps: [HttpClient]
      }
    }),
    AppRoutingModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
```

Para inicializarlo, nos vamos a app.component.ts y definimos que el idioma por defecto, por si no encuentra el que se pide, nos ponga el inglés (por ejemplo).

```
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    translate: TranslateService
  ) {
    translate.setDefaultLang('en');
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
```

Para usarlo, disponemos de varias formas, no sin antes añadirlo al módulo:

```
@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TranslateModule,
    RouterModule.forChild([{ path: '', component: Tab2Page }])
  ],
  declarations: [Tab2Page]
})
export class Tab2PageModule { }
```

Directamente con la ‘translate pipe’, con el nombre de la traducción entre comillas seguido de | translate dentro de {{}}:

```
<ion-header>
  <ion-toolbar>
    <ion-title>
      Tab Two
    </ion-title>
  </ion-toolbar>
</ion-header>

<ion-content>
  {{ "PAGE2.title" | translate }}
</ion-content>
```

Traducción instantánea, aquí debemos utilizar el controlador para obtener el valor directamente, se realiza de forma síncrona y el proceso no continua hasta obtener el valor:

```
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  title: string;

  constructor(private translate: TranslateService) {
    this.title = this.translate.instant('PAGE2.title');
  }

}
<ion-header>
  <ion-toolbar>
    <ion-title>
      Tab Two
    </ion-title>
  </ion-toolbar>
</ion-header>

<ion-content>
  <div>{{ "PAGE2.title" | translate }}</div>
  <div>{{ title }}</div>
</ion-content>
```

De forma asíncrona, la manera recomendada si no se usa pipe. El código continuará ejecutándose, mientras se obtiene la traducción y cuando llegue, se incluirá en la variable seleccionada:

```
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
<ion-header>
  <ion-toolbar>
    <ion-title>
      Tab Two
    </ion-title>
  </ion-toolbar>
</ion-header>

<ion-content>
  <div>{{ "PAGE2.title" | translate }}</div>
  <div>{{ title }}</div>
  <div>{{ titleAsync }}</div>
</ion-content>
```

Hecho esto, ya tenemos 3 formas diferentes de obtener las traducciones almacenadas en los ficheros jSON gracias al uso de este plugin.

<p align="center">
  <img src="https://github.com/dcarvajal7/examples/blob/master/ionic4/assets/Nov-17-2019-18-25-27.gif" width="600">
</p>


## Crear un servicio para gestionar NGX-Translate en Ionic 4 ##
La instalación y configuración básica de ngx-translate puede no ser suficiente para que nuestro dispositivo active de forma automática la internacionalización en base al idioma configurado de forma automática. Debido a que lo único que hemos configurado antes, es el idioma por defecto si el lenguaje activo en el sistema, no esta disponible en los json definidos.

Para ello vamos a crear un servicio (language.service.ts) que gestione todo lo relacionado con las traducciones. Con él, podremos conocer cuál es el idioma activo en el dispositivo y aplicarlo a nuestra aplicación:

```
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
```

setInitialAppLanguage – Se le va a llamar desde nuestro app.component.ts, y lo que hace es obtener el lenguaje del sistema y lo activa en nuestra librería de traducciones para toda la aplicación.

```
import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { TranslateService } from '@ngx-translate/core';

import { LanguageService } from "./language.service";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private languageService: LanguageService,
    translate: TranslateService
  ) {
    translate.setDefaultLang('en');
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.languageService.setInitialAppLanguage();
      this.splashScreen.hide();
    });
  }
}
```

Gracias a estos servicios y su correcta utilización, nuestra aplicación siempre estará traducida al idioma que el usuario tenga configurado su dispositivo (si contamos con ese idioma, si no, aparecerá el idioma por defecto). Adicionalmente, podemos utilizar language.service.ts para gestionar una selección de idiomas si no queremos que la predefinida sea la de nuestro sistema, pero eso queda fuera del alcance de este artículo.

## Qué ocurre con la información almacenada en el servidor ##
Existen casos en los que el servidor proveerá información no generada por el usuario, como por ejemplo, una categorización de objetos, en un CRUD para crear un objeto del tipo mascota, seguramente tendremos un menú de selección con categorías ‘perro, gato, etcétera’ almacenado en la BBDD del servidor y tendremos que pensar donde se van a alojar las traducciones de esta información. 

Para ello, tenemos 2 opciones:

* Implementar una gestión de traducciones en el servidor, por lo que el idioma deseado debe llegar en cada petición y se traduce en el servidor.
* Mantener todas las traducciones en el cliente (porque pensamos que esto es cosa de frontend), podemos usar un código identificativo de cada categoría, inmutable, por lo que el id no valdría, necesitaríamos un campo ‘code’, que nunca cambie bajo ningún concepto y anexar ese código con la traducción gestionada en nuestra aplicación Ionic.

## Conclusiones ##
No basta con tener una correcta gestión de los idiomas, debemos tener una traducción correcta, ya que las faltas de ortografía, gramática o frases mal compuestas (propias de haber utilizado Google Translate y copy-paste), dan una imagen bastante mala desde la visión del usuario. Es cierto, que Google Translate da un servicio bastante bueno, cada vez mejor, pero debemos apoyarnos en alguien con el suficiente conocimiento en el idioma para tener un estado impecable de nuestra aplicación.

El plugin Translate, es uno de los mejores que he visto, es útil, fácil de usar y muy eficiente. Se ha realizado un trabajo muy bueno en la creación y pulido del mismo. Tanto si trabajas con angular como con Ionic, es de uso obligado. 

Se integra con los idiomas definidos en el dispositivo Android e iOS sin problemas y de forma instantánea, por lo que podemos contar con una traducción nativa en nuestra aplicación móvil. Si por el contrario queremos seleccionar el idioma en la propia aplicación, también cuenta con los mecanismos necesarios para ello.

Aquí tenéis el código de la aplicación construida en este artículo: https://github.com/dcarvajal7/examples/tree/master/ionic4/translateIonic4

Recomiendo que debéis siempre sopesar el internacionalizar vuestra aplicación siempre y cuando se pueda utilizar en los distintos países a los que va dirigida. Si por el contrario es una aplicación local, no será necesario dedicar el esfuerzo que requiere tener más de un idioma en nuestra aplicación. 

Por ejemplo, si desarrollamos una aplicación que gestiona tareas del hogar y queremos llegar al máximo número de usuarios, lo ideal es traducirla a los idiomas más usados (inglés, español, chino, portugués, etc). Si en cambio, vamos a desarrollar una aplicación de un comercio local cuyo público es en alto porcentaje local o sabemos que no tendrá interés en algún idioma (como un calendario de eventos de fin de año europeo en china), no será necesario dedicar horas y esfuerzo a ello.
