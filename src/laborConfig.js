
const DEFAULT_CONFIG = {
  defaults: {
    phone: 75,
    tablet: 100,
    switch: 100,
    computer: 130,
    console: 130,
  },
  advanced: {
    iphoneChargePort: 100,
    backHousing: 100,
    soldering: 130,
  },
};

if (typeof window !== "undefined") {
  window.CPR_LABOR_DEFAULT_CONFIG = DEFAULT_CONFIG;
}