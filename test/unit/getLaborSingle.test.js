
const { getLaborSingle } = require('../../src/inject/helper.js');
const { DEFAULT_CONFIG } = require('../../src/laborConfig.js');

function mockPartItem(htmlStr) {
  document.body.innerHTML = htmlStr;
  return document.querySelector('.price');
}


//advanced

//soldering
test('"soldering required" keyword → advanced soldering labor', () => {
  const part = mockPartItem(
    `<div class="item">
       <h2 class="product-name">Wide Angle Camera FPC Repair For iPhone 15 (Soldering Required) (JCID)</h2>
       <span class="price">$12.00</span>
     </div>`
  );
  expect(getLaborSingle(part, 75, DEFAULT_CONFIG,"https://www.cpr.parts/replacement-parts/apple/iphone-parts/iphone-15"))
    .toBe(DEFAULT_CONFIG.advanced.soldering);
});

//---------------charge port----------------------------------------------
 //iphone charge port
test('iphone "charge port" keyword → advanced charge port labor', () => {
  const part = mockPartItem(
    `<div class="item">
       <h2 class="product-name">Charging Port Flex Cable For iPhone 15 (Premium) (Black)</h2>
       <span class="price">$12.00</span>
     </div>`
  );
  expect(getLaborSingle(part, 75, DEFAULT_CONFIG, "https://www.cpr.parts/replacement-parts/apple/iphone-parts/iphone-15"))
    .toBe(DEFAULT_CONFIG.advanced.iphoneChargePort);
});


test('samsung "charge port" keyword → advanced charge port labor', () => {
  const part = mockPartItem(
    `<div class="item">Charging Port Board With Sim Card Reader For Samsung Galaxy S25 Ultra 5G (S938U) (US Version) (Premium)</h2>
       <span class="price">$12.00</span>
     </div>`
  );
  expect(getLaborSingle(part, 75, DEFAULT_CONFIG, "https://www.cpr.parts/replacement-parts/samsung/galaxy-s-series/galaxy-s25-ultra"))
    .toBe(DEFAULT_CONFIG.defaults.phone);
});


//back housing



test('back housing" keyword → back housing labor', () => {
  const part = mockPartItem(
    `<div class="item">
       <h2 class="product-name">Back Housing W/ Small Components Pre-Installed For iPhone 11 (Used OEM Pull: Grade A)</h2>
       <span class="price">$12.00</span>
     </div>`
  );
  expect(getLaborSingle(part, 75, DEFAULT_CONFIG, "https://www.cpr.parts/replacement-parts/apple/iphone-parts/iphone-11"))
    .toBe(DEFAULT_CONFIG.advanced.backHousing);
});
//casper
test('casper" keyword → zero labor', () => {
  const part = mockPartItem(
    `<div class="item">
       <h2 class="product-name">Casper Pro Tempered Glass For iPhone 15 Pro Max (Retail Pack) (Clear)</h2>
       <span class="price">$12.00</span>
     </div>`
  );
  expect(getLaborSingle(part, 75, DEFAULT_CONFIG, "https://www.cpr.parts/replacement-parts/apple/iphone-parts/iphone-15-pro-max"))
    .toBe(0);
});


test('soldering" keyword priority → soldering labor', () => {
  const part = mockPartItem(
    `<div class="item">
       <h2 class="product-name">Back Housing W/ Small Components Pre-Installed For iPhone 11 (Used OEM Pull: Grade A)</h2>
       <span class="price">$12.00</span>
     </div>`
  );
  expect(getLaborSingle(part, 75, DEFAULT_CONFIG, "https://www.cpr.parts/replacement-parts/apple/iphone-parts/iphone-11"))
    .toBe(DEFAULT_CONFIG.advanced.backHousing);
});
//casper
test('casper" keyword → zero labor', () => {
  const part = mockPartItem(
    `<div class="item">
       <h2 class="product-name">Casper Pro Tempered Glass For iPhone 15 Pro Max (Retail Pack) (Clear)</h2>
       <span class="price">$12.00</span>
     </div>`
  );
  expect(getLaborSingle(part, 75, DEFAULT_CONFIG, "https://www.cpr.parts/replacement-parts/apple/iphone-parts/iphone-15-pro-max"))
    .toBe(0);
});

