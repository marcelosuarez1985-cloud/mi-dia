#!/bin/sh
# Regenera los temas de reunión y los publica, pero SÓLO si algo cambió.
#
#   sh herramientas/actualizar-reuniones.sh "ECOA.RE Directorio=/ruta/a.csv" "GIGNiT=/ruta/b.csv"
#
# Si no hay cambios de contenido no toca nada: no tiene sentido publicar
# todos los días un archivo idéntico salvo la fecha.
set -e
cd "$(dirname "$0")/.."

antes=$(grep '^  { reunion:' reuniones-datos.js 2>/dev/null | sort || true)
sh herramientas/generar-datos.sh "$@"
despues=$(grep '^  { reunion:' reuniones-datos.js | sort)

if [ "$antes" = "$despues" ]; then
  git checkout -- reuniones-datos.js 2>/dev/null || true
  echo "SIN-CAMBIOS"
  exit 0
fi

# Subir la versión hace que los teléfonos bajen la copia nueva en vez de
# quedarse con la vieja guardada. Ya pasó una vez: sin esto, no llega.
v=$(grep -o "mi-dia-v[0-9]*" sw.js | head -1 | tr -d 'a-z-')
nueva=$((v + 1))
sed -i "s|?v=$v|?v=$nueva|g" index.html
sed -i "s|mi-dia-v$v|mi-dia-v$nueva|" sw.js

git add -A
git commit -q -m "Actualiza los temas de reunión desde Canva ($(date +%d/%m/%Y))

Regenerado por herramientas/actualizar-reuniones.sh.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
git push -q
echo "PUBLICADO v$nueva"
