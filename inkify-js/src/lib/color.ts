import * as util from "./util";

/**
 * Represents a Color using a partial ANSI escape sequences.
 */
export class Color {
  /** (partial) ANSI escape sequence for color representation.  */
  ansi: string;

  /**
   * Creates a Color Representation from a partial ANSI escape sequence.
   *
   * @param ansi partial ANSI escape sequence representing a color.
   */
  constructor(ansi: string) {
    this.ansi = ansi;
  }

  // Default Console 4 bit color codes

  /**
   * Returns the console Color representation for black.
   */
  static black(): Color {
    return new Color("0");
  }

  /**
   * Returns the console Color representation for red.
   */
  static red(): Color {
    return new Color("1");
  }

  /**
   * Returns the console Color representation for green.
   */
  static green(): Color {
    return new Color("2");
  }

  /**
   * Returns the console Color representation for yellow.
   */
  static yellow(): Color {
    return new Color("3");
  }

  /**
   * Returns the console Color representation for blue.
   */
  static blue(): Color {
    return new Color("4");
  }

  /**
   * Returns the console Color representation for magenta.
   */
  static magenta(): Color {
    return new Color("5");
  }

  /**
   * Returns the console Color representation for cyan.
   */
  static cyan(): Color {
    return new Color("6");
  }

  /**
   * Returns the console Color representation for cyan.
   */
  static white(): Color {
    return new Color("7");
  }

  /**
   * Creates a Color Representation from a 256-color ANSI palette index.
   *
   * @param n ANSI color index ranging from 0 to 255.
   * @returns A Color Representation corresponding to the given index.
   */
  static from256(n: number): Color {
    if (n < 0 || n > 255) throw new Error("Invalid color code.");

    return new Color(`8;5;${n}`);
  }

  /**
   * Creates a Color Representation from RGB values.
   *
   * @param red Red component ranging from 0 to 255.
   * @param green Green component ranging from 0 to 255.
   * @param blue Blue component ranging from 0 to 255.
   */
  static fromRGB(red: number, green: number, blue: number): Color {
    if (red < 0 || red > 255 || green < 0 || green > 255 || blue < 0 || blue > 255)
      throw new Error("RGB values must be between 0 and 255.");
    return new Color(`8;2;${red};${green};${blue}`);
  }

  /**
   * Creates a Color Representation from HSL values.
   *
   * @param hue Hue in degrees from 0-360.
   * @param saturation Saturation as a percentage from 0-100.
   * @param lightness Lightness as a percentage from 0-100.
   */
  static fromHSL(hue: number, saturation: number, lightness: number): Color {
    if (hue < 0 || hue > 360) throw new Error("Hue value must be between 0 and 360.");

    if (saturation < 0 || saturation > 100)
      throw new Error("Saturation value must be between 0 and 100.");

    if (lightness < 0 || lightness > 100)
      throw new Error("Lightness value must be between 0 and 100.");

    // Converting from HSL to RGB values

    saturation /= 100;
    lightness /= 100;

    const c = (1 - Math.abs(2 * lightness - 1)) * saturation;
    const x = c * (1 - Math.abs(((hue / 60) % 2) - 1));
    const m = lightness - c / 2;

    const [r, g, b] = (
      hue < 60
        ? [c, x, 0]
        : hue < 120
        ? [x, c, 0]
        : hue < 180
        ? [0, c, x]
        : hue < 240
        ? [0, x, c]
        : hue < 300
        ? [x, 0, c]
        : [c, 0, x]
    ).map((v) => Math.round((v + m) * 255)) as [number, number, number];

    return Color.fromRGB(r, g, b);
  }

  /**
   * Creates a Color from a hexadecimal color code.
   *
   * @param hex Hexadecimal string in the format `#RRGGBB`.
   */
  static fromHex(hex: string): Color {
    if (typeof hex !== "string" || !/^[0-9a-fA-F]{6}$/g.test(hex))
      throw new Error("Invalid hex string.");

    // Converting from HEX to RGB values

    const [r, g, b] = hex
      .slice(1)
      ?.match(/.{2}/g)
      ?.map((c) => parseInt(c, 16)) ?? [255, 255, 255];

    return Color.fromRGB(r, g, b);
  }

  /**
   * Generates a random Color.
   */
  static random(): Color {
    return Color.fromRGB(util.rand(0, 255), util.rand(0, 255), util.rand(0, 255));
  }
}
