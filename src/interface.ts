namespace interfaces {
    
    export interface flag {
        [index:string]: boolean
        func: boolean,
        trigoBox: boolean,
        trigoFunc: boolean,
        isDegree: boolean,
    }

    export type displayArray = (number|string)[]
}