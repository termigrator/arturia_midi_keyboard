export class Rotary {
  midiID: number = 0;
  binding: string = "";
  Value: number = 0;

  constructor(adress: number, binding: string = "") {
    this.midiID = adress;
    this.binding = binding;
  }

}