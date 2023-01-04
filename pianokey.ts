export class Pianokey {
    
    midiID: number = 0;
    binding: string = "";

    constructor(adress: number, binding: string = "") {
      this.midiID = adress;
      this.binding = binding;
    }
  }