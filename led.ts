import { LEDColor } from "./arturia_constants";

export class LED {

    midiID: number; 
    binding: string; 
    status: number; 
    private colorOn: LEDColor; 
    private colorOff: LEDColor; 
    onValueChanged: Function;

    constructor(id: number, color: LEDColor, onvaluechanged: Function) {
        this.midiID = id;
        this.status = 0;
        this.colorOn = color;
        this.colorOff = LEDColor.black;  //switching off is realized by setting color to black
        this.onValueChanged = onvaluechanged; //This callback points to an function on the midi-Board, which will send the new color-code the board
    }

    switch(toState: number) {
        toState ==1 ? this.on() :this.off();
    }

    /**
     * If nessecary, a new status is generated and the callback to change the color
     * to the defined "on-color" on the Midi-Board is called
     */
    on() {
        if (this.status == 0) {
            //console.log(`new LED status 1 for LED ${this.ID}, color will be set to ${this.ColorOn}`)
            this.status = 1;
            this.onValueChanged(this.midiID, this.colorOn);
        }

    }

     /**
     * If nessecary, a new status is generated and the callback to change the color
     * to the defined "off-color", wich standard is mostly black,  on the Midi-Board is called
     */
    off() {
        if (this.status == 1) {
            this.status = 0
            //console.log(`new LED status 0 for LED ${this.ID}, color will be set to ${this.ColorOff}`)
            this.onValueChanged(this.midiID, this.colorOff);
        }
    }

    set color(color: LEDColor) {
        this.colorOn = color;
    }

    get color() {
        return this.color;
    }
}
