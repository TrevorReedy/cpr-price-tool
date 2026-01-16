
const DEFAULT_CONFIG = {
  defaults: {
    phone: 0,
    tablet: 0,
    switch: 0,
    computer: 0,
    console: 0,
  },
  advanced: {
    iphoneChargePort: 0,
    backHousing: 0,
    soldering: 0,
  },
};

if (typeof window !== "undefined") {
  window.CPR_LABOR_DEFAULT_CONFIG = DEFAULT_CONFIG;
}