*Desarrollo de aplicaciones multiplataformas: nativas, híbridas y web*

¿Qué son las aplicaciones multiplataformas?
Una aplicación multiplataforma, es la que con un único desarrollo, se puede desplegar en distintas plataformas, esto es posible gracias a tecnologías como Apache Cordova, Ionic Capacitor o Appcelerator para desarrollos ‘mobile’ o Unity para videojuegos.

El concepto de aplicación multiplataforma se puede aplicar a muchísimos tipos de desarrollos enfocados a distintos sectores, por ejemplo aplicaciones ‘mobile’, aplicaciones de escritorio o videojuegos incluso.

Las aplicaciones híbridas (otra forma de llamarlas) surgen a raíz de la necesidad de producir aplicaciones, normalmente de gestión, a un ritmo mayor debido a la demanda creciente del mercado. Entonces, ¿por qué limitarnos a desarrollar únicamente para una sola plataforma?

Esta claro que podemos desarrollar aplicaciones nativas para todas las plataformas que queramos (de hecho, cada sistema como Android o iOS, tienen una suite muy intuitiva y que facilita mucho las cosas) pero aun así, hacerlo, tiene un coste excesivo de tiempo, aprendizaje… que no todos los desarrolladores o empresas están dispuestos a asumir.

Normalmente, con la mayoría de frameworks y herramientas multiplataforma disponibles en internet, podremos cubrir un alto porcentaje de las necesidades de nuestra idea, pero no llega a ser el 100%, habrá casos en los que tendremos que tirar de desarrollos nativos ya sea por rendimiento, por elementos nativos, interfaz de usuario, etcétera.

Aplicaciones Nativas, Híbridas o Web
Cuando decidimos generar una nueva aplicación, son muchos los factores a tener en cuenta antes de empezar a picar código, de hecho, elegir el tipo de aplicación (estructuralmente hablando) es uno de los puntos más importantes del desarrollo, ya que no se puede cambiar a ‘posteriori’ sin tirar lo que hemos hecho a la basura.

Las 3 opciones son muy diferentes, por lo que tenemos que elegir con cuidado dado que como he dicho antes, una vez empezado no podremos cambiar sin tirar todo el trabajo realizado. Vamos a analizar las opciones:

Nativas
Una aplicación nativa siempre nos provee la mejor interfaz posible ya que cuenta con todos los componentes nativos, creados para ese sistema lo cual aporta también un rendimiento muy optimizado, incluso enfocado al hardware como es el caso de los iPhone con iOS, en cambio el coste en recursos y tiempo es mucho mayor. Otra de las cosas que aporta es el modo offline, ejecutar una bbdd local o comunicarse con la memoria interna es realmente sencillo y la integración es perfecta.

En el desarrollo de aplicaciones nativas se utiliza directamente el lenguaje ‘oficial’ del sistema operativo para el que son desarrolladas, utilizando el SDK (Software Development Kit) especifico de cada sistema. La comunicación con la API del dispositivo es directa gracias al SDK y está perfectamente integrada:

Híbridas
Las híbridas en cambio cuentan con una interfaz bastante buena ya que HTML5 nos provee de una gran variedad de componentes que van a cubrir a la perfección todas nuestras necesidades y al estar alojado parte de la lógica y las vistas (assets + código) en la propia aplicación, es decir en local, el rendimiento es bueno. En cuanto al coste, es más liviano que el de las nativas, solo tenemos que desarrollar una ‘app’ para todos los sistemas y en un lenguaje muy conocido, por lo que abaratamos recursos y tiempo.

En cuanto al modo offline, es algo menos eficiente que el de las nativas, aunque igualmente podremos comunicarnos con bbdd y memoria interna gracias a los plugins de Cordova o Ionic Capacitor (por ejemplo).

Aquí la estructura es bastante más compleja ya que se requiere de un contenedor nativo sobre el que se ejecuta nuestra aplicación y además es quien se comunica con la API. Cordova o Ionic Capacitor nos proveen de ese contenedor capaz de ejecutarse en el S.O. nativo:

Web
Por ultimo, las aplicaciones web cuentan con los mismos componentes que las híbridas para montar la interfaz de usuario pero el acceso al hardware del dispositivo es mucho más limitado y dependemos directamente de si nuestro navegador tiene esa integración. El rendimiento también es peor ya que todo se aloja en servidores y la carga de assets y código viene desde un servidor, en local no tenemos nada, lo que hace algo más pesada la carga de elementos.

Sin embargo es el tipo que menos coste tiene, no debes tener conocimientos sobre las plataformas para desplegar la aplicación en los ‘Apps Store’ porque no se puede. Simplemente desplegar tu aplicación en un servidor al que accederán desde el navegador de los dispositivos.

Al ejecutarse sobre el navegador web del dispositivo, no tiene comunicación con la API salvo la que el propio navegador tenga, ya sea Safari, Chrome, etcétera:

Conclusiones
Personalmente, no pienso que debamos ceñirnos a un tipo de aplicación y creo que debemos elegir en base a nuestras necesidades, siempre y cuando tengamos el conocimiento necesario para implantar cualquiera de las 3 opciones, si no conocemos el lenguaje nativo, me quedaría con híbridas o web.

Si queremos una aplicación de gestión, típicas con CRUD (formularios de creación y edición, listados, borrado de elementos) o incluso con integración con mapas y cámara del dispositivo u otro hardware que necesitemos de forma media o simple, una aplicación híbrida nos dará todo lo que queremos al menor coste posible.

Sin embargo, si queremos muchas integraciones especificas y complejas con el SO, por ejemplo; edición de fotos o integración con el calendario y la agenda con el asistente de voz, deberías plantearte tirar por las nativas, si bien las híbridas suelen tener plugins de integración con casi todo, el rendimiento y las posibilidades serán mejores en las nativas.

En el último caso, las web, las dejaría únicamente para cuando no es estrictamente necesario tener una aplicación instalada en el móvil. Simplemente algo que necesitemos consultar a través del móvil muy de vez en cuando.

Si hablamos de seguridad, el código nativo en cuanto a aplicaciones móviles se refiere, en principio, son más seguras debido a que no están desarrolladas con Javascript y HTML y además, junto con las híbridas tienen la capa de seguridad que aporta el sistema operativo, pero esto debemos cogerlo con pinzas, ya que depende mucho del desarrollo y la calidad del código.

Mi recomendación para desarrollo multiplataforma ‘mobile’, es utilizar un framework como Ionic, bajo mi punto de vista, es la forma más sencilla de empezar, ya que desarrollar en HTML, Typescript/Javascript y CSS es algo que todos hemos realizado como mínimo varias veces. Quizás el concepto de Typescript es algo más complejo, pero si has llegado aquí, es porque tienes ciertos conocimientos de desarrollo y no será un problema adquirir soltura con este lenguaje.

Ionic, es un framework muy popular basado en Angular y que por debajo puede utilizar Cordova o Ionic Capacitor (a partir de la versión 4) para integrarse con los elementos nativos y compilar para las plataformas ‘mobile’ más extendidas como iOS o Android.
