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
    
    rotary(midiID:number):Rotary{
        return this.rotarymap.get(midiID);
    }

    getByBinding(searchedBinding: number|string|Function): Rotary {
        for (var elem of this.rotarymap.entries()) {
          if ((elem[1].binding_inc == searchedBinding)||(elem[1].binding_dec == searchedBinding))
            return elem[1];
        }
        throw new Error('no Rotary with binding:' + searchedBinding)
      }
}