# Java + JavaScript REST API Demo

Proyecto que armé para practicar Java con Spring Boot y seguir usando JavaScript del lado cliente. La API es simple (CRUD de ítems) y se puede consumir desde Node o desde el navegador. Incluye un script de ejemplo en `automation-example/` para integrar con la API y validar JSON.

## Estructura

- **`backend/`** – API REST en Java 17 + Spring Boot 3 (con Dockerfile)
- **`client/`** – Cliente en JavaScript (Node y HTML)
- **`automation-example/`** – Script que llama a la API, valida respuestas y crea ítems (ver README ahí)
- **`TEST_CASES.md`** – Casos de prueba funcionales para la API

## Requisitos

Java 17+, Maven 3.6+ y Node.js 18+ (solo si vas a usar el cliente Node o automation-example).

## Cómo ejecutar

### 1. Levantar la API

```bash
cd backend
./mvnw spring-boot:run
```

En Windows sin Maven en el PATH:

```bash
cd backend
mvnw.cmd spring-boot:run
```

O con Docker:

```bash
cd backend
docker build -t api-demo .
docker run -p 8080:8080 api-demo
```

La API queda en http://localhost:8080.

### 2. Probar la API

Desde Node (carpeta `client`):

```bash
node api-client.js get    # lista ítems
node api-client.js post   # crea un ítem de ejemplo
```

Desde el navegador: abrir `client/index.html`. Los botones hacen GET y POST.

Para el script de automation:

```bash
cd automation-example
node run.js
```

### Endpoints

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/items` | Lista todos los ítems |
| GET | `/api/items/{id}` | Un ítem por id |
| POST | `/api/items` | Crea ítem (JSON: `name`, `description`) |

## Stack

Backend: Java 17, Spring Boot 3, Docker. Cliente: JavaScript (Node + fetch, HTML). Automation: Node, APIs REST, validación JSON.

---

[Josefa Ogalde](https://github.com/JosefaOgalde) – Proyecto de práctica / portfolio.
