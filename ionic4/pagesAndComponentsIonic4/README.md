# Creando páginas y componentes nuevos con Ionic 4 #

<p align="center">
  <img src="https://github.com/dcarvajal7/examples/blob/master/ionic4/pagesAndComponentsIonic4/Páginas-Y-Componentes-.png" width="800">
</p>

## ¿Cómo son las páginas y componentes en Ionic 4? ##
Las páginas y componentes en el contexto de Angular dentro de Ionic, son diferentes a lo que normalmente vemos en otros tipos de desarrollo, es un contexto mucho más modular en el que se encapsulan los elementos y se les provee de cierta inteligencia o lógica para que sean capaces de funcionar de forma individual. Esto nos va a permitir reutilizar muchísimo código sobre todo en aplicaciones grandes.

Además como cada componente contiene su propia lógica los bugs estarán mucho más localizados y es más complicado que estos se propaguen a otras zonas del código en ejecución.
 
Este concepto de desarrollo de componentes no te sonará mucho sí estas acostumbrado a trabajar únicamente con HTML o con vistas PHP, JSF o JSP, en cambio si has desarrollado aplicaciones de escritorio, será mucho más familiar para ti.

Debemos entender como página en angular a un elemento encapsulado que normalmente, es lo suficientemente inteligente para ser auto-suficiente (probablemente tendrá parámetros de entrada para poder ejecutar su lógica y gracias a esto, estaremos estableciendo una fachada que nos va a proteger contra el cambio), como veremos un poco más adelante, no solo consta de la vista, si no de un controlador, una especificación de modulo y el css específico de la página.

Los componentes son la unidad más básica en la construcción de una aplicación Angular. En realidad una aplicación Angular es un árbol de componentes y probablemente nuestras páginas estén formadas por distintos componentes (entre otras cosas). Deben producirse también de forma encapsulada y auto-suficiente, de manera que podamos reutilizarlos en toda la aplicación.

<p align="center">
  <img src="https://github.com/dcarvajal7/examples/blob/master/ionic4/assets/paginasYcomponentes-1-509x1024.png" width="300">
</p>

La idea es que todas las páginas y componentes sean elementos desacoplados y que puedas reutilizar con poco esfuerzo, normalmente con algunos parámetros de entrada, hay que huir en la medida de lo posible a dependencias con su contenedor.

Gracias a Ionic CLI podremos crear páginas y componentes nuevos en Ionic 4 de una forma muy sencilla. La versión 4.0 ha sido vitaminada (con respecto a la versión anterior) en las funcionalidades que ofrece y en la velocidad para procesarlas. También han mejorado su facilidad de uso.
 
Ya hemos visto como crear nuestra primera aplicación Ionic y en este artículo vamos a dar un pasito más en la creación de nuestra aplicación multiplataforma. Si no tenemos la última versión de Ionic, podemos actualizarla con:

`npm install -g ionic@latest`
Lo primero es montar nuestra aplicación con el CLI:

`ionic start pagesAndComponentsIonic4 blank --type=angular`
Cuando termine ya tendremos una estructura lo más simple posible para empezar a trabajar con ella. Podemos lanzar ‘Ionic start’ con otros parámetros en lugar de ‘blank’ lo que nos creará una estructura diferente. Usaremos la que más nos convenga en cada momento, para este artículo, con lo que nos aporta la opción ‘blank’ es mas que suficiente.

## Primera página con Ionic 4 ##
Vamos a crear una página con información sobre nuestra mascota, por lo que a continuación, ubicados dentro del proyecto a través de la linea de comandos, ya podremos crear nuestra primera página en la aplicación:

`ionic g page pet`

La estructura de nuestra página con respecto a la aplicación queda de la siguiente manera:

<p align="center">
  <img src="https://github.com/dcarvajal7/examples/blob/master/ionic4/assets/estructura-nueva-pagina-ionic-4.png" width="300">
</p>

Se ha creado una nueva carpeta dentro de ‘app’ con 5 elementos nuevos y se ha modificado el fichero app-routing.module.ts, este último es general y esta ubicado directamente dentro del raíz de ‘app’:

* pet.module.ts – Un módulo en angular es un contenedor para almacenar componentes, páginas o servicios. Cuando creamos una página en Ionic, estamos creando un módulo completo que podremos integrar con otros módulos. Todo esto se define en este fichero.
* pet.page.html – Básicamente es la vista de la página donde iremos añadiendo los diferentes componentes, ya sean ‘custom’ o nativos.
* pet.page.scss – Estilos únicos para la página, en caso de ser necesarios. Este fichero es más útil en los componentes.
* pet.page.spect.ts – Se utiliza para testing, por lo que queda fuera del alcance de este artículo.
* pet.page.ts – Aquí se encuentra la lógica de la página, es donde estableceremos los parámetros de entrada (si los tiene) y qué hacer con ellos. Además de todo el comportamiento de la página, incluido llamadas a servicios.
* app-routing.module.ts – No pertenece a la página, si no que es global, contiene toda la definición de la navegación (Angular Router).

<p align="center">
  <img src="https://github.com/dcarvajal7/examples/blob/master/ionic4/assets/PaginaIonic4-287x300.png" width="300">
</p>

Adicionalmente, para que podamos ver nuestra página, vamos a incluir un enlace en la ‘Home’ usando Angular Router, aunque esto queda fuera del alcance de este artículo, home.page.ts quedaría así:

```
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
}
```

 
Se ha añadido la importación de la librería de Route, se ha añadido al constructor el objeto Router y se ha creado el servicio navigateToPet(), al que tenemos que llamar desde la vista (home.page.html):

```
<ion-header>
  <ion-toolbar>
    <ion-title>
      Ionic Blank
    </ion-title>
  </ion-toolbar>
</ion-header>

<ion-content>
    <ion-button color="primary" expand="full" (click)="navigateToPet()">Pet page</ion-button>
</ion-content>
```
 
Finalmente el fichero app-routing.module.ts quedaría así, con todas las páginas y rutas definidas en la constante ‘routes’:

```
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'pet', loadChildren: './pet/pet.module#PetPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

Podemos probar lo que llevamos desarrollado utilizando de nuevo Ionic CLI:

`ionic serve --lab`

Tenéis más información sobre la opción ‘–lab’ en el artículo publicado en esta mismo repositorio donde explicamos el proceso de creación desde 0 de una aplicación con Ionic 4.

<p align="center">
  <img src="https://github.com/dcarvajal7/examples/blob/master/ionic4/assets/home-page-tutorial-pag-comp.gif" width="300">
</p>

Ya tenemos creada nuestra primera página con Ionic 4, fácil, ¿verdad? Importante añadir la navegación, para poder visitarla y tener en cuenta que acabamos de crear una página en blanco, a la que a continuación vamos a añadir contenido con el siguiente punto del artículo, nuestro primer componente.

## Primer componente con Ionic 4 ##
En desarrollo web se utilizan los componentes de HTML, pero son componentes muy planos y para customizarlos utilizamos css, Javascript, etcétera, por tanto el componente queda muy disperso en el código y posiblemente acoplado a la página donde se encuentre. Angular nos ofrece una potencia enfocada a grandes desarrollos con la que podremos crearnos nuestro propio componente, independiente y encapsulado y, ¿para qué queremos esto?

Imagina que para nuestra aplicación personal, donde ya hemos creado una página para la mascota, ahora queremos una página para el dueño:

`ionic g page owner`
De manera que ahora tenemos 2 páginas y al igual que antes, añadimos un nuevo botón con su navegación:

<p align="center">
  <img src="https://github.com/dcarvajal7/examples/blob/master/ionic4/assets/home-page-tutorial-pag-comp-2.gif" width="300">
</p>

Y ahora queremos que en la primera linea de la página aparezca algo como ‘Nombre: [Nombre en texto]’ para identificar el nombre tanto de nuestra mascota, como el nuestro, para ello será necesario crear un componente con esta estructura que podamos reutilizar en las 2 páginas. De esta forma tendremos un único desarrollo para reutilizarlo tantas veces como queramos.

Por supuesto, este es un ejemplo muy simple y en la practica es posible que no sea necesario crear componentes tan simples, pero el componente puede ser tan potente como queramos, por ejemplo, un calendario, una barra de selección o un árbol de tags, puedes utilizar incluso componentes dentro de componentes, las posibilidades son infinitas.
 
Para crear nuestro primer componente usaremos el CLI de la siguiente forma:
 
```
ionic g module components
ionic g component components/nombre --export
```

Lo que hemos hecho con estos dos comandos es crear primero un modulo nuevo, que va a contener todos los componentes que desarrollemos o qué queramos añadir en este módulo, podemos dimensionarlo/dividirlo como más nos convenga en un solo módulo o varios. Así podremos llevarnos nuestro módulo a la página que queramos y utilizar sus componentes o bien publicarlo a nivel global.

Para nosotros en este artículo bastará con un solo módulo con nuestro componente y lo añadiremos en cada página para poder utilizarlo.

Esta vez tenemos un modulo nuevo ‘components’ cuya configuración se establece en componente.module.ts y dentro de este modulo, nuestro componente:

<p align="center">
  <img src="https://github.com/dcarvajal7/examples/blob/master/ionic4/assets/estructura-nueva-componente-ionic-4.png" width="300">
</p>

* components.module.ts – Además de lo explicado antes en pet.module.ts, definimos que componentes contiene el módulo y cuales se exportan para poder usarlo fuera.
* nombre/nombre.component.html – Como hemos comentado anteriormente aquí va la vista en sí del componente, página o lo que toque.
* nombre/nombre.component.scss – Estilos propios del componente en este caso.
* nombre/nombre.component.spec.ts – Testing del propio componente, queda fuera del alcance de este artículo.
* nombre/nombre.component.ts – Es el controlador del componente y contiene toda la lógica interna del mismo.

<p align="center">
  <img src="https://github.com/dcarvajal7/examples/blob/master/ionic4/assets/ComponenteIonic4-287x300.png" width="300">
</p>

Lo que debemos hacer primero, es adaptar nuestro components.module.ts, necesitamos que exporte el componente cuando incluyamos este modulo en las demás páginas o módulos, únicamente tenemos que declarar y exportar NombreComponent en @NgModule:

```
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NombreComponent } from './nombre/nombre.component';


@NgModule({
  declarations: [NombreComponent],
  imports: [
    CommonModule
  ],
  exports: [NombreComponent],
})
export class ComponentsModule { }
```


 
@NgModule se utiliza para declarar todo lo que hemos creado, en él, podemos definir varios parámetros:

declarations – En él declaramos componentes, directivas y pipes.
providers – Se utiliza para los servicios.
imports – Las importaciones que necesitemos cómo por ejemplo; módulos que importamos a nuestro módulo.
exports – Si estamos definiendo un componente, necesitamos agregarlo aquí para que se pueda utilizar fuera.
Ahora vamos a modificar nombre.component.html para añadir un label y una variable que va a contener el nombre de la mascota o el dueño en función de donde estemos:

```
<p>
  Nombre: {{nombre}}
</p>
```

Para que esa variable venga dada por cada página, necesitamos hacer uso de @Input, gracias a este decorador podemos pasar atributos externos a la lógica de nuestro componente y, de esta forma, estableceremos qué la variable ‘nombre’ se cargue con el valor del parámetro de entrada :

```
import { Component, Input , OnInit } from '@angular/core';

@Component({
  selector: 'app-nombre',
  templateUrl: './nombre.component.html',
  styleUrls: ['./nombre.component.scss'],
})
export class NombreComponent implements OnInit {

  @Input('nombre') nombre : string;

  constructor() {}

  ngOnInit() {}

}
```
 
Ya únicamente nos faltaría incluir nuestro modulo en las distintas páginas para poder usarlo, primero en cada modulo y luego en el html:

```
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { PetPage } from './pet.page';
import { ComponentsModule } from '../components/components.module';


const routes: Routes = [
  {
    path: '',
    component: PetPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PetPage]
})
export class PetPageModule {}
```


Simplemente bastará con importar ComponentsModule en el módulo de nuestra página para poder utilizar cualquiera de los componentes que lo componen, en nuestro caso solo tenemos uno. Aquí entra ya la habilidad para estructurar nuestro árbol de componentes, por ejemplo, podemos definir un modulo de componentes básico para formularios, otro para vistas, etcétera.

```
<ion-header>
  <ion-toolbar>
    <ion-title>pet</ion-title>
  </ion-toolbar>
</ion-header>

<ion-content>
    <app-nombre nombre="Asia"></app-nombre>
</ion-content>
```

La forma de incluir el componente en la vista es muy fácil, solo debemos incluirlo con el nombre definido en el parámetro selector (dentro de @component) como una etiqueta HTML más. Cada @Input es un parámetro de entrada al componente y se establecen como los atributos a los que estamos acostumbrados en HTML (por ejemplo atributo ‘class’ de un ‘div’).

<p align="center">
  <img src="https://github.com/dcarvajal7/examples/blob/master/ionic4/assets/home-page-tutorial-pag-comp-3.gif" width="300">
</p>

Ya tenemos lista nuestra aplicación con dos páginas, ademas del ‘Home’, y un componente compartido entre ellas. También hemos visto cómo incluir un parámetro de entrada en un componente ‘custom’ y como utilizarlo.

## Conclusiones ##
En todos los marcos de desarrollo de todos los lenguajes posibles, tenemos herramientas y técnicas que nos facilitan el encapsulado y reutilización de código, pero realmente en algunas se hace más fácil que en otras.

Angular es de las fáciles, tenemos muchísimas herramientas y mecanismos disponibles para hacerlo bien. Ojo, también es fácil hacerlo mal, sobre todo cuando estamos hablando de código Javascript, que permite un estilo de programación muy abierto, aunque utilizar Typescript le aporta mucha robustez a los desarrollos.

Bajo mi punto de vista, el uso de componentes reutilizables, es una muy buena práctica que debemos seguir cuando desarrollamos aplicaciones Ionic con Angular. Nos permite ahorrarnos muchas líneas de código y focalizar los posibles ‘bugs’ a un único punto por tipo de componente.

¿Por qué digo esto? Porque si hacemos un desarrollo cada vez que necesitemos un componente ‘custom’, cuando falle algo (que siempre pasará) nos tocara replicar la corrección en todos los puntos del código donde este, sin embargo si centralizamos con un único componente para cada caso, solo tendremos que aplicarlo en un sitio.

Esto es tan solo un ejemplo de ventaja que tenemos al crear componentes encapsulados y independientes, otro ejemplo podría ser realizar una evolución del componente, solo tendríamos que hacerla en un único lugar y se aplicaría en todos sus usos.

Al principio el desarrollo del componente será algo más costoso, ya que tendremos que prepararlo para su reutilización en todos los sitios, pero a medio plazo siempre nos va a aportar mejoras en coste, estabilidad, etcétera.

Con respecto a lo demás, la creación de páginas, es muy sencilla en Ionic, gracias a que Ionic CLI nos provee de la estructura base y solo nos tenemos que preocupar de la lógica de cada página. Quizás puede ser un poco lio la navegación y los módulos si estamos acostumbrados a otros lenguajes de programación, pero su uso es fácil en cuanto te haces con el.
