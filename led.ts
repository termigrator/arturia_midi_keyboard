import { LEDColor } from "./arturia_constants";

export class LED {
    ID: number; Name: string; Status: number; ColorOn: LEDColor; ColorOff: LEDColor; OnValueChanged: Function;
    constructor(id: number, color: LEDColor, onvaluechanged: Function) {
        this.ID = id;
        this.Status = 0;
        this.ColorOn = color;
        this.ColorOff = LEDColor.black;
        this.OnValueChanged = onvaluechanged;
    }


    //beim Einschalten wird die für die Anzeige vorgeshene Farbe über das Callback im Midi-Controllergesetzt.
    on() {
        if (this.Status == 0) {
            //console.log(`new LED status 1 for LED ${this.ID}, color will be set to ${this.ColorOn}`)
            this.Status = 1;
            this.OnValueChanged(this.ID, this.ColorOn);
        }

    }

    //beim Ausschalten wird die Farbe Schwarz über das Callback im Midi-Controller gesendet
    off() {
        if (this.Status == 1) {
            this.Status = 0
            //console.log(`new LED status 0 for LED ${this.ID}, color will be set to ${this.ColorOff}`)
            this.OnValueChanged(this.ID, this.ColorOff);
        }
    }
    color(color: LEDColor) {
        this.ColorOn = color;
    }
}
