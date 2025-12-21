/**
 * @jest-environment jsdom
 */

// mock URL without navigation
delete window.location;
window.location = new URL('https://cpr.parts/replacement-parts/iphone-12-pro-max');

const { inject, waitForAny } = require('../../src/inject/notes.js');

test('waitForAny returns null after timeout', async () => {
  const start = Date.now();
  const result = await waitForAny(['#never-added'], 500);
  const elapsed = Date.now() - start;

  expect(result).toBeNull();
  expect(elapsed).toBeGreaterThanOrEqual(500);
  expect(elapsed).toBeLessThan(600);
});

test('injects textarea under h1', async () => {
  document.body.innerHTML = `<h1 class="category-title">iPhone 12 Pro Max</h1>`;
  await inject();
  expect(document.querySelector('textarea')).toBeTruthy();
});


test('waitForAny returns null after timeout', async () => {
  const start = Date.now();
  const result = await waitForAny(['#never-added'], 500);
  const elapsed = Date.now() - start;

  expect(result).toBeNull();
  expect(elapsed).toBeGreaterThanOrEqual(500);
  expect(elapsed).toBeLessThan(600);
});

test('waitForAny disconnects MutationObserver on timeout', async () => {
  const disconnectSpy = jest.spyOn(MutationObserver.prototype, 'disconnect');
  await waitForAny(['#never-added'], 500);
  expect(disconnectSpy).toHaveBeenCalledTimes(1);
  disconnectSpy.mockRestore();
});