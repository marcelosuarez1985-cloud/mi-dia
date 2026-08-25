#!/bin/sh
# Genera reuniones-datos.js a partir de los CSV de los libros de actas.
#
#   sh herramientas/generar-datos.sh "ECOA.RE Directorio=/ruta/actas.csv" "GIGNiT=/ruta/gignit.csv"
#
# Los CSV salen de exportar la PÁGINA 2 de cada tablero de Canva.
# Si algo falla no toca el archivo que ya está: mejor datos viejos que vacíos.
set -e

aqui=$(dirname "$0")
destino="$aqui/../reuniones-datos.js"
temporal="$destino.nuevo"
hoy=$(date +%Y-%m-%d)

[ $# -ge 1 ] || { echo "Falta indicar al menos un tablero." >&2; exit 1; }

nombres=""
for par in "$@"; do
  nombre=${par%%=*}
  [ -n "$nombres" ] && nombres="$nombres, "
  nombres="$nombres'$nombre'"
done

{
  echo "// ═══════════════════════════════════════════════════════════"
  echo "//  Temas de reunión — GENERADO AUTOMÁTICAMENTE, no editar a mano."
  echo "//"
  echo "//  Sale de exportar a CSV la página 2 de los tableros de Canva"
  echo "//  (esa página es una hoja, no un kanban de tarjetas)."
  echo "//  Lo regenera herramientas/generar-datos.sh"
  echo "//"
  echo "//  El equipo sigue trabajando en Canva como siempre."
  echo "// ═══════════════════════════════════════════════════════════"
  echo
  echo "const REUNIONES_ACTUALIZADO = '$hoy';"
  echo "const REUNIONES = [$nombres];"
  echo
  echo "const TEMAS = ["
  for par in "$@"; do
    nombre=${par%%=*}
    csv=${par#*=}
    [ -f "$csv" ] || { echo "No encuentro el CSV: $csv" >&2; exit 1; }
    awk -f "$aqui/csv-a-tsv.awk" "$csv" \
      | awk -v reunion="$nombre" -v hoy="$hoy" -f "$aqui/tsv-a-temas.awk"
  done
  echo "];"
} > "$temporal"

# Red de seguridad: si salieron demasiado pocos temas, algo se rompió.
cuenta=$(grep -c '^  { reunion:' "$temporal" || true)
if [ "$cuenta" -lt 10 ]; then
  echo "Sólo salieron $cuenta temas. Eso no puede estar bien: no piso el archivo." >&2
  rm -f "$temporal"
  exit 3
fi

mv "$temporal" "$destino"
echo "$cuenta temas escritos en reuniones-datos.js"
