# Uso de servidores en aplicaciones ejecutadas en cliente #

<p align="center">
  <img src="https://github.com/dcarvajal7/examples/blob/master/ionic4/assets/banner-1.png" width="800">
</p>

## Introducción ##
Las razones para utilizar un servidor remoto en una aplicación que se ejecuta en cliente son muchas y dependen de muchos factores que vamos a tratar en este artículo. Pero primero, ¿qué es una aplicación que se ejecuta en cliente?

Para conocer la respuesta a esa pregunta, debemos diferenciar entre la lógica que se ejecuta en un servidor y la que se ejecuta en el cliente. Cuando decimos lógica (ya sea de negocio o funcional), nos referimos a los algoritmos que se procesan en una aplicación, ya sean procesos sencillos como operaciones matemáticas o procesos más pesados como recuperar una información cribada en una base de datos con millones de registros o preparar los datos de cara a su uso en la vista.

Por lo tanto, cuando hablamos de una aplicación ejecutada íntegramente en servidor (como PHP o Java con JSF), sabemos que la lógica se ejecuta directamente en un servidor remoto y lo que llega al navegador es una simple vista. Puede tener algo de lógica para ejecutar en cliente gracias a Javascript, pero no llega al nivel de aplicación, ya que normalmente se limita a procesar pequeñas lógicas de estilo o formato de datos, etcétera.

Gracias a tecnologías como Angular o Android, podemos ver aplicaciones con ciclos de vida, lógica de negocio, procesado de datos ejecutándose directamente en nuestro móvil o navegador, sin limitarse a lo meramente representativo que teníamos cuando usábamos JSF o PHP. Estamos hablando de aplicaciones que se ejecutan completamente en clientes.

El uso de estas tecnologías, ha permitido ejecutar aplicaciones no sólo en SO como macOS o Windows (como puede ser Photoshop, Microsoft Word, etcétera), si no que ahora los navegadores web o dispositivos móviles, son plataformas en las que podemos ejecutar aplicaciones con la diferencia de que ahora son multiplataformas, por lo que un único desarrollo nos vale para ejecutarlas donde sea.

Quiero que tengáis en cuenta que usar una tecnología u otra no implica que estáis siguiendo un patrón cliente-servidor, debido a que prácticamente cualquier tecnología te permite, en menor o mayor medida, crear aplicaciones con o sin servidor remoto. Pero cuando pongo como ejemplo algún framework o herramienta, es porque realmente tiene utilidades dentro de ese contexto.

Por ejemplo Angular, te permite crear aplicaciones completas para ejecutarlas en local sin conexión a ningún servidor, incluso se podría conectar con bbdd local y tener una aplicación completamente funcional. Pero donde realmente podemos aprovechar toda la potencia de este framework, es dentro de un marco cliente-servidor.

Como punto negativo, siempre implementar dos aplicaciones en lugar de una, tiene un coste mayor y debemos pensar si realmente el usuario necesita estas características.

<p align="center">
  <img src="https://github.com/dcarvajal7/examples/blob/master/ionic4/assets/Esquema-no-server.png" width="300">
</p>

## ¿Cuándo debemos utilizar un servidor remoto? ##
Los siguientes puntos son validos para aplicaciones que, o bien se ejecutan íntegramente en servidor o bien mantienen un patrón frontend-backend, ya sean aplicaciones móviles, de escritorio, web, etcétera como veremos más adelante en este mismo artículo.

Disponibilidad de los datos en cualquier dispositivo y momento
Una de las principales ventajas de utilizar un servidor remoto, es la disponibilidad que tienen los usuarios de acceder a sus datos desde cualquier dispositivo en cualquier momento.

Como la información no se almacena en el dispositivo, no tendrá problemas en cambiar al dispositivo que mas le interese en cada momento ni temerá perderlos, por lo que es un plus de cara a los usuarios.

## Compartir información entre usuarios ##
Otra de las grandes ventajas de el uso de servidores, es la posibilidad de intercambiar información entre usuarios, sin necesidad del uso de redes locales o tecnologías como bluetooth.

Se consigue almacenando la información en el servidor, al mismo al que acceden otros usuarios y puedan recuperarla. Por supuesto, hay que implementar diferentes mecanismos de seguridad para que los usuarios no puedan ver la información que no se desea compartir.

## Optimización ##
Es evidente que, una aplicación ejecutada navegador web o en un dispositivo móvil (aunque cada vez más), no tiene toda la potencia de un PC ejecutando aplicaciones nativas. Entonces, lo normal es intentar que parte (o toda) de esa lógica (sobre todo la de negocio) se ejecute de lado de un servidor remoto. De esta forma, liberamos la pesada carga de procesamiento de datos en dispositivos como un navegador web o un móvil, que se encuentran más limitados en cuanto a potencia se refiere.

Un servidor remoto puede ser tan potente como queramos, podemos incluso ejecutar servidores en paralelo compartiendo información, lo cual los hace mucho menos limitados que cualquier aplicación móvil o navegador web.

En una aplicación ejecutada íntegramente en servidor (JSF, PHP, JSP, ….) no tendremos este problema, ya que el navegador lo único que tiene que procesar es una vista HTML con css y posiblemente algo de Javascript.

También existen excepciones, como por ejemplo los juegos móviles, donde prácticamente todo se ejecuta de lado del cliente, ya que la tasa de refresco debe ser inmediata, por lo que la comunicación con el servidor se relega a funciones como la comunicado en el juego online o guardado de datos en la nube. En este caso, dependemos directamente del hardware del dispositivo donde se ejecuta, que en la mayoría de casos estará fuera de nuestro control, por lo que las labores de optimización deben ser muy finas.

<p align="center">
  <img src="https://github.com/dcarvajal7/examples/blob/master/ionic4/assets/Esquema-server.png" width="300">
</p>

## Frontend y Backend ##
Cada vez es más común ver diferentes proyectos que se comunican entre sí, con diferentes funcionalidades:

Frontend, aplicación que se ejecuta íntegramente en cliente, de forma local y necesita tener un backend que le provea información.
Backend, aplicación que se ejecuta en un servidor remoto, contiene la lógica de negocio, se trata y se envía a la parte frontend.
Un ejemplo de aplicación frontend, pueden ser aplicaciones desarrolladas con Angular o Ionic para web y ‘mobile’ respectivamente. Pero cuidado, si nuestra aplicación es puramente ‘offline’ sin comunicación con un servidor remoto, ya no podremos diferenciarlas entre frontend y backend, y por lo tanto, tendremos una aplicación completa, a secas.

Además, es común ver otro tipo de aplicaciones haciendo de nexo entre frontend y backend, incluso estos se pueden granular mucho, estableciendo diferentes subproductos que en conjunto forman el backend.

## Distribución de lógica de negocio y funcional ##
La lógica de negocio debe ejecutarse puramente en el servidor, es donde se realizan las tareas más pesadas y donde podremos dedicar más recursos, debido a que los servidores están precisamente creados y optimizados para ello.

La lógica funcional se encuentra dividida entre lo que cada uno necesita, es decir, nuestra aplicación ‘backend’ ejecutada en el servidor remoto, requiere de ciertas necesidades para el funcionamiento interno que se ejecutan allí y la aplicación ‘frontend’, requiere de cierta lógica para manejar los flujos de información recibidos por el servidor, o procesamiento de funciones sencillas que no son necesarias ejecutarlas en un servidor con más potencia.

Esto nos beneficia, en que cada arquitectura se construye para un determinado fin, con el que cada punto va a estar mucho más optimizado y preparado para lo que va a ejecutar. Podéis ver en frameworks como Angular, las posibilidades que ofrece en sus componentes y como podréis comprobar, esto sería imposible de ver en aplicaciones ejecutadas íntegramente en servidor.

## Aplicaciones separadas ##
El hecho de poder disponer de aplicaciones separadas, diferenciando muy bien cuál es su función, nos permite un desarrollo más ordenado y podemos focalizar el objetivo de cada una mejor.

Gracias a tecnologías como Angular, podemos crear aplicaciones increíbles con un aspecto de aplicación nativa y un funcionamiento parecido, te puedes olvidar de las recargas completas de página y mantener datos en tiempo real.

Al igual que gracias a tecnologías como Spring, podemos crear aplicaciones backend seguras, solidas y robustas con una lógica de negocio bien construida.

<p align="center">
  <img src="https://github.com/dcarvajal7/examples/blob/master/ionic4/assets/Esquema.png" width="300">
</p>

## Conclusiones ##
Para mí, no es tan importante el nombre que le pongamos a los mecanismos que utilizamos para desarrollar nuestra aplicación, como que tengamos conocimientos de que existen y de usar el que mejor nos valga en cada momento.

Debemos conocer las limitaciones que tienen los diferentes dispositivos o entornos donde se van a ejecutar las aplicaciones que desarrollemos, por lo tanto, deberíamos utilizar servidores remoto para ejecutar en ellos la lógica de negocio y todos los algoritmos más pesados, porque posiblemente en un navegador o en un dispositivo móvil, penalizarían mucho en rendimiento.

A parte tenemos la principal ventaja de utilizar servidores remotos, el intercambio de información entre usuarios y la disponibilidad de nuestros datos en cualquier dispositivo, en cualquier momento.

Por lo que yo, sólo dejaría de usar servidores remoto en el caso de que el modo ‘offline’ sea imprescindible o necesitemos de una tasa de refresco inmediata, siempre que hablemos de aplicaciones puramente ejecutadas en un sistema operativo nativo. Por supuesto, las aplicaciones de tipo JSF y demás, ejecutadas puramente en el servidor, sí que cuentan con esta característica.


