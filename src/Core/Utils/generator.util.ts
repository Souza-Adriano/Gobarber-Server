import { v4 as uid } from 'uuid';

export interface Generator {
    uid(): string;
}

class GeneratorUtils implements Generator {
    constructor() {}

    public uid():string {
        return uid();
    }
}

export default GeneratorUtils;