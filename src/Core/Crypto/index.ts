import { genSalt, hash, compare, getRounds } from 'bcryptjs';

export interface Cryptography {
    hash(text: string): Promise<string>;
    validate(origin: string, hashed: string): Promise<boolean>;
}

export default class implements Cryptography {
    protected readonly salt
    constructor(saltValue: number = 8) {
        this.salt = saltValue;
    }
    
    public async hash(text: string): Promise<string> {
       return await hash(text, await genSalt(this.salt));
    }

    public async validate(origin: string, hashed: string): Promise<boolean> {
        return await compare(origin, hashed)
    }
}