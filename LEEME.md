# Mi día — asistente personal de Marce

App web personal que muestra el día armado a partir de Google Calendar,
con los horarios de salida de casa calculados y avisos para salir a tiempo.

## Qué hay en esta carpeta

| Archivo | Para qué sirve |
|---|---|
| `index.html` | La pantalla. Es la que se abre. |
| `app.js` | La lógica: horarios, traslados, alertas, cierre del día. |
| `salidas.js` | El GPS y los avisos que insisten para que salgas. |
| `manifest.json` | Hace que se pueda instalar en el teléfono como una app. |
| `icono.svg` | El ícono que aparece en la pantalla de inicio. |

## Importante sobre privacidad

**En esta carpeta no hay ningún dato privado.** El link del calendario
no está en el código: la app lo pide una sola vez y lo guarda en el
teléfono o la computadora donde la abrís.

Por eso se puede publicar en un repositorio público sin riesgo.

## Reglas que aplica la app

Traslados (cuánto antes salir de casa):

- Clases de tarde/noche: **2 horas antes**
- Parque Chacabuco: **1 hora 10 antes** (queda cerca)
- Gimnasio SportClub Flores: **5 minutos** (3 cuadras)
- Cualquier cosa marcada como virtual: **sin traslado**

Cierre del día: se calcula para atrás desde la primera actividad del día
siguiente, restando 45 min de preparación, 7.5 h de sueño y 30 min para
dormirse. Es una hora tope, no una recomendación.

Estos números se cambian arriba de todo en `app.js`.

## Qué falta

- Publicarla en internet (GitHub Pages) para que funcionen el GPS y los avisos.
- Los planes B y C cuando algo no se cumple.
- Temas de las reuniones.
- Videos de los ejercicios.
- Comidas.
