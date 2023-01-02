
export enum LEDColor {
  black = 0x00,
  red = 0x01,
  green = 0x04,
  yellow = 0x05,
  blue = 0x10,
  magenta = 0x11,
  cyan = 0x14,
  white = 0x7F
};

export enum KeyAction { PRESSED=0, RELEASED=1 }
export type KeyEvent = { KeyID: number, KeyAction: KeyAction }