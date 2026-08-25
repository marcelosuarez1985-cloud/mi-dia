# Toma el TSV de un libro de actas y escribe las líneas de TEMAS en JavaScript.
#
# Variables que hay que pasarle:
#   reunion  = nombre de la reunión (va en cada tema)
#   hoy      = fecha de hoy en aaaa-mm-dd
#
# Columnas de la hoja de Canva, en este orden:
#   1 FECHA · 2 PROPONE · 3 TEMAS · 4 TAREAS · 5 RESPONSABLE
#   6 FECHA LÍMITE · 7 ESTADO · 8 NOTAS · (GIGNiT suma 9 NOTAS ESPECIALES)
BEGIN {
  FS = "\t"
  split(hoy, h, "-")
  hoyEpoch = mktime(h[1] " " h[2] " " h[3] " 12 0 0")
  VENTANA = 7                      # días: cuánto se muestran los cerrados
  BARRA = sprintf("%c", 92)        # la barra invertida, sin escribirla acá
}

# Pasa d/m/aaaa a segundos. Devuelve 0 si no hay fecha o está rota.
function aEpoch(f,   p) {
  if (split(f, p, "/") != 3) return 0
  if (p[1] + 0 < 1 || p[2] + 0 < 1 || p[3] + 0 < 1900) return 0
  return mktime(p[3] " " p[2] " " p[1] " 12 0 0")
}

function limpiar(s) {
  gsub(/^[ \t]+|[ \t]+$/, "", s)
  return s
}

# Escapa para que el texto entre en un string de JavaScript entre comillas.
# Se hace a mano, carácter por carácter: con gsub habría que escribir barras
# invertidas dentro de una expresión regular y se vuelve ilegible.
function js(s,   i, c, r) {
  s = limpiar(s)
  r = ""
  for (i = 1; i <= length(s); i++) {
    c = substr(s, i, 1)
    if (c == BARRA || c == "\"") r = r BARRA c
    else r = r c
  }
  return r
}

NR == 1 { next }                                   # la fila de encabezados

{
  desde = limpiar($1); propone = limpiar($2); tema = limpiar($3)
  tarea = limpiar($4); resp = limpiar($5); vence = limpiar($6); estado = limpiar($7)

  if (tema == "" && tarea == "") next               # fila vacía o separadora

  # Los cerrados viejos no entran: son cientos y tapan lo que importa.
  # Sólo los de la última semana, como repaso de lo que se cerró.
  if (estado ~ /Listo|Descartado/) {
    e = aEpoch(vence)
    if (e == 0) next
    dias = int((e - hoyEpoch) / 86400)
    if (dias < -VENTANA || dias > VENTANA) next
  }

  printf "  { reunion: \"%s\", estado: \"%s\", tema: \"%s\", tarea: \"%s\", responsable: \"%s\", vence: \"%s\", propone: \"%s\", desde: \"%s\" },\n", \
    js(reunion), js(estado), js(tema), js(tarea), js(resp), js(vence), js(propone), js(desde)
  cuenta++
}

END { if (cuenta == 0) exit 3 }                     # CSV vacío o mal parseado
