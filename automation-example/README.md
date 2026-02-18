# Automation example

Script de ejemplo que consume la API REST del proyecto, valida la respuesta JSON y realiza operaciones de lectura y escritura. Sirve como referencia de integración con APIs, manejo de JSON y flujo automatizado.

## Requisitos

- Node.js 18+ (usa `fetch` nativo)
- API del proyecto en ejecución (backend en `http://localhost:8080` o en Docker)

## Cómo ejecutar

1. Levanta la API (desde la raíz del repo):

   **Con Maven:**
   ```bash
   cd backend && mvn spring-boot:run
   ```

   **Con Docker:**
   ```bash
   cd backend && docker build -t api-demo . && docker run -p 8080:8080 api-demo
   ```

2. En otra terminal, ejecuta el script:

   ```bash
   cd automation-example
   node run.js
   ```

3. Opcional: otra URL de API:

   ```bash
   node run.js --api=http://localhost:8080
   # o
   API_BASE=http://localhost:8080 node run.js
   ```

## Qué hace el script

- **GET** a `/api/items`: obtiene la lista de ítems.
- **Valida** cada ítem (campos `id`, `name` y tipos esperados).
- **POST** a `/api/items`: crea un ítem de ejemplo.
- Vuelve a listar los ítems para mostrar el resultado.

No usa dependencias externas; solo Node.js y la API del proyecto.
