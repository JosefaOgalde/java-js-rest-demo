# Java + JavaScript REST API Demo

Proyecto breve que combina **Java (Spring Boot)** y **JavaScript** para exponer y consumir una API REST. Pensado como registro de experiencia en ambos lenguajes (por ejemplo para postulaciones que requieren Java y JS).

## Estructura

- **`backend/`** – API REST en Java 17 + Spring Boot 3 (incluye `Dockerfile`)
- **`client/`** – Cliente en JavaScript (Node.js y navegador)
- **`automation-example/`** – Script Node.js que consume la API, valida JSON y automatiza flujos (ver su README)

## Requisitos

- **Java 17+** (OpenJDK o similar)
- **Maven 3.6+**
- **Node.js 18+** (para el cliente; opcional si solo usas el HTML)

## Cómo ejecutar

### 1. Levantar la API (Java)

```bash
cd backend
./mvnw spring-boot:run
```

En Windows (PowerShell o CMD):

```bash
cd backend
mvnw.cmd spring-boot:run
```

Si no tienes Maven Wrapper, usa `mvn spring-boot:run` (con Maven instalado).

**Con Docker:**

```bash
cd backend
docker build -t api-demo .
docker run -p 8080:8080 api-demo
```

La API queda en **http://localhost:8080**.

### 2. Probar la API

**Desde Node.js:**

```bash
cd client
npm start
```

O por separado:

```bash
node api-client.js get    # GET /api/items
node api-client.js post   # POST de un item de ejemplo
```

**Desde el navegador:** abre `client/index.html` (por archivo o con un servidor estático). Los botones hacen GET y POST a la API.

### Endpoints

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/items` | Lista todos los items |
| GET | `/api/items/{id}` | Obtiene un item por id |
| POST | `/api/items` | Crea un item (body JSON: `name`, `description`) |

## Tecnologías

- **Backend:** Java 17, Spring Boot 3, Spring Web (REST), Docker
- **Cliente:** JavaScript (Node.js con `fetch`, HTML + Fetch API en el navegador)
- **Automation:** Node.js, integración con APIs REST, validación de JSON
- **Control de versiones:** Git

## Autor

[Josefa Ogalde](https://github.com/JosefaOgalde) – Proyecto demo para portfolio/postulación.
