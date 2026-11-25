# Registro de cambios

## 3.1 desarrollo — asistente simplificado y manual

- El asistente presenta cuatro estados: no tengo el dato, definitivo, estimado y no aplica. Los estados internos previos se conservan y los parciales y provisionales se muestran como estimados. Un importe parcial anterior no se aplica al cálculo salvo que se elija expresamente usarlo como estimación.
- Las preguntas obligatorias no ofrecen no aplica. Las preguntas muestran explicación breve, fuente sugerida y acceso al capítulo pertinente; procedencia y vigencia quedan disponibles en un desplegable.
- Manual independiente con 16 capítulos, índice, búsqueda, enlaces relacionados e impresión por el navegador. La ayuda contextual vuelve a la misma pregunta conservando los valores no enviados durante la consulta.
- Se mantiene el motor, los escenarios, los estados internos, los metadatos y el esquema JSON v8. La versión usa almacenamiento independiente y migra la copia anterior válida sin sobrescribirla. No se incorporan datos reales.
- Pruebas automatizadas de compatibilidad, estados, datos parciales, enlaces, regreso sin pérdida y cálculos existentes. Se comprobó navegación contextual en navegador local; queda pendiente la revisión completa en dispositivos móviles y de la salida PDF.


## 3.0 desarrollo — asistente guiado

- Inicio con asistente, continuación, pendientes, modo avanzado, resultados e importación. Se conserva el motor y las funciones de versiones anteriores.
- Recorrido de 15 preguntas en ocho etapas más resultados, con ayuda contextual, referencia privada, procedencia, fecha, vigencia, observaciones y clasificación de la información. Los datos incompletos se conservan como referencia sin sustituir el total económico. Un dato desconocido no se convierte en cero en el resultado guiado.
- Los importes vinculados alimentan el mismo modelo del modo avanzado; las concesiones y cobros de referencia no se imputan por sí solos a las viviendas. El inventario se edita con una tabla de 32 viviendas y acciones para varias seleccionadas; los cambios quedan provisionales.
- Solo se omiten respuestas no aplicables o validadas con fecha de vigencia no caducada. Sin fecha de vigencia se vuelven a preguntar. Cambiar un dato vinculado en el modo avanzado invalida su validación previa.
- Los datos desconocidos e incompletos aparecen automáticamente en la documentación pendiente y en su CSV con documento, interlocutor, fecha, observaciones y consecuencia. Respuestas y progreso se guardan en el escenario y el JSON v8; las versiones anteriores no leen v8. Se migran escenarios previos sin inventar validaciones.
- Referencias de entidades configurables en modo avanzado. La dirección de obra queda vacía por defecto en la copia pública para no incorporar información personal; puede completarse en el escenario privado. La distribución física sigue fijada a las 32 viviendas, con coeficientes editables.
- Los resultados con datos desconocidos o incompletos no se muestran como liquidación calculable. El modo avanzado conserva sus importes ficticios y sus advertencias. Las validaciones del usuario no sustituyen una aprobación formal.
- Pruebas automatizadas de cálculo compartido, migración, preguntas condicionales, referencias parciales, vigencia, persistencia y configuración múltiple. Comprobación interactiva local de navegación inicial y recuperación; faltan pruebas completas en móviles y navegadores.


## 2.6 desarrollo — sobrecostes, ampliaciones y validación

- Los costes subvencionables reconocido inicialmente y definitivo son referencias opcionales. Los sobrecostes comunes subvencionables y no subvencionables se añaden al coste común y se reparten por coeficiente sin exención automática. No duplicarlos en el coste común ni en los ajustes de negociación; es una hipótesis pendiente de validación.
- Las ampliaciones de ayudas colectiva e individual son importes simulados separados de los datos de concesión, y afectan al saldo únicamente como hipótesis imputadas. No actualizan lo concedido o cobrado ni son nuevas resoluciones.
- Aerotermia, splits, traslado y otros trabajos pueden clasificarse como comunes, particulares o pendientes, con elegibilidad independiente. Los conceptos comunes se añaden una vez al reparto y conservan su clasificación de elegibilidad por concepto.
- Nuevo registro desplegable con 12 requisitos en seis grupos, interlocutor, estado, fecha, observaciones y referencia opcional. Se guarda en el JSON y se puede exportar el listado pendiente. Las cifras y las anotaciones reales no se publican en el repositorio.
- Los resultados quedan identificados como provisionales mientras existan requisitos no resueltos, viviendas sin confirmar, coste total, sobrecostes o elegibilidad pendientes. Las diferencias de céntimos no se regularizan automáticamente.
- JSON v7 migra escenarios anteriores válidos sin inventar ayudas concedidas y conserva el reparto anterior; versiones previas no importan v7. Clave local independiente.
- El registro sirve para organizar información necesaria para la calculadora; no gestiona ni almacena documentos. Su validación es una indicación del usuario y no sustituye la revisión económica, jurídica o de la entidad concedente.


## 2.5 desarrollo — elegibilidad y seguimiento de ayudas

- Se conservan las ayudas colectiva e individual imputadas, anticipos, gastos comunes, particulares y financiación anteriores.
- Elegibilidad de cada vivienda por parte común, aerotermia, splits, traslado particular y otros: subvencionable, no subvencionable o pendiente. Los traslados comunes se incluyen en la parte común. Los porcentajes 80 % y 100 % son referencias matemáticas, no resolución ni cálculo de derecho.
- Estado de ayuda individual desconocida, solicitada, concedida, denegada o cobrada; importes concedido y cobrado opcionales y diferencia cuando ambos son conocidos. Estos campos son informativos: para descontar la ayuda se registra explícitamente una vez en el importe individual imputado existente. Se advierte cuando la imputación y concesión difieren.
- Controles de ayuda imputada superior a elegibilidad conocida, importes cobrados superiores a concedidos, estados incoherentes y posibles diferencias entre totales globales y sumas de viviendas. Las sumas individuales son parciales si faltan fichas. No pueden detectar por sí mismos todas las duplicidades ni validar resoluciones.
- Las tablas colectivas en pantalla, impresión y CSV ocultan los campos de ayudas y saldos individuales; la ficha individual y los escenarios JSON sí contienen datos sensibles y requieren tratamiento privado. El código de acceso de la web pública no es seguridad.
- JSON v6 migra escenarios v1 a v5 válidos sin inferir concesión o elegibilidad; nuevos escenarios no se abren en versiones previas. Clave de almacenamiento independiente. No se incluyen datos reales o situaciones personales.


## 2.4 desarrollo — reparto individual y conciliación

- Revisión previa: existían gastos comunes y particulares, paquetes de splits con excepciones, ayudas individuales y colectivas, anticipos, préstamo informativo y exportación general. Se mantienen sus funciones.
- El traslado por vivienda admite clasificación común, particular o pendiente. Los comunes se agregan una vez al coste común y se reparten por coeficiente; los particulares se imputan a la vivienda; los pendientes se advierten y excluyen hasta determinar criterio. No incluir estos traslados una segunda vez en el coste común manual. Al migrar escenarios anteriores se conserva su imputación particular.
- Precio unitario opcional por split con prioridad sobre paquetes; la excepción de vivienda continúa siendo el coste total de su paquete. Valores vacíos no son cero.
- Coste total objetivo opcional y diferencia con el coste repartido, con aviso si no coincide. La igualdad no demuestra que las facturas no contengan partidas duplicadas: requiere cotejo documental.
- Liquidación muestra bruto, ayudas por clase, neto antes de anticipos, anticipos, pendiente y excedente. Exportación CSV de conciliación global y ficha individual, además del CSV de 32 viviendas.
- Se mantienen provisionales las reglas de reparto; los importes iniciales siguen siendo ficticios. No se incorpora ningún dato económico real al repositorio.
- JSON versión 5: migra versiones anteriores válidas sin sobrescribirlas; los nuevos escenarios no son compatibles hacia atrás. Nueva clave local aislada.


## 2.3 desarrollo — conciliación económica

- Campos opcionales de referencia para bases y tipos de IVA de obra y honorarios, ayudas colectivas e individuales concedidas y cobradas, facturas pagadas y pendientes, capital dispuesto, vivo y amortizado, intereses y comisiones. No se cargan cifras documentales reales. Los campos vacíos indican ausencia de datos.
- Los datos de conciliación son informativos y no modifican los saldos de las viviendas. Las ayudas se imputan únicamente en los campos de reparto existentes. Los préstamos son financiación y nunca reducen el coste; los anticipos ya imputados no se vuelven a restar. No es una contabilidad de movimientos ni un libro de facturas.
- Ajustes positivos y negativos al coste común para estudiar resultados de negociación; impide reducciones que hagan negativo el coste común. El usuario debe evitar incluir dos veces partidas ya reflejadas en el coste común.
- Se muestran coste bruto repartido, coste neto tras ayudas imputadas y antes de anticipos, subvenciones pendientes de cobro cuando hay ambos datos, y avisos de posibles incoherencias. El coste simulado corresponde a los importes configurados, no se concilia automáticamente con contratos o facturas.
- Estado adicional de datos finales introducidos, sin afirmar aprobación. JSON versión 4 compatible con escenarios v1, v2 y v3 válidos; la versión anterior no puede abrir v4. Copia local aislada `p494-derrames-v2.3-dev`.
- Pendiente: fuentes, desglose completo de conceptos e impuestos, trazabilidad individual de ayudas, movimientos financieros, conexión entre escenarios y comparación automatizada. Validar criterios contables y financieros antes de usarlos como liquidación.


## 2.2 desarrollo — 25/11/2026

- Una vivienda puede tener como máximo una compresora trasladada; su coste es particular. Splits de 0 a 4, aerotermia y traslado pueden combinarse.
- Precios particulares opcionales de aerotermia, paquete de splits y traslado. Vacío usa la tarifa general y cero es válido; el precio particular del paquete se mantiene si se cambia el número de splits, por lo que debe revisarse.
- Inventarios pendientes, provisionales, confirmados y confirmados sin actuaciones. El inventario pasa a provisional al cambiar las actuaciones.
- Cuadro de mando con alertas de inventarios incompletos, diferencias de reparto y conciliación financiera. Ficha y CSV incluyen precios aplicados. Se mantiene el cálculo de cuota teórica y la advertencia sobre el préstamo.
- Exportación de esquema JSON versión 3. Importa escenarios válidos v1 y v2 con hasta un traslado por vivienda; si hay más, se rechaza sin modificar ni sobrescribir el original para revisión. Los escenarios v3 no se pueden abrir en versiones anteriores. Nuevo almacenamiento local `p494-derrames-v2.2-dev`; el primer arranque copia el estado anterior válido sin borrarlo.
- No se ha cambiado el criterio de ayudas, financiación o redondeo; siguen siendo hipótesis pendientes de validación. Se mantienen las limitaciones sobre precisión y comprobaciones en dispositivos reales.


## 2.1 desarrollo — fase 1 — 25/11/2026

La versión 2.0 original se conserva intacta. El archivo de desarrollo es `app/Pallars494_derrames_v2_1_desarrollo.html`. No se ha publicado ni requiere conexión.

### Protección y recuperación
- Clave local independiente `p494-derrames-v2.1-dev`: no se escribe ni elimina `p494-derrames-v2`. En la primera apertura se intenta copiar el escenario v2 local si existe y es válido. El almacenamiento local puede depender de la dirección y políticas del navegador; exportar JSON como copia portátil.
- Si los datos locales no se pueden interpretar, se bloquea el guardado y se permite descargar su contenido sin modificar. Tras guardar la copia, la persona usuaria puede habilitar expresamente el guardado del escenario mostrado. Si el navegador deniega el acceso al almacenamiento, se debe exportar el JSON.
- La importación valida antes de reemplazar el escenario activo y muestra el motivo del rechazo. Se exigen 32 nombres identificables en orden; no se reordena automáticamente. Se detectan faltas, nombres duplicados, campos desconocidos en v2 y valores fuera de límites. Los campos numéricos modificados en formularios rechazan valores inválidos en lugar de convertirlos a cero o recortarlos.
- Se admiten los escenarios normales de v2 y v1: en v1 se reconocen `Entlo.` y los parámetros numéricos guardados como texto. La v1 no tiene confirmación de inventario ni ayuda colectiva; se inicializan respectivamente como pendiente y cero. Como ya ocurría en v2, los parámetros de la calculadora individual de ejemplo de v1 no forman parte del registro de las 32 viviendas y no se trasladan al modelo de v2.
- Los JSON de 2.1 conservan el esquema v2. Las viviendas desordenadas, incompletas o con datos que antes se corregían silenciosamente se rechazan para evitar pérdidas; conservar el archivo original y corregirlo con cuidado antes de importarlo.

### Pruebas
- `node --test tests/fase1.test.cjs`: diez pruebas automatizadas para cálculo base, excedentes, modalidades, lectura v1/v2, protección de identidad, rechazo de errores, migración local, recuperación y flujo de importación. Los tests ejecutan el JavaScript real con una simulación del navegador; no sustituyen pruebas visuales ni interactivas en un navegador real.

### Pendiente
- Cuatro estados de vivienda, tarifas individuales sin perder inventario, gestión y duplicación de múltiples escenarios, comparativa futura, ampliación completa de ayuda y mejoras de diseño y accesibilidad.
- Estudiar representación monetaria en céntimos y criterios de redondeo; los cálculos de esta versión siguen el modelo y redondeos de v2. Los controles existentes muestran diferencias sin decidir automáticamente cómo regularizarlas.
- Comprobar impresión, accesibilidad, dispositivos y navegadores reales; revisar condiciones de financiación y criterios económicos con la comunidad antes de usar importes reales. La etiqueta de datos contrastados no significa que el reparto esté aprobado.
