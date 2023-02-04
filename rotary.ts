export class Rotary {
  midiID: number = 0;
  binding_inc: string |number|Function;
  binding_dec: string |number|Function;;
  Value: number = 0;

  constructor(midiid: number) {
    this.midiID = midiid;
  }

}