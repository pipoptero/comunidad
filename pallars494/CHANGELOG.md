# Registro de cambios

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
