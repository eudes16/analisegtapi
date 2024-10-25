import { TValidateToken } from "./ports/TJwtToken";

const jwt = require('jsonwebtoken');

export const validateToken: TValidateToken = async (token) => {
    const secret = process.env.JWT_SECRET;

    const response = jwt.verify(token, secret, {
        algorithms: ["HS256"],
    });

    return response;
}