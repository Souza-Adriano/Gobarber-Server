export type ID<T extends string | number = string | number> = T

export interface PageCounter {
    quantity: number,
    page: number;
}

export interface Create <DTO, ID extends string | number = string | number> {
    create(dto: DTO): Promise<ID>
}

export interface Update <DTO> {
    update(dto: Partial<DTO>): Promise<DTO>
}

export interface Delete<ID extends string | number = string | number> {
    delete(id: ID): Promise<void>
}

export interface Find<DTO, ID extends string | number = string | number> {
    find(id: ID): Promise<DTO>
}

export interface List<DTO> {
    list(offset?: PageCounter): Promise<DTO[]>
}

export interface FindBy<DTO, OPT> {
    findBy(dto: OPT): Promise<DTO[]>
}

export interface First<DTO, OPT> {
    First(dto: OPT): Promise<DTO>
}

export interface Check<> {
    check(): Promise<boolean>
}

interface BaseRepository {
    entity: string;
}

export default abstract class Repository implements BaseRepository {
    constructor(private readonly entityName: string) {}

    public get entity() {
        return this.entityName;
    }
}