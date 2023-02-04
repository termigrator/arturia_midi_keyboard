import EventEmitter = require("events");
import { Input, Output } from "easymidi";
import { Rotaries } from "./rotaries";
import { LEDs } from "./leds";
import { Pianokeys } from "./pianokeys";
import { InitSequence } from "./arturia_init";

import { LEDColor } from "./arturia_constants";

export class ArturiaMinilab {
  input: Input;
  output: Output;

  public leds: LEDs;
  public rotaries: Rotaries;
  public pianokeys: Pianokeys;
  public events: EventEmitter;

  constructor() {
    this.input = new Input("Arturia MiniLab mkII");
    this.output = new Output("Arturia MiniLab mkII");
    this.events = new EventEmitter();

    this.Midiboard_init();
    var my = this;

    this.events.addListener("rotary", (e) => function (e) {});
    this.events.addListener("pianokeypress", (e) => function (e) {});
    this.events.addListener("pianokeyreleased", (e) => function (e) {});

    this.leds = new LEDs([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], this.sendColorToLED);
    this.rotaries = new Rotaries([112, 114, 75, 73, 93, 77, 76, 71, 74, 72, 79, 91, 17, 16, 19, 18]);
    //https://stackoverflow.com/questions/3746725/how-to-create-an-array-containing-1-n
    //constructs an integer Array [36, 37 ...72] within the constructor function
    this.pianokeys = new Pianokeys(Array.from({ length: 37 }, (_, i) => i + 36));

    //* Handle Rotary-Action
    this.input.on("cc", function (msg) {
      var rot = my.rotaries.rotary(msg.controller);

      if (!rot) {
        //Midi-code not in collection
        console.log(`undefined Rotary sends on [${[msg.channel, msg.controller, msg.value].toString()}]`);
      } else if (!rot.binding_inc &&  !rot.binding_dec) {
        //none of the bindings is set
        console.log(`unbound Rotary ${msg.controller} sends value ${msg.value}`);
      }
      //continue, we have a bound rotary
      else if (msg.value == 65) {
        my.events.emit("rotary", { id: rot.midiID, binding: rot.binding_inc, direction: 1 }); //Dont use "this.", use "my instead"
        //console.log("Emit:", rot.name,1);
      } else if (msg.value == 63) {
        my.events.emit("rotary", { id: rot.midiID, binding: rot.binding_dec, direction: -1 }); //Dont use "this.", use "my instead"
        //console.log("Emit:"+rot.name, -1);
      }
    });

    //Keyboard-Actions
    this.input.on("noteon", function (msg) {
      var key = my.pianokeys.pianokey(msg.note);
      if (!key) {
        //Midi-code not in collection
        console.log(`undefined Keyboard-Key sends on [${[msg.channel, msg.note].toString()}]`);
        return;
      }
      if (!key.binding) {
        console.log(`unbound Keyboard-Key sends on [${[msg.channel, msg.note].toString()}]`);
        return;
      }
      my.events.emit("pianokeypress", { id: key.midiID, binding: key.binding, velocity: msg.velocity });
    });

    this.input.on("noteoff", function (msg) {
      var key = my.pianokeys.pianokey(msg.note);
      if (!key) {
        //Midi-code not in collection
        console.log(`undefined Keyboard-Key sends on [${[msg.channel, msg.note].toString()}]`);
      } else if (!key.binding) {
        console.log(`unbound Keyboard-Key sends on [${[msg.channel, msg.note].toString()}]`);
        return;
      } else my.events.emit("pianokeyrelease", { id: key.midiID, binding: key.binding, velocity: msg.velocity });
      //console.log("Emit:", key.name);
    });
  }

  /**
   * Send a color change to the LED on the arturia-keyboard
   * @param led_id id of the LED
   * @param color colorCode specified in arturia-constants
   */
  private sendColorToLED = (led_id: number, color: LEDColor) => {
    //https://forum.arturia.com/index.php?topic=92480.0
    //console.log(`Function cbChangeColor for ${id} to Color ${color}`)
    var bytes = Array(12); // array of bytes to be send
    bytes = [0xf0, 0x0, 0x20, 0x6b, 0x7f, 0x42, 0x02, 0x00, 0x10, 0x70 + led_id, color, 0xf7];
    this.output.send("sysex", bytes);
  };
  /**
   * Sends a MidiBoard-Specific Init-Sequence wich is stored as Array in a specific file
   */
  Midiboard_init(): void {
    var arr = InitSequence();
    arr.forEach((element) => this.output.send("sysex", element));
  }
}
