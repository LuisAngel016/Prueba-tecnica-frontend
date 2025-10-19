# Contribuir a Proyecto

Gracias por querer contribuir. Estas son las guías mínimas para colaboraciones pequeñas y PRs.

## Flujo de trabajo
1. Crea una rama a partir de `Clean-Architecture` o `main` con un nombre claro: `feat/<dominio>-descripción` o `fix/<archivo>-descripción`.
2. Haz commits pequeños y atómicos con mensajes claros en inglés o en español.
3. Abre un Pull Request describiendo el cambio y su motivación.

## Estilo de código
- TypeScript + React. Mantén tipos explícitos en la medida de lo posible.
- Prefiere funciones puras en `application` (usecases) y mantén la lógica de efectos/IO en `infrastructure`.
- Sigue las reglas de ESLint existentes; antes de abrir PR ejecuta:

```powershell
npm run lint
npm run lint:fix
```

## Tests
- Añade tests cuando modifiques lógica de negocio o utilidades compartidas.

## Revisión
- Añade descripción de cambios y pasos para reproducir localmente.
- Si el cambio afecta a la API o contratos, documenta los cambios en `README.md` o en un archivo `docs/`.

Gracias por tu contribución!
