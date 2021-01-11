# Llamando a servicios REST desde Ionic 4 #

<p align="center">
  <img src="https://github.com/dcarvajal7/examples/blob/master/ionic4/restServicesIonic4/rest%20services%20ionic4.png" width="800">
</p>

Dado que las ventajas de mantener una aplicación backend en un servidor remoto, donde se va a alojar la lógica de negocio y la lógica funcional más pesada y reutilizables en todos los dispositivos donde nos conectamos son muchas, como describo en este artículo, vamos a ver cómo implementar en nuestra aplicación Ionic 4, peticiones HTTP a través de servicios REST.

Los servicios en una aplicación híbrida suelen ser muy comunes, ya que no disponen de toda la potencia que una aplicación nativa y entre otras características, debe servirse de un servidor remoto para ejecutar la lógica más compleja, además de mantener la información centralizada y disponible siempre en cualquier dispositivo, poder compartir esa información con otros usuarios, incluso poder utilizarla en común, ya que esto, con toda la información repartida en dispositivos seria mucho más difícil.

<p align="center">
  <img src="https://github.com/dcarvajal7/examples/blob/master/ionic4/assets/servicios-rest-diagrama-2.png" width="600">
</p>

## Servicios REST ##
Para poder utilizar un cliente HTTP, debemos tener claro primero que son los servicios REST. El concepto es muy sencillo, es un protocolo de intercambio de información de forma síncrona. Algunos conceptos de cómo debe ser una API (Application Programming Interface) REST (Representational State Transfer):

* Stateless (sin estado) – Cada petición debe contener toda la información necesaria para poder ejecutarse. Existe la posibilidad de incluir una caché de estado, aunque no es lo más recomendable si no se sabe tratar, ya que dificultará el poder utilizar múltiples servidores en paralelo.
* Operaciones más importantes:
  * POST: Se suele utilizar para acciones concretas, por ejemplo: Inserta este registro, ejecuta esta acción, búsqueda con muchos criterio, etc. Permite el paso de objetos a través del ‘body’.
  * GET: Este se usa para obtener información que se pueda filtrar con los parámetros que podamos añadir en la url, ya que no se pueden pasar en body, por ejemplo: dame el objeto cuyo id sea 12 o dame todos los coches cuya marca sea ‘BMW’.
  * PUT: Si queremos actualizar un estado o datos en general de cualquier entidad del modelo de negocio debemos usar PUT. Permite el paso de objetos a través del ‘body’.
  * DELETE: Como indica el nombre, se utilizar para borrar elementos que se puedan filtrar a través de parámetros contenidos en la url.
* Clientes en cualquier sistema / lenguaje: Otra de las ventajas de los servicios REST es que todos los lenguajes y sistemas disponen de un cliente que se pueda nutrir de estos servicios.
* jSON: Es un lenguaje de marcado muy sencillo para el intercambio de datos y con un uso muy extendido. Soportan 2 estructuras; clave-valor que se puede anidar y array de datos. Se puede representar cualquier objeto valiéndose de estas 2 estructuras. Además es bastante mas sencillo que XML (su mayor competidor).

<p align="center">
  <img src="https://github.com/dcarvajal7/examples/blob/master/ionic4/assets/servicios-rest-diagrama.png" width="600">
</p>

## Cliente Http ##
### Creando la base de nuestra aplicación ###
Quiero que tengáis claro que, un cliente HTTP lo tiene prácticamente cualquier framework, Ionic también y muy sencillo de utilizar. Para ello, vamos a crear una aplicación desde 0, podéis seguir este artículo en el que explico cómo hacerlo paso a paso. 

```
ionic start restServicesIonic4 blank --type=angular
```
La idea de esta aplicación de ejemplo, es mostrar un listado de elementos y cuando pulsemos en uno de ellos, nos llevará al detalle. Esta información siempre estará disponible, ya que nuestro servidor estará encendido 24/7, y la información se encuentra en él.

Recordad además que Ionic 4 puede compilarse para iOS, Android y web, entre otras.

Entonces, una vez teniendo claro el concepto, vamos a crear 2 páginas: la primera, un listado de álbumes y la segunda, el propio detalle del álbum seleccionado:

```
ionic g page pages/albums
ionic g page pages/album
```
A continuación, haremos uso del comando service, para crear el apartado donde se va a ubicar las llamadas a los servicios que recuperan la información, en este caso, de los álbumes.

```
ionic g service services/album
```
Con esto ya ha quedado definida la estructura necesaria para nuestro ejemplo:

<p align="center">
  <img src="https://github.com/dcarvajal7/examples/blob/master/ionic4/assets/Captura-de-pantalla-2019-10-21-a-las-21.59.23.png" width="300">
</p>

### Creando las rutas necesarias para las páginas generadas ###
Ahora necesitamos ‘enrutar’ nuestro homepage hacia el listado de álbumes y obviar el home que se ha creado de forma automática (podemos borrarlo si queremos). Para ello editamos app-routing.module.ts:

```
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'albums', pathMatch: 'full' },
  { path: 'albums', loadChildren: './pages/albums/albums.module#AlbumsPageModule' },
  { path: 'album/:id', loadChildren: './pages/album/album.module#AlbumPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

Con este cambio tenemos en nuestra aplicación 2 rutas configuradas:

* /albums – Sustituirá a la página ‘home’ auto generada en la creación de la aplicación.
* /album/:id – Debemos incluir el paso de un parámetro (id) en la ruta ‘album’ a secas, de manera que cuando seleccionemos un elemento de la lista podamos navegar a través de su id.

### Instalando el cliente HTTP ###
Ahora es turno de instalar el cliente HTTP de angular, el cual nos va a permitir conectarnos al servicio REST definido. Nos dirigimos a app/app.module.ts para modificarlo:

```
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```
Debemos importarlo en la parte superior y luego añadirlo al array de imports.

### Creando los servicios en Ionic 4 ###
Vamos a utilizar unos servicios de prueba ya existentes para que los desarrolladores puedan probar sus clientes HTTP (los puedes encontrar en https://jsonplaceholder.typicode.com). Nos dirigimos hacia la clase generada anteriormente con el comando ‘service’ (album.service.ts) y añadimos 2 llamadas:

```
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  constructor(private http: HttpClient) { }

  getAlbums(): Observable<any> {
    return this.http.get('https://jsonplaceholder.typicode.com/albums');
  }

  getDetail(id): Observable<any> {
    return this.http.get('https://jsonplaceholder.typicode.com/albums/' + id);
  }
}
```
Es importante mencionar el uso de ‘Observable‘, es como una secuencia de eventos a los que podemos suscribirnos. Explicar este concepto queda fuera del alcance de este artículo. Por ahora, utilicémoslo y tengamos en cuenta que nuestras dos funciones son asíncronas: no esperará a devolver los datos de la API de inmediato, si no que se ejecutara cuando lleguen.

Probablemente será necesario el uso de una Api-Key, de manera que el servidor se asegure proveer únicamente a los clientes que hagan uso de esa clave.

### Llamando a los servicios desde las páginas generadas ###
Debemos modificar los controladores de la página de listado y de la de detalle, de manera que en el constructor (por ejemplo) se llame al servicio y cargue los datos. Es importante remarcar que, si queremos un refresco más ‘activo’ de los datos, tendremos que hacer uso de ngOnInit o de otras posibilidades que Ionic 4 nos ofrece:

* ionViewDidLoad – Se dispara únicamente cuando la vista se almacena en la memoria. Es útil para cargar elementos que no van a cambiar durante la sesión de usuario.
* ionViewWillEnter – Se dispara al entrar en la página, antes de convertirse en la página activa.
* ionViewDidEnter – Se dispara al entrar en la página. Una vez se ha convertido en la página activa.
* ionViewWillLeave – Se dispara cuando abandonas la página. Antes de dejar de ser la página activa.
* ionViewDidLeave – Se dispara cuando abandonas la página. Una vez ha dejado de ser la página activa.
* ionViewWillUnload – Se dispara cuando la vista se va a eliminar completamente.

Así quedarían los 2 controladores. De nuevo, os recuerdo que si tenéis problemas con la navegación y el paso de parámetros, tenéis disponible un artículo en esta misma web:

albums.page.ts
```
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AlbumService } from 'src/app/services/album.service';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.page.html',
  styleUrls: ['./albums.page.scss'],
})
export class AlbumsPage implements OnInit {

  results: Observable<any>;

  constructor(private albumService: AlbumService) {
    this.results = this.albumService.getAlbums();
  }

  ngOnInit() {
  }

}
```

album.page.ts

```
import { Component, OnInit } from '@angular/core';
import { AlbumService } from 'src/app/services/album.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-album',
  templateUrl: './album.page.html',
  styleUrls: ['./album.page.scss'],
})
export class AlbumPage implements OnInit {

  information = null;

  constructor(private activatedRoute: ActivatedRoute, private albumService: AlbumService) { }

  ngOnInit() {
    // Get the ID that was passed with the URL
    let id = this.activatedRoute.snapshot.paramMap.get('id');

    // Get the information from the API
    this.albumService.getDetail(id).subscribe(result => {
      this.information = result;
    });
  }

}
```
En este caso, por cambiar y ampliar un poco el alcance de este artículo, vamos a utilizar ngOnInit para recuperar el parámetro con activateRoute y realizar la llamada para obtener la información del detalle.

El constructor se ejecuta cuando se instancia el componente y ngOnInit se ejecuta una vez se instancia todo. He de decir que, es mejor practica llamar a servicios de inicio en ngOnInit debido a que el constructor se suele utilizar para la inicialización de los campos a los valores por defecto.

<p align="center">
  <img src="https://github.com/dcarvajal7/examples/blob/master/ionic4/assets/Captura-de-pantalla-2019-10-22-a-las-22.34.30-579x1024.png" width="300">
</p>

Ahora toca modificar las vistas para listar los elementos y posteriormente el detalle:

albums.page.html
```
<ion-header>
  <ion-toolbar>
    <ion-title>albums</ion-title>
  </ion-toolbar>
</ion-header>

<ion-content>
  <ion-list>
    <ion-item button *ngFor="let item of (results | async)" [routerLink]="['/', 'album', item.id]">
      <ion-label text-wrap>
        <h3>{{ item.title }}</h3>
      </ion-label>
    </ion-item>
  </ion-list>
</ion-content>
```
Hacemos uso de ion-list para pintar el listado, usamos *ngFor para iterar por todos los items de nuestro listado. Con {{ item.title }} seleccionamos el campo a pintar.

albums.page.html
```
<ion-header>
  <ion-toolbar>
    <ion-title>album</ion-title>
  </ion-toolbar>
</ion-header>

<ion-content>
  <ion-card *ngIf="information">
    <ion-card-content text-center>
      {{information.title}}
    </ion-card-content>
  </ion-card>
</ion-content>
```
Con *ngIf valoramos si tiene valor el objeto y si lo tiene lo pintamos en un card con {{information.title}}.

<p align="center">
  <img src="https://github.com/dcarvajal7/examples/blob/master/ionic4/assets/Oct-22-2019-22-30-22.gif" width="300">
</p>

## Conclusiones ##
No cegarse en meterlo todo en servicios , menos cuando estamos hablando de aplicaciones móviles donde en ocasiones tendremos problemas de conectividad. Lo ideal es balancear entre operaciones funciónales que se puedan realizar en cliente, sin problemas de rendimiento (normalmente las enfocadas a vistas) y operaciones más pesadas relacionadas con la lógica de negocio en servidor. 

Por supuesto la lógica completa de negocio debe ir en la parte backend, a menos que tengamos una aplicación con modo offline que requerirá de otras técnicas de optimización, como el uso de bbdd optimizadas para móviles (caso de sqllite) y demás que quedan fuera del alcance de este artículo.

Existen muchas técnicas para no sobrecargar el servidor a peticiones y de no dar al usuario tiempos de carga innecesarios. Para ello, debemos diferenciar entre datos vivos y datos que nunca van a cambiar, e intentar cachear los segundos en medida de lo posible. A veces al iniciar la aplicación y a veces según demanda. Por supuesto, nunca se debe abusar de la caché, ya que la memoria es limitada y si la llenamos, experimentaremos problemas de rendimiento.

Mi consejo, si queréis disponibilidad, rendimiento y tienes un modelo de negocio no muy muy simple, es que utilices aplicación backend. Se abre un abanico de posibilidades muy amplio para nuestra aplicación. Si por el contrario, la disponibilidad no es necesaria y el modelo de datos es simple, no será necesario gastar recursos en crear y mantener una aplicación backend. Debemos estudiar cada caso para ver si merece la pena.

Con respecto a su uso en Ionic 4, ya habéis visto que es realmente sencillo y en aplicaciones híbridas se antoja más necesario que las nativas ya que la aplicación se está ejecutando en un navegador interno, por lo que su rendimiento es más limitado que en una aplicación nativa. No obstante existen plugins de Cordova con muy buenos resultados utilizando sqllite, permitiendo así, tener el modelo de datos en nuestra aplicación híbrida. Eso sí, siempre offline y sin posibilidad de comunicar con otros usuarios o disponer de los datos en otros dispositivos.

No quiero irme sin antes, recomendaros este artículo sobre el uso de servidores remotos en la creación de aplicaciones, en el que hablamos tanto de las ventajas como de las desventajas de usar este tipo de arquitecturas con aplicaciones frontend y backend.
