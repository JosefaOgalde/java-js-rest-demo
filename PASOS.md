# Pasos: crear repo, onboarding y ejecutar en local

Sigue este orden.

---

## Parte 1: Crear el repo en GitHub

1. Entra a **https://github.com/new** (o GitHub → “+” → “New repository”).
2. **Repository name:** `java-js-rest-demo`
3. **Descripción (opcional):** “REST API Java Spring Boot + cliente JavaScript”
4. Elige **Public**.
5. **No** marques “Add a README” (ya tienes uno en el proyecto).
6. Clic en **Create repository**.

En la página del repo vacío, GitHub te mostrará comandos. Usa estos (con tu usuario):

```bash
cd c:\Users\josef\github\java-js-rest-demo
git remote add origin https://github.com/JosefaOgalde/java-js-rest-demo.git
git push -u origin main
```

Si tu rama local se llama `master` y quieres subir a `main`:

```bash
git branch -M main
git remote add origin https://github.com/JosefaOgalde/java-js-rest-demo.git
git push -u origin main
```

---

## Parte 2: Onboarding (qué es este proyecto)

Lee **`ONBOARDING.md`** en la raíz del repo. Ahí se explica:

- Qué hace el proyecto (API REST de ítems, consumida desde JS).
- Cómo está organizado (`backend/` Java, `client/` JavaScript).
- Qué hace cada archivo importante (controller, model, cliente Node, HTML).
- Cómo fluye una petición (GET/POST desde el cliente a la API).

Resumen mínimo:

- **Backend:** API en Java (Spring Boot) en el puerto **8080** con `GET/POST /api/items`.
- **Cliente:** script Node (`api-client.js`) y página HTML (`index.html`) que consumen esa API.

---

## Parte 3: Ejecutarlo en local

### Requisitos

- **Java 17 o 21** – ya lo tienes.
- **Maven** – si no lo tienes en el PATH:
  - Windows: `winget install Apache.Maven` o descarga desde https://maven.apache.org/download.cgi
  - Luego cierra y abre la terminal.
- **Node.js 18+** – para el cliente (`node api-client.js`).

### A. Levantar la API (Java)

En una terminal:

```bash
cd c:\Users\josef\github\java-js-rest-demo\backend
mvn spring-boot:run
```

Espera hasta ver algo como: **“Started DemoApplication”**.  
Deja esta terminal abierta (la API sigue corriendo).

### B. Probar desde Node.js

En **otra** terminal:

```bash
cd c:\Users\josef\github\java-js-rest-demo\client
node api-client.js
```

Deberías ver en consola el resultado del GET y del POST a la API.

### C. Probar desde el navegador

1. Con la API aún corriendo, abre en el navegador el archivo:
   `c:\Users\josef\github\java-js-rest-demo\client\index.html`
2. Pulsa **“GET /api/items”** y luego **“POST item de ejemplo”**.  
   En la página se mostrará el JSON que devuelve la API.

### D. Detener la API

En la terminal donde está `mvn spring-boot:run`, presiona **Ctrl+C**.

### E. (Opcional) Ejecutar tests Java

```bash
cd c:\Users\josef\github\java-js-rest-demo\backend
mvn test
```

---

## Resumen del orden

1. Crear repo en GitHub (`java-js-rest-demo`).
2. En tu PC: `git remote add origin ...` y `git push -u origin main`.
3. Leer **ONBOARDING.md**.
4. Instalar Maven si hace falta.
5. Ejecutar: `backend` con `mvn spring-boot:run` → luego `client` con `node api-client.js` y/o abrir `client/index.html`.
