export interface Bookkeeping {
    id : string,
    owner: string,
    name: string,
    description: string,
    archived: boolean,
    transactions: string[]
    categories: string[]
}