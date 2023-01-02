export class Pianokey {
    
    midiAddress: number = 0;
    name: string = "";

    constructor(adress: number, name: string = "") {
      this.midiAddress = adress;
      this.name = name;
    }
  }