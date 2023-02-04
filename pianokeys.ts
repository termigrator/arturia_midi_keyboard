import { Pianokey } from "./pianokey";


export class Pianokeys {
    pianokeymap = new Map<number, Pianokey>();
    constructor(idlist: number[]) {
        idlist.forEach(element => {
            this.pianokeymap.set(element, new Pianokey(element))
        });
    }
    /**
     *  Searches for a pianokey by its name or identifier
     * @param searchterm Name or Address of the searched Pianokey
     * @returns Pianokey
     */
    pianokey(searchterm: number ): Pianokey {
            return <Pianokey>this.pianokeymap.get(searchterm);
    }
    /**
     * Searches for a pianokey by its name.
     * @param {String} searchterm Name of the searched Pianokey
     * @returns {Pianokey} Pianokey
     */
    getByBinding(name: string|number|Function): Pianokey {
        //recurse komplete Dictionary to find searched Name
        for (var elem of this.pianokeymap.entries()) {
            if (elem[1].binding == name)
                return elem[1];
        }
        throw new Error('Wrong Pianokey-Name:' + name)
    }
}