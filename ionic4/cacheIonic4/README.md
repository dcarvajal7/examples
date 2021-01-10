# Cachear servicios en Ionic 4 #

<p align="center">
  <img src="https://github.com/dcarvajal7/examples/blob/master/ionic4/cacheIonic4/banner.png" width="800">
</p>

El uso de cache en aplicaciones en cliente es tan importante como en servidor, pero debemos tener en cuenta que no disponemos de la misma memoria y potencia en una aplicación que se ejecuta en cliente como en una que se ejecuta en servidor (técnicamente las aplicaciones Ionic 4 ejecutan código web en un contenedor nativo como ya explicamos en este artículo, lo que nos limita más todavía), por tanto, no debemos volvernos locos a la hora de cachear todo, debemos ser muy dinámicos en la gestión de la cache en los servicios remotos que llamamos a través de Ionic 4, implementando un sistema de liberación de cache cuando no la estemos usando o cuando sepamos que no se va a usar en un tiempo.

Ya hablamos de todas las posibilidades que nos brinda una buena cache en nuestra aplicación en este artículo y ahora vamos a aplicarlo concretamente a una aplicación construida con el framework Ionic 4. Deciros que yo normalmente aplico en cliente los 2 tipos de cache (siempre por sesión, ya que se guardan en un dispositivo que normalmente utiliza una única persona):

## Cache de datos de login ##
Es una cache que se utiliza para guardar los datos de usuario durante todo el ciclo de vida de la aplicación o hasta qué expire (por seguridad) y se utilizan para que el usuario no tenga que hacer login cada vez que entre en la aplicación o para tener siempre disponibles los datos del usuario durante el uso de este. Por supuesto, cada vez que se inicia la aplicación, por seguridad, debemos comprobar que esos datos son correctos, yo suelo llamar a un servicio vacío, con la seguridad de la REST API activada para ese servicio, de manera que se comprueba que los datos son los correctos. Esta cache no se realiza puramente por optimización de recursos sino más bien por funcionalidad.

<p align="center">
  <img src="https://github.com/dcarvajal7/examples/blob/master/ionic4/assets/login.png" width="600">
</p>

Dado que un sistema de login queda fuera del alcance de este artículo, en el siguiente punto vamos a ver cómo implantar la cache de servicios en cliente.

## Cache de servicios en cliente ##
Esta cache se construye puramente por optimización, por liberar al servidor de carga de peticiones y por ofrecer al usuario una vista de los datos de la manera más rápida posible. Básicamente la cache de servicios en cliente lo que hace es guardar los datos almacenados en el servidor de manera local, de forma que cuando los volvamos a pedir, no sea necesario llamar de nuevo al servidor, ahorrando costes al servidor y tiempo de espera al usuario, ya que la memoria local es muchísimo más rápida que una petición remota.

<p align="center">
  <img src="https://github.com/dcarvajal7/examples/blob/master/ionic4/assets/servicioscliente-1.png" width="600">
</p>

A continuación, expongo varios factores que debemos tener en cuenta, antes de ponernos a implementar esta cache.

### Datos actualizados ###
El cliente nunca sabe cuándo los datos están actualizados, eso es una información que a priori solo conoce el servidor, por lo que debemos tener cuidado porque el usuario puede no estar viendo lo último. Veamos varios casos para entender esto mejor.

### Datos que nunca cambian ###

Los datos de configuración de la aplicación como por ejemplo tipos de ‘albums’ o categorías de ‘albums’ (en una aplicación como la que veremos más abajo), son datos que nunca o casi nunca van a cambiar. Estos datos deben almacenarse en cliente, en una cache que sólo se borre cuando termine el tiempo de expiración (por si añadimos algún elemento más a ese listado que no suele cambiar, los usuarios reciban la actualización pasado una semana por ejemplo).

### Datos generados por el usuario ###

Aquí también podemos utilizar una cache, sólo que no nos vale únicamente con el tiempo de expiración para refrescarse, cuando un usuario registra su ‘album’ nuevo (recordemos el anterior ejemplo), el refresco debe ser inmediato, pero si cada vez que entramos en la aplicación recupera el listado de sus ‘albums’, estamos sobrecargando el servidor y haciendo que el usuario espere innecesariamente. Entonces, ¿cómo podemos aplicar la cache aquí?

La respuesta es bastante sencilla, si estamos seguros de que esos datos solo pueden ser actualizados por el usuario, simplemente debemos almacenarlos en la cache la primera vez que se piden, y en cuanto el usuario cree/edite/elimine esa información, debemos refrescar la cache en el dispositivo. La cosa se complica cuando nuestra aplicación es multi-dispositivo, entonces seria el servidor quien debe indicar una actualización de estado que nos permita refrescar la cache o utilizar trucos como refrescar la cache cuando se hace login (en el caso de que no tengamos que trabajar con la misma información en 2 dispositivos a la vez).

### Datos generados por terceros ###

Por último, tenemos el caso más delicado, la cache de datos generados por terceros es complicado de desarrollar bien, ya que la integridad de los datos no dependen de las acciones del usuario en el dispositivo ni de datos prácticamente estáticos, sino de acciones de terceros que se escapan al control de la aplicación en cada dispositivo. Aquí tendríamos que jugar con WebSockets o herramientas que permitan avisar cuando hay cambios o establecer una expiración personalizada para estos servicios con tiempos muy bajos, una especie de amortiguador de peticiones para que no se realicen en exceso si estamos dispuestos a esperar para pedir los datos al servidor un poco de tiempo.

## En resumen ##

### Tamaño de la cache ##3
El tamaño de la cache en dispositivos móviles es muy importante, a veces es mejor llamar al servidor, antes de que se bloquee la aplicación y el usuario tenga una mala experiencia. Debemos pensar y testear hasta qué punto es importante cada cache, muchos factores entran en juego aquí; numero de servicios cacheados, potencia del servidor, etcétera.

### Tiempo de expiración ###
Bajo mi punto de vista, todas las caches deben tener una fecha de expiración (en mi caso suelo poner 1 semana para los datos más estáticos), ya que si queremos cambiar algo de configuración, el usuario tendrá los cambios como muy tarde una semana después, un tiempo asumible bajo mi punto de vista. Claro que, depende de la importancia de los datos, del uso de la aplicación, etcétera. Para las otras caches, el tiempo debería ser menor, de manera que el usuario no tenga una mala experiencia si nuestro sistema de caches falla.

## Como implementar una cache de servicios en Ionic 4 ##
En este artículo vamos a aprender a crear una cache básica para las peticiones a servicios remotos. Para ello, como siempre, partimos de 0 en una aplicación completamente nueva y creamos unas llamadas a unos servicios, podéis seguir este artículo para ello. Una vez tengamos toda la estructura lista, debemos instalar los siguientes plugins:

`npm install ionic-cache @ionic/storage --save`
* @ionic/storage – Es un plugin que nos permite almacenar datos en la memoria del dispositivo, en concreto ionic-cache lo utilizará para almacenar los datos cacheados qué recibamos de los servicios. Se puede integrar incluso con SQLite o utilizarse para guardar los datos del usuario cuando hace login, cuando queremos almacenar otro tipo de información por dispositivo, etcétera, pero eso queda fuera del alcance de este artículo, lo instalaremos únicamente para que ionic-cache pueda utilizarlo.
* ionic-cache – Es un plugin de Ionic que funciona realmente muy bien, la configuración es muy sencilla e intuitiva. Permite cachear requests, observables, promises y datos clásicos. Algunas de sus características principales son:
  * Cacheo de request.
  * Cacheo de observable con tiempo de espera.
  * No invalidar caché si el navegador está fuera de línea.
  * Establecer e invalidar grupos de entradas.
  * Admite IndexedDB, SQLite (Cordova), WebSQL a través de Ionic Storage.

### Configurar ionic-cache ###

Para configurar ionic-cache debemos añadir el modulo a los importe de nuestro app.module.ts:

```
import { CacheModule } from "ionic-cache";
 
@NgModule({
  ...
  imports: [
    CacheModule.forRoot({ keyPrefix: 'cacheIonic4' })],
  ],
})
```

Importante aquí incluir un ‘key prefix’ para no pisarnos con otros elementos del ‘storage’. Después debemos establecer los parámetros de configuración en app.component.ts:

```
import { CacheService } from 'ionic-cache';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    cache: CacheService
  ) {
    ...
    cache.setDefaultTTL(60 * 60); 
    cache.setOfflineInvalidate(false);
  }
  ...
}
```
Recordad que esta configuración es a nivel global, por lo que todo lo que cambiemos aquí, aplicará a todos los sitios donde se utilice el plugin. Yo en concreto, a modo de ejemplo, he configurado 2 parámetros:

* defaultTTL: para establecer un tiempo de expiración de la cache en segundos (en el ejemplo 1 hora).
* offlineInvalidate: para obligar a que no elimine la cache si el dispositivo esta offline, de manera que el usuario siempre tenga datos.

### Usar ionic-cache en servicios REST ###

Para el ejemplo que mencionaba antes, si queremos usar la cache en nuestras llamadas a servicios debemos hacerlo utilizando loadFromObservable:

```
getAlbums(): Observable<any> {
    let url = "https://jsonplaceholder.typicode.com/albums";
    let cacheKey = url;
    let request = this.http.get(url);
    return this.cache.loadFromObservable(cacheKey, request);
  }

  getDetail(id): Observable<any> {
    let url = 'https://jsonplaceholder.typicode.com/albums/' + id;
    let cacheKey = url;
    let request = this.http.get(url);
    return this.cache.loadFromObservable(cacheKey, request);
  }
```

De esta forma, devolverá un ‘Observable<any>’ que podremos seguir usando como antes. Pero, ¿cómo funciona por dentro? El funcionamiento es bastante sencillo, primero comprueba que la cache no ha expirado, sí lo ha hecho la elimina y pide al servidor, al igual que si no existe porque no se ha llamado antes. Una vez obtiene los datos los devuelve y los guarda en el ‘storage’ también. De manera que sí se vuelven a pedir y no han expirado, va a devolver los datos almacenados en cache.

Otro detalle es que nuestro servicio de detalle (/albums/:id), guarda cada elemento en una cache distinta con nombre /albums/xxxx, de manera que después lo pueda recuperar fácilmente. Si os preocupa la forma de borrar/refrescar este tipo de cache, más abajo en este mismo artículo, os voy a mostrar cómo hacerlo de una forma muy sencilla.

Para hacer la prueba podemos ir a la pestaña ‘network’ de las herramientas para desarrolladores de chrome y comprobar que efectivamente solo realiza una petición al servicio REST cada vez mientras la cache esta activa, incluso refrescando la pagina.

También podemos establecer una expiración personalizada para cada servicio en concreto si se requiere:

```
let ttl = 60 * 60 * 24 * 7; // TTL in seconds for one week
let request = this.http.get(url); 
return this.cache.loadFromObservable(cacheKey, request, groupKey, ttl);
```

Existen muchas funciones disponibles en esta librería (como por ejemplo la agrupación de elementos para la paginación o usar ‘promises’) que puedes consultar directamente desde aquí.

### Refrescar ionic-cache ###

Como he comentado antes, un sistema de cache sin refresco, es inviable, los datos casi siempre van a cambiar y no podemos ofrecerle al usuario unos datos desactualizados de por vida. Por tanto, nuestra implementación debe tener una gestión de todo esto. ¿Qué nos ofrece ionic-cache para ello? Tenemos algunas opciones:

* cache.setDefaultTTL(60 * 60) – Es la expiración por defecto de todas las caches generadas, donde el valor de entrada son segundos y se configura en el app.component.ts.
* this.cache.loadFromObservable(cacheKey, request, groupKey, ttl) – En cada llamada a loadFromObservable se le puede pasar el tiempo de expiración a través del parámetro ttl (en segundos).
* this.cache.removeItems(“https://jsonplaceholder.typicode.com/albums”) – Es el método que vamos a utilizar para obligar el refresco de la cache cuando el usuario realice una acción. Por ejemplo, el usuario añade un ‘album’ nuevo a su lista de ‘albums’, entonces refrescamos la cache de manera que cuando vuelva a la lista de ‘albums’ y los pida a través de loadFromObservable, no lo encuentre en la cache, vuelva a pedir al servidor remoto y se vuelven a cachear actualizados.

No voy a incluir estas funciones en el código del artículo por que estamos utilizando unos servicios de ejemplo de typicode y estos no los puedo modificar, pero quedaros con la idea, si se añade un ‘album’ nuevo a esa lista, se debe refrescar nuestra cache. Os pongo un ejemplo de Aquanotes, una aplicación que he desarrollado yo con este sistema:

```
actualizar(id: number, values: any): Observable<any> {

    this.cache.removeItems(AcuariosProvider.topic_acuarios);
    this.cache.removeItems(AcuariosProvider.topic_acuario + "/" + id);

    let url = `${SERVER_URL}` + AcuariosProvider.topic_acuario + "/" + id;
    return this.httpClient.put(url, values, { responseType: 'text' })
      .pipe(tap(acuarioCardDTO => {
        return acuarioCardDTO;
      }));
  }
```

Si os fijáis, cuando actualizo un objeto acuario, elimino la cache del listado de acuarios propio del usuario y la cache del detalle del acuario actualizado. De forma que, cuando el usuario vuelva a pedir esos datos, los pedirá al servidor remoto y se actualizarán en la cache y en la vista del usuario.

## Conclusiones ##
Complementando las conclusiones del artículo donde hablo sobre la cache en aplicaciones de forma general, he de decir que un buen sistema de cache implementado en cliente es casi crucial, puede ser factor determinante para el éxito de una aplicación, la experiencia de usuario debe ser muy buena, para que el usuario continuo utilizando nuestra aplicación.

Por supuesto la opinión de mejorar el hardware del servidor hasta el infinito y no cachear nada, es una opción muy mala que solo conseguirá aumentar los costes y el mantenimiento de nuestra aplicación.

Por otra parte, como dije ya, no nos podemos volver locos cacheando todo, hay que tener en cuenta que la memoria de los dispositivos es limitada y puede llegar un punto en el que el remedio sea peor que la enfermedad. También el tener un sistema de cache, puede ser un nido de bugs bastante complicado de arreglar, teniendo en cuenta que pueden aparecer datos desactualizados y no se puede depurar tan fácilmente como que un servicio de devuelva X datos o no.

Por tanto mi recomendación es que tengamos un buen sistema de cache, si es posible utilizando una librería ya testada como ionic-cache y que nuestra parte sea lo más estable posible. Otra cosa que recomiendo es estudiar cada caso para ver si lo debemos cachear, por ejemplo, si en el registro de usuario tenemos una lista de categorías de algo que solo aparecerá ahí, no es necesario cachearlo ya que el usuario solo se registrará una única vez normalmente y de nada nos vale tener en memoria esa información que no se volverá a utilizar en ese mismo dispositivo.
