#!/bin/sh
# Sube el número de versión de la app, leyendo el actual en vez de suponerlo.
#
# Hace falta porque la tarea automática de las 7:05 también lo sube, y si acá
# se asume un número fijo el cambio queda publicado bajo la versión vieja: el
# teléfono sigue mostrando lo de antes. Ya pasó.
set -e
cd "$(dirname "$0")/.."
v=$(grep -o "mi-dia-v[0-9]*" sw.js | head -1 | tr -d 'a-z-')
nueva=$((v + 1))
sed -i "s|?v=$v|?v=$nueva|g" index.html
sed -i "s|mi-dia-v$v|mi-dia-v$nueva|" sw.js
echo "v$v → v$nueva"
