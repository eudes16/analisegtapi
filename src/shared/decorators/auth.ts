import IContext, { ISession } from "../../ports/IContext";

const auth = () => {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        const originalMethod = descriptor.value;
        descriptor.value = async function (...args: any[]) {
            const context = args[1] as IContext;
            const { jwt } = context.token;
            const token = context.token.session.replace('Bearer ', '');
            const session = await jwt.validate(token);
            
            if (!session) {
                throw new Error('Invalid token')
            }

            const { userId } = session;

            const sessionResponse = await context.dataSources.prismaClient.session.findFirst({
                where: {
                    userId,
                    jwt: token,
                    expiresAt: {
                        gte: new Date()
                    }
                },

                orderBy: [{
                    id: 'desc'
                }],
                include: {
                    user: true
                }
            })

            if (!sessionResponse) {
                throw new Error('Session not found')
            }

            if (sessionResponse.jwt !== token) {
                throw new Error('Invalid token')
            }
            
            args[1].session = {
                user: {
                    email: sessionResponse.user.email,
                    token: sessionResponse.jwt,
                    appKey: sessionResponse.appKey,
                    xboxId: sessionResponse.user.xboxId,
                    gamerTag: sessionResponse.user.gamerTag,
                }
            } as ISession;
            return originalMethod.apply(this, args);
        }
    }
}

export default auth;