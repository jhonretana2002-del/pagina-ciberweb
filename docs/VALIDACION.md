# Validación de la primera versión de Ciberweb

Registro de comprobaciones de la adaptación visual y de la publicación en GitHub Pages.

## Ampliación audiovisual por sector

- Las siete escenas de sectores cuentan con un video local y una imagen fija de respaldo; la portada conserva su propio video. Se comprobaron las ocho rutas de video, las ocho imágenes de respaldo y sus ocho controles.
- Se revisaron en navegador las escenas de clínicas y joyerías en escritorio, y veterinarias y calzado en móvil. Los titulares y botones se leen sobre el degradado.
- Se comprobó que el video se pausa desde su control y que el concepto de joyerías abre y cierra correctamente.
- La reproducción automática activa como máximo la escena centrada en pantalla. Las demás quedan pausadas; los videos se cargan al entrar en vista.
- Los seis videos nuevos figuran como gratuitos para uso comercial bajo la licencia Free de Mixkit; las fuentes se registraron en [Recursos visuales](RECURSOS_VISUALES.md).

## Comprobaciones realizadas

- Revisión visual de portada, escenas y tarjetas en computadora y móvil.
- Ventanas solicitadas de 320, 390, 768 y 1440 píxeles; sin desbordamiento horizontal. El área útil del navegador puede ser menor por la barra de desplazamiento.
- Seis fotografías cargadas sin errores al recorrer la página.
- Siete conceptos abiertos, cada uno con su título, descripción y tres propuestas de contenido.
- Cierre de ventanas y recuperación del foco; cierre con Escape comprobado.
- Menú móvil: apertura, navegación y cierre al seleccionar una sección.
- Botones de WhatsApp y correo: aviso temporal visible, sin envío ni destino externo.
- Créditos visuales: siete fuentes disponibles desde el pie de página.
- Video local en MP4: reproducción sin sonido, pausa y reanudación comprobadas. La escena de portada se pausa al quedar fuera de pantalla.
- Montaje de portada revisado en navegador: 16.9 segundos, 1280 píxeles de ancho, reproducción sin sonido y archivo cargado correctamente.
- Código preparado para movimiento reducido y ahorro de datos: no inicia la reproducción automática cuando esas preferencias están activas. Revisión de implementación; no se realizó una prueba del cambio de preferencia a nivel del sistema operativo.
- Sin mensajes de error o advertencia en la consola durante el recorrido revisado.
- Recursos locales, anclas de navegación, identificadores y enlaces internos de la documentación comprobados.
- Sintaxis de JavaScript y revisión de diferencias de Git sin errores.
- La página y sus metadatos ya no contienen la marca ni los contactos de OdontoSalud.

## Chatbot de Ciberweb

- Apertura y cierre desde el botón flotante, conservación de la conversación al cerrar y reinicio comprobados.
- Las siete opciones de sector entregan una respuesta propia con tres propuestas y acceso a las secciones de la página.
- Preguntas escritas sobre veterinarias, precios, contacto y consultas desconocidas comprobadas.
- El contenido escrito se muestra como texto; una prueba con etiquetas HTML no creó elementos ni ejecutó contenido.
- Cierre mediante Escape y devolución del foco al botón de apertura comprobados.
- Adaptación del panel a móvil y a ventanas de poca altura. La preparación para teclado virtual usa el área visible del navegador; no se probó en un teléfono físico.
- El chat identifica sus respuestas como automáticas. No utiliza servicios externos de conversación, no envía consultas al equipo y no guarda mensajes al recargar.
- Los canales de contacto siguen pendientes de los enlaces del cliente; el chatbot lo indica sin inventar destinos, precios ni plazos.

## Botones de redes sociales

- Tres accesos circulares de WhatsApp, Instagram y Facebook adaptados desde OdontoSalud, con el estilo de Ciberweb.
- Cada botón abre un aviso del canal correspondiente mientras se reciben los enlaces reales.
- El aviso de los botones originales de contacto vuelve a su texto general después de consultar una red social.
- Revisados en escritorio y móvil; en móvil se colocan por encima del acceso al chatbot, sin superponerse.
- Se ocultan al abrir el chatbot y reaparecen al cerrarlo. Sin errores en la consola durante la revisión.
- No se utilizan perfiles, números ni enlaces de OdontoSalud.

## Pendientes de contenido

El cliente debe facilitar los enlaces de WhatsApp, correo, Instagram y Facebook. La identidad visual y los mensajes de esta primera propuesta quedan disponibles para su revisión.

Los conceptos presentan posibilidades; no incorporan agendas de citas, cobros, inscripciones ni una tienda en funcionamiento.

## Publicación

La primera adaptación se publicó correctamente mediante GitHub Pages. Se confirmó que el enlace público devuelve la página de Ciberweb y que el documento por fases está disponible en el repositorio.

Vista previa: https://jhonretana2002-del.github.io/pagina-ciberweb/

Documento: https://github.com/jhonretana2002-del/pagina-ciberweb/blob/main/docs/PLAN_CIBERWEB.md
