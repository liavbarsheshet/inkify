/**
 * Converts HSL (Hue, Saturation, Lightness) values to RGB (Red, Green, Blue) values.
 *
 * @param {number} h The hue of the color, in degrees (0-360).
 * @param {number} s The saturation of the color, as a percentage (0-100).
 * @param {number} l The lightness of the color, as a percentage (0-100).
 * @returns {[number, number, number]} An array containing the RGB components, each in the range of 0 to 255.
 */
export function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  s /= 100;
  l /= 100;
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  return (
    h < 60
      ? [c, x, 0]
      : h < 120
      ? [x, c, 0]
      : h < 180
      ? [0, c, x]
      : h < 240
      ? [0, x, c]
      : h < 300
      ? [x, 0, c]
      : [c, 0, x]
  ).map((v) => Math.round((v + m) * 255)) as [number, number, number];
}

/**
 * Converts HSV (Hue, Saturation, Value) values to RGB (Red, Green, Blue) values.
 *
 * @param {number} h The hue of the color, in degrees (0-360).
 * @param {number} s The saturation of the color, as a percentage (0-100).
 * @param {number} v The value (brightness) of the color, as a percentage (0-100).
 * @returns {[number, number, number]} An array containing the RGB components, each in the range of 0 to 255.
 */
export function hsvToRgb(h: number, s: number, v: number): [number, number, number] {
  s /= 100;
  v /= 100;
  const c = v * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = v - c;
  return (
    h < 60
      ? [c, x, 0]
      : h < 120
      ? [x, c, 0]
      : h < 180
      ? [0, c, x]
      : h < 240
      ? [0, x, c]
      : h < 300
      ? [x, 0, c]
      : [c, 0, x]
  ).map((v) => Math.round((v + m) * 255)) as [number, number, number];
}

/**
 * Converts a HEX color code to RGB values, suitable for use in SVG or web applications.
 *
 * @param {string} hex The HEX color code (e.g. "#ff5733").
 * @returns {[number, number, number]} An array containing the RGB components, each in the range of 0 to 255.
 */
export function hexToSVG(hex: string): [number, number, number] {
  return (hex
    .slice(1)
    ?.match(/.{2}/g)
    ?.map((c) => parseInt(c, 16)) ?? [255, 255, 255]) as [number, number, number];
}

/**
 * Generates a random number within the specified range using an optional seed.
 *
 * @param {number} min The minimum number within the range (default is 0).
 * @param {number} max The maximum number within the range (default is 0).
 * @param {number} seed An optional seed for the random number generator (default is 14327).
 * @returns {number} A random number within the specified range. If invalid arguments are provided, returns `-1`.
 */
export function rand(min: number = 0, max: number = 0, seed: number = 14327): number {
  if (min > max || max < 0 || min < 0 || seed < 1) return -1;

  if (max === min) return min;

  return ((Math.floor(Math.random() * (max * seed - min)) + min) % (max - min)) + min;
}
