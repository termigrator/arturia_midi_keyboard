export class Rotary {
  midiID: number = 0;
  name: string = "";
  Value: number = 0;

  constructor(adress: number, name: string = "") {
    this.midiID = adress;
    this.name = name;
  }

}