# Creando nuestra primera aplicación multiplataforma con Ionic 4 #

<p align="center">
  <img src="https://github.com/dcarvajal7/examples/blob/master/ionic4/helloWorldIonic4/unnamed.png" width="800">
</p>

El concepto de aplicación multiplataforma, lleva mucho tiempo en el mundo del desarrollo y uno de los frameworks más utilizados para aplicaciones de movilidad es sin duda Ionic.

En este artículo, vamos a lanzar nuestra primera aplicación con la versión 4 de Ionic con el objetivo de poder desarrollarla en un solo lenguaje y que compile para los sistemas operativos ‘mobile’ más extendidos hoy en día; iOS & Android.
 
Para que entendáis Ionic, es importante hablaros del concepto aplicación nativa y aplicación híbrida.

## Nativa ##
Una aplicación nativa, es la que se realiza expresamente por y para la plataforma elegida con las herramientas o frameworks de desarrollos oficiales (por ejemplo Swift para iOS ó Java con Android SDK para Android).

## Híbrida ##
Una aplicación híbrida es una aplicación multiplataforma, lo que nos permite con el mismo código fuente, ejecutar nuestra APP en diferentes plataformas, pasando por un proceso de ‘empaquetado’ o compilación con el SDK de cada plataforma.

Para ello, en nuestro caso, a bajo nivel Ionic utiliza Apache Cordova o Ionic Capacitor (a partir de la versión 4), que permite convertir nuestro código a algo entendible por los diferentes sistemas operativos de las plataformas ‘mobile’ a las que queremos llegar (utilizando sus SDK).
 
Ionic Capacitor es una implementación propia de una tecnología parecida a Cordova por parte del equipo de Ionic. Para el alcance de este artículo esto es transparente, pero debéis saber que internamente funciona de forma diferente y para poder usarlo, requiere de una instalación específica.

Existe una capa por encima de Cordova (o Capacitor) y por debajo de Ionic para la parte web. Se trata de Angular, nos permite construir nuestras aplicaciones teniendo únicamente conocimiento de HTML, CSS y Typescript (un lenguaje orientado a objetos que aporta robustez y que en tiempo de compilación se traduce a Javascript).

Por supuesto, Angular esta orientado a plataformas web y ahí es donde entra en juego Ionic, que además de muchas funcionalidades como framework y plataforma de desarrollo, nos aporta una adaptación de Angular a ‘mobile’, con posibilidad de adaptar el diseño a los estándares nativos de Android o iOS entre otros.

<p align="center">
  <img src="https://github.com/dcarvajal7/examples/blob/master/ionic4/assets/ionic-architecture-new.png" width="600">
</p>

## Nuestra primera aplicación Ionic 4 ##
Lo primero es instalarnos nodejs, que es un entorno de ejecución para JavaScript construido con el motor de JavaScript V8 de Chrome, para ello visita https://nodejs.org/ y sigue las instrucciones para instalar su última versión. Es importante que os familiaricéis con el entorno de node y su ejecución en linea de comando, podéis buscar más información en internet ya que quedaría fuera del alcance de este artículo.

Una vez tengamos nodejs funcionando, ejecutaremos (en la consola de nodejs o terminal que más nos guste en Windows o macOS):

`npm install -g ionic@latest`

Este comando nos instalará el CLI de Ionic, el concepto de CLI ( herramienta de linea de comandos, Ionic command-line interface en inglés ) es muy utilizado en el desarrollo de aplicaciones con Angular, si habéis desarrollado algo con este framework anteriormente os sonará seguro y es que Ionic utiliza Angular por debajo, para construir la parte ‘web’, aunque en la versión 4 permite utilizar otros frameworks diferentes, gracias a que ahora todos los componentes se encapsulan en los llamados Web Components, lo que le permite no estar atado a un framework base. Nosotros nos quedaremos con su implementación con Angular ya que es la más extendida.

Una vez instalado, procederemos a crear nuestra primera aplicación:

`ionic start helloWorldIonic4 blank --type=angular`

* ionic es el inicio de todos los comandos que tendremos que utilizar con CLI.
* start es la opción que nos permite generar un nuevo proyecto.
* helloWorldIonic4 es el nombre que tendrá nuestra aplicación.
* blank es la plantilla elegida, el CLI de ionic tiene predefinida varias plantillas que construyen el esqueleto de nuestra aplicación, además de blank que seria la más básica, sin ninguna pagina salvo el Home, tenemos tab y sidemenu.
* type es el framework web que vamos a utilizar, como hemos comentado antes, a partir de Ionic 4, no quedamos atado a un framework base y podemos utilizar cualquiera de los permitidos o incluso ninguno.

El CLI de Ionic nos genera un esqueleto con la siguiente estructura:

<p align="center">
  <img src="https://github.com/dcarvajal7/examples/blob/master/ionic4/assets/Captura.png" width="300">
</p>

¿Qué elementos importantes tenemos en la estructura? A groso modo podemos ver:

* src – Contenedor del código de la aplicación (typescript + html + css)
* app – Realmente es donde meteremos la mayor parte del código salvo css globales (theming) y los recursos.
* assets – Aquí van las imágenes, vídeos y demás recursos que utilizaremos.
* theme – Contiene los css (o scss) globales.
* main.ts – El principal punto de entrada para tu aplicación. Compila la aplicación con el compilador y arranca el módulo raíz de la aplicación (AppModule) para ejecutarse en el navegador o donde toque.
* package.json –  Es él archivo de configuración de un proyecto de Node. Se definen y manejan características tan importantes como:
  * Nombre del proyecto.
  * Versión.
  * Dependencias.
  * Repositorios.
  * Autores.
  * Licencias.
  * tsconfig.json – es donde se especifican los ficheros raíz y las opciones necesarias para que el compilador pueda hacer su trabajo.

Lo que no quiere decir que los demás elementos no sean importantes, de hecho lo son tanto o más que los citados, pero quedan fuera del alcance de este artículo y para una primera implementación de nuestra aplicación Ionic 4 no es excesivamente necesario conocer sus funciones.

Después de esto, ya podemos lanzar nuestra primera aplicación Ionic 4, así de fácil. Para ejecutarla tenemos 2 posibilidades:

`cd helloWorldIonic4 
ionic serve`
Lo que nos ejecutará nuestra aplicación en el navegador, full screen como si de una app web se tratase (en realidad, lo es).

`cd helloWorldIonic4 
ionic serve --lab`
Con la opción lab, activamos el laboratorio o suite de Ionic que nos da un entorno de pruebas mucho más real, entre otras cosas porque nos muestra como se vería la aplicación en una pantalla iOS, Android, etc.

Sí es la primera vez que lo usamos en el proyecto, nos pedirá instalarlo, para hacerlo escribimos ‘Y’ y pulsamos ‘Enter’:

O si lo preferís con el comando de instalación:

`npm install -g @ionic/lab`
Aquí una comparativa de las 2 ejecuciones:

Hello world con ‘ionic serve’
<p align="center">
  <img src="https://github.com/dcarvajal7/examples/blob/master/ionic4/assets/Captura.png" width="300">
</p>
Hello world con ‘ionic serve –lab’
<p align="center">
  <img src="https://github.com/dcarvajal7/examples/blob/master/ionic4/assets/Captura2-1024x515.png" width="300">
</p>

Como veis Ionic CLI nos facilita muchísimo las cosas, podemos crear paginas, servicios y componentes con el entre otras cosas, ejecutar nuestra aplicación, etcétera.

## Conclusiones ##
Desarrollar aplicaciones multiplataforma es una forma muy cómoda de construir lo que queremos para distintos sistemas operativos ‘mobile‘ sin necesidad de dominar los distintos lenguajes y frameworks nativos. Como contras, siempre las aplicaciones nativas son más potentes y tienen mejor integración con el hardware del dispositivo en el que se ejecuta, no debemos olvidar que las app construidas con Ionic son realmente aplicaciones web que gracias a Cordova / Ionic Capacitor, se pueden ejecutar en los diferentes dispositivos y comunicar con sus componentes.

Ionic lleva mucho tiempo en el mercado y es un framework muy utilizado por empresas de desarrollo a medida y usado también en muchas aplicaciones de éxito. Por lo que podemos estar seguros de que estamos ante una muy buena plataforma de desarrollo y que prácticamente nos permitirá desarrollar la app que queramos.
