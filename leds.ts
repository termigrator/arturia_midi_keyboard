import { LEDColor } from "./arturia_constants";
import { LED } from "./led";

export class LEDs {
    ledmap = new Map<number, LED>();
    constructor(idlist: number[], OnChange:Function) {
        idlist.forEach(id=> {
            this.ledmap.set(id, new LED(id, LEDColor.green, OnChange))
        });
    }
    LED(searchterm:number|string):LED{
        if (typeof searchterm == 'number')
        return <LED>this.ledmap.get(searchterm);
      else
        return this.getLEDByBinding(searchterm);
    }

    private getLEDByBinding(binding: string): LED {
        for (var elem of this.ledmap.entries()) {
          if (elem[1].binding == binding)
            return elem[1];
        }
        throw new Error('Wrong LED-Binding:' + binding)
      }
}