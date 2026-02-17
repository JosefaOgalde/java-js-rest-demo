# Onboarding – Java + JavaScript REST Demo

Este documento explica **qué hace el proyecto**, **cómo está armado** y **cómo ejecutarlo en tu máquina**.

---

## 1. ¿Qué hace este proyecto?

Es una **API REST mínima** que permite:

- **Listar** ítems (GET)
- **Obtener** un ítem por ID (GET)
- **Crear** ítems nuevos (POST)

La API está hecha en **Java (Spring Boot)** y se consume desde **JavaScript** de dos formas:

1. **Cliente Node.js** – script que desde la terminal hace peticiones a la API.
2. **Página HTML + JS** – una página web con botones que llaman a la misma API.

No hay base de datos: los ítems se guardan en memoria mientras la API está encendida.

---

## 2. Estructura del repositorio

```
java-js-rest-demo/
├── README.md              # Descripción y comandos rápidos
├── ONBOARDING.md          # Este archivo (onboarding)
├── .gitignore
├── backend/               # API en Java (Spring Boot)
│   ├── pom.xml            # Dependencias Maven
│   └── src/
│       ├── main/java/      # Código de la API
│       │   └── cl/josefaogalde/demo/
│       │       ├── DemoApplication.java      # Punto de entrada
│       │       ├── model/Item.java            # Modelo de datos
│       │       └── controller/ItemController.java  # Endpoints REST
│       ├── main/resources/
│       │   └── application.properties        # Puerto 8080
│       └── test/java/     # Pruebas (JUnit + MockMvc)
│           └── .../ItemControllerTest.java
└── client/                # Cliente en JavaScript
    ├── package.json
    ├── api-client.js      # Cliente Node.js (fetch)
    └── index.html         # Cliente navegador (botones GET/POST)
```

---

## 3. Qué hace cada parte

### Backend (Java – Spring Boot)

- **`DemoApplication.java`**  
  Arranca la aplicación Spring Boot.

- **`Item.java`**  
  Modelo: `id`, `name`, `description`. Es lo que se envía y recibe en JSON.

- **`ItemController.java`**  
  Define los endpoints:
  - `GET /api/items` → devuelve todos los ítems.
  - `GET /api/items/{id}` → devuelve un ítem por ID.
  - `POST /api/items` → crea un ítem (body JSON con `name` y opcionalmente `description`).

  Los ítems se guardan en una lista en memoria dentro del controlador.

- **`ItemControllerTest.java`**  
  Pruebas automáticas: que GET devuelva lista y que POST cree un ítem y devuelva 201.

- **`application.properties`**  
  Configura el servidor en el puerto **8080**.

### Cliente (JavaScript)

- **`api-client.js`** (Node.js)  
  - Usa `fetch` para hablar con `http://localhost:8080/api/items`.
  - Con `node api-client.js` hace GET y luego un POST de ejemplo.
  - Con `node api-client.js get` solo GET; con `node api-client.js post` solo POST.

- **`index.html`**  
  Página con dos botones:
  - Uno hace GET y muestra el JSON en pantalla.
  - Otro hace POST de un ítem de ejemplo y muestra la respuesta.

  Debes tener la API corriendo en el puerto 8080 para que funcione.

---

## 4. Flujo de una petición (ejemplo)

1. Usuario o script hace **GET** `http://localhost:8080/api/items`.
2. Spring Boot recibe la petición y la lleva a `ItemController.getAll()`.
3. El controlador devuelve la lista de ítems en JSON.
4. El cliente (Node o navegador) recibe el JSON y lo muestra o procesa.

Para **POST**: el cliente envía un JSON `{ "name": "...", "description": "..." }`. El controlador crea un `Item` con un ID nuevo, lo agrega a la lista y responde con ese ítem (código 201 Created).

---

## 5. Cómo ejecutarlo en local

Sigue los pasos en orden.

### Requisitos previos

- **Java 17** instalado (`java -version`).
- **Maven** instalado (`mvn -version`) o usar Maven Wrapper si está en el repo.
- **Node.js 18+** (solo para el cliente; `node -version`).

### Paso A: Levantar la API (Java)

En una terminal:

```bash
cd backend
mvn spring-boot:run
```

Espera a ver algo como: “Started DemoApplication in X seconds”.  
La API queda en **http://localhost:8080**. No cierres esta terminal.

### Paso B: Probar desde Node.js

En **otra** terminal:

```bash
cd client
node api-client.js
```

Deberías ver en consola la respuesta del GET y luego la del POST.

### Paso C: Probar desde el navegador

1. Con la API siguen corriendo, abre el archivo `client/index.html` en el navegador (doble clic o “Abrir con”).
2. Pulsa “GET /api/items” y luego “POST item de ejemplo”.  
   El cuadro de texto mostrará el JSON devuelto por la API.

### Paso D: Ejecutar tests (Java)

En una terminal, desde la raíz del repo:

```bash
cd backend
mvn test
```

Deberían pasar las pruebas de `ItemControllerTest`.

---

## 6. Resumen rápido

| Qué quieres hacer        | Dónde / comando                          |
|-------------------------|-------------------------------------------|
| Levantar la API         | `cd backend` → `mvn spring-boot:run`     |
| Consumir API desde Node | `cd client` → `node api-client.js`       |
| Consumir desde navegador| Abrir `client/index.html`                |
| Correr tests Java       | `cd backend` → `mvn test`                |

Cuando termines de probar la API, vuelve a la terminal donde está `spring-boot:run` y detén el proceso con **Ctrl+C**.

---

Si algo no corre (puerto ocupado, Java/Maven/Node no encontrado), revisa que las rutas y versiones coincidan con lo indicado en el [README](README.md).
