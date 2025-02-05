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
