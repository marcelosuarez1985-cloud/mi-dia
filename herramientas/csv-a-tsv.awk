# Convierte un CSV a TSV.
#
# No alcanza con partir por comas: los CSV de Canva traen comas y saltos de
# línea DENTRO de las celdas, entre comillas. Este parser los respeta.
# Los saltos de línea internos se vuelven un espacio.
BEGIN { RS = "^$"; FS = "" }
{
  n = length($0); campo = ""; fila = ""; dentro = 0
  for (i = 1; i <= n; i++) {
    c = substr($0, i, 1)
    if (c == "\"") {
      if (dentro && substr($0, i+1, 1) == "\"") { campo = campo "\""; i++ }
      else dentro = !dentro
    }
    else if (c == "," && !dentro)  { fila = fila campo "\t"; campo = "" }
    else if (c == "\n" && !dentro) { print fila campo; fila = ""; campo = "" }
    else if (c == "\n" && dentro)  { campo = campo " " }
    else if (c != "\r")            { campo = campo c }
  }
  if (length(fila campo) > 0) print fila campo
}
