export const round2 = (val, dec) => Math.round(val * 10 ** dec) / 10 ** dec;

const KM_TO_MILES = 1.60934, FT_TO_METERS = 0.3048, PASCAL_TO_INHG = 0.0002953;

export const kphToMph = (kph) => Math.round(kph / KM_TO_MILES);
export const celsiusToFahrenheit = (c) => Math.round((c * 9) / 5 + 32);
export const kilometersToMiles = (km) => Math.round(km / KM_TO_MILES);
export const metersToFeet = (m) => Math.round(m / FT_TO_METERS);
export const pascalToInHg = (p) => round2(p * PASCAL_TO_INHG, 2);
