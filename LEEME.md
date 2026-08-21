# Mi día — asistente personal de Marce

App web personal que arma el día a partir de Google Calendar: horarios reales
de salida de casa, qué clase toca y quién la da, bloques de trabajo en los
huecos, y qué cocinar al mediodía.

**En vivo:** https://marcelosuarez1985-cloud.github.io/mi-dia/

## Qué hay en esta carpeta

| Archivo | Para qué sirve |
|---|---|
| `index.html` | La pantalla. |
| `app.js` | Horarios, traslados, alertas, cierre del día, bloques de trabajo. |
| `programa.js` | Las 83 clases del ciclo 2026 con su responsable y su tema. |
| `comidas.js` | El menú fijo de lunes a viernes, para dos porciones. |
| `salidas.js` | GPS, avisos de salida y el aviso de las 22. |
| `sw.js` | Hace que abra sin internet y que se instale en el teléfono. |
| `manifest.json`, `icono.svg` | Datos e ícono de la app instalada. |
| `codigo-google.gs` | El código del Apps Script que lee el calendario. |
| `comidas-fin-de-semana.md` | Tres platos de sábado, fuera de la app a propósito. |

## Privacidad

**Acá no hay ningún dato privado.** El link del calendario no está en el
código: la app lo pide una vez y lo guarda en el dispositivo. El `.gitignore`
impide que se suba por error.

## Reglas que aplica

Traslados: clases de tarde/noche **2 h antes** · Parque Chacabuco **1 h 10** ·
FLACSO **1 h** (no prepara nada) · gimnasio **5 min** · virtual **sin traslado**.

Cierre del día: se calcula hacia atrás desde la primera actividad de mañana,
restando 45 min de preparación, 7,5 h de sueño y 30 min para dormirse, con un
techo de las 23:00. Los números se cambian arriba de todo en `app.js`.

Bloques de trabajo: huecos de 1 h o más entre las 09:00 y las 19:00, sin
contar el tiempo de traslado. Los domingos no, son de familia.

## Publicar un cambio

La carpeta está conectada a GitHub. Se publica con:

```bash
git add -A && git commit -m "qué cambió" && git push
```

Los cambios tardan uno o dos minutos en verse en el sitio. Si tocás archivos
`.js`, subí también el número de versión en `index.html` (`?v=9` → `?v=10`) y
en `sw.js` (`mi-dia-v9` → `mi-dia-v10`), o los teléfonos siguen con la copia vieja.

## Pendiente

- Planes B y C cuando algo no se cumple (lo más importante del brief).
- Temas de las reuniones.
- Videos de los ejercicios de la rutina.
- Desayunos y cenas: hoy sólo está planificado el almuerzo.
