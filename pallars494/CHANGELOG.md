# Registro de cambios

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
