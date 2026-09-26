#!/bin/sh
# Baja los libros de actas, regenera los temas de reunión y los publica,
# pero SÓLO si algo cambió.
#
#   sh ".../herramientas/actualizar-reuniones.sh" "ECOA.RE Directorio=<url o ruta>" "GIGNiT=<url o ruta>"
#
# Cada tablero va como Nombre=origen. Si el origen empieza con http, el CSV se
# baja acá adentro; si no, se usa como archivo local.
#
# Por qué la descarga está acá y no afuera: Canva da una dirección de descarga
# distinta en cada exportación. Si la tarea automática corría su propio curl,
# cada corrida era un comando nuevo y le pedía permiso a Marce todas las veces.
# Así la tarea usa siempre este mismo comando y alcanza con aprobarlo una vez.
#
# Al final dice, en un renglón que empieza con PARA-MARCE:, los temas nuevos
# cuyo responsable es Marcelo Suárez o "Todos", para que la tarea no tenga que
# correr ningún otro comando para saber si avisarle.
set -e
cd "$(dirname "$0")/.."

[ $# -ge 1 ] || { echo "Falta indicar al menos un tablero." >&2; exit 1; }

tmp="${TEMP:-${TMPDIR:-/tmp}}/reuniones-canva"
mkdir -p "$tmp"

# ── 1. Conseguir los CSV ──
locales=""
n=0
for par in "$@"; do
  nombre=${par%%=*}
  origen=${par#*=}
  n=$((n + 1))
  case "$origen" in
    http*)
      destino="$tmp/tablero$n.csv"
      rm -f "$destino"
      if ! curl -sfL --max-time 60 -o "$destino" "$origen"; then
        echo "ERROR: no pude bajar el libro de actas de $nombre." >&2
        exit 2
      fi
      ;;
    *) destino="$origen" ;;
  esac
  [ -s "$destino" ] || { echo "ERROR: el CSV de $nombre vino vacío." >&2; exit 2; }
  locales="$locales
$nombre=$destino"
done

# ── 2. Regenerar y comparar ──
antes=$(grep '^  { reunion:' reuniones-datos.js 2>/dev/null | sort || true)

# Pasar los pares "Nombre=archivo" respetando los espacios de los nombres
viejoIFS=$IFS
IFS='
'
set -- $(printf '%s\n' "$locales" | sed '/^$/d')
IFS=$viejoIFS
sh herramientas/generar-datos.sh "$@"

despues=$(grep '^  { reunion:' reuniones-datos.js | sort)

# Para saber si el dato es fresco: la fecha de alta más reciente entre los temas
reciente=$(grep -o 'desde: "[0-9]*/[0-9]*/[0-9]*"' reuniones-datos.js \
  | sed 's/desde: "//; s/"//' \
  | awk -F/ '{ printf "%04d%02d%02d %s\n", $3, $2, $1, $0 }' | sort | tail -1 | cut -d' ' -f2)
echo "Tema más reciente cargado en Canva: ${reciente:-sin fecha}"

if [ "$antes" = "$despues" ]; then
  git checkout -- reuniones-datos.js 2>/dev/null || true
  echo "SIN-CAMBIOS"
  echo "PARA-MARCE: nada"
  exit 0
fi

# ── 3. Qué hay de nuevo para Marce ──
# Renglones que aparecen ahora y no estaban, con responsable él o "Todos",
# y que no estén cerrados.
nuevos=$(printf '%s\n' "$despues" | grep -vxF -e "$antes" 2>/dev/null \
  | grep -E 'responsable: "(Marcelo Suárez|Todos|TODOS)"' \
  | grep -vE 'estado: "(✅️ Listo|🚮 Descartado)' \
  | sed 's/.*reunion: "\([^"]*\)".*tema: "\([^"]*\)".*vence: "\([^"]*\)".*/\1 · \2 · vence \3/' || true)

# ── 4. Publicar ──
# Subir la versión hace que los teléfonos bajen la copia nueva en vez de
# quedarse con la vieja guardada. Ya pasó una vez: sin esto, no llega.
sh herramientas/subir-version.sh

git add -A
git commit -q -m "Actualiza los temas de reunión desde Canva ($(date +%d/%m/%Y))

Regenerado por herramientas/actualizar-reuniones.sh.

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
git push -q
echo "PUBLICADO"

if [ -n "$nuevos" ]; then
  printf '%s\n' "$nuevos" | sed 's/^/PARA-MARCE: /'
else
  echo "PARA-MARCE: nada"
fi
