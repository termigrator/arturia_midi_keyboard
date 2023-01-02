import { LEDColor } from "./arturia_constants";
import { LED } from "./led";

export class LEDs {
    ledmap = new Map<number, LED>();
    constructor(idlist: number[], OnChange:Function) {
        idlist.forEach(element=> {
            this.ledmap.set(element, new LED(element, LEDColor.green, OnChange))
        });
    }
    LED(searchterm:number|string):LED{
        if (typeof searchterm == 'number')
        return <LED>this.ledmap.get(searchterm);
      else
        return this.getLEDByName(searchterm);
    }

    private getLEDByName(name: string): LED {
        for (var elem of this.ledmap.entries()) {
          if (elem[1].Name == name)
            return elem[1];
        }
        throw new Error('Wrong Rotary-Name:' + name)
      }
}