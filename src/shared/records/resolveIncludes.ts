const resolveIncludes = (includes: any, options: any) => {
    let includeRelations: any = {};

    if (includes?.length > 0) {
        includes.forEach((relation: string) => {
            const relationFields = relation.split('_');
            let count = 0;
            const nestedObject = createNestedObject(relationFields, true, count);
            includeRelations = nestedObject;
        });
    }


    if (Object.keys(includeRelations).length > 0) {
        options.select = { ...options.select, ...includeRelations };
    }
}

const createNestedObject = (fields: string[], value: any, deepLevel: number): any => {
    const field = fields.shift();

    if (!field) {
        return value;
    }

    if (deepLevel === 0) {
        return {
            [field]: createNestedObject(fields, value, deepLevel + 1)
        }
    }
    return {
        include: {
            [field]: createNestedObject(fields, value, deepLevel + 1)
        }
    };
};

export default resolveIncludes;