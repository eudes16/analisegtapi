import { QueryFilter, QueryOperation } from "./ports/IFilter";

const resolveFilters = (filter: QueryFilter, queryOperation: QueryOperation) => {
    const fields: any = Object.keys(filter);


    const where: any = {};

    fields.forEach((field: any) => {
        const [fieldKey, fieldValue] = Object.entries(filter[field])[0];

        if (fieldKey === '_eq') {
            where[field] = fieldValue;
            return;
        }

        if (fieldKey === '_not') {
            where['NOT'] = {
                [field]: fieldValue
            } 
        }

        if (fieldKey === '_starts_with') {
            where[field] = {
                startsWith: fieldValue
            }
        }

        if (fieldKey === '_not_starts_with') {
            where['NOT'] = {
                [field]: {
                    startsWith: fieldValue
                }
            }
        }

        if (fieldKey === '_ends_with') {
            where[field] = {
                endsWith: fieldValue
            }
        }

        if (fieldKey === '_not_ends_with') {
            where['NOT'] = {
                [field]: {
                    endsWith: fieldValue
                }
            }
        }

        if (fieldKey === '_contains') {
            where[field] = {
                contains: fieldValue
            }
        }

        if (fieldKey === '_not_contains') {
            where['NOT'] = {
                [field]: {
                    contains: fieldValue
                }
            }
        }

        if (fieldKey === '_gt') {
            where[field] = {
                gt: fieldValue
            }
        }

        if (fieldKey === '_lt') {
            where[field] = {
                lt: fieldValue
            }
        }

        if (fieldKey === '_gte') {
            where[field] = {
                gte: fieldValue
            }
        }

        if (fieldKey === '_lte') {
            where[field] = {
                lte: fieldValue
            }
        }

        if (fieldKey === '_in') {
            where[field] = {
                in: fieldValue
            }
        }

        if (fieldKey === '_not_in') {
            where['NOT'] = {
                [field]: {
                    in: fieldValue
                }
            }
        }

        if (fieldKey === '_is') {
            where[field] = {
                equals: fieldValue
            }
        }

        if (fieldKey === '_not_is') {
            where[field] = {
                not: fieldValue
            }
        }

        if (fieldKey === '_has') {
            where[field] = {
                has: fieldValue
            }
        }

        if (fieldKey === '_has_every') {
            where[field] = {
                hasEvery: fieldValue
            }
        }

        if (fieldKey === '_has_some') {
            where[field] = {
                hasSome: fieldValue
            }
        }

        if (fieldKey === '_is_empty') {
            where[field] = {
                isEmpty: fieldValue
            }
        }

        if (fieldKey === '_is_set') {
            where[field] = {
                isSet: fieldValue
            }
        }

    })

    return where;
}

export default resolveFilters;