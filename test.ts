import { ArturiaMinilab } from "./arturia_minilab";
import { LEDColor } from "./arturia_constants";

var keyboard = new ArturiaMinilab();
//change name by Address
keyboard.leds.LED(1).binding = "ABC"
//change name by old Name
keyboard.rotaries.rotary(16).binding = "TEST";
//configure colors of the LED
keyboard.leds.LED(2).color = LEDColor.cyan;
keyboard.leds.LED(1).color = LEDColor.green;
//switch two LEDs on, one by new name, one by address
keyboard.leds.LED("ABC").on();
keyboard.leds.LED(2).on();

//wait for events
keyboard.events.on("rotary", msg => {
    console.log(msg.binding, msg.direction);
})
keyboard.events.on("pianokeypress", msg => {
    console.log(msg.binding, msg.velocity);
});

