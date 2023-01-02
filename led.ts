import { LEDColor } from "./arturia_constants";

export class LED {

    ID: number; Name: string; Status: number; ColorOn: LEDColor; ColorOff: LEDColor; OnValueChanged: Function;
    constructor(id: number, color: LEDColor, onvaluechanged: Function) {
        this.ID = id;
        this.Status = 0;
        this.ColorOn = color;
        this.ColorOff = LEDColor.black;
        this.OnValueChanged = onvaluechanged; //This callback points to an function on the midi-Board, which will send the new color-code the board
    }


    /**
     * If nessecary, a new status is generated and the callback to change the color
     * to the defined "on-color" on the Midi-Board is called
     */
    on() {
        if (this.Status == 0) {
            //console.log(`new LED status 1 for LED ${this.ID}, color will be set to ${this.ColorOn}`)
            this.Status = 1;
            this.OnValueChanged(this.ID, this.ColorOn);
        }

    }

     /**
     * If nessecary, a new status is generated and the callback to change the color
     * to the defined "off-color", wich standard is mostly black,  on the Midi-Board is called
     */
    off() {
        if (this.Status == 1) {
            this.Status = 0
            //console.log(`new LED status 0 for LED ${this.ID}, color will be set to ${this.ColorOff}`)
            this.OnValueChanged(this.ID, this.ColorOff);
        }
    }

    set color(color: LEDColor) {
        this.ColorOn = color;
    }

    get color() {
        return this.color;
    }
}
