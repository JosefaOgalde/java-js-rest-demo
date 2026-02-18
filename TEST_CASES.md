# Casos de prueba – API Items

Escenarios de prueba para la API REST `/api/items`. Sirven como referencia funcional y para validar comportamiento esperado.

## Precondiciones

- API corriendo en http://localhost:8080
- Base limpia o con ítems iniciales

---

## TC-01: GET /api/items – Listar ítems (éxito)

| Campo | Valor |
|-------|-------|
| **Objetivo** | Verificar que se obtiene la lista de ítems |
| **Precondición** | API levantada |
| **Acción** | GET http://localhost:8080/api/items |
| **Resultado esperado** | Status 200, cuerpo JSON array de ítems |
| **Datos de prueba** | - |

---

## TC-02: GET /api/items/{id} – Obtener ítem por ID (éxito)

| Campo | Valor |
|-------|-------|
| **Objetivo** | Verificar que se obtiene un ítem existente |
| **Precondición** | Existe al menos un ítem (ej. id=1) |
| **Acción** | GET http://localhost:8080/api/items/1 |
| **Resultado esperado** | Status 200, cuerpo JSON con id, name, description |
| **Datos de prueba** | id=1 |

---

## TC-03: GET /api/items/{id} – ID inexistente

| Campo | Valor |
|-------|-------|
| **Objetivo** | Verificar manejo de ID inexistente |
| **Precondición** | API levantada |
| **Acción** | GET http://localhost:8080/api/items/99999 |
| **Resultado esperado** | Status 404 |
| **Datos de prueba** | id=99999 |

---

## TC-04: POST /api/items – Crear ítem (éxito)

| Campo | Valor |
|-------|-------|
| **Objetivo** | Verificar que se crea un ítem con datos válidos |
| **Precondición** | API levantada |
| **Acción** | POST http://localhost:8080/api/items con body JSON: `{"name":"Test","description":"Desc"}` |
| **Resultado esperado** | Status 201, cuerpo JSON con id asignado, name, description |
| **Datos de prueba** | name="Test", description="Desc" |

---

## TC-05: POST /api/items – Nombre vacío (error)

| Campo | Valor |
|-------|-------|
| **Objetivo** | Verificar rechazo cuando name está vacío |
| **Precondición** | API levantada |
| **Acción** | POST http://localhost:8080/api/items con body: `{"name":"","description":"x"}` |
| **Resultado esperado** | Status 400 |
| **Datos de prueba** | name vacío |

---

## TC-06: POST /api/items – Sin name (error)

| Campo | Valor |
|-------|-------|
| **Objetivo** | Verificar rechazo cuando falta name |
| **Precondición** | API levantada |
| **Acción** | POST http://localhost:8080/api/items con body: `{"description":"x"}` |
| **Resultado esperado** | Status 400 |
| **Datos de prueba** | sin campo name |

---

## Resumen

| ID | Endpoint | Resultado |
|----|----------|-----------|
| TC-01 | GET /api/items | 200 |
| TC-02 | GET /api/items/1 | 200 |
| TC-03 | GET /api/items/99999 | 404 |
| TC-04 | POST /api/items (válido) | 201 |
| TC-05 | POST /api/items (name vacío) | 400 |
| TC-06 | POST /api/items (sin name) | 400 |
