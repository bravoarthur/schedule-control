

export type TClient = {

    name: string,
    id: string,
    area: string,
    address: string,
    interval: number,
    lastVisit: string,
    visitList: Array<string>,
    notes: string
}

export interface TypeClientsList extends Array<TClient> {}