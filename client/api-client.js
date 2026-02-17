/**
 * Cliente JavaScript para la API REST (Java Spring Boot).
 * Uso: node api-client.js [get|post]
 * - get: lista todos los items
 * - post: crea un item de ejemplo
 * Sin argumentos: ejecuta get y luego post de ejemplo.
 */

const API_BASE = 'http://localhost:8080/api/items';

async function getItems() {
  const res = await fetch(API_BASE);
  if (!res.ok) throw new Error(`GET ${res.status}: ${res.statusText}`);
  const data = await res.json();
  console.log('GET /api/items:', JSON.stringify(data, null, 2));
  return data;
}

async function getItemById(id) {
  const res = await fetch(`${API_BASE}/${id}`);
  if (!res.ok) throw new Error(`GET ${id} ${res.status}: ${res.statusText}`);
  const data = await res.json();
  console.log(`GET /api/items/${id}:`, JSON.stringify(data, null, 2));
  return data;
}

async function createItem(name, description = '') {
  const res = await fetch(API_BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, description }),
  });
  if (!res.ok) throw new Error(`POST ${res.status}: ${res.statusText}`);
  const data = await res.json();
  console.log('POST /api/items:', JSON.stringify(data, null, 2));
  return data;
}

async function main() {
  const arg = process.argv[2]?.toLowerCase();

  try {
    if (arg === 'get') {
      await getItems();
      return;
    }
    if (arg === 'post') {
      await createItem('Item desde JavaScript', 'Creado por api-client.js');
      return;
    }

    // Por defecto: get y luego post de ejemplo
    console.log('--- Listando items ---');
    await getItems();
    console.log('\n--- Creando item desde JS ---');
    const created = await createItem('Demo JS', 'Cliente Node.js');
    if (created?.id) {
      console.log('\n--- Obteniendo item recién creado ---');
      await getItemById(created.id);
    }
  } catch (err) {
    console.error('Error:', err.message);
    console.error('Asegúrate de que la API Java está corriendo en http://localhost:8080');
    process.exit(1);
  }
}

main();
