import { IOrderBy } from "./ports/IOrderBy"

const resolveOrderBy = (orderBy: [IOrderBy]): any => {
    const order:any = {}

    orderBy?.forEach((item) => {
        order[item.field] = item.direction.toLowerCase()
    })

    return order
}

export default resolveOrderBy