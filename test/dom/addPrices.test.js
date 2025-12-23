/**
 * @jest-environment jsdom
 * @jest-environment-options {"url":"https://www.cpr.parts/"}
 */
const { addPrices } = require('../../src/inject/helper');
const { DEFAULT_CONFIG } = require('../../src/laborConfig');


// helper: create N identical product cards
function makeCatalog(count) {
  const html = [];
  for (let i = 0; i < count; i++) {
    html.push(`
      <div class="item">
        <h2 class="product-name">iPhone Screen</h2>
        <span class="price">$${19.99 + i}</span>
      </div>
    `);
  }
  return html.join('');
}

test('addPrices processes 500 products in < 50 ms', () => {
  // Set URL in jsdom correctly
window.history.pushState({}, '', '/replacement-parts/apple/iphone-parts');


  document.body.innerHTML = makeCatalog(500);

  // Make addHTML visible as a global identifier (not just window.addHTML)
  globalThis.addHTML = function(labor, part_item, url) {
    const table = document.createElement('table');
    table.className = 'repair-table';
    const parent = part_item.parentElement;
    if (parent) parent.appendChild(table);
  };

  const t0 = performance.now();
  addPrices(75, DEFAULT_CONFIG);
  const t1 = performance.now();

  const tables = document.querySelectorAll('.repair-table');
  expect(t1 - t0).toBeLessThan(50);
  expect(tables.length).toBe(500);
});


test('addPrices processes 5,000 products with stable median performance', () => {
  // Ensure correct URL context
  window.history.pushState({}, '', '/replacement-parts/apple/iphone-parts');

  // Stub addHTML globally
  globalThis.addHTML = function(labor, part_item, url) {
    const table = document.createElement('table');
    table.className = 'repair-table';
    part_item.parentElement?.appendChild(table);
  };

  const runs = 20;
  const times = [];

  for (let i = 0; i < runs; i++) {
    // Reset DOM every run
    document.body.innerHTML = makeCatalog(5000);

    const t0 = performance.now();
    addPrices(75, DEFAULT_CONFIG);
    const t1 = performance.now();

    times.push(t1 - t0);
  }

  // Sort & compute stats
  times.sort((a, b) => a - b);
  const median = times[Math.floor(times.length / 2)];
  const min = times[0];
  const max = times[times.length - 1];

  console.log('addPrices(5000) timing (ms):', { median, min, max });

  // Assertions
  expect(median).toBeLessThan(200);
  expect(document.querySelectorAll('.repair-table').length).toBe(5000);
});

