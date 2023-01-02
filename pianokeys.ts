import { Pianokey } from "./pianokey";


export class Pianokeys {
    pianokeymap = new Map<number, Pianokey>();
    constructor(idlist: number[]) {
        idlist.forEach(element => {
            this.pianokeymap.set(element, new Pianokey(element, "Key" + element))
        });
    }
    /**
     *  Searches for a pianokey by its name or identifier
     * @param searchterm Name or Address of the searched Pianokey
     * @returns Pianokey
     */
    pianokey(searchterm: number | string): Pianokey {
        if (typeof searchterm == 'number')  //search by address
            return <Pianokey>this.pianokeymap.get(searchterm);
        else //search by name
            return this.getPianokeyByName(searchterm);
    }
    /**
     * Searches for a pianokey by its name.
     * @param {String} searchterm Name of the searched Pianokey
     * @returns {Pianokey} Pianokey
     */
    private getPianokeyByName(name: string): Pianokey {
        //recurse komplete Dictionary to find searched Name
        for (var elem of this.pianokeymap.entries()) {
            if (elem[1].name == name)
                return elem[1];
        }
        throw new Error('Wrong Pianokey-Name:' + name)
    }
}