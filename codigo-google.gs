// ═══════════════════════════════════════════════════════════
//  Código para Google Apps Script — entrega tu calendario a la app
//  Pegar TODO esto reemplazando lo que haya, y volver a implementar.
// ═══════════════════════════════════════════════════════════

function doGet() {
  // Arrancamos desde las 00:00 de HOY, no desde "ahora".
  // Así la app muestra el día completo y podés ver lo que ya pasó.
  var desde = new Date();
  desde.setHours(0, 0, 0, 0);

  // Tres semanas y media hacia adelante: Marce quiere poder desplegar
  // los días que vienen con dos o tres semanas de anticipación.
  var hasta = new Date(desde.getTime() + 22 * 24 * 60 * 60 * 1000);

  var principal = CalendarApp.getDefaultCalendar();
  var idPrincipal = principal.getId();

  // Leemos TODOS los calendarios, no sólo el tuyo: así entran los que están
  // suscritos (Fórmula 1, River, Inter Miami). Los de afuera se marcan como
  // tales para que la app no los tome como compromisos que te ocupan el día.
  var todos = CalendarApp.getAllCalendars();
  var eventos = [];

  for (var i = 0; i < todos.length; i++) {
    var cal = todos[i];
    var propio = cal.getId() === idPrincipal;

    var deEste;
    try {
      deEste = cal.getEvents(desde, hasta);
    } catch (e) {
      continue;                       // un calendario que falla no rompe el resto
    }

    for (var j = 0; j < deEste.length; j++) {
      var ev = deEste[j];

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

      eventos.push({
        titulo:      ev.getTitle(),
        inicio:      ev.getStartTime().toISOString(),
        fin:         ev.getEndTime().toISOString(),
        lugar:       ev.getLocation() || '',
        descripcion: ev.getDescription() || '',
        todoElDia:   ev.isAllDayEvent(),
        respuesta:   respuesta,
        invitaba:    quien,
        calendario:  cal.getName(),
        propio:      propio
      });
    }
  }

  return ContentService
    .createTextOutput(JSON.stringify(eventos))
    .setMimeType(ContentService.MimeType.JSON);
}
