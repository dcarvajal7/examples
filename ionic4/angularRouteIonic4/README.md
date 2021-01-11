# Navegando con Ionic 4 y Angular Router #

<p align="center">
  <img src="https://github.com/dcarvajal7/examples/blob/master/ionic4/angularRouteIonic4/angularRouter.png" width="800">
</p>

## ¿Qué es Angular Router? ##
Una de las principales características de Ionic 4 con respecto a la versión anterior, es la nueva forma de navegar entre páginas, ahora utiliza Angular Router, un sistema basado rutas, que aunque ya existía en versiones anteriores de Angular, hasta Ionic 4 no hemos podido empezar a usarlo.

La navegación en Ionic 3, se basa en un ‘stack de vistas’, donde se cargan las páginas en una pila, en la que cada página nueva entra con un ‘push’ y se añade sobre la pila. Si queremos volver atrás, hace un ‘pop’ de la última página y la elimina de la pila.

<p align="center">
  <img src="https://github.com/dcarvajal7/examples/blob/master/ionic4/assets/ionic3stack.png" width="600">
</p>

En la versión 4 de Ionic, la navegación es un poco diferente, ya que todo el proceso es gestionado por el propio Angular Router. Se encarga de gestionar el ciclo de vida de cada página y mostrar la que necesitamos en cada momento. Para ello, debemos indicar las diferentes rutas que tendremos en la aplicación y a qué página o componente están asociadas de forma que, cuando lo necesitemos, Angular Router pueda cargar internamente cada una en nuestra aplicación.

Tenemos que saber que todas las páginas, están obligatoriamente asociadas a una ruta (si no, no tendremos forma de mostrarlas) y se montan sobre el índex cuando las invocamos.
 
¿Sobre el index siempre? Correcto. Las aplicaciones desarrolladas con Angular, son del tipo «SPA» (Single Page Application), lo que quiere decir, que toda nuestra aplicación de cara al usuario, solo tiene un index sobre el que se van poniendo y quitando componentes en forma de páginas.

Para los históricos, a diferencia de la navegación lineal convencional, podemos mantener más de una pila e intercambiarlas si lo necesitamos. Esto es necesario por ejemplo, cuando tenemos navegación por ‘tabs’ en una página y en otra ‘side menu’ y queremos añadir la funcionalidad ‘back’ en ambas líneas.

<p align="center">
  <img src="https://github.com/dcarvajal7/examples/blob/master/ionic4/assets/Esquema-Angular-Router.png" width="600">
</p>

Por supuesto, estamos utilizando en este artículo Angular como framework base, y por ello, usamos Angular Router, pero recordad que a partir de Ionic 4 esto no tiene porque ser así y podemos utilizar otros frameworks en lugar de Angular.

## Empezando con Angular Router en Ionic 4 ##
Veamos cómo se navega en Ionic 4, partiendo desde un proyecto nuevo, vamos a crear una página nueva y navegaremos desde la ‘home’ hasta ella, como siempre, desde la terminal ejecutamos los siguientes comandos:

```
ionic start angularRouteIonic4 blank --type=angular
cd angularRouteIonic4
ionic g page user
```
 
Para los que aún no lo tenéis claro, tenemos un artículo muy interesante con toda la información sobre cómo crear un proyecto nuevo con Ionic 4. Incluso si tenéis problemas con la creación de páginas y componentes, también encontrareis otro artículo donde explicamos con detalle la creación de páginas y componentes nuevos.

Con nuestra aplicación ya montada y la página nueva ya creada (por ejemplo ‘user’, con información sobre el usuario de la aplicación), podemos ver en app-routing.module.ts que Ionic ya nos a incluido la ruta de la nueva página:

```
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "home", loadChildren: "./home/home.module#HomePageModule" },
  { path: "user", loadChildren: "./user/user.module#UserPageModule" }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```
 
Aquí tenemos varios elementos importantes a comentar:

* const routes – La constante donde van definidas todas las rutas
* path – La dirección en sí, podemos usar rutas anidadas si queremos, por ejemplo ‘user’, ‘user/detail’, ‘user/list’, etcétera.
* redirectTo – Lo usamos para hacer redirecciones, en la entrada a la aplicación es imprescindible desde «» a «home» o la que queramos.
* loadChildren – Donde se define el módulo de la página a la que vamos a dirigir.

A detallar también que la aplicación necesita un punto de entrada (path: »), normalmente ese punto va a redirigirse a ‘home’ y a partir de ahí en el segundo path, definimos donde esta su módulo.

Con respecto al paso de parámetros, en anteriores versiones de Ionic, podíamos pasar objetos completos, esto ha cambiado un poco. Ahora podemos (y debemos) pasar un ‘id’ o grupo de ‘ids’ y recuperar la información que requerimos en cada momento gracias a los servicios. De esta forma también encapsulamos y modulamos más cada página.

## Navegación con router link o a través del controlador ##
A continuación, vamos a crear 2 nuevos botones en home.page.html. para poder dirigirnos a la nueva página, uno a través del controlador y otro directamente con routeLink:

```
<ion-content>
  <div class="ion-padding">
    <ion-button color="primary" expand="full" routerLink="/user"
      >User - Navegación con router link</ion-button
    >
    <ion-button color="primary" expand="full" (click)="navigateToUser()"
      >User - Navegación a través del controlador</ion-button
    >
  </div>
</ion-content>
```

Complementariamente podemos usar routerDirection que determina la animación que tiene lugar cuando la página cambia.

Para el primer link no es necesario nada más, para el segundo tenemos que añadir la función navigateToUser en home.page.ts:

```
import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage {
  constructor(private router: Router) {}

  navigateToUser() {
    this.router.navigate(["/user"]);
  }
}
```
 
¿Cuándo debemos usar uno u otro?, depende lo que necesitemos, es posible que tengamos que añadir cierta lógica procesada antes de cambiar de página, por ejemplo buscar un elemento a través de servicios o realizar cualquier operación con los datos, para ello siempre tendremos que pasar por el controlador.

<p align="center">
  <img src="https://github.com/dcarvajal7/examples/blob/master/ionic4/assets/Angular-router-route-link-.gif" width="200">
</p>

## Back button ##
Diría que necesitamos un botón back para volver ¿no?, esta utilidad es muy fácil de incluir en Ionic, tan solo tenemos que añadir en la user.page.html:

```
<ion-header>
  <ion-toolbar>
    <ion-title>user</ion-title>
    <ion-buttons slot="start">
      <ion-back-button></ion-back-button>
    </ion-buttons>
  </ion-toolbar>
</ion-header>
```
 
Tenemos muchas opciones de configuración, en la documentación oficial podéis ver algunas. Es importante remarcar, el gran trabajo que hay en la construcción de este framework con detalles tan importantes como que si usamos el ‘back button’ sin ‘customizar’, dependiendo del sistema donde se este ejecutando nuestra aplicación, aparece el botón nativo de cada sistema:

<p align="center">
  <img src="https://github.com/dcarvajal7/examples/blob/master/ionic4/assets/back-button.gif" width="200">
</p>

## Pasando parámetros entre páginas con Angular Router ##
Otro de los puntos importantes de la navegación con Angular Router (y con cualquier sistema de navegación), es el paso de parámetros entre páginas, de esta forma, por ejemplo, podremos pasar él id de un elemento para mostrar su detalle o pasar a una página de búsqueda con el texto a buscar directamente, etcétera. La forma de hacerlo, es muy fácil, debemos definir el parámetro a pasar en nuestro ‘router’:

```
import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "home", loadChildren: "./home/home.module#HomePageModule" },
  { path: "user/:id", loadChildren: "./user/user.module#UserPageModule" }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
```
 
Le estamos diciendo que el ‘path’ hacia ‘user’ ahora puede llevar un id, y por lo tanto debemos manejarlo en el controlador correspondiente (user.page.ts) como una entrada de parámetro para poder usarlo:

```
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-user",
  templateUrl: "./user.page.html",
  styleUrls: ["./user.page.scss"]
})
export class UserPage implements OnInit {
  id = null;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get("id");
  }
}
```

Lo que hemos hecho en el código de arriba es añadir al constructor ActivateRoute, para poder usarlo en ngOnInit, en el que obtenemos el valor de ‘id’ y lo metemos en una variable. En una implementación real, justo en el controlador user.page.ts haríamos la llamada a un servicio para obtener todos los datos del usuario para poder mostrarlos en la página.

Ahora toca preparar user.page.html para pintar el parámetro recibido y enviarlo desde los respectivos links hacia nuestro ‘user page’, para usar variables definidas en el controlador (user.page.ts) en la vista debemos incluirlas entre ‘{{ nombre_variable }}’:

```
<ion-header>
  <ion-toolbar>
    <ion-title>user</ion-title>
    <ion-buttons slot="start">
      <ion-back-button></ion-back-button>
    </ion-buttons>
  </ion-toolbar>
</ion-header>

<ion-content> My ID is: {{ id }} </ion-content>
```

Si usamos routerLink, solo tenemos que añadir el valor detrás:

```
<ion-header>
  <ion-toolbar>
    <ion-title>
      Ionic Blank
    </ion-title>
  </ion-toolbar>
</ion-header>

<ion-content>
  <div class="ion-padding">
    <ion-button color="primary" expand="full" routerLink="/user/22"
      >User - Navegación con router link</ion-button
    >
    <ion-button color="primary" expand="full" (click)="navigateToUser()"
      >User - Navegación a través del controlador</ion-button
    >
  </div>
</ion-content>
```

Si hemos optado por el controlador, lo tendríamos que añadir en nuestro ‘router.navigate’:

```
import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage {
  constructor(private router: Router) {}

  navigateToUser() {
    this.router.navigate(["/user/22"]);
  }
}
```

<p align="center">
  <img src="https://github.com/dcarvajal7/examples/blob/master/ionic4/assets/Uso-de-activate-route-1.gif" width="400">
</p>

## Protegiendo páginas con Guard ##
Una de las formas que tenemos de proteger o prevenir el acceso a páginas dependiendo del usuario y sus permisos, a través de la url, es con el uso de ‘Guard‘.

Realmente cuando estamos desarrollando aplicaciones móviles este es un punto que no se suele tener en cuenta, ya que la propia aplicación Ionic se forma en un paquete cerrado, compilado y instalado en el móvil desde un store, pero hay que tener en cuenta que un ‘path’ de Angular Router es simplemente una URL al que pueden tener acceso los usuarios, cuesta más porque no es visible, pero es posible.

Mi recomendación es tener ese plus de seguridad, para ello, lo primero es ejecutar el siguiente comando:

```
ionic g guard guards/auth
```

Básicamente tendremos una función que indique ‘true’ o ‘false’ en la implementación que tengamos de usuario autenticado, esto se comprobará en cada acceso a una ruta, por lo que además de implementarlo lo ideal es que esta optimizado, con algún tipo de cache.

Este es el código que genera la función anterior en guards/auth.guard.ts:

```
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
 providedIn: 'root'
})
export class AuthGuard implements CanActivate {
 canActivate(
   next: ActivatedRouteSnapshot,
   state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

   let userAuthenticated = false; // Get the current authentication state from a Service!

   if (userAuthenticated) {
     return true;
   } else {
     return false;
   }
 }
}
```

El desarrollo de un sistema de autenticación queda fuera del alcance de este tutorial, por ello he decidido no incluir ‘AuthGuard‘ en el código que encontrareis en este repositorio.

Si queréis añadirlo a nuestro ejemplo seria algo así:

```
import { AuthGuard } from './guards/auth.guard';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "home", loadChildren: "./home/home.module#HomePageModule" },
  { path: "user", loadChildren: "./user/user.module#UserPageModule",
   canActivate: [AuthGuard] }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

Como veis, lo único es añadir el canActivate en cada path que lo necesitemos. Lo importante aquí realmente es la implementación de un sistema de login accesible desde ‘AuthGuard‘.

## Conclusiones ##
Creo que el uso de Angular Router en Ionic, en lugar del sistema anterior, nos acerca a los requerimientos del mercado, donde la demanda de Angular es muy grande y donde probablemente el número de desarrolladores crezca mucho, sintiéndose más cómodo de esta forma.

Debemos tener en cuenta, que ahora Ionic se puede utilizar con otros frameworks por debajo, así que el hecho de que con Angular tengamos la navegación desarrollada por ellos mismos, es casi obligatorio si no quieren mantener en Ionic distintos tipos de capas en función del framework que tenga por debajo, ya sea Angular o cualquier otro.

Técnicamente hablando, pienso que esta forma de navegar es mucho más natural y entendible para el que empieza y para el que está acostumbrado al desarrollo web, sin duda un acierto incluir Angular Router en lugar de tener una propia implementada que mantener en Ionic. Ademas nos permite el uso de utilidades como AuthGuard, con el soporte de Angular, que no es poco.
