# Cache en el desarrollo de aplicaciones #

## Introducción ##
La optimización de nuestros desarrollos puede ser crucial para una experiencia de usuario óptima. En este artículo vamos a tratar una de las técnicas de optimización más eficaces en el mundo del desarrollo y que mi experiencia dice me dice, que muchas veces no se tiene en cuenta, al menos de la manera correcta.

Primero vamos a explicar que es la cache en el desarrollo de software, básicamente es un componente que va a almacenar información en un lugar de acceso más rápido y que sobrecargue menos el sistema, ya que los datos se guardarán ya tratados, sin necesidad de aplicar algoritmos complejos sobre ellos, de manera que cuando el usuario lo pida de forma recurrente, podamos ofrecerle esa información de la manera más optima posible.

Por ejemplo, en una aplicación que gestiona una lista de coches, si tenemos un listado de modelos disponibles, que cientos de usuarios piden cada vez en una conexión directa a BBDD, estamos sobrecargando el sistema a base de peticiones a nuestra base de datos, porque conlleva apertura de conexión, realizar la consulta, cerrar conexión, tratar los datos, etcétera. Si esta información la almacenamos en memoria y se la damos directamente al usuario cada vez que lo pide, nos estamos ahorrando todos los pasos intermedios (que además la memoria de una aplicación suele ser mucho más rápida y no sobrecarga tanto el sistema como un acceso a BBDD), por lo que nuestro sistema será más optimo. Este es un ejemplo muy simple, pero imaginaros que además la aplicación cliente quiere los datos tratados de una determinada manera, o que la consulta a BBDD es compleja, con varias tablas de por medio y cribando entre millones de datos, la cosa se complica bastante y mantener una cache viva nos puede ayudar mucho.

Esta información debe almacenarse de forma volátil y con un tiempo de expiración para no sobrecargar tampoco la memoria de la aplicación y asegurarnos de que los datos serán frescos (al menos cada vez que expire), si no hemos implementado un refresco de cache correctamente. El refresco de cache suele realizarse cuando los datos cambian y debemos estar muy atento a esto, ya que la información que estemos enseñando puede no ser la más actualizada.

## Tipos de cache en desarrollo de aplicaciones ##
### En servidor ###
#### Hibernate o en cualquier librería de BBDD. ####

Probablemente, estos tipos de cache son auto-gestionados por la propia librería de conexión a BBDD, su misión es minimizar el número de conexiones a BBDD, refrescando los valores únicamente cuando detectan cambios que influyen a los registros en cuestión. Como complejidad o cuidados a parte de su correcta configuración, he de decir que solo son realmente efectivas cuando todo el acceso y operaciones se realizan a través del mismo cliente. Si no, nunca se va a enterar de que algo a cambiado y no podrá refrescar, por lo tanto al usuario no le van a llegar cambios a menos que esta expire.

Por supuesto, existen técnicas de actualización para cada librería desde una escritura externa, aunque tendremos que tenerlo en cuenta cada vez que desarrollemos estas escrituras. Es ideal que se utilice este tipo de cache debido a que normalmente las bases de datos se ubican en un único servidor y cuantas más lecturas se realicen de forma simultánea, más posibilidades tenemos de sobrecargar nuestra base de datos y sí, nos limita a utilizar una misma librería si no queremos complicarnos demasiado, pero creo que por homogeneizar la arquitectura lo veo correcto, a parte que como ya he comentado antes, existen mecanismos para poder refrescar esta cache de forma externa a nuestra librería.




#### Cache de servicios ####

No siempre el modelo de datos se asemeja a lo que los servicios requieren, debido a diversos factores como una re-planificación, el modelo sea más robusto y estable de una determinada manera o simplemente el modelo es único para diversas aplicaciones o pantallas y se crea de la forma más lógica independientemente de donde y cómo se vaya a usar. 

Por ello, él sacar los datos hacia el usuario final puede ser tedioso y requerir de una lógica que implique coste de rendimiento. Este, es un buen sitio para incluir una cache (normalmente por sesión y adecuada a cada usuario si los datos a mostrar dependen de este).

Por ejemplo un listado de categorías por las que un usuario puede crear artículos, teniendo en cuenta que ese listado varía conforme a los permisos de usuario, pero que raramente se añadirán categorías nuevas. A esta cache le pondríamos una expiración larga y un refresco cuando se modifiquen los permisos de cada usuario.




#### Comunicación con otros servicios (cliente en backend) ####

Se podría decir que es cliente, con la diferencia de que se ejecuta en servidor, por lo que probablemente tendremos mucha más potencia y lo que es más importante, se puede balancear en tantas máquinas como queramos si hacemos parte del código de manera stateless. Los criterios aquí de aplicación de cache es la de siempre; si no se va a actualizar nunca, debemos tener los datos cacheados el mayor tiempo posible sin necesidad de actualizar. Y sí son datos susceptibles de tener cambios, la cache debe tener expiración, incluso de podría cachear por sesión si depende del usuario y se debe refrescar cuando sea necesario. Por último, sí son datos muy muy vivos (real time), cachearlo implica un esfuerzo muy grande que realmente no va a optimizar el rendimiento.

Por ejemplo, en una integración con una tienda online, queremos mostrar las categorías de productos, son datos que van a cambiar muy poco y no dependen del usuario. Por tanto, crearíamos una cache global para todos los usuarios con una expiración muy larga. Si en el futuro Amazon añade nuevas categorías, estas se verán cuándo la cache expire.

El esquema sería idéntico al anterior solo que en lugar de pedir a BBDD, se pediría al servicio remoto, tal cual.

### En cliente ###
#### Cache de servicios ####

En el desarrollo de aplicaciones móviles o cualquiera que se ejecute en cliente (React, Angular, Swift, etcétera), probablemente tengamos conexiones a servidor para recibir información como indico en este artículo, lo que implica que dependamos de una conexión decente para que la aplicación sea fluida y que el servidor estará recibiendo continuamente peticiones (también hay que mirar por el rendimiento de los demás aunque no nos implique, dado que un producto final no es solo la parte en la que hemos trabajado sino el conjunto de todo).

En muchas ocasiones, la información que pedimos no ha cambiado, debido a que el simple hecho, de navegar en nuestra aplicación va a provocar constantes actualizaciones, probablemente innecesarias y pedirla al servidor nos va a robar rendimiento, conexión, tiempos de espera, posibles fallos, etcétera. Por tanto, por el bien de el rendimiento del servidor y de la experiencia de usuario es recomendable usarla en cliente también. Pero ojo, no se debe abusar de la cache en cliente, ya que un uso alto, sobrecargaría la memoria del navegador o aplicación móvil y ralentizaría todo, convirtiendo así, una mejora en un problema.




#### Cache de datos de login ####

Esta cache, no se construye para mejorar el rendimiento, si no para hacer login de forma automática en una aplicación móvil o de escritorio (las que van en navegador, lo mejor es que lo gestione el mismo), donde tenemos la certeza de que el usuario del dispositivo es único o no le importa tener su cuenta siempre accesible en ese dispositivo. Aplicaciones como Twitter, Facebook, etcétera, lo usan.

Básicamente es guardar los datos de sesión en cache (encriptados) de manera que cuando entremos en la aplicación, no tengamos que hacer login de nuevo. Por supuesto, aquí sí que hay una llamada a un servicio que verifique si esos datos son correctos, si la sesión no ha expirado, etcétera. Pero se realiza de forma transparente para el usuario en segundo plano.



#### Cache de usuario, por sesión o global ####
En base a lo volátil que queramos que sea nuestra cache, necesitaremos que se guarde por usuario, por sesión o de manera global, hay veces que necesitamos que duren un tiempo determinado o se refresquen cuando realizamos una determinada acción (a parte de la actualización de datos):

Usuario, es una cache que se almacena mientras un usuario esté activo, en cualquiera de sus dispositivos, cuando este sale de todos, se debe borrar. Se utiliza para guardar datos que dependen directamente del usuario, por ejemplo, un listado de coches del cual el usuario es dueño, cada vez que entre en la aplicación, estos coches son los que el usuario va a cargar, por lo tanto no hay necesidad de volver a pedirlos a BBDD (por supuesto, en este ejemplo, la cache se debe actualizar cuando se guarda o se elimina un coche además de cuando el usuario salga de todos los dispositivos en los que ha hecho login).
Sesión, es muy parecida a la anterior, con la diferencia de que es posible que nuestra aplicación requiera de que con el mismo usuario, podamos mantener sesiones distintas e independientes, por lo tanto esta cache seguirá viva siempre y cuando la sesión en un único dispositivo este activa, es decir, si tenemos 2 dispositivos con el mismo usuario, tendremos 2 caches en el servidor, una por cada sesión. Por poner un ejemplo, se suele utilizar para formularios que se complementan en varios pasos y se deben rellenar obligatoriamente desde el mismo dispositivo o sí simplemente queremos que la cache sea más volátil porque nuestros datos están más ‘vivos’.
Global, es una cache que aplica a todos los usuarios, con información que no suele cambiar y que se refrescará normalmente cuando pase el tiempo de expiración, todas deben tener ese tiempo, pero las anteriores no suelen cumplirlo si la aplicación se usa. Por ejemplo, siguiendo el ejemplo anterior, un listado de modelos disponibles de coches, es algo que cambia muy poco y es común para todos los usuarios, por lo tanto, este listado sería un gran candidato para almacenarse en una cache global.



## Conclusiones ##
Dado que la aplicación de la cache, de la manera correcta, puede ser muy beneficioso en muchos aspectos, por ejemplo, en una web con información, los motores de búsqueda van a premiar las páginas más optimas en su búsqueda por la mejor experiencia de usuario o por nosotros mismos de ofrecer una aplicación que se pueda usar sin problemas o para que nuestro servidor no se sobrecargue o cualquiera de las buenas razones que hemos dado más arriba, mi recomendación es que debemos hacer uso de ella.

Tampoco podemos volvernos locos y cachearlo todo, porque la memoria de los navegadores o dispositivos no es infinita y un uso excesivo puede ser peor el remedio que la enfermedad. Por ello os aconsejo un uso inteligente, no cachear lo primero que se nos ocurra, estudiar cada caso y ver todas las posibilidades.

Otro detalle que quiero comentar, es que normalmente los frameworks que usamos, incluso las tecnologías mas básicas sin frameworks o los CMS listos para usar, suelen tener herramientas optimizadas para gestionar una cache, que pueden venirnos muy bien, en lugar de implementar una propia desde 0, lo mejor es buscar en cada caso soluciones, antes de empezar a picar. También he de decir, que hay casos en los que los plugin o herramientas de cache disponibles, empeoran en lugar de mejorar el rendimiento, así que hacer vuestras pruebas primero.

En definitiva, un uso inteligente de la cache, nos vendrá de perlas y puede ser una parte aburrida porque a priori no se ve nada como cuando diseñamos una interfaz o unos servicios en los que si vemos un resultado fácilmente tangible, pero los usuarios lo agradecerán al tener una experiencia más que satisfactoria.
