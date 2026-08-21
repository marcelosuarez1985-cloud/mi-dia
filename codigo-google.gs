// ═══════════════════════════════════════════════════════════
//  Código para Google Apps Script — entrega tu calendario a la app
//  Pegar TODO esto reemplazando lo que haya, y volver a implementar.
// ═══════════════════════════════════════════════════════════

function doGet() {
  var cal = CalendarApp.getDefaultCalendar();

  // ARREGLO: arrancamos desde las 00:00 de HOY, no desde "ahora".
  // Así la app muestra el día completo y podés ver lo que ya pasó.
  var desde = new Date();
  desde.setHours(0, 0, 0, 0);

  var hasta = new Date(desde.getTime() + 8 * 24 * 60 * 60 * 1000);

  var eventos = cal.getEvents(desde, hasta).map(function (ev) {
    return {
      titulo:      ev.getTitle(),
      inicio:      ev.getStartTime().toISOString(),
      fin:         ev.getEndTime().toISOString(),
      lugar:       ev.getLocation() || '',
      descripcion: ev.getDescription() || '',
      todoElDia:   ev.isAllDayEvent()
    };
  });

  return ContentService
    .createTextOutput(JSON.stringify(eventos))
    .setMimeType(ContentService.MimeType.JSON);
}
