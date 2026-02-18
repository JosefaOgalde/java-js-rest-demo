/**
 * Script de automatización: consume la API REST, valida y procesa JSON.
 * Uso: node run.js [--api URL]
 * Requiere: API corriendo en http://localhost:8080 (o URL indicada).
 */

const API_BASE = process.env.API_BASE || process.argv.find(a => a.startsWith('--api='))?.split('=')[1] || 'http://localhost:8080';
const ITEMS_URL = `${API_BASE}/api/items`;

function validateItem(obj) {
  if (!obj || typeof obj !== 'object') return false;
  if ('id' in obj && typeof obj.id !== 'number') return false;
  if ('name' in obj && typeof obj.name !== 'string') return false;
  return true;
}

async function getItems() {
  const res = await fetch(ITEMS_URL);
  if (!res.ok) throw new Error(`GET ${res.status}: ${res.statusText}`);
  const data = await res.json();
  if (!Array.isArray(data)) throw new Error('Respuesta no es un array');
  return data;
}

async function createItem(name, description = '') {
  const res = await fetch(ITEMS_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, description }),
  });
  if (!res.ok) throw new Error(`POST ${res.status}: ${res.statusText}`);
  const data = await res.json();
  if (!validateItem(data)) throw new Error('Item creado con formato inválido');
  return data;
}

async function main() {
  console.log('API base:', API_BASE);
  console.log('--- Obteniendo ítems ---');
  const items = await getItems();
  const valid = items.filter(validateItem);
  console.log(`Ítems recibidos: ${items.length}, válidos: ${valid.length}`);
  valid.forEach((it, i) => console.log(`  ${i + 1}. id=${it.id} name=${it.name || '(sin nombre)'}`));

  console.log('\n--- Creando ítem desde automation ---');
  const created = await createItem('Automation demo', 'Creado por automation-example/run.js');
  console.log('Creado:', JSON.stringify(created, null, 2));

  console.log('\n--- Lista final ---');
  const final = await getItems();
  console.log(`Total ítems: ${final.length}`);
}

main().catch(err => {
  console.error('Error:', err.message);
  console.error('Asegúrate de que la API está corriendo en', API_BASE);
  process.exit(1);
});
