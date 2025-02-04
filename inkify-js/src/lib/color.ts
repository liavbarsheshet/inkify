import * as util from "./util";

/**
 * Represents a color with its associated RGB properties.
 *
 * @class Color
 * @example
 * // Example usage:
 * const color = new Color(255, 0, 0); // Red color
 */
export class Color {
  /** The red component of the color, ranging from 0 to 255. */
  red: number;
  /** The green component of the color, ranging from 0 to 255. */
  green: number;
  /** The blue component of the color, ranging from 0 to 255. */
  blue: number;

  /**
   * Creates an instance of the `Color` class with the specified RGB values.
   *
   * @param {number} red The red component of the color, ranging from 0 to 255.
   * @param {number} green The green component of the color, ranging from 0 to 255.
   * @param {number} blue The blue component of the color, ranging from 0 to 255.
   * @throws {Error} If any component (red, green, or blue) is outside the range of 0 to 255.
   */
  constructor(red: number, green: number, blue: number) {
    if (red < 0 || red > 255 || green < 0 || green > 255 || blue < 0 || blue > 255)
      throw new Error("RGB values must be between 0 and 255.");

    this.red = red;
    this.green = green;
    this.blue = blue;
  }

  /**
   * Creates a `Color` instance from HSL (Hue, Saturation, Lightness) values.
   *
   * @param hue The hue of the color, in degrees (0-360), representing the color type.
   * @param saturation The saturation of the color, as a percentage (0-100), representing color intensity.
   * @param lightness The lightness of the color, as a percentage (0-100), representing brightness.
   * @throws {Error} If any component (Hue, Saturation, or Lightness) is outside the range.
   * @returns {Color} A `Color` represented in RGB format.
   */
  static fromHSL(hue: number, saturation: number, lightness: number): Color {
    if (hue < 0 || hue > 360) throw new Error("Hue value must be between 0 and 360.");

    if (saturation < 0 || saturation > 100)
      throw new Error("Saturation value must be between 0 and 100.");

    if (lightness < 0 || lightness > 100)
      throw new Error("Lightness value must be between 0 and 100.");

    const [r, g, b] = util.hslToRgb(hue, saturation, lightness);

    return new Color(r, g, b);
  }

  static fromHSV(hue: number, saturation: number, value: number): Color {
    if (hue < 0 || hue > 360) throw new Error("Hue value must be between 0 and 360.");

    if (saturation < 0 || saturation > 100)
      throw new Error("Saturation value must be between 0 and 100.");

    if (value < 0 || value > 100) throw new Error("Value value must be between 0 and 100.");

    const [r, g, b] = util.hsvToRgb(hue, saturation, value);

    return new Color(r, g, b);
  }
}
