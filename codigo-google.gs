// ═══════════════════════════════════════════════════════════
//  Código para Google Apps Script — entrega tu calendario a la app
//  Pegar TODO esto reemplazando lo que haya, y volver a implementar.
// ═══════════════════════════════════════════════════════════

function doGet() {
  var cal = CalendarApp.getDefaultCalendar();

  // Arrancamos desde las 00:00 de HOY, no desde "ahora".
  // Así la app muestra el día completo y podés ver lo que ya pasó.
  var desde = new Date();
  desde.setHours(0, 0, 0, 0);

  // Tres semanas y media hacia adelante: Marce quiere poder desplegar
  // los días que vienen con dos o tres semanas de anticipación.
  var hasta = new Date(desde.getTime() + 22 * 24 * 60 * 60 * 1000);

  var eventos = cal.getEvents(desde, hasta).map(function (ev) {
    // Si alguien te invitó y todavía no contestaste, la app te lo muestra
    // aparte. INVITED = sin responder · MAYBE = dijiste "quizás".
    var respuesta = '';
    try {
      var s = ev.getMyStatus();
      if (s) respuesta = String(s);
    } catch (e) {}

    // Quién lo creó, para saber quién te está invitando.
    var quien = '';
    try {
      var c = ev.getCreators();
      if (c && c.length) quien = c[0];
    } catch (e) {}

    return {
      titulo:      ev.getTitle(),
      inicio:      ev.getStartTime().toISOString(),
      fin:         ev.getEndTime().toISOString(),
      lugar:       ev.getLocation() || '',
      descripcion: ev.getDescription() || '',
      todoElDia:   ev.isAllDayEvent(),
      respuesta:   respuesta,
      invitaba:    quien
    };
  });

  return ContentService
    .createTextOutput(JSON.stringify(eventos))
    .setMimeType(ContentService.MimeType.JSON);
}
