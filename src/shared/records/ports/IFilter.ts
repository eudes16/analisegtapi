export type QueryOperation = 'findFirst' | 'findMany' | 'findFirstOrThrow'

export interface IFilter {
    _eq: any
    _not: any
    _in: any[]
    _not_in: any[]
    _lt: any
    _lte: any
    _gt: any
    _gte: any
    _contains: any
    _not_contains: any
    _starts_with: any
    _not_starts_with: any
    _ends_with: any
    _not_ends_with: any
    _is: boolean
    _not_is: boolean
    _has: any[]
    _has_every: any[]
    _has_some: any[]
    _is_empty: boolean
    _is_set: boolean
}

export interface QueryFilter {
    [name: string]: Pick<IFilter, '_eq'> | Pick<IFilter, '_not'> | Pick<IFilter, '_in'> | Pick<IFilter, '_not_in'> | Pick<IFilter, '_lt'> | Pick<IFilter, '_lte'> | Pick<IFilter, '_gt'> | Pick<IFilter, '_gte'> | Pick<IFilter, '_contains'> | Pick<IFilter, '_not_contains'> | Pick<IFilter, '_starts_with'> | Pick<IFilter, '_not_starts_with'> | Pick<IFilter, '_ends_with'> | Pick<IFilter, '_not_ends_with'> | Pick<IFilter, '_is'> | Pick<IFilter, '_not_is'>  | Pick<IFilter, '_has'> | Pick<IFilter, '_has_every'> | Pick<IFilter, '_has_some'> | Pick<IFilter, '_is_empty'> | Pick<IFilter, '_is_set'>
} 



