import { Rotary } from "./rotary";

export class Rotaries {
    private rotarymap = new Map<number, Rotary>();
    constructor(idlist: number[]) {
        idlist.forEach(element=> {
          //creats the map with rotary-objects and setting the default-name property
            this.rotarymap.set(element, new Rotary(element))
        });
    }
    
        // Returns a Rotary object based on the search term.
    
    rotary(searchterm:number|string):Rotary{
        if (typeof searchterm == 'number')
        return <Rotary>this.rotarymap.get(searchterm);
      else
        return this.getRotaryByBinding(searchterm);
    }

    private getRotaryByBinding(name: string): Rotary {
        for (var elem of this.rotarymap.entries()) {
          if (elem[1].binding == name)
            return elem[1];
        }
        throw new Error('Wrong Rotary-Name:' + name)
      }
}