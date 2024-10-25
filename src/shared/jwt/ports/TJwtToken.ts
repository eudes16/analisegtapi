export type TCreateToken = (payload: string, secret: string, expiresIn: string) => Promise<string>

export type TValidateToken = (token: string) => Promise<any>