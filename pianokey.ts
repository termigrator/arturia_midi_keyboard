export class Pianokey {
    
    midiID: number = 0;
    binding: string |number|Function;;

    constructor(midi_id: number) {
      this.midiID = midi_id;
    }
  }