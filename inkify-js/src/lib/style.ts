/**
 * @fileoverview A class representing a style applied to console.
 * @module Style
 *
 * @author Liav Barsheshet <liavbarsheshet@gmail.com>
 */

import { Color } from "./color";

/**
 * Class representing a console style.
 *
 * @class Style
 */
export class Style {
  /** Represents the style chain as ANSI escape sequence. */
  private _chain: string[] = [];

  /**
   * Resets the console styles to default.
   *
   * @readonly
   * @static
   * @type {string}
   * @memberof Style
   */
  static get RESET(): string {
    return "\x1b[0m";
  }

  /**
   * Creates a new Style instance, optionally initializing it with an existing style chain.
   *
   * @param style An optional Style instance to be copied.
   */
  constructor(style?: Style) {
    this._chain = style ? [...style._chain] : [];
  }

  /**
   * Applies light weight (faint) to the font.
   *
   * @returns The current Style instance, allowing for chaining.
   */
  light(): Style {
    this._chain.push("\x1b[2m");
    return this;
  }

  /**
   * Applies normal weight to the font.
   *
   * @returns The current Style instance, allowing for chaining.
   */
  normal(): Style {
    this._chain.push("\x1b[22m");
    return this;
  }

  /**
   * Applies bold weight to the font.
   *
   * @returns The current Style instance, allowing for chaining.
   */
  bold(): Style {
    this._chain.push("\x1b[1m");
    return this;
  }

  /**
   * Applies italic style.
   *
   * @returns The current Style instance, allowing for chaining.
   */
  italic(): Style {
    this._chain.push("\x1b[3m");
    return this;
  }

  /**
   * Applies the underline style.
   *
   * @note Not widely supported.
   * @returns The current Style instance, allowing for chaining.
   */
  underline(): Style {
    this._chain.push("\x1b[4m");
    return this;
  }

  /**
   * Applies the overline style.
   *
   * @note Not widely supported.
   * @returns The current Style instance, allowing for chaining.
   */
  overline(): Style {
    this._chain.push("\x1b[53m");
    return this;
  }

  /**
   * Applies the strikethrough style.
   *
   * @note Not widely supported.
   * @returns The current Style instance, allowing for chaining.
   */
  strikethrough(): Style {
    this._chain.push("\x1b[9m");
    return this;
  }

  /**
   * Hides the text.
   *
   * @returns The current Style instance, allowing for chaining.
   */
  hide(): Style {
    this._chain.push("\x1b[8m");
    return this;
  }

  /**
   * Sets the foreground color of the text.
   *
   * @param color A Color representation.
   * @returns The current Style instance, allowing for chaining.
   */
  foreground(color: Color): Style {
    this._chain.push(`\x1b[3${color.ansi}m`);
    return this;
  }

  /**
   * Sets the foreground color of the text.
   *
   * @param color A Color representation.
   * @returns The current Style instance, allowing for chaining.
   */
  color(color: Color): Style {
    return this.foreground(color);
  }

  /**
   * Sets the foreground color of the text.
   *
   * @param color A Color representation.
   * @returns The current Style instance, allowing for chaining.
   */
  fg(color: Color): Style {
    return this.foreground(color);
  }

  /**
   * Sets the background color of the text.
   *
   * @param color A Color representation.
   * @returns The current Style instance, allowing for chaining.
   */
  background(color: Color): Style {
    this._chain.push(`\x1b[4${color.ansi}m`);
    return this;
  }

  /**
   * Sets the background color of the text.
   *
   * @param color A Color representation.
   * @returns The current Style instance, allowing for chaining.
   */
  bg(color: Color): Style {
    return this.background(color);
  }

  /**
   * Inverts the foreground and background colors.
   *
   * @returns The current Style instance, allowing for chaining.
   */
  invert(): Style {
    this._chain.push("\x1b[7m");
    return this;
  }
}
