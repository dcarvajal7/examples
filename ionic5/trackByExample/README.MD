# Mejora la performance de tu aplicación Ionic 5 con trackBy #

<p align="center">
  <img src="https://github.com/dcarvajal7/examples/blob/master/ionic4/assets/trackBy.jpg" width="800">
</p>

## Introducción ##
Si necesitamos iterar sobre una colección en una aplicación móvil con los recursos limitados (aunque cada vez menos) y además estamos aplicando un desarrollo híbrido con Ionic (por ejemplo), debemos cuidar la ‘performance’ lo máximo posible, nuestros listados deben responder al momento y no deberían tener un refresco pesado para el usuario.

Para ello, angular nos ofrece una función que podemos utilizar en la directiva ‘ngFor’ en nuestra aplicación Ionic 5 y que nos va a ayudar a que únicamente se refresque lo que ha cambiado con respecto a la anterior versión de esta lista. Con esto conseguiremos un refresco muy transparente para el usuario, sin refrescos del listado completo, evitando así esos ‘saltos’ tan feos que se producen en la vista.

## Usando trackBy en una aplicación Ionic 5 ##
Para ello y como no podría ser de otra forma, comenzamos creando una aplicación Ionic 5 de tipo blank, no necesitamos más:

```
npm install -g @ionic/cli
ionic start trackByExample blank
```

Si aún no tenéis Ionic 5 en vuestro equipo, el comando ‘npm install -g @ionic/cli’ os lo actualizará, no os preocupéis por vuestras aplicaciones Ionic 4 porque el cliente es retro-compatible.

Para ejecutarla debemos lanzar:

```
cd trackByExample 
ionic serve —lab
```
Ahora en el home, vamos a incluir dos listados para ver la diferencia, uno con la función trackBy y el otro sin. Quedaría así:

```
<ion-content [fullscreen]="true">
  <ion-header collapse="condense">
    <ion-toolbar>
      <ion-title size="large">trackByExample</ion-title>
    </ion-toolbar>
  </ion-header>

  <div id="container">
    <ul>
      <li *ngFor="let item of collection;">{{item.id}}</li>
    </ul>
    <ul>
      <li *ngFor="let item of collection; trackBy: trackByFn">{{item.id}}</li>
    </ul>
  </div>
</ion-content>
```
A continuación, vamos a añadir una precarga de datos y una modificación de los mismos en el home.page.ts, todo en la propia aplicación , pero esta lógica comúnmente se ejecutará en un servidor que nos provea de los datos a través de una API Rest:

```
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
```

Hay varias cosas por mencionar aquí:

* trackByFn: es la función que nos va a indicar qué indice va a utilizar para modificar el elemento. Podemos usar el ítem al completo o podemos usar su id, su índice, o el item al completo. Personalmente, he tenido que utilizar el ítem completo en situaciones en las que la recarga de una imagen que tenía en cada fila, se hacia de forma independiente al listado. En ese caso, debía recargar cada ítem al completo.
* getItems: una función que va a modificar el listado con nuevos valores y alguno diferente.
* constructor: va a realizar una carga de datos inicial.

Y por último, vamos a añadir un botón en la vista que llame a la carga de datos que nos proporciona getItems:
```
  <ion-button color="primary" expand="full" (click)="getItems()">Recarga de datos</ion-button>
  ```
Si os fijáis detenidamente, en una recarga el listado al completo y en la otra únicamente lo que se ha modificado. Esto extrapolado a muchos elementos se notará bastante más y conseguiremos un efecto mucho más amigable para el usuario.

<p align="center">
  <img src="https://github.com/dcarvajal7/examples/blob/master/ionic4/assets/Track-by-example.png" width="200">
</p>

## Conclusiones ##
Podemos usar trackBy tanto en peticiones sobre una API Rest o sobre lógica que tengamos en la propia aplicación, simplemente modificará el valor que ha cambiado.

Personalmente, creo que merece (y mucho) la pena usar esta función. Los listados quedarán mucho más limpios, nos evitarán situaciones feas que pueden provocar incluso que un usuario se desespere y deje de utilizar nuestra aplicación. Además, vamos a restar pesadez de procesamiento en nuestra aplicación, lo cual va a permitir ejecutarse con más soltura en dispositivos más antiguos, ya que la vista no se va a borrar y repintar al completo.

¿Cuándo debemos utilizar trackBy? Yo la recomendaría siempre que el listado sea dinámico, que pueda cambiar en base a acciones del usuario o recargas automáticas por parte del servidor. En las ocasiones en las que no sea necesario ese refresco dinámico, podemos pasar de él, ya que es código innecesario que nunca va a ejecutarse y estará prácticamente de adorno.

Mención especial en este artículo para un compañero y amigo, Ricardo Bertolín (maestro en Angular) que ha sido la persona que me ha enseñado el uso de la función trackBy y que me ha ahorrado varios problemas en el desarrollo de Aquanotes.
